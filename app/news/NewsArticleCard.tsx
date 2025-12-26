"use client";

import { useState, useEffect } from "react";

interface NewsArticleCardProps {
  id: string;
  title: string;
  description: string | null;
  url: string;
  topic: string | null;
  publishedAt: Date;
}

export default function NewsArticleCard({
  title,
  description,
  url,
  topic,
  publishedAt,
}: NewsArticleCardProps) {
  const [isReading, setIsReading] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check if browser supports speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSynth(window.speechSynthesis);
    }
  }, []);

  const readArticle = () => {
    if (!synth) {
      alert("Text-to-speech is not supported in your browser.");
      return;
    }

    if (isReading) {
      // Stop if already reading
      synth.cancel();
      setIsReading(false);
      return;
    }

    // Prepare the text to read (title + description)
    const textToRead = `${title}. ${description || ""}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "en-US";
    utterance.rate = 1.0; // Normal speed
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 1.0; // Full volume

    utterance.onstart = () => {
      setIsReading(true);
    };

    utterance.onend = () => {
      setIsReading(false);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsReading(false);
    };

    synth.speak(utterance);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (synth) {
        synth.cancel();
      }
    };
  }, [synth]);

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
        <span className={topic === "Immigration" ? "text-orange-400" : "text-cyan-400"}>
          {topic || "News"}
        </span>
        <span className="text-slate-500">
          {publishedAt.toLocaleDateString()}
        </span>
      </div>

      <div className="flex items-start gap-3 mb-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-semibold hover:text-blue-400 transition flex-1"
        >
          {title}
        </a>
        <button
          onClick={readArticle}
          className="flex-shrink-0 p-2 rounded-full hover:bg-slate-800 transition-colors"
          title={isReading ? "Stop reading" : "Read article"}
          aria-label={isReading ? "Stop reading" : "Read article"}
        >
          {isReading ? (
            <svg
              className="w-6 h-6 text-red-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-blue-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {description && (
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      )}
    </div>
  );
}

