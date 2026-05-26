"use client";

import { useEffect, useRef } from "react";
import {
  trackCareerSuiteTabMessage,
  type CareerSuiteTab,
} from "@/lib/analytics";

const CHATBOT_ORIGIN = "https://saiasapu-sai-asapu-ai.hf.space";

/**
 * Walkie-Talkie listener: the HF Space iframe posts tab-switch messages to the
 * parent window; we forward them to GA4 as custom events.
 *
 * Expected payload from the chatbot:
 * `{ type: "career_suite_tab", tab: "digital_twin" | "career_architect" }`
 */
export default function CareerSuiteWalkieTalkie() {
  const lastTabRef = useRef<CareerSuiteTab | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== CHATBOT_ORIGIN) {
        return;
      }

      const tab = trackCareerSuiteTabMessage(event.data);
      if (!tab || tab === lastTabRef.current) {
        return;
      }

      lastTabRef.current = tab;
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}
