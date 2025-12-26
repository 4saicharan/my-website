"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface LocationTime {
  location: string;
  country: string;
  timezone: string;
  time: string;
  date: string;
}

// Major world cities with their timezones
const WORLD_LOCATIONS: { location: string; country: string; timezone: string }[] = [
  // North America
  { location: "New York", country: "USA", timezone: "America/New_York" },
  { location: "Los Angeles", country: "USA", timezone: "America/Los_Angeles" },
  { location: "Chicago", country: "USA", timezone: "America/Chicago" },
  { location: "Denver", country: "USA", timezone: "America/Denver" },
  { location: "Miami", country: "USA", timezone: "America/New_York" },
  { location: "Seattle", country: "USA", timezone: "America/Los_Angeles" },
  { location: "Toronto", country: "Canada", timezone: "America/Toronto" },
  { location: "Vancouver", country: "Canada", timezone: "America/Vancouver" },
  { location: "Mexico City", country: "Mexico", timezone: "America/Mexico_City" },
  
  // South America
  { location: "São Paulo", country: "Brazil", timezone: "America/Sao_Paulo" },
  { location: "Rio de Janeiro", country: "Brazil", timezone: "America/Sao_Paulo" },
  { location: "Buenos Aires", country: "Argentina", timezone: "America/Argentina/Buenos_Aires" },
  { location: "Lima", country: "Peru", timezone: "America/Lima" },
  { location: "Bogotá", country: "Colombia", timezone: "America/Bogota" },
  { location: "Santiago", country: "Chile", timezone: "America/Santiago" },
  
  // Europe
  { location: "London", country: "UK", timezone: "Europe/London" },
  { location: "Paris", country: "France", timezone: "Europe/Paris" },
  { location: "Berlin", country: "Germany", timezone: "Europe/Berlin" },
  { location: "Rome", country: "Italy", timezone: "Europe/Rome" },
  { location: "Madrid", country: "Spain", timezone: "Europe/Madrid" },
  { location: "Amsterdam", country: "Netherlands", timezone: "Europe/Amsterdam" },
  { location: "Moscow", country: "Russia", timezone: "Europe/Moscow" },
  { location: "Athens", country: "Greece", timezone: "Europe/Athens" },
  { location: "Stockholm", country: "Sweden", timezone: "Europe/Stockholm" },
  { location: "Zurich", country: "Switzerland", timezone: "Europe/Zurich" },
  { location: "Dublin", country: "Ireland", timezone: "Europe/Dublin" },
  { location: "Lisbon", country: "Portugal", timezone: "Europe/Lisbon" },
  
  // Asia
  { location: "Tokyo", country: "Japan", timezone: "Asia/Tokyo" },
  { location: "Beijing", country: "China", timezone: "Asia/Shanghai" },
  { location: "Hong Kong", country: "Hong Kong", timezone: "Asia/Hong_Kong" },
  { location: "Singapore", country: "Singapore", timezone: "Asia/Singapore" },
  { location: "Seoul", country: "South Korea", timezone: "Asia/Seoul" },
  { location: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok" },
  { location: "Mumbai", country: "India", timezone: "Asia/Kolkata" },
  { location: "Delhi", country: "India", timezone: "Asia/Kolkata" },
  { location: "Dubai", country: "UAE", timezone: "Asia/Dubai" },
  { location: "Riyadh", country: "Saudi Arabia", timezone: "Asia/Riyadh" },
  { location: "Tel Aviv", country: "Israel", timezone: "Asia/Jerusalem" },
  { location: "Jakarta", country: "Indonesia", timezone: "Asia/Jakarta" },
  { location: "Manila", country: "Philippines", timezone: "Asia/Manila" },
  { location: "Kuala Lumpur", country: "Malaysia", timezone: "Asia/Kuala_Lumpur" },
  { location: "Taipei", country: "Taiwan", timezone: "Asia/Taipei" },
  
  // Oceania
  { location: "Sydney", country: "Australia", timezone: "Australia/Sydney" },
  { location: "Melbourne", country: "Australia", timezone: "Australia/Melbourne" },
  { location: "Auckland", country: "New Zealand", timezone: "Pacific/Auckland" },
  { location: "Honolulu", country: "USA", timezone: "Pacific/Honolulu" },
  
  // Africa
  { location: "Cairo", country: "Egypt", timezone: "Africa/Cairo" },
  { location: "Johannesburg", country: "South Africa", timezone: "Africa/Johannesburg" },
  { location: "Lagos", country: "Nigeria", timezone: "Africa/Lagos" },
  { location: "Nairobi", country: "Kenya", timezone: "Africa/Nairobi" },
  { location: "Casablanca", country: "Morocco", timezone: "Africa/Casablanca" },
];

export default function WorldClock() {
  const [locationTimes, setLocationTimes] = useState<LocationTime[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const updateTimes = () => {
      const times = WORLD_LOCATIONS.map((loc) => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: loc.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        const dateFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: loc.timezone,
          month: "short",
          day: "numeric",
          weekday: "short",
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

    // Update immediately
    updateTimes();

    // Update every second
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  // Filter locations based on search query
  const filteredLocations = locationTimes.filter(
    (loc) =>
      loc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by continent/region for better organization
  const getRegion = (timezone: string): string => {
    if (timezone.startsWith("America/")) {
      if (timezone.includes("New_York") || timezone.includes("Toronto") || timezone.includes("Chicago")) {
        return "North America (East)";
      }
      if (timezone.includes("Los_Angeles") || timezone.includes("Vancouver")) {
        return "North America (West)";
      }
      if (timezone.includes("Mexico") || timezone.includes("Denver")) {
        return "North America (Central)";
      }
      return "South America";
    }
    if (timezone.startsWith("Europe/")) return "Europe";
    if (timezone.startsWith("Asia/")) return "Asia";
    if (timezone.startsWith("Australia/") || timezone.startsWith("Pacific/")) return "Oceania";
    if (timezone.startsWith("Africa/")) return "Africa";
    return "Other";
  };

  const groupedByRegion = filteredLocations.reduce((acc, loc) => {
    const region = getRegion(loc.timezone);
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(loc);
    return acc;
  }, {} as Record<string, LocationTime[]>);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                World Clock
              </h1>
              <p className="text-slate-400">Real-time clocks for major cities around the world</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors"
            >
              ← Home
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by city or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* World Clock Grid */}
        <div className="space-y-8">
          {Object.entries(groupedByRegion)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([region, locations]) => (
              <div key={region} className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-blue-400 mb-4 pb-2 border-b border-slate-700">
                  {region}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {locations.map((loc) => (
                    <div
                      key={`${loc.location}-${loc.country}`}
                      className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-lg font-semibold text-white">{loc.location}</div>
                          <div className="text-sm text-slate-400">{loc.country}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-400 mb-1">{loc.time}</div>
                      <div className="text-xs text-slate-500">{loc.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            No locations found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}
