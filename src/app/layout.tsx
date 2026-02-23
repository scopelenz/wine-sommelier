import type { Metadata, Viewport } from "next";
import Navigation from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pour — Your Sommelier, Always On",
  description:
    "AI-powered wine companion. Scan labels, read wine lists, get instant sommelier-grade advice.",
  keywords: ["wine", "sommelier", "AI", "label scanner", "wine list", "pairing"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#722F37",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="mx-auto min-h-screen max-w-lg pb-24">
          <main>{children}</main>
        </div>
        <Navigation />
      </body>
    </html>
  );
}
