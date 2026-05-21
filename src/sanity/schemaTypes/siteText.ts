import { defineField, defineType } from "sanity";

export const siteText = defineType({
  name: "siteText",
  title: "📝 เนื้อหาเว็บไซต์",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "หน้าที่ใช้",
      type: "string",
      description: "เลือกหน้าที่ต้องการแก้ข้อความ",
      options: {
        list: [
          { title: "🏠 หน้าแรก (Homepage)", value: "home" },
          { title: "🏢 ข้อมูลบริษัท (Company Profile)", value: "company-profile" },
          { title: "💻 IT System", value: "it-system" },
          { title: "📄 E-Tax", value: "e-tax" },
          { title: "📢 Marketing", value: "marketing" },
          { title: "📊 MylogStar", value: "my-log-star" },
          { title: "🧾 Invoice & E-Receipt", value: "invoice-e-receipt" },
          { title: "🆕 New Release", value: "new-release" },
          { title: "📞 ติดต่อเรา (Contact)", value: "contact" },
          { title: "🔗 ใช้ทุกหน้า (Shared)", value: "shared" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "ชื่อเนื้อหา",
      type: "string",
      description: "ตั้งชื่อเพื่อให้จำง่าย เช่น 'หัวข้อหลัก', 'คำอธิบายบริการ'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "ตำแหน่งบนหน้าเว็บ",
      type: "string",
      description: "เลือกว่าข้อความนี้จะแสดงตรงไหนของหน้าเว็บ",
      options: {
        list: [
          { title: "หัวข้อหลัก (Hero Title)", value: "hero-title" },
          { title: "คำอธิบายหลัก (Hero Subtitle)", value: "hero-subtitle" },
          { title: "ข้อความทั่วไป (General)", value: "general" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "contentTh",
      title: "🇹🇭 ภาษาไทย",
      type: "text",
      rows: 4,
      description: "เนื้อหาภาษาไทย",
    }),
    defineField({
      name: "contentEn",
      title: "🇬🇧 English",
      type: "text",
      rows: 4,
      description: "เนื้อหาภาษาอังกฤษ",
    }),
    defineField({
      name: "contentJa",
      title: "🇯🇵 日本語",
      type: "text",
      rows: 4,
      description: "เนื้อหาภาษาญี่ปุ่น",
    }),
  ],
  orderings: [
    {
      title: "ตามหน้า",
      name: "pageAsc",
      by: [{ field: "page", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "page",
    },
    prepare({ title, subtitle }) {
      const pageNames: Record<string, string> = {
        home: "🏠 หน้าแรก",
        "company-profile": "🏢 ข้อมูลบริษัท",
        "it-system": "💻 IT System",
        "e-tax": "📄 E-Tax",
        marketing: "📢 Marketing",
        "my-log-star": "📊 MylogStar",
        "invoice-e-receipt": "🧾 Invoice",
        "new-release": "🆕 New Release",
        contact: "📞 ติดต่อเรา",
        shared: "🔗 ทุกหน้า",
      };
      return {
        title: title || "ยังไม่ได้ตั้งชื่อ",
        subtitle: pageNames[subtitle] || subtitle,
      };
    },
  },
});
