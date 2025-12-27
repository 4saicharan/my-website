import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 3; // 3 cards with padding

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>TorqueTech</Text>
        <Text style={styles.subtitle}>
          Turning gears into code. My work is built on engineering discipline and fueled by the latest Artificial Intelligence news.
        </Text>
      </View>

      {/* Cards Row */}
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={[styles.card, { width: cardWidth }]}
          onPress={() => navigation.navigate('Weather' as never)}
        >
          <Text style={styles.cardTitle}>Weather</Text>
          <Text style={styles.cardIcon}>🌤️</Text>
          <Text style={styles.cardText}>10-day forecast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { width: cardWidth }]}
          onPress={() => navigation.navigate('News' as never)}
        >
          <Text style={styles.cardTitle}>News</Text>
          <Text style={styles.cardIcon}>📰</Text>
          <Text style={styles.cardText}>Daily Briefing</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { width: cardWidth }]}
          onPress={() => navigation.navigate('WorldClock' as never)}
        >
          <Text style={styles.cardTitle}>World Clock</Text>
          <Text style={styles.cardIcon}>🕐</Text>
          <Text style={styles.cardText}>50+ cities</Text>
        </TouchableOpacity>
      </View>

      {/* Skills Section */}
      <View style={styles.skillsContainer}>
        <Text style={styles.sectionTitle}>Skills & Technologies</Text>
        <View style={styles.skillsRow}>
          {['JavaScript', 'TypeScript', 'Python', 'React', 'Next.js', 'Node.js', 'AI/ML', 'System Design'].map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Contact Button */}
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contact Me</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#60a5fa',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
    gap: 12,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    minHeight: 200,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  skillsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 16,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  skillText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '500',
  },
  contactButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 32,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

