"use client";

type CareerSuiteIframeProps = {
  src: string;
  title: string;
};

export default function CareerSuiteIframe({
  src,
  title,
}: CareerSuiteIframeProps) {
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
