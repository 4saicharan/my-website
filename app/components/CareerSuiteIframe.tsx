"use client";

import { useEffect, useRef } from "react";
import {
  parseCareerSuiteTabFromMessage,
  trackCareerSuiteTabSwitch,
  type CareerSuiteTab,
} from "@/lib/analytics";

const CHATBOT_ORIGIN = "https://saiasapu-sai-asapu-ai.hf.space";

type CareerSuiteIframeProps = {
  src: string;
  title: string;
};

export default function CareerSuiteIframe({
  src,
  title,
}: CareerSuiteIframeProps) {
  const lastTabRef = useRef<CareerSuiteTab | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== CHATBOT_ORIGIN) {
        return;
      }

      const tab = parseCareerSuiteTabFromMessage(event.data);
      if (!tab || tab === lastTabRef.current) {
        return;
      }

      lastTabRef.current = tab;
      trackCareerSuiteTabSwitch(tab);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      src={src}
      title={title}
      className="absolute inset-0 h-full w-full border-0"
      allow="microphone; camera"
      loading="lazy"
    />
  );
}
