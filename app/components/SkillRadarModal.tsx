"use client";

import { useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const SKILL_DATA = [
  { skill: "PySpark", value: 88 },
  { skill: "Databricks", value: 86 },
  { skill: "Snowflake", value: 84 },
  { skill: "AI/ML", value: 92 },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SkillRadarModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[260] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-radar-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-indigo-500/25 bg-gradient-to-b from-slate-950/95 via-[#0a0f24]/98 to-slate-950/95 shadow-[0_0_0_1px_rgba(99,102,241,0.15),0_32px_80px_-20px_rgba(0,0,0,0.85),0_0_60px_-10px_rgba(99,102,241,0.2)] ring-1 ring-violet-500/10">
        <div className="border-b border-indigo-500/15 bg-gradient-to-r from-indigo-950/60 via-slate-950/40 to-violet-950/50 px-6 py-5">
          <h2
            id="skill-radar-title"
            className="text-xl font-semibold tracking-tight text-white"
          >
            Skill Radar
          </h2>
          <p className="mt-1 text-sm text-indigo-200/70">
            Relative proficiency snapshot — data & AI focus
          </p>
        </div>

        <div className="px-4 pb-2 pt-6 sm:px-6">
          <div className="h-[min(380px,55vh)] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="52%"
                outerRadius="72%"
                data={SKILL_DATA}
                margin={{ top: 16, right: 24, bottom: 16, left: 24 }}
              >
                <defs>
                  <linearGradient
                    id="skillRadarFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#6366f1"
                      stopOpacity={0.55}
                    />
                    <stop
                      offset="50%"
                      stopColor="#7c3aed"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="100%"
                      stopColor="#312e81"
                      stopOpacity={0.2}
                    />
                  </linearGradient>
                </defs>
                <PolarGrid
                  stroke="rgba(99, 102, 241, 0.22)"
                  strokeDasharray="4 6"
                  radialLines
                />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{
                    fill: "#c7d2fe",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                  tickLine={false}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tickCount={5}
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  axisLine={false}
                  tickFormatter={(v) => `${v}`}
                />
                <Radar
                  name="Proficiency"
                  dataKey="value"
                  stroke="#a5b4fc"
                  strokeWidth={2.5}
                  fill="url(#skillRadarFill)"
                  fillOpacity={0.88}
                  isAnimationActive
                  animationDuration={1400}
                  animationEasing="ease-out"
                  dot={{
                    r: 4,
                    fill: "#e0e7ff",
                    stroke: "#6366f1",
                    strokeWidth: 2,
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex justify-end border-t border-indigo-500/10 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-100 transition hover:bg-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
