import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio | Japan System Thailand CMS",
  description: "Content management studio for Japan System Thailand website",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        // Studio needs full viewport height
        height: "100vh",
        maxHeight: "100vh",
        overflow: "auto",
        width: "100vw",
      }}
    >
      {children}
    </div>
  );
}
