/** GA4 Measurement ID — static-safe (client-side gtag only). */
export const GA_MEASUREMENT_ID = "G-2PNTLSFN1P";

export type CareerSuiteTab = "digital_twin" | "career_architect";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function sendEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function trackDownloadResume() {
  sendEvent("download_resume", {
    file_name: "Sai_Asapu_Resume.pdf",
    link_url: "/Sai_Asapu_Resume.pdf",
  });
}

export function trackBookInterview() {
  sendEvent("book_interview", {
    link_url:
      process.env.NEXT_PUBLIC_CALENDLY_URL ??
      "https://calendly.com/scharan627/quick-chat-with-sai-1",
  });
}

/** Handles `{ type: 'career_suite_tab', tab: 'digital_twin' | 'career_architect' }` postMessages. */
export function trackCareerSuiteTabMessage(data: unknown): CareerSuiteTab | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const payload = data as Record<string, unknown>;
  if (payload.type !== "career_suite_tab" || typeof payload.tab !== "string") {
    return null;
  }

  const tab = normalizeCareerSuiteTab(payload.tab);
  if (!tab) {
    return null;
  }

  if (tab === "career_architect") {
    sendEvent("use_career_tool", { tab_name: tab });
  } else {
    sendEvent("use_portfolio_bot", { tab_name: tab });
  }

  return tab;
}

function normalizeCareerSuiteTab(raw: string): CareerSuiteTab | null {
  const normalized = raw.trim().toLowerCase().replace(/[\s-]+/g, "_");

  if (normalized === "digital_twin") {
    return "digital_twin";
  }

  if (normalized === "career_architect") {
    return "career_architect";
  }

  return null;
}
