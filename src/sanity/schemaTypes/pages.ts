import { defineField, defineType } from "sanity";

/* ─── Helper: 3 ภาษา ─── */
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

/* ══════ 🔗 Navbar / Footer / ส่วนกลาง ══════ */
export const sharedContent = defineType({
  name: "sharedContent", title: "🔗 Navbar / Footer / ข้อความส่วนกลาง", type: "document",
  fields: [
    tri("brand", "ชื่อแบรนด์ (Navbar)", "", { en: "Japan System Thailand" }),
    tri("navHome", "เมนู: Home", "", { en: "Home", th: "หน้าแรก", ja: "ホーム" }),
    tri("navSolution", "เมนู: Solution", "", { en: "Solution", th: "โซลูชัน", ja: "ソリューション" }),
    tri("navNewRelease", "เมนู: New Release", "", { en: "New Release", th: "ข่าวสาร/ผลิตภัณฑ์ใหม่", ja: "新製品" }),
    tri("navItSystem", "เมนู: IT System", "", { en: "IT System", th: "ระบบ IT", ja: "ITシステム" }),
    tri("navETax", "เมนู: e-Tax", "", { en: "e-Tax Invoice & e-Receipt", th: "e-Tax Invoice & e-Receipt" }),
    tri("navMarketing", "เมนู: Marketing", "", { en: "Marketing", th: "การตลาด", ja: "マーケティング" }),
    tri("navMyLogStar", "เมนู: MyLogStar", "", { en: "My Log Star" }),
    tri("navCompany", "เมนู: Company", "", { en: "Company", th: "ข้อมูลบริษัท", ja: "会社概要" }),
    tri("navContact", "เมนู: Contact", "", { en: "Contact", th: "ติดต่อเรา", ja: "お問い合わせ" }),
    tri("readMore", "ปุ่ม: READ MORE", "", { en: "READ MORE", th: "อ่านเพิ่มเติม", ja: "詳細を見る" }),
    tri("learnMore", "ปุ่ม: Learn more", "", { en: "Learn more", th: "ดูเพิ่มเติม", ja: "もっと見る" }),
    tri("send", "ปุ่ม: Send message", "", { en: "Send message", th: "ส่งข้อความ", ja: "送信" }),
    tri("copyright", "ลิขสิทธิ์ (Footer)", "", { en: "Copyright Japan System Co., Ltd. & Japan System (Thailand) Co., Ltd. All rights Reserved." }),
    tri("addressValue", "ที่อยู่บริษัท", "", { en: "28th Fl., 253 Asoke Building, Sukhumvit 21 Rd., Khlong Toei Nuea, Watthana, Bangkok 10110." }),
    tri("footerCompany", "Footer: Company Profile", "", { en: "Company Profile", th: "ข้อมูลบริษัท" }),
    tri("footerContact", "Footer: Contact", "", { en: "Contact", th: "ติดต่อเรา" }),
  ],
  preview: { prepare: () => ({ title: "🔗 Navbar / Footer / ข้อความส่วนกลาง" }) },
});

/* ══════ 🏠 หน้าแรก ══════ */
export const homePage = defineType({
  name: "homePage", title: "🏠 หน้าแรก", type: "document",
  fields: [
    tri("heroTitle", "✏️ หัวข้อใหญ่ (ตัวหนาบนรูปพื้นหลัง)", "ข้อความตัวใหญ่สีขาวตรงกลางรูปพื้นหลังหน้าแรก", {
      en: "We will help your company with DX (Digital Transformation).",
      th: "Japan System พร้อมช่วยเหลือบริษัทของคุณด้าน DX (Digital Transformation)",
      ja: "Japan System では貴社の DX（デジタルトランスフォーメーション）をお手伝いいたします。",
    }),
    tri("heroSubtitle", "✏️ คำอธิบายใต้หัวข้อใหญ่ (ตัวเล็กสีเทา)", "ข้อความตัวเล็กใต้หัวข้อบนรูปพื้นหลัง", {
      en: "Minimal, precise, and engineered for enterprise—system development, e-Tax solutions, and DX marketing.",
      th: "เรียบหรู แม่นยำ และออกแบบเพื่อองค์กร—พัฒนาระบบ, e-Tax และ DX/IT Marketing",
    }),
    tri("heroCtaPrimary", "ปุ่ม: Explore services", "", { en: "Explore services", th: "ดูบริการ", ja: "サービスを見る" }),
    tri("heroCtaSecondary", "ปุ่ม: Company profile", "", { en: "Company profile", th: "ข้อมูลบริษัท", ja: "会社概要" }),
    tri("servicesTitle", "✏️ หัวข้อ \"Our Service\"", "หัวข้อส่วนบริการที่อยู่ด้านล่างรูปพื้นหลัง", {
      en: "Our Service", th: "บริการของเรา", ja: "サービス",
    }),
    tri("svc1Title", "บริการ 1: IT System", "", { en: "IT System", th: "พัฒนาระบบ IT" }),
    tri("svc1Desc", "บริการ 1: คำอธิบาย", "", { en: "Custom software development and system integration solutions tailored to your business needs." }),
    tri("svc2Title", "บริการ 2: e-Tax Invoice & e-Receipt", "", { en: "e-Tax Invoice & e-Receipt" }),
    tri("svc2Desc", "บริการ 2: คำอธิบาย", "", { en: "Comprehensive tax management and compliance solutions for modern businesses." }),
    tri("svc3Title", "บริการ 3: Website & Online marketing", "", { en: "Website & Online marketing" }),
    tri("svc3Desc", "บริการ 3: คำอธิบาย", "", { en: "Digital transformation and IT marketing strategies to boost your online presence." }),
    tri("svc4Title", "บริการ 4: Mylogstar", "", { en: "Mylogstar" }),
    tri("svc4Desc", "บริการ 4: คำอธิบาย", "", { en: "Advanced security solutions and comprehensive logging systems for data protection." }),
    tri("svc5Title", "บริการ 5: New Release", "", { en: "New Release" }),
    tri("svc5Desc", "บริการ 5: คำอธิบาย", "", { en: "Expert consulting services to guide your digital transformation journey." }),
  ],
  preview: { prepare: () => ({ title: "🏠 หน้าแรก" }) },
});

/* ══════ 🏢 ข้อมูลบริษัท ══════ */
export const companyPage = defineType({
  name: "companyPage", title: "🏢 ข้อมูลบริษัท", type: "document",
  fields: [
    tri("pageTitle", "✏️ หัวข้อหน้า", "", { en: "Company Profile", th: "ข้อมูลบริษัท Japan System (Thailand)", ja: "会社概要" }),
    tri("pageSubtitle", "✏️ คำอธิบายใต้หัวข้อ", "", { en: "A calm, precise presence in Thailand—delivering Japanese-quality execution with local expertise." }),
    tri("aboutTitle", "หัวข้อ: About Our Company", "", { en: "About Our Company", th: "เกี่ยวกับบริษัท", ja: "会社について" }),
    triLong("aboutBody", "เนื้อหา: เกี่ยวกับบริษัท", "", { en: "Japan System (Thailand) Co., Ltd. provides high-quality IT solutions, leveraging Japanese precision with local expertise." }),
    tri("infoTitle", "หัวข้อ: Corporate Information", "", { en: "Corporate Information", th: "ข้อมูลนิติบุคคล" }),
    tri("infoCompanyName", "ชื่อบริษัท", "", { en: "Japan System Co., Ltd. & Japan System (Thailand) Co., Ltd." }),
    tri("infoAddress", "ที่อยู่", "", { en: "28th Fl., 253 Asoke Building, Sukhumvit 21 Rd., Khlong Toei Nuea, Watthana, Bangkok 10110." }),
    tri("infoEstablishment", "ก่อตั้ง", "", { en: "2015/12" }),
    tri("infoCapital", "ทุนจดทะเบียน", "", { en: "2,000,000 THB" }),
    tri("infoRepresentative", "ผู้แทน", "", { en: "Tsubasa Hoshino" }),
  ],
  preview: { prepare: () => ({ title: "🏢 ข้อมูลบริษัท" }) },
});

/* ══════ 💻 IT System ══════ */
export const itSystemPage = defineType({
  name: "itSystemPage", title: "💻 IT System", type: "document",
  fields: [
    tri("pageTitle", "✏️ หัวข้อหน้า", "", { en: "IT System", th: "โซลูชันระบบ IT", ja: "ITシステム" }),
    tri("pageSubtitle", "✏️ คำอธิบายใต้หัวข้อ", "", { en: "Feature-rich solutions delivered with thin-line precision." }),
    tri("productsTitle", "หัวข้อ: Products / Services", "", { en: "Products / Services", th: "ผลิตภัณฑ์ / บริการ" }),
    tri("svcItem1", "บริการ: Maintenance", "", { en: "Maintenance", th: "บำรุงรักษาระบบ" }),
    tri("svcItem2", "บริการ: Website & Online Marketing", "", { en: "Website & Online Marketing" }),
    tri("svcItem3", "บริการ: IT Support & Help Desk", "", { en: "IT Support & Help Desk" }),
    tri("svcItem4", "บริการ: Product Management System", "", { en: "Product Management System" }),
    tri("feat1Title", "Feature: Web Application", "", { en: "Web Application" }),
    tri("feat1Desc", "Feature: Web Application คำอธิบาย", "", { en: "Scalable app delivery for modern enterprises." }),
    tri("feat2Title", "Feature: Mobile & Tablet", "", { en: "Mobile & Tablet" }),
    tri("feat2Desc", "Feature: Mobile & Tablet คำอธิบาย", "", { en: "High-quality UX across devices and contexts." }),
    tri("feat3Title", "Feature: Integration", "", { en: "Integration" }),
    tri("feat3Desc", "Feature: Integration คำอธิบาย", "", { en: "APIs, ERP, and workflow automation that fit." }),
    tri("feat4Title", "Feature: Cloud & DevOps", "", { en: "Cloud & DevOps" }),
    tri("feat4Desc", "Feature: Cloud & DevOps คำอธิบาย", "", { en: "Reliable CI/CD and infrastructure foundations." }),
  ],
  preview: { prepare: () => ({ title: "💻 IT System" }) },
});

/* ══════ 📄 e-Tax Invoice & e-Receipt and Digital Signature ══════ */
export const eTaxPage = defineType({
  name: "eTaxPage", title: "📄 e-Tax Invoice & e-Receipt and Digital Signature", type: "document",
  fields: [
    tri("pageTitle", "✏️ หัวข้อหน้า (บน Hero)", "", { en: "E-Tax Invoice & E-Receipt" }),
    tri("painHeading", "✏️ คำถาม Pain Points (ตัวหนาใหญ่)", "ข้อความคำถามก่อน Pain Points", {
      en: "Are you wasting your time on handwritten signatures on various documents?",
    }),
    tri("painItem1", "Pain 1", "", { en: "Too many documents to sign" }),
    tri("painItem2", "Pain 2", "", { en: "Sometimes I have to go to the office just for one document" }),
    tri("painItem3", "Pain 3", "", { en: "The time to sign has become a burden on my work" }),
    tri("painItem4", "Pain 4", "", { en: "Get tired when signing" }),
    tri("painItem5", "Pain 5", "", { en: "Very troublesome because it is a sign of many" }),
    tri("aboutTitle", "✏️ หัวข้อ: About e-Tax...", "", {
      en: "About e-Tax Invoice & e-Receipt and Digital Signature",
    }),
    triLong("aboutDesc", "เนื้อหา: About e-Tax...", "", {
      en: "In Japan System We support the introduction of e-Tax invoice & e-Receipt and digital signatures, one of the nine DX measures promoted by the Thai Revenue Service.",
    }),
    tri("defEtaxTitle", "หัวข้อ: What is e-Tax Invoice & e-Receipt?", "", { en: "What is e-Tax Invoice & e-Receipt?" }),
    triLong("defEtaxDesc", "เนื้อหา: What is e-Tax...", "", {
      en: "Refers to the use of tax invoices, electronic receipts, and digital signatures. Automatic date and time stamp.",
    }),
    tri("defSigTitle", "หัวข้อ: What is a digital signature?", "", { en: "What is a digital signature?" }),
    triLong("defSigDesc", "เนื้อหา: What is a digital signature?", "", {
      en: "Digital signature and electronic signatures it is the information attached to the Invoice & Tax Invoice document sent to show the identity of the sender of the document. Not just placing a picture signature on the tax invoice but it also uses digital technology to prevent unauthorized use, signatures that enhance security and convenience with data encryption technology, including time stamps, etc.",
    }),
    tri("benefitsTitle", "หัวข้อ: Benefits", "", { en: "Benefits of introducing e-Tax Invoice & e-Receipt and digital signatures" }),
    tri("benefit1", "ประโยชน์ 1", "", { en: "Saving tax invoices on your own server or cloud server allows you to secure storage and without the risk of document loss." }),
    tri("benefit2", "ประโยชน์ 2", "", { en: "Copies of certifications are stored on the IRS server. (Tax office)" }),
    tri("benefit3", "ประโยชน์ 3", "", { en: "There is no need to go to the office and sign." }),
    tri("benefit4", "ประโยชน์ 4", "", { en: "Eliminate the risk of misuse of signatures by clarifying who signed when and being able to verify them clearly." }),
    tri("mechanismTitle", "หัวข้อ: Mechanism (แผนภาพ)", "", { en: "e-Tax Invoice & e-Receipt and Digital Signature Mechanism" }),
    tri("introTitle", "หัวข้อ: การนำมาใช้", "", { en: "For the introduction of e-Tax Invoice & e-Receipt and digital signatures," }),
    triLong("introDesc", "เนื้อหา: การนำมาใช้", "", {
      en: "In addition to the application process for various services It is also necessary to introduce (and build) a system that meets the requirements of the Thai Revenue Office, Japan System, operates everything from the application process to the introduction and processing of tax invoices, electronic receipts, and also digital signatures on electronic documents.",
    }),
    tri("costTitle", "หัวข้อ: Cost reduction example", "", { en: "Cost reduction example by introducing e-Tax Invoice & e-Receipt" }),
    tri("costSubtitle", "Tax Invoice (Paper medium)", "", { en: "Tax Invoice (Paper medium)" }),
    tri("costMonthlyLabel", "ต้นทุนรายเดือน", "", { en: "Monthly cost when the circulation is 1,000 copies / month" }),
    tri("costMonthlyValue", "ค่าใช้จ่ายรายเดือน", "", { en: "39.82 Baht × 1,000 = 39,820 Baht / month" }),
    tri("costMonthlyReduction", "ข้อความลดต้นทุน (ตัวแดงใหญ่)", "", { en: "Monthly 39,820 baht + labor cost reduction!" }),
    tri("contactBtn", "ปุ่ม: Contact", "", { en: "Contact", th: "ติดต่อเรา" }),
  ],
  preview: { prepare: () => ({ title: "📄 e-Tax Invoice & e-Receipt and Digital Signature" }) },
});

/* ══════ 📢 Marketing ══════ */
export const marketingPage = defineType({
  name: "marketingPage", title: "📢 Marketing", type: "document",
  fields: [
    tri("pageTitle", "✏️ หัวข้อหน้า", "", { en: "Marketing", th: "การตลาด", ja: "マーケティング" }),
    tri("pageSubtitle", "✏️ คำอธิบาย", "", { en: "Modern DX and IT marketing services—presented as a refined masonry gallery." }),
    tri("heroTitle", "หัวข้อ Hero (ตัวหนาใหญ่)", "", { en: "Website and Online Marketing" }),
    tri("cardWebsite", "หมวด: Website", "", { en: "Website", th: "เว็บไซต์" }),
    tri("cardOnlineMkt", "หมวด: Online Marketing", "", { en: "Online Marketing", th: "การตลาดออนไลน์" }),
    tri("card1", "Card: DX Strategy", "", { en: "DX Strategy" }),
    tri("card2", "Card: MarTech Stack", "", { en: "MarTech Stack" }),
    tri("card3", "Card: Content Systems", "", { en: "Content Systems" }),
    tri("card4", "Card: Performance Ads", "", { en: "Performance Ads" }),
    tri("card5", "Card: SEO & Technical", "", { en: "SEO & Technical" }),
    tri("card6", "Card: Analytics & BI", "", { en: "Analytics & BI" }),
    tri("card7", "Card: CRM Journeys", "", { en: "CRM Journeys" }),
    tri("card8", "Card: Brand + Product", "", { en: "Brand + Product" }),
  ],
  preview: { prepare: () => ({ title: "📢 Marketing" }) },
});
