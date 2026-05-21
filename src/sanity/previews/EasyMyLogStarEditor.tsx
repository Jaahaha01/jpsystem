"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useClient } from "sanity";

type Props = {
  document: {
    displayed?: Record<string, unknown>;
  };
  options?: {
    previewUrl?: string;
  };
};

type Lang = "en" | "th" | "jp";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "th", label: "ภาษาไทย" },
  { code: "jp", label: "日本語" },
];

function get(obj: Record<string, unknown> | undefined, path: string): string {
  if (!obj) return "";
  const parts = path.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cur: any = obj;
  for (const p of parts) {
    if (cur == null) return "";
    cur = cur[p];
  }
  return typeof cur === "string" ? cur : "";
}

function setAtPath(path: string, lang: Lang) {
  const realLang = lang === "jp" ? "ja" : lang;
  return `${path}.${realLang}`;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        border: "1px solid rgba(148,163,184,0.20)",
        borderRadius: 16,
        background: "rgba(255,255,255,0.92)",
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          background: "rgba(241,245,249,0.9)",
          borderBottom: "1px solid rgba(148,163,184,0.18)",
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 900, color: "#0f172a" }}>{title}</div>
      </div>
      <div style={{ padding: 14 }}>{children}</div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 800, color: "#334155", marginBottom: 6 }}>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        border: "1px solid rgba(148,163,184,0.35)",
        borderRadius: 12,
        padding: "10px 12px",
        fontSize: 13,
        outline: "none",
      }}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{
        width: "100%",
        border: "1px solid rgba(148,163,184,0.35)",
        borderRadius: 12,
        padding: "10px 12px",
        fontSize: 13,
        outline: "none",
        minHeight: 140,
        resize: "vertical",
        whiteSpace: "pre-wrap",
      }}
    />
  );
}

function StatusChip({ status }: { status: "idle" | "saving" | "saved" | "error" }) {
  const map: Record<typeof status, { bg: string; text: string; label: string }> = {
    idle: { bg: "transparent", text: "#64748b", label: "พร้อมแก้ไข" },
    saving: { bg: "rgba(59,130,246,0.12)", text: "#1d4ed8", label: "กำลังบันทึก…" },
    saved: { bg: "rgba(34,197,94,0.12)", text: "#15803d", label: "บันทึกแล้ว" },
    error: { bg: "rgba(239,68,68,0.12)", text: "#b91c1c", label: "บันทึกไม่สำเร็จ" },
  };
  const s = map[status];
  return (
    <span
      style={{
        padding: "6px 10px",
        borderRadius: 999,
        background: s.bg,
        color: s.text,
        fontSize: 11,
        fontWeight: 900,
        border: "1px solid rgba(148,163,184,0.18)",
      }}
    >
      {s.label}
    </span>
  );
}

export default function EasyMyLogStarEditor({ document, options }: Props) {
  const client = useClient({ apiVersion: "2026-05-06" });
  const displayed = document?.displayed || {};
  const displayedId = (displayed._id as string | undefined) || "myLogStarPage";
  const baseId = displayedId.replace(/^drafts\./, "");
  const draftId = `drafts.${baseId}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeReady, setIframeReady] = useState(false);
  const [reloadNonce, setReloadNonce] = useState(0);
  const previewUrl = options?.previewUrl || "/my-log-star";
  const previewSrc = `${previewUrl}?preview=true&r=${reloadNonce}`;

  const [lang, setLang] = useState<Lang>("en");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const saveTimer = useRef<number | null>(null);

  // Ensure draft exists so edits are always "no publish"
  useEffect(() => {
    client
      .createIfNotExists({ _id: draftId, _type: "myLogStarPage" })
      .catch(() => {
        // ignore
      });
  }, [client, draftId]);

  const current = displayed as Record<string, unknown>;

  const sendToIframe = useCallback(
    (data: Record<string, unknown>, nextLang: Lang) => {
      if (!iframeRef.current?.contentWindow) return;
      iframeRef.current.contentWindow.postMessage(
        { type: "sanity-preview-update", data, lang: nextLang },
        "*"
      );
    },
    []
  );

  // Listen for iframe ready signal (from the website when ?preview=true)
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "sanity-preview-ready") {
        setIframeReady(true);
        sendToIframe(current, lang);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [current, lang, sendToIframe]);

  // Push updates on every document change / language change
  useEffect(() => {
    if (!iframeReady) return;
    sendToIframe(current, lang);
  }, [current, lang, iframeReady, sendToIframe]);

  const switchLang = useCallback(
    (next: Lang) => {
      setLang(next);
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({ type: "sanity-switch-lang", lang: next }, "*");
      }
      if (iframeReady) sendToIframe(current, next);
    },
    [current, iframeReady, sendToIframe]
  );

  const schedulePatch = useCallback(
    (nextSet: Record<string, string>) => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      setStatus("saving");
      saveTimer.current = window.setTimeout(async () => {
        try {
          await client.patch(draftId).set(nextSet).commit();
          setStatus("saved");
          window.setTimeout(() => setStatus("idle"), 800);
        } catch {
          setStatus("error");
        }
      }, 250);
    },
    [client, draftId]
  );

  const updateField = useCallback(
    (basePath: string, value: string) => {
      const p = setAtPath(basePath, lang);
      schedulePatch({ [p]: value });
    },
    [lang, schedulePatch]
  );

  const field = useCallback(
    (basePath: string) => get(current, setAtPath(basePath, lang)),
    [current, lang]
  );

  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "minmax(440px, 520px) 1fr",
        background: "linear-gradient(180deg, #f8fafc, #eef2ff)",
      }}
    >
      {/* Left: editor */}
      <div style={{ borderRight: "1px solid rgba(148,163,184,0.20)", overflow: "auto" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 5, backdropFilter: "blur(10px)", background: "rgba(248,250,252,0.88)", borderBottom: "1px solid rgba(148,163,184,0.20)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 13, fontWeight: 950, color: "#0f172a" }}>Easy Editor — MylogStar</div>
            <div style={{ color: "#64748b", fontSize: 11 }}>ซ้ายแก้ / ขวา Preview สด (draft)</div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 6 }}>
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => switchLang(l.code)}
                    style={{
                      padding: "7px 10px",
                      borderRadius: 12,
                      border: lang === l.code ? "1px solid rgba(59,130,246,0.55)" : "1px solid rgba(148,163,184,0.25)",
                      background: lang === l.code ? "rgba(59,130,246,0.10)" : "rgba(255,255,255,0.6)",
                      fontSize: 11,
                      fontWeight: 900,
                      color: lang === l.code ? "#0f172a" : "#475569",
                      cursor: "pointer",
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <StatusChip status={status} />
            </div>
          </div>
        </div>

        <div style={{ padding: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            <Card title="Hero">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <Label>หัวข้อหน้า (pageTitle)</Label>
                  <Input
                    value={field("pageTitle")}
                    onChange={(e) => updateField("pageTitle", e.target.value)}
                    placeholder="เช่น My Log Star"
                  />
                </div>
                <div>
                  <Label>คำอธิบายสั้น (pageSubtitle)</Label>
                  <Input
                    value={field("pageSubtitle")}
                    onChange={(e) => updateField("pageSubtitle", e.target.value)}
                    placeholder="เช่น ระบบจัดการ Log สำหรับองค์กร"
                  />
                </div>
              </div>

              <div style={{ marginTop: 10 }}>
                <Label>❓ คำถามเปิด (heroQ)</Label>
                <Input
                  value={field("heroQ")}
                  onChange={(e) => updateField("heroQ", e.target.value)}
                  placeholder="เช่น What is log management?"
                />
              </div>
              <div style={{ marginTop: 10 }}>
                <Label>📝 คำอธิบาย Log (heroA)</Label>
                <Textarea
                  value={field("heroA")}
                  onChange={(e) => updateField("heroA", e.target.value)}
                  placeholder="พิมพ์คำอธิบาย…"
                />
              </div>
            </Card>

            <Card title="📂 Accordion 1 — fileServer">
              <Label>📂 ชื่อ</Label>
              <Input value={field("acc1Title")} onChange={(e) => updateField("acc1Title", e.target.value)} />
              <div style={{ height: 8 }} />
              <Label>❓ คำถาม</Label>
              <Input value={field("acc1Q")} onChange={(e) => updateField("acc1Q", e.target.value)} placeholder="What is log management?" />
              <div style={{ height: 8 }} />
              <Label>📝 คำอธิบาย</Label>
              <Textarea value={field("acc1A")} onChange={(e) => updateField("acc1A", e.target.value)} />
            </Card>

            <Card title="📂 Accordion 2 — desktop (3 ส่วน)">
              <Label>📂 ชื่อ</Label>
              <Input value={field("acc2Title")} onChange={(e) => updateField("acc2Title", e.target.value)} />
              <div style={{ height: 8 }} />
              <Label>📝 พลังในการเก็บ Log</Label>
              <Textarea value={field("acc2P1")} onChange={(e) => updateField("acc2P1", e.target.value)} />
              <div style={{ height: 8 }} />
              <Label>📝 ความพร้อมใช้งาน Log</Label>
              <Textarea value={field("acc2P2")} onChange={(e) => updateField("acc2P2", e.target.value)} />
              <div style={{ height: 8 }} />
              <Label>📝 สนับสนุน Telework</Label>
              <Textarea value={field("acc2P3")} onChange={(e) => updateField("acc2P3", e.target.value)} />
            </Card>

            <Card title="📂 Accordion 3 — standalone">
              <Label>📂 ชื่อ</Label>
              <Input value={field("acc3Title")} onChange={(e) => updateField("acc3Title", e.target.value)} />
              <div style={{ height: 8 }} />
              <Label>📝 เนื้อหา FileServer</Label>
              <Textarea value={field("acc3Content")} onChange={(e) => updateField("acc3Content", e.target.value)} />
            </Card>

            <Card title="📂 Accordion 4 — console (5 ส่วน)">
              <Label>📂 ชื่อ</Label>
              <Input value={field("acc4Title")} onChange={(e) => updateField("acc4Title", e.target.value)} />
              <div style={{ height: 8 }} />
              <Label>📝 แนะนำ MylogStar Desktop</Label>
              <Textarea value={field("acc4P1")} onChange={(e) => updateField("acc4P1", e.target.value)} />
              <div style={{ height: 8 }} />
              <Label>📝 การจัดการ Log</Label>
              <Textarea value={field("acc4P2")} onChange={(e) => updateField("acc4P2", e.target.value)} />
              <div style={{ height: 8 }} />
              <Label>📝 Standalone Manager</Label>
              <Textarea value={field("acc4P3")} onChange={(e) => updateField("acc4P3", e.target.value)} />
              <div style={{ height: 8 }} />
              <Label>📝 คอนโซลจัดการ</Label>
              <Textarea value={field("acc4P4")} onChange={(e) => updateField("acc4P4", e.target.value)} />
              <div style={{ height: 8 }} />
              <Label>📝 การควบคุมอุปกรณ์ USB</Label>
              <Textarea value={field("acc4P5")} onChange={(e) => updateField("acc4P5", e.target.value)} />
            </Card>
          </div>
        </div>
      </div>

      {/* Right: live preview */}
      <div style={{ background: "#0b1220", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 10, borderBottom: "1px solid rgba(148,163,184,0.14)", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 900 }}>Preview</div>
          <div style={{ color: "#64748b", fontSize: 11, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} title={previewSrc}>
            {previewSrc}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={() => setReloadNonce((n) => n + 1)}
              style={{
                padding: "6px 10px",
                borderRadius: 10,
                background: "rgba(15,23,42,0.6)",
                border: "1px solid rgba(148,163,184,0.16)",
                color: "#e2e8f0",
                fontSize: 11,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Reload
            </button>
          </div>
        </div>
        <div style={{ flex: 1, padding: 12 }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(148,163,184,0.16)", background: "#fff" }}>
            <iframe
              ref={iframeRef}
              src={previewSrc}
              style={{ width: "100%", height: "100%", border: "none", background: "#fff" }}
              title="MyLogStar Live Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

