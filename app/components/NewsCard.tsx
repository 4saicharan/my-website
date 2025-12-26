"use client";

import Link from "next/link";

export default function NewsCard() {
  return (
    <Link
      href="https://saiasapu.com/news"
      className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-[280px] h-[240px] flex flex-col hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20 group"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-300">News</h3>
        <svg 
          className="w-6 h-6 text-purple-400 group-hover:translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
        </svg>
      </div>
      
      <div className="space-y-2 flex-1 flex flex-col">
        <div className="text-2xl font-bold text-white mb-2">
          Daily Briefing
        </div>
        
        <div className="text-slate-300 text-sm">
          Track AI & Immigration news
        </div>
        
        <div className="flex gap-2 mt-auto pt-4 border-t border-slate-700 text-xs">
          <span className="text-slate-400">Latest updates</span>
          <span className="text-purple-400">→</span>
        </div>
      </div>
    </Link>
  );
}

