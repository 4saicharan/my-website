import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  chanceOfRain: number;
}

export default function WeatherScreen() {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const response = await fetch('https://wttr.in/?format=j1', {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Weather service unavailable');
        }

        const data = await response.json();

        const current = data.current_condition?.[0];
        const loc = data.nearest_area?.[0];
        const weatherData = data.weather || [];

        if (!current || !loc || !weatherData.length) {
          throw new Error('Invalid weather data');
        }

        setCurrentWeather({
          temp: parseInt(current.temp_F) || 0,
          description: current.weatherDesc?.[0]?.value || 'Unknown',
          icon: current.weatherCode || '113',
          humidity: parseInt(current.humidity) || 0,
          windSpeed: parseInt(current.windspeedMiles) || 0,
        });

        setLocation(
          `${loc.areaName?.[0]?.value || 'Unknown'}, ${loc.country?.[0]?.value || ''}`
        );

        const forecastDays: ForecastDay[] = weatherData.slice(0, 10).map((day: any) => {
          const hourly = day.hourly || [];
          const maxTemp = Math.max(...hourly.map((h: any) => parseInt(h.tempF) || 0));
          const minTemp = Math.min(...hourly.map((h: any) => parseInt(h.tempF) || 0));
          const avgHour = hourly[Math.floor(hourly.length / 2)] || hourly[0] || {};

          return {
            date: day.date,
            maxTemp,
            minTemp,
            description: avgHour.weatherDesc?.[0]?.value || 'Unknown',
            icon: avgHour.weatherCode || '113',
            humidity: parseInt(avgHour.humidity) || 0,
            windSpeed: parseInt(avgHour.windspeedMiles) || 0,
            chanceOfRain: parseInt(avgHour.chanceofrain) || 0,
          };
        });

        setForecast(forecastDays);
        setLoading(false);
      } catch (err) {
        console.error('Weather forecast fetch error:', err);
        setError('Unable to fetch weather forecast');
        setLoading(false);
      }
    };

    fetchWeatherForecast();
  }, []);

  const getWeatherEmoji = (code: string) => {
    const codeNum = parseInt(code);
    if (codeNum === 113) return '☀️';
    if (codeNum === 116) return '⛅';
    if ([119, 122].includes(codeNum)) return '☁️';
    if ([176, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 353, 356, 359, 362, 365].includes(codeNum))
      return '🌧️';
    if ([179, 182, 185, 227, 230, 317, 320, 323, 326, 329, 332, 335, 338, 350, 362, 365, 368, 371, 374, 377, 386, 389, 392, 395].includes(codeNum))
      return '❄️';
    if ([200, 386, 389].includes(codeNum)) return '⛈️';
    return '🌤️';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#60a5fa" />
        <Text style={styles.loadingText}>Loading weather forecast...</Text>
      </View>
    );
  }

  if (error || !forecast.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Weather forecast unavailable'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Current Weather */}
      {currentWeather && (
        <View style={styles.currentWeatherCard}>
          <Text style={styles.location}>{location}</Text>
          <View style={styles.currentWeatherRow}>
            <View>
              <Text style={styles.currentTemp}>{currentWeather.temp}°F</Text>
              <Text style={styles.currentDescription}>{currentWeather.description}</Text>
              <View style={styles.currentDetails}>
                <Text style={styles.detailText}>Humidity: {currentWeather.humidity}%</Text>
                <Text style={styles.detailText}>Wind: {currentWeather.windSpeed} mph</Text>
              </View>
            </View>
            <Text style={styles.currentIcon}>{getWeatherEmoji(currentWeather.icon)}</Text>
          </View>
        </View>
      )}

      {/* Forecast */}
      <Text style={styles.sectionTitle}>10-Day Forecast</Text>
      <View style={styles.forecastContainer}>
        {forecast.map((day, index) => (
          <View key={index} style={styles.forecastCard}>
            <Text style={styles.forecastDate}>{formatDate(day.date)}</Text>
            <Text style={styles.forecastIcon}>{getWeatherEmoji(day.icon)}</Text>
            <Text style={styles.forecastMaxTemp}>{day.maxTemp}°</Text>
            <Text style={styles.forecastMinTemp}>{day.minTemp}°</Text>
            <Text style={styles.forecastDescription}>{day.description}</Text>
            <View style={styles.forecastDetails}>
              <Text style={styles.forecastDetailText}>H: {day.humidity}%</Text>
              <Text style={styles.forecastDetailText}>W: {day.windSpeed} mph</Text>
              {day.chanceOfRain > 0 && (
                <Text style={styles.forecastDetailText}>Rain: {day.chanceOfRain}%</Text>
              )}
            </View>
          </View>
        ))}
      </View>
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
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
  currentWeatherCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  location: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 12,
  },
  currentWeatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  currentDescription: {
    fontSize: 18,
    color: '#cbd5e1',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  currentDetails: {
    gap: 8,
  },
  detailText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  currentIcon: {
    fontSize: 80,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 16,
  },
  forecastContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  forecastCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    width: (width - 48) / 2 - 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 12,
  },
  forecastDate: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 8,
  },
  forecastIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  forecastMaxTemp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  forecastMinTemp: {
    fontSize: 18,
    color: '#94a3b8',
    marginBottom: 8,
  },
  forecastDescription: {
    fontSize: 12,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  forecastDetails: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 8,
    gap: 4,
  },
  forecastDetailText: {
    fontSize: 10,
    color: '#94a3b8',
  },
});

