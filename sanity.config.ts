"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schemaTypes";
import IframePreview from "./src/sanity/previews/IframePreview";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

const pages = [
  { id: "homePage", title: "🏠 หน้าแรก", url: "/" },
  { id: "companyPage", title: "🏢 ข้อมูลบริษัท", url: "/company-profile" },
  { id: "itSystemPage", title: "💻 IT System", url: "/it-system" },
  { id: "eTaxPage", title: "📄 e-Tax Invoice & e-Receipt and Digital Signature", url: "/e-tax" },
  { id: "marketingPage", title: "📢 Marketing", url: "/marketing" },
  { id: "myLogStarPage", title: "📊 MylogStar", url: "/my-log-star" },
  { id: "newReleasePage", title: "🆕 New Release", url: "/new-release" },
  { id: "contactPage", title: "📞 ติดต่อเรา", url: "/contact" },
];

export default defineConfig({
  name: "japan-system-thailand",
  title: "Japan System Thailand CMS",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .id("root")
          .title("จัดการเนื้อหาเว็บไซต์")
          .items([
            // Shared content
            S.listItem()
              .id("sharedContent")
              .title("🔗 Navbar / Footer / ส่วนกลาง")
              .child(
                S.document()
                  .schemaType("sharedContent")
                  .documentId("sharedContent")
                  .views([
                    S.view.form().id("edit-form").title("Edit"),
                  ])
              ),
            S.divider(),
            // Page content
            S.listItem()
              .id("pages-header")
              .title("แก้ข้อความแต่ละหน้า")
              .child(
                S.list()
                  .id("pages-list")
                  .title("เลือกหน้าที่ต้องการแก้ไข")
                  .items(
                    pages.map((page) =>
                      S.listItem()
                        .id(page.id)
                        .title(page.title)
                        .child(
                          S.document()
                            .schemaType(page.id)
                            .documentId(page.id)
                            .views([
                              S.view.form().id("edit-form").title("Edit"),
                              S.view
                                .component(IframePreview)
                                .id("preview-pane")
                                .title("Preview")
                                .options({ previewUrl: page.url }),
                            ])
                        )
                    )
                  )
              ),
            S.divider(),
            // Images
            S.listItem()
              .id("siteImages")
              .title("🖼️ รูปภาพเว็บไซต์")
              .child(S.documentTypeList("siteImage").title("รูปภาพทั้งหมด")),
          ]),
    }),
    visionTool({ defaultApiVersion: "2026-05-06" }),
  ],
  schema,
});
