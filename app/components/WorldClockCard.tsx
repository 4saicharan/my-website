"use client";

import Link from "next/link";

export default function WorldClockCard() {
  return (
    <Link
      href="/world-clock"
      className="bg-slate-900 border border-slate-700 rounded-xl p-6 min-w-[280px] hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/20 group"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-300">World Clock</h3>
        <svg 
          className="w-6 h-6 text-green-400 group-hover:rotate-12 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-white mb-2">
          Global Time
        </div>
        
        <div className="text-slate-300 text-sm">
          View times across the world
        </div>
        
        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-700 text-xs">
          <span className="text-slate-400">50+ cities</span>
          <span className="text-green-400">→</span>
        </div>
      </div>
    </Link>
  );
}

