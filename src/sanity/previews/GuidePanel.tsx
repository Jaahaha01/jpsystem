"use client";

import React, { useState } from "react";

const GUIDES: { id: string; icon: string; title: string; steps: string[] }[] = [
  {
    id: "overview",
    icon: "📖",
    title: "ภาพรวมระบบ CMS",
    steps: [
      "🔗 Navbar / Footer — แก้เมนู, ชื่อแบรนด์, ลิขสิทธิ์ ที่ใช้ร่วมกันทุกหน้า",
      "📄 แก้ข้อความแต่ละหน้า — เลือกหน้าที่ต้องการแก้ไข (Home, e-Tax, MylogStar ฯลฯ)",
      "🖼️ รูปภาพเว็บไซต์ — อัปโหลด/เปลี่ยนรูปที่แสดงบนเว็บ",
      "ทุกหน้ามี 2 แท็บ: 'Edit' (แก้ข้อความ) และ 'Preview' (ดูตัวอย่างสดก่อน Publish)",
    ],
  },
  {
    id: "howToEdit",
    icon: "✏️",
    title: "วิธีแก้ข้อความ",
    steps: [
      "1. เลือกหน้าที่ต้องการแก้จากเมนูซ้าย",
      "2. กดแท็บ 'Edit' ด้านบน → จะเห็นช่องข้อความแยกเป็นส่วนๆ",
      "3. แต่ละช่องมี 3 ภาษา: 🇬🇧 EN, 🇹🇭 TH, 🇯🇵 JP — พิมพ์เฉพาะภาษาที่ต้องการ",
      "4. ช่อง placeholder (ข้อความจาง) คือตัวอย่างข้อความจริงจากเว็บ",
      "5. ถ้าไม่พิมพ์ → ระบบจะใช้ข้อความ default ที่ฝังไว้ในเว็บ",
    ],
  },
  {
    id: "preview",
    icon: "👁️",
    title: "วิธีดู Preview สด",
    steps: [
      "1. กดแท็บ 'Preview' → จะเห็นหน้าเว็บจริงแสดงในกรอบ",
      "2. กลับไปแท็บ 'Edit' แก้ข้อความ → Preview จะอัปเดตทันที (ไม่ต้อง Publish)",
      "3. สลับภาษาได้ที่ปุ่ม 🇬🇧 🇹🇭 🇯🇵 ในหน้า Preview",
      "4. เลือกขนาดจอ Desktop / Tablet / Mobile ได้",
      "5. กด 'Open' เพื่อเปิด Preview ในแท็บใหม่",
    ],
  },
  {
    id: "publish",
    icon: "🚀",
    title: "วิธี Publish (เผยแพร่)",
    steps: [
      "1. แก้ข้อความเสร็จ → ดู Preview ให้พอใจ",
      "2. กดปุ่ม 'Publish' ที่มุมล่างขวาของ Sanity Studio",
      "3. ข้อความจะอัปเดตบนเว็บจริงภายใน 1-2 นาที",
      "⚠️ ถ้ายังไม่กด Publish → ข้อความจะเป็นแค่ Draft (ฉบับร่าง) คนภายนอกจะยังไม่เห็น",
    ],
  },
  {
    id: "pages",
    icon: "📋",
    title: "รายละเอียดแต่ละหน้า",
    steps: [
      "🏠 หน้าแรก — หัวข้อ Hero, คำอธิบาย, ปุ่ม CTA, รายชื่อบริการ (5 ชิ้น)",
      "🏢 ข้อมูลบริษัท — ชื่อบริษัท, ที่อยู่, ทุนจดทะเบียน, ผู้แทน",
      "💻 IT System — หัวข้อ, บริการ 4 รายการ, Feature 4 รายการ",
      "📄 e-Tax — คำถาม Pain Points, เกี่ยวกับ e-Tax, ประโยชน์, กลไก, ลดต้นทุน",
      "📢 Marketing — หัวข้อ, Card 8 รายการ",
      "📊 MylogStar — ดูคู่มือข้อ 📊 ด้านล่าง",
      "🆕 New Release — หัวข้อ, ตารางต้นทุน, ผลิตภัณฑ์ 2 รายการ",
      "📞 ติดต่อเรา — หัวข้อ, ฟอร์ม, สำนักงาน",
    ],
  },
  {
    id: "mylogstar",
    icon: "📊",
    title: "MylogStar — วิธีแก้ข้อความ Accordion",
    steps: [
      "━━━━━ ส่วน Hero (ด้านบนสุดของหน้า) ━━━━━",
      "✏️ หัวข้อหน้า → ข้อความตัวใหญ่สุดในหน้า เช่น \"My Log Star\"",
      "✏️ คำอธิบายหน้า → ข้อความเล็กใต้หัวข้อ เช่น \"Enterprise log management...\"",
      "❓ Hero: คำถามเปิด → คำถามเปิด เช่น \"การจัดการ Log คืออะไร?\"",
      "📝 Hero: คำอธิบาย Log → ย่อหน้าที่อธิบายว่า Log คืออะไร",
      "",
      "━━━━━ กล่อง + ที่ 1: My log star (fileServer) ━━━━━",
      "📂 Acc1: ชื่อ → ชื่อหัวข้อที่แสดงบนปุ่ม + เช่น \"My log star\"",
      "❓ Acc1: คำถาม → คำถามข้างใน เช่น \"การจัดการ Log คืออะไร?\"",
      "📝 Acc1: อธิบาย → เนื้อหาข้างใน เช่น \"เมื่อคุณใช้คอมพิวเตอร์ ข้อมูลการใช้งาน...\"",
      "",
      "━━━━━ กล่อง + ที่ 2: MylogStar Features (desktop) ━━━━━",
      "📂 Acc2: ชื่อ → ชื่อหัวข้อบนปุ่ม เช่น \"MylogStar Features\"",
      "📝 Acc2: พลังในการเก็บ Log → ย่อหน้าแรก: อธิบายว่า MylogStar เก็บ Log ระดับ Kernel",
      "📝 Acc2: ความพร้อมใช้งาน Log → ย่อหน้าที่ 2: อธิบายว่า Log พร้อมใช้เมื่อต้องตรวจสอบ",
      "📝 Acc2: สนับสนุน Telework → ย่อหน้าที่ 3: อธิบายว่า Log ช่วยงาน telework ได้อย่างไร",
      "",
      "━━━━━ กล่อง + ที่ 3: My log Star FileServer (standalone) ━━━━━",
      "📂 Acc3: ชื่อ → ชื่อหัวข้อบนปุ่ม เช่น \"My log Star FileServer\"",
      "📝 Acc3: เนื้อหา FileServer → อธิบายว่า FileServer ตรวจสอบ access log อย่างไร",
      "",
      "━━━━━ กล่อง + ที่ 4: My log star (console) ━━━━━",
      "📂 Acc4: ชื่อ → ชื่อหัวข้อบนปุ่ม เช่น \"My log star\"",
      "📝 Acc4: แนะนำ Desktop → ย่อหน้า 1: แนะนำ MylogStar Desktop สำหรับ PC stand-alone",
      "📝 Acc4: การจัดการ Log → ย่อหน้า 2: ความสามารถเก็บ Log ของ Desktop",
      "📝 Acc4: Standalone Manager → ย่อหน้า 3: ระบบรวบรวม Log จากหลายเครื่อง",
      "📝 Acc4: คอนโซลจัดการ → ย่อหน้า 4: หน้าจอคอนโซลที่ใช้งานง่าย",
      "📝 Acc4: การควบคุมอุปกรณ์ USB → ย่อหน้า 5: ตั้งค่าสิทธิ์ USB / whitelist",
    ],
  },
];

export default function GuidePanel() {
  const [openId, setOpenId] = useState<string | null>("overview");

  return (
    <div
      style={{
        height: "100%",
        overflow: "auto",
        background: "linear-gradient(180deg, #f0f4ff 0%, #f8fafc 100%)",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          backdropFilter: "blur(10px)",
          background: "rgba(240,244,255,0.90)",
          borderBottom: "1px solid rgba(148,163,184,0.20)",
          padding: "16px 20px",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 950, color: "#0f172a" }}>
          📚 คู่มือการใช้งาน CMS
        </div>
        <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
          Japan System Thailand — ระบบจัดการเนื้อหาเว็บไซต์
        </div>
      </div>

      {/* Accordion guides */}
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        {GUIDES.map((g) => {
          const isOpen = openId === g.id;
          return (
            <div
              key={g.id}
              style={{
                borderRadius: 14,
                border: isOpen
                  ? "1px solid rgba(59,130,246,0.35)"
                  : "1px solid rgba(148,163,184,0.20)",
                background: "#fff",
                overflow: "hidden",
                boxShadow: isOpen ? "0 8px 30px rgba(59,130,246,0.10)" : "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 0.2s",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : g.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 16px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 20 }}>{g.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", flex: 1 }}>
                  {g.title}
                </span>
                <span style={{ fontSize: 16, color: "#94a3b8", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                  ▾
                </span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 16px 14px", borderTop: "1px solid rgba(148,163,184,0.12)" }}>
                  <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                    {g.steps.map((step, i) => {
                      if (step === "") return <div key={i} style={{ height: 4 }} />;
                      const isHeader = step.startsWith("━");
                      return (
                        <div
                          key={i}
                          style={{
                            fontSize: isHeader ? 11 : 12,
                            lineHeight: 1.7,
                            color: isHeader ? "#0f172a" : "#334155",
                            padding: isHeader ? "10px 12px" : "8px 12px",
                            borderRadius: 10,
                            background: isHeader ? "rgba(59,130,246,0.08)" : "rgba(241,245,249,0.7)",
                            border: isHeader ? "1px solid rgba(59,130,246,0.20)" : "1px solid rgba(148,163,184,0.12)",
                            fontWeight: isHeader ? 900 : 400,
                          }}
                        >
                          {step}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
