import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "🏠 หน้าแรก (Homepage)",
  type: "document",
  fields: [
    // ─── Hero Section ───
    defineField({
      name: "heroTitle",
      title: "ข้อความหัวข้อใหญ่ (บนรูปพื้นหลัง)",
      type: "object",
      description: "ข้อความตัวใหญ่ที่อยู่ตรงกลางรูปพื้นหลังหน้าแรก",
      fields: [
        defineField({ name: "th", title: "🇹🇭 ไทย", type: "text", rows: 2 }),
        defineField({ name: "en", title: "🇬🇧 English", type: "text", rows: 2 }),
        defineField({ name: "ja", title: "🇯🇵 日本語", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "heroSubtitle",
      title: "คำอธิบายใต้หัวข้อ (บนรูปพื้นหลัง)",
      type: "object",
      description: "ข้อความตัวเล็กที่อยู่ใต้หัวข้อใหญ่",
      fields: [
        defineField({ name: "th", title: "🇹🇭 ไทย", type: "text", rows: 2 }),
        defineField({ name: "en", title: "🇬🇧 English", type: "text", rows: 2 }),
        defineField({ name: "ja", title: "🇯🇵 日本語", type: "text", rows: 2 }),
      ],
    }),

    // ─── Services Section ───
    defineField({
      name: "servicesTitle",
      title: "หัวข้อส่วนบริการ (Our Service)",
      type: "object",
      description: "หัวข้อของส่วนบริการด้านล่าง",
      fields: [
        defineField({ name: "th", title: "🇹🇭 ไทย", type: "string" }),
        defineField({ name: "en", title: "🇬🇧 English", type: "string" }),
        defineField({ name: "ja", title: "🇯🇵 日本語", type: "string" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "🏠 หน้าแรก (Homepage)" };
    },
  },
});
