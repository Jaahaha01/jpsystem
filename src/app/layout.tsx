import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ShellWrapper } from "@/components/ShellWrapper";
import { ImageConfigProvider } from "@/components/ImageConfigProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Japan System Thailand",
    template: "%s | Japan System Thailand",
  },
  description:
    "High-end corporate website for Japan System Thailand — IT systems, e-Tax, and DX marketing solutions.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Japan System Thailand",
    description:
      "Modern Japanese Zen corporate site — IT solutions, e-Tax, and DX marketing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSansJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-sky-100 selection:text-slate-900">
        <LanguageProvider>
          <ImageConfigProvider>
            <ShellWrapper>{children}</ShellWrapper>
          </ImageConfigProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

