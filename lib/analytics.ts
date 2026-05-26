/** Replace via `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local` or Hostinger env vars. */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-2PNTLSFN1P";

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

export function trackCareerSuiteTabSwitch(tabName: CareerSuiteTab) {
  sendEvent("career_suite_tab_switch", {
    tab_name: tabName,
  });
}

export function parseCareerSuiteTabFromMessage(
  data: unknown
): CareerSuiteTab | null {
  if (typeof data === "string") {
    return normalizeCareerSuiteTab(data);
  }

  if (!data || typeof data !== "object") {
    return null;
  }

  const payload = data as Record<string, unknown>;
  const candidates = [
    payload.tab,
    payload.tab_name,
    payload.tabName,
    payload.name,
    payload.label,
    payload.view,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string") {
      const tab = normalizeCareerSuiteTab(candidate);
      if (tab) return tab;
    }
  }

  if (payload.type === "career_suite_tab" && typeof payload.tab === "string") {
    return normalizeCareerSuiteTab(payload.tab);
  }

  if (
    payload.event === "career_suite_tab_switch" &&
    typeof payload.tab_name === "string"
  ) {
    return normalizeCareerSuiteTab(payload.tab_name);
  }

  if (typeof payload.tabIndex === "number") {
    return payload.tabIndex === 0 ? "digital_twin" : "career_architect";
  }

  return null;
}

function normalizeCareerSuiteTab(raw: string): CareerSuiteTab | null {
  const normalized = raw.trim().toLowerCase().replace(/[\s-]+/g, "_");

  if (
    normalized === "digital_twin" ||
    normalized === "digitaltwin" ||
    normalized === "twin"
  ) {
    return "digital_twin";
  }

  if (
    normalized === "career_architect" ||
    normalized === "careerarchitect" ||
    normalized === "architect"
  ) {
    return "career_architect";
  }

  if (normalized.includes("architect")) {
    return "career_architect";
  }

  if (normalized.includes("twin")) {
    return "digital_twin";
  }

  return null;
}
