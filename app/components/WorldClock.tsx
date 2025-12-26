"use client";

import { useState, useEffect } from "react";

interface StateTime {
  state: string;
  timezone: string;
  time: string;
  date: string;
}

// All 50 US states with their timezones
const US_STATES: { name: string; timezone: string }[] = [
  { name: "Alabama", timezone: "America/Chicago" },
  { name: "Alaska", timezone: "America/Anchorage" },
  { name: "Arizona", timezone: "America/Phoenix" },
  { name: "Arkansas", timezone: "America/Chicago" },
  { name: "California", timezone: "America/Los_Angeles" },
  { name: "Colorado", timezone: "America/Denver" },
  { name: "Connecticut", timezone: "America/New_York" },
  { name: "Delaware", timezone: "America/New_York" },
  { name: "Florida", timezone: "America/New_York" }, // Most of FL is EST, but FL panhandle is CST
  { name: "Georgia", timezone: "America/New_York" },
  { name: "Hawaii", timezone: "Pacific/Honolulu" },
  { name: "Idaho", timezone: "America/Denver" }, // Northern ID is PST
  { name: "Illinois", timezone: "America/Chicago" },
  { name: "Indiana", timezone: "America/Indiana/Indianapolis" },
  { name: "Iowa", timezone: "America/Chicago" },
  { name: "Kansas", timezone: "America/Chicago" },
  { name: "Kentucky", timezone: "America/New_York" },
  { name: "Louisiana", timezone: "America/Chicago" },
  { name: "Maine", timezone: "America/New_York" },
  { name: "Maryland", timezone: "America/New_York" },
  { name: "Massachusetts", timezone: "America/New_York" },
  { name: "Michigan", timezone: "America/Detroit" },
  { name: "Minnesota", timezone: "America/Chicago" },
  { name: "Mississippi", timezone: "America/Chicago" },
  { name: "Missouri", timezone: "America/Chicago" },
  { name: "Montana", timezone: "America/Denver" },
  { name: "Nebraska", timezone: "America/Chicago" },
  { name: "Nevada", timezone: "America/Los_Angeles" },
  { name: "New Hampshire", timezone: "America/New_York" },
  { name: "New Jersey", timezone: "America/New_York" },
  { name: "New Mexico", timezone: "America/Denver" },
  { name: "New York", timezone: "America/New_York" },
  { name: "North Carolina", timezone: "America/New_York" },
  { name: "North Dakota", timezone: "America/Chicago" },
  { name: "Ohio", timezone: "America/New_York" },
  { name: "Oklahoma", timezone: "America/Chicago" },
  { name: "Oregon", timezone: "America/Los_Angeles" },
  { name: "Pennsylvania", timezone: "America/New_York" },
  { name: "Rhode Island", timezone: "America/New_York" },
  { name: "South Carolina", timezone: "America/New_York" },
  { name: "South Dakota", timezone: "America/Chicago" },
  { name: "Tennessee", timezone: "America/Chicago" },
  { name: "Texas", timezone: "America/Chicago" },
  { name: "Utah", timezone: "America/Denver" },
  { name: "Vermont", timezone: "America/New_York" },
  { name: "Virginia", timezone: "America/New_York" },
  { name: "Washington", timezone: "America/Los_Angeles" },
  { name: "West Virginia", timezone: "America/New_York" },
  { name: "Wisconsin", timezone: "America/Chicago" },
  { name: "Wyoming", timezone: "America/Denver" },
];

export default function WorldClock() {
  const [stateTimes, setStateTimes] = useState<StateTime[]>([]);

  useEffect(() => {
    const updateTimes = () => {
      const times = US_STATES.map((state) => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: state.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        const dateFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: state.timezone,
          month: "short",
          day: "numeric",
        });

        return {
          state: state.name,
          timezone: state.timezone,
          time: formatter.format(now),
          date: dateFormatter.format(now),
        };
      });

      setStateTimes(times);
    };

    // Update immediately
    updateTimes();

    // Update every second
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  // Group states by timezone for better organization
  const groupedByTimezone = stateTimes.reduce((acc, state) => {
    const tz = state.timezone;
    if (!acc[tz]) {
      acc[tz] = [];
    }
    acc[tz].push(state);
    return acc;
  }, {} as Record<string, StateTime[]>);

  const timezoneLabels: Record<string, string> = {
    "America/New_York": "Eastern Time (ET)",
    "America/Chicago": "Central Time (CT)",
    "America/Denver": "Mountain Time (MT)",
    "America/Los_Angeles": "Pacific Time (PT)",
    "America/Anchorage": "Alaska Time (AKT)",
    "Pacific/Honolulu": "Hawaii Time (HST)",
    "America/Detroit": "Eastern Time (ET)",
    "America/Indiana/Indianapolis": "Eastern Time (ET)",
    "America/Phoenix": "Mountain Time (MT)",
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-6xl max-h-[600px] overflow-y-auto">
      <h3 className="text-xl font-semibold text-slate-300 mb-4 sticky top-0 bg-slate-900 pb-2">
        World Clock - US States
      </h3>

      <div className="space-y-6">
        {Object.entries(groupedByTimezone).map(([timezone, states]) => (
          <div key={timezone} className="border-b border-slate-700 pb-4 last:border-b-0">
            <h4 className="text-sm font-semibold text-blue-400 mb-3">
              {timezoneLabels[timezone] || timezone}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {states.map((state) => (
                <div
                  key={state.state}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-3 hover:border-blue-500 transition-colors"
                >
                  <div className="text-sm font-medium text-white mb-1">
                    {state.state}
                  </div>
                  <div className="text-lg font-bold text-blue-400">{state.time}</div>
                  <div className="text-xs text-slate-400">{state.date}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

