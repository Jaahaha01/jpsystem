"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

type Props = {
  document: {
    displayed?: Record<string, unknown>;
  };
  options?: {
    previewUrl?: string;
  };
};

const LANGS = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "th", label: "TH", flag: "🇹🇭" },
  { code: "jp", label: "JP", flag: "🇯🇵" },
];

export default function IframePreview({ document, options }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeLang, setActiveLang] = useState("en");
  const [iframeReady, setIframeReady] = useState(false);
  const doc = document?.displayed;
  const url = options?.previewUrl || "/";

  // Send data to iframe
  const sendToIframe = useCallback(
    (data: Record<string, unknown> | undefined, lang: string) => {
      if (!iframeRef.current?.contentWindow) return;
      iframeRef.current.contentWindow.postMessage(
        { type: "sanity-preview-update", data: data || {}, lang },
        "*"
      );
    },
    []
  );

  // Listen for iframe ready signal
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "sanity-preview-ready") {
        setIframeReady(true);
        // Send initial data
        sendToIframe(doc as Record<string, unknown>, activeLang);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [doc, activeLang, sendToIframe]);

  // Send on every document change (real-time as you type)
  useEffect(() => {
    if (!iframeReady) return;
    sendToIframe(doc as Record<string, unknown>, activeLang);
  }, [doc, activeLang, iframeReady, sendToIframe]);

  // Also send on iframe load
  const handleIframeLoad = () => {
    setTimeout(() => {
      sendToIframe(doc as Record<string, unknown>, activeLang);
    }, 500);
  };

  // Language switch
  const switchLang = (lang: string) => {
    setActiveLang(lang);
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "sanity-switch-lang", lang },
        "*"
      );
      // Also send latest data with new lang
      setTimeout(() => {
        sendToIframe(doc as Record<string, unknown>, lang);
      }, 100);
    }
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header bar */}
      <div
        style={{
          background: "#0f172a",
          padding: "6px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <span style={{ color: "#94a3b8", fontSize: 11, marginRight: 4 }}>
          Live Preview
        </span>
        <span
          style={{
            background: "#22c55e",
            color: "#fff",
            fontSize: 8,
            padding: "1px 6px",
            borderRadius: 999,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          LIVE
        </span>

        {/* Language buttons */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => switchLang(lang.code)}
              style={{
                background: activeLang === lang.code ? "#3b82f6" : "#1e293b",
                color: activeLang === lang.code ? "#fff" : "#94a3b8",
                border: activeLang === lang.code ? "1px solid #60a5fa" : "1px solid #334155",
                borderRadius: 4,
                padding: "3px 8px",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {lang.flag} {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Info bar */}
      <div
        style={{
          background: "#1e293b",
          padding: "4px 12px",
          borderBottom: "1px solid #334155",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "#64748b", fontSize: 10 }}>
          ✨ พิมพ์ข้อความในแท็บ Edit แล้วกลับมาดูที่นี่ — เห็นผลทันทีไม่ต้อง Publish
        </span>
      </div>

      {/* Iframe */}
      <iframe
        ref={iframeRef}
        src={`${url}?preview=true`}
        onLoad={handleIframeLoad}
        style={{
          flex: 1,
          width: "100%",
          border: "none",
          background: "#fff",
        }}
        title="Website Preview"
      />
    </div>
  );
}
