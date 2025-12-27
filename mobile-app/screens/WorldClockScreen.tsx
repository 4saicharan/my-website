import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface LocationTime {
  location: string;
  country: string;
  timezone: string;
  time: string;
  date: string;
}

const WORLD_LOCATIONS: { location: string; country: string; timezone: string }[] = [
  { location: 'New York', country: 'USA', timezone: 'America/New_York' },
  { location: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles' },
  { location: 'Chicago', country: 'USA', timezone: 'America/Chicago' },
  { location: 'London', country: 'UK', timezone: 'Europe/London' },
  { location: 'Paris', country: 'France', timezone: 'Europe/Paris' },
  { location: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo' },
  { location: 'Beijing', country: 'China', timezone: 'Asia/Shanghai' },
  { location: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney' },
  { location: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai' },
  { location: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata' },
];

export default function WorldClockScreen() {
  const [locationTimes, setLocationTimes] = useState<LocationTime[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const times = WORLD_LOCATIONS.map((loc) => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: loc.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: loc.timezone,
          month: 'short',
          day: 'numeric',
          weekday: 'short',
        });

        return {
          location: loc.location,
          country: loc.country,
          timezone: loc.timezone,
          time: formatter.format(now),
          date: dateFormatter.format(now),
        };
      });

      setLocationTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredLocations = locationTimes.filter(
    (loc) =>
      loc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by city or country..."
        placeholderTextColor="#64748b"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Locations Grid */}
      <View style={styles.grid}>
        {filteredLocations.map((loc) => (
          <View key={`${loc.location}-${loc.country}`} style={styles.locationCard}>
            <Text style={styles.locationName}>{loc.location}</Text>
            <Text style={styles.countryName}>{loc.country}</Text>
            <Text style={styles.time}>{loc.time}</Text>
            <Text style={styles.date}>{loc.date}</Text>
          </View>
        ))}
      </View>

      {filteredLocations.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No locations found</Text>
        </View>
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
  searchInput: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  locationCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    width: (width - 48) / 2 - 6,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 12,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  countryName: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 12,
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#60a5fa',
    marginBottom: 4,
  },
  date: {
    fontSize: 11,
    color: '#64748b',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
  },
});

