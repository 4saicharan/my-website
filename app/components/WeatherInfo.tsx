"use client";

import { useState, useEffect } from "react";

interface WeatherData {
  temp: number;
  description: string;
  city: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export default function WeatherInfo() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Using wttr.in API - a free weather service that doesn't require API key
        // Note: This uses the user's IP location by default
        const response = await fetch("https://wttr.in/?format=j1", {
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error("Weather service unavailable");
        }
        
        const data = await response.json();

        const current = data.current_condition?.[0];
        const location = data.nearest_area?.[0];

        if (!current || !location) {
          throw new Error("Invalid weather data");
        }

        setWeather({
          temp: parseInt(current.temp_F) || 0,
          description: current.weatherDesc?.[0]?.value || "Unknown",
          city: location.areaName?.[0]?.value || "Unknown",
          icon: current.weatherCode || "113",
          humidity: parseInt(current.humidity) || 0,
          windSpeed: parseInt(current.windspeedMiles) || 0,
        });
        setLoading(false);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError("Unable to fetch weather");
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-[280px] h-[240px] flex flex-col">
        <div className="text-slate-400">Loading weather...</div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-[280px] h-[240px] flex flex-col">
        <div className="text-red-400">{error || "Weather unavailable"}</div>
      </div>
    );
  }

  const getWeatherEmoji = (code: string) => {
    const codeNum = parseInt(code);
    if (codeNum === 113) return "☀️"; // Clear
    if (codeNum === 116) return "⛅"; // Partly cloudy
    if ([119, 122].includes(codeNum)) return "☁️"; // Cloudy
    if ([176, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 353, 356, 359, 362, 365].includes(codeNum)) return "🌧️"; // Rain
    if ([179, 182, 185, 227, 230, 317, 320, 323, 326, 329, 332, 335, 338, 350, 362, 365, 368, 371, 374, 377, 386, 389, 392, 395].includes(codeNum)) return "❄️"; // Snow
    if ([200, 386, 389].includes(codeNum)) return "⛈️"; // Thunderstorm
    return "🌤️"; // Default
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-[280px] h-[240px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-300">Weather</h3>
        <span className="text-4xl">{getWeatherEmoji(weather.icon)}</span>
      </div>
      
      <div className="space-y-2 flex-1 flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">{weather.temp}°</span>
          <span className="text-slate-400">F</span>
        </div>
        
        <div className="text-slate-300 capitalize">{weather.description}</div>
        <div className="text-slate-400 text-sm">{weather.city}</div>
        
        <div className="flex gap-4 mt-auto pt-4 border-t border-slate-700 text-sm">
          <div>
            <span className="text-slate-400">Humidity: </span>
            <span className="text-slate-300">{weather.humidity}%</span>
          </div>
          <div>
            <span className="text-slate-400">Wind: </span>
            <span className="text-slate-300">{weather.windSpeed} mph</span>
          </div>
        </div>
      </div>
    </div>
  );
}

