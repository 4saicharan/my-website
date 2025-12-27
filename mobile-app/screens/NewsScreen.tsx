import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { speak, stop } from 'expo-speech';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  topic: string;
  publishedAt: Date;
}

export default function NewsScreen() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [speaking, setSpeaking] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you'd fetch from your API
    // For now, we'll use mock data or you can integrate with your existing news API
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // You can replace this with your actual news API endpoint
      // For now using mock data structure
      setLoading(false);
      // Mock articles - replace with real API call
      setArticles([
        {
          id: '1',
          title: 'AI & Tech News Article',
          description: 'This is a sample news article about AI and technology.',
          url: 'https://example.com/news1',
          topic: 'AI & Tech',
          publishedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  const speakArticle = (article: NewsArticle) => {
    if (speaking === article.id) {
      stop();
      setSpeaking(null);
    } else {
      if (speaking) {
        stop();
      }
      const textToRead = `${article.title}. ${article.description}`;
      speak(textToRead, {
        language: 'en-US',
        pitch: 1.0,
        rate: 1.0,
      });
      setSpeaking(article.id);

      // Reset speaking state when done (approximate)
      setTimeout(() => {
        setSpeaking(null);
      }, (article.title.length + article.description.length) * 50);
    }
  };

  const openArticle = (url: string) => {
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#60a5fa" />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Daily Briefing</Text>
      <Text style={styles.subtitle}>Tracking AI & Immigration</Text>

      {articles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No articles available</Text>
          <Text style={styles.emptySubtext}>
            Integrate with your news API to see articles here
          </Text>
        </View>
      ) : (
        articles.map((article) => (
          <View key={article.id} style={styles.articleCard}>
            <View style={styles.articleHeader}>
              <View style={[
                styles.topicBadge,
                article.topic === 'Immigration' ? styles.topicImmigration : styles.topicTech,
              ]}>
                <Text style={styles.topicText}>{article.topic}</Text>
              </View>
              <Text style={styles.date}>
                {article.publishedAt.toLocaleDateString()}
              </Text>
            </View>

            <TouchableOpacity onPress={() => openArticle(article.url)}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleDescription}>{article.description}</Text>
            </TouchableOpacity>

            <View style={styles.articleActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => speakArticle(article)}
              >
                <Text style={styles.actionButtonText}>
                  {speaking === article.id ? '⏸ Stop' : '▶ Play'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => openArticle(article.url)}
              >
                <Text style={styles.actionButtonText}>Read More →</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  loadingText: {
    color: '#94a3b8',
    marginTop: 16,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#64748b',
    fontSize: 14,
    textAlign: 'center',
  },
  articleCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  topicBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  topicTech: {
    backgroundColor: '#0ea5e9',
  },
  topicImmigration: {
    backgroundColor: '#f97316',
  },
  topicText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  date: {
    color: '#64748b',
    fontSize: 12,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
    marginBottom: 12,
  },
  articleActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  actionButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});

