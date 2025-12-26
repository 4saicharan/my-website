"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

export default function WeatherForecastPage() {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
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
        const loc = data.nearest_area?.[0];
        const weatherData = data.weather || [];

        if (!current || !loc || !weatherData.length) {
          throw new Error("Invalid weather data");
        }

        setCurrentWeather({
          temp: parseInt(current.temp_F) || 0,
          description: current.weatherDesc?.[0]?.value || "Unknown",
          icon: current.weatherCode || "113",
          humidity: parseInt(current.humidity) || 0,
          windSpeed: parseInt(current.windspeedMiles) || 0,
        });

        setLocation(`${loc.areaName?.[0]?.value || "Unknown"}, ${loc.country?.[0]?.value || ""}`);

        // Get 10-day forecast (wttr.in provides up to 3 days, but we'll show what's available)
        const forecastDays: ForecastDay[] = weatherData.slice(0, 10).map((day: any) => {
          const hourly = day.hourly || [];
          const maxTemp = Math.max(...hourly.map((h: any) => parseInt(h.tempF) || 0));
          const minTemp = Math.min(...hourly.map((h: any) => parseInt(h.tempF) || 0));
          const avgHour = hourly[Math.floor(hourly.length / 2)] || hourly[0] || {};
          
          return {
            date: day.date,
            maxTemp,
            minTemp,
            description: avgHour.weatherDesc?.[0]?.value || "Unknown",
            icon: avgHour.weatherCode || "113",
            humidity: parseInt(avgHour.humidity) || 0,
            windSpeed: parseInt(avgHour.windspeedMiles) || 0,
            chanceOfRain: parseInt(avgHour.chanceofrain) || 0,
          };
        });

        setForecast(forecastDays);
        setLoading(false);
      } catch (err) {
        console.error("Weather forecast fetch error:", err);
        setError("Unable to fetch weather forecast");
        setLoading(false);
      }
    };

    fetchWeatherForecast();
  }, []);

  const getWeatherEmoji = (code: string) => {
    const codeNum = parseInt(code);
    if (codeNum === 113) return "☀️";
    if (codeNum === 116) return "⛅";
    if ([119, 122].includes(codeNum)) return "☁️";
    if ([176, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 353, 356, 359, 362, 365].includes(codeNum)) return "🌧️";
    if ([179, 182, 185, 227, 230, 317, 320, 323, 326, 329, 332, 335, 338, 350, 362, 365, 368, 371, 374, 377, 386, 389, 392, 395].includes(codeNum)) return "❄️";
    if ([200, 386, 389].includes(codeNum)) return "⛈️";
    return "🌤️";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8 flex items-center justify-center">
        <div className="text-slate-400 text-xl">Loading weather forecast...</div>
      </div>
    );
  }

  if (error || !forecast.length) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error || "Weather forecast unavailable"}</div>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 mb-2">
                Weather Forecast
              </h1>
              <p className="text-slate-400">{location}</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors"
            >
              ← Home
            </Link>
          </div>

          {/* Current Weather Summary */}
          {currentWeather && (
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-5xl font-bold text-white mb-2">
                    {currentWeather.temp}°F
                  </div>
                  <div className="text-xl text-slate-300 capitalize mb-1">
                    {currentWeather.description}
                  </div>
                  <div className="flex gap-6 text-sm text-slate-400">
                    <span>Humidity: {currentWeather.humidity}%</span>
                    <span>Wind: {currentWeather.windSpeed} mph</span>
                  </div>
                </div>
                <div className="text-8xl">{getWeatherEmoji(currentWeather.icon)}</div>
              </div>
            </div>
          )}
        </div>

        {/* 10-Day Forecast */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-300 mb-6">10-Day Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-700 rounded-xl p-5 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="text-center">
                  <div className="text-sm font-semibold text-slate-400 mb-3">
                    {formatDate(day.date)}
                  </div>
                  <div className="text-5xl mb-3">{getWeatherEmoji(day.icon)}</div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {day.maxTemp}°
                  </div>
                  <div className="text-lg text-slate-400 mb-3">
                    {day.minTemp}°
                  </div>
                  <div className="text-xs text-slate-300 capitalize mb-3">
                    {day.description}
                  </div>
                  <div className="space-y-1 text-xs text-slate-400 pt-3 border-t border-slate-700">
                    <div>Humidity: {day.humidity}%</div>
                    <div>Wind: {day.windSpeed} mph</div>
                    {day.chanceOfRain > 0 && (
                      <div>Rain: {day.chanceOfRain}%</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

