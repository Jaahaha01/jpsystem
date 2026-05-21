import { defineField, defineType } from "sanity";

/* ─── Helpers ─── */
function tri(name: string, title: string, desc: string, ph?: { en?: string; th?: string; ja?: string }) {
  return defineField({ name, title, type: "object", description: desc, fields: [
    defineField({ name: "en", title: "🇬🇧 EN", type: "text", rows: 3, placeholder: ph?.en || "" }),
    defineField({ name: "th", title: "🇹🇭 TH", type: "text", rows: 3, placeholder: ph?.th || "" }),
    defineField({ name: "ja", title: "🇯🇵 JP", type: "text", rows: 3, placeholder: ph?.ja || "" }),
  ], options: { collapsible: true, collapsed: false } });
}
function triLong(name: string, title: string, desc: string, ph?: { en?: string; th?: string; ja?: string }) {
  return defineField({ name, title, type: "object", description: desc, fields: [
    defineField({ name: "en", title: "🇬🇧 EN", type: "text", rows: 8, placeholder: ph?.en || "" }),
    defineField({ name: "th", title: "🇹🇭 TH", type: "text", rows: 8, placeholder: ph?.th || "" }),
    defineField({ name: "ja", title: "🇯🇵 JP", type: "text", rows: 8, placeholder: ph?.ja || "" }),
  ], options: { collapsible: true, collapsed: true } });
}

/* ══════ 📊 MylogStar ══════ */
export const myLogStarPage = defineType({
  name: "myLogStarPage", title: "📊 MylogStar", type: "document",
  fields: [
    tri("pageTitle", "✏️ หัวข้อหน้า", "", { en: "My Log Star" }),
    tri("pageSubtitle", "✏️ คำอธิบายใต้หัวข้อ", "", { en: "Enterprise log management with deep technical clarity." }),
    tri("heroTitle", "✏️ หัวข้อ Hero", "", { en: "My log star" }),
    triLong("heroDesc", "✏️ เนื้อหาหลัก Hero (ข้อความยาว)", "", {
      en: "What is log management? When you use a personal computer, information such as what software you used and which file you opened is recorded on your computer... (logs) contains a great deal of information, and a closer look reveals who, when, and what they were doing on their computer.",
    }),
    tri("featureTitle", "หัวข้อ: MylogStar Features", "", { en: "MylogStar Features" }),
    tri("featLogTitle", "Feature: Log collection power", "", { en: "Log collection power" }),
    tri("featLogDesc", "Feature: Log collection คำอธิบาย", "", { en: "Acquires logs at the kernel level of the OS, grasping operations that cannot be acquired by other log management products." }),
    tri("featAvailTitle", "Feature: Log availability", "", { en: "Log availability" }),
    tri("featAvailDesc", "Feature: Log availability คำอธิบาย", "", { en: "Highly accurate logs for information leakage countermeasures and business improvement." }),
    // Accordion 1: My log star
    tri("acc1Title", "📂 Accordion 1 — ชื่อหัวข้อ", "ปุ่มกดเปิด-ปิดแรก", { en: "My log star" }),
    triLong("acc1Content", "📂 Accordion 1 — เนื้อหาข้างใน", "เรื่อง log management คืออะไร", {
      en: "What is log management?\nWhen you use a personal computer, information such as what software you used and which file you opened is recorded on your computer. Also, when you visit a website using the Internet, you can keep a record of which page you visited on what day of the month.",
    }),
    // Accordion 2: MylogStar Features
    tri("acc2Title", "📂 Accordion 2 — ชื่อหัวข้อ", "", { en: "MylogStar Features" }),
    triLong("acc2Content", "📂 Accordion 2 — เนื้อหาข้างใน", "Log collection power, Log availability, Telework", {
      en: "Log collection power\nWhen managing logs, if the necessary logs cannot be collected, they cannot be saved or analyzed as a trail. MylogStar acquires logs at the kernel level of the OS...\n\nLog management to Support telework\nFrom security measures to business improvement with MylogStar",
    }),
    // Accordion 3: My log Star FileServer
    tri("acc3Title", "📂 Accordion 3 — ชื่อหัวข้อ", "", { en: "My log Star FileServer" }),
    triLong("acc3Content", "📂 Accordion 3 — เนื้อหาข้างใน", "FileServer monitoring, access log, audit log", {
      en: "Pinpoint monitoring of important servers Low price & high functionality! File server access log / audit log management\n\nLog monitoring is indispensable for measures against information leakage...",
    }),
    // Accordion 4: My log star (Desktop)
    tri("acc4Title", "📂 Accordion 4 — ชื่อหัวข้อ", "", { en: "My log star" }),
    triLong("acc4Content", "📂 Accordion 4 — เนื้อหาข้างใน", "Desktop — Log management & device control", {
      en: 'My log Star Desktop — "Log management" & "device control" that can be done immediately on a stand-alone PC or a small base...',
    }),
    // Chips
    tri("chip1", "Chip: SIEM-ready", "", { en: "SIEM-ready" }),
    tri("chip2", "Chip: Audit trails", "", { en: "Audit trails" }),
    tri("chip3", "Chip: Retention policies", "", { en: "Retention policies" }),
    tri("chip4", "Chip: Role-based access", "", { en: "Role-based access" }),
    // Details
    tri("det1Title", "Detail: Architecture", "", { en: "Architecture" }),
    tri("det1Desc", "Detail: Architecture คำอธิบาย", "", { en: "Designed for predictable ingestion pipelines and structured indexing with secure access boundaries." }),
    tri("det2Title", "Detail: Compliance", "", { en: "Compliance" }),
    tri("det2Desc", "Detail: Compliance คำอธิบาย", "", { en: "Retention, immutability options, and exportability—built for real-world audit requirements." }),
    tri("det3Title", "Detail: Performance", "", { en: "Performance" }),
    tri("det3Desc", "Detail: Performance คำอธิบาย", "", { en: "Optimized querying patterns and dashboards for fast incident triage and reporting." }),
  ],
  preview: { prepare: () => ({ title: "📊 MylogStar" }) },
});

/* ══════ 🆕 New Release ══════ */
export const newReleasePage = defineType({
  name: "newReleasePage", title: "🆕 New Release", type: "document",
  fields: [
    tri("pageTitle", "✏️ หัวข้อหน้า", "", { en: "New Release", th: "ผลิตภัณฑ์ใหม่", ja: "新発売" }),
    tri("pageSubtitle", "✏️ คำอธิบาย", "", { en: "Clean, focused product updates with enterprise polish." }),
    tri("eTaxHeading", "หัวข้อ: e-Tax", "", { en: "Refers to the use of tax invoices," }),
    tri("taxInvoiceSubtitle", "หัวข้อ: Tax Invoice (Paper medium)", "", { en: "Tax Invoice (Paper medium)" }),
    tri("monthlyCostLabel", "ต้นทุนรายเดือน: หัวข้อ", "", { en: "Monthly cost when the circulation is 1,000 copies / month" }),
    tri("monthlyCostValue", "ต้นทุนรายเดือน: ค่า", "", { en: "39.82 Baht x 1,000 = 39,820 Baht / month" }),
    tri("monthlyCostReduction", "ข้อความลดต้นทุน (ตัวแดง)", "", { en: "Monthly 39,820 baht + labor cost reduction!" }),
    tri("product1Name", "ผลิตภัณฑ์ 1: e-Tax", "", { en: "e-Tax" }),
    tri("product1Desc", "ผลิตภัณฑ์ 1: คำอธิบาย", "", { en: "A modern problem-solution workflow for tax digitization and cost reduction." }),
    tri("product2Name", "ผลิตภัณฑ์ 2: My Log Star", "", { en: "My Log Star" }),
    tri("product2Desc", "ผลิตภัณฑ์ 2: คำอธิบาย", "", { en: "A secure log management platform—designed for compliance and deep technical visibility." }),
  ],
  preview: { prepare: () => ({ title: "🆕 New Release" }) },
});

/* ══════ 📞 ติดต่อเรา ══════ */
export const contactPage = defineType({
  name: "contactPage", title: "📞 ติดต่อเรา", type: "document",
  fields: [
    tri("pageTitle", "✏️ หัวข้อหน้า", "", { en: "Contact Us", th: "ติดต่อเรา", ja: "お問い合わせ" }),
    tri("pageSubtitle", "✏️ คำอธิบาย", "", { en: "If you have any questions or inquiries, please feel free to contact us." }),
    tri("formTitle", "ฟอร์ม: Send us a message", "", { en: "Send us a message", th: "ส่งข้อความถึงเรา" }),
    tri("formCompanyName", "ฟอร์ม: Company Name", "", { en: "Company Name", th: "ชื่อบริษัท" }),
    tri("formName", "ฟอร์ม: Name", "", { en: "Name", th: "ชื่อ" }),
    tri("formEmail", "ฟอร์ม: Email", "", { en: "Email", th: "อีเมล" }),
    tri("formSubject", "ฟอร์ม: Subject", "", { en: "Subject", th: "หัวข้อ" }),
    tri("formMessage", "ฟอร์ม: Message", "", { en: "Message", th: "ข้อความ" }),
    tri("formNote", "ฟอร์ม: หมายเหตุ", "", { en: "We'll respond within 1–2 business days." }),
    tri("officeTitle", "สำนักงาน: Office", "", { en: "Office", th: "สำนักงาน" }),
    tri("officeLine1", "สำนักงาน: Asoke, Bangkok", "", { en: "Asoke, Bangkok", th: "อโศก กรุงเทพฯ" }),
    tri("officeLine2", "สำนักงาน: Mon–Fri, 09:00–18:00", "", { en: "Mon–Fri, 09:00–18:00" }),
  ],
  preview: { prepare: () => ({ title: "📞 ติดต่อเรา" }) },
});
