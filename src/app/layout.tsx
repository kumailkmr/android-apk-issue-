import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AndroidFrame } from "@/components/layout/AndroidFrame";
import { DesktopApkPanel } from "@/components/layout/DesktopApkPanel";

export const metadata: Metadata = {
  title: "Anjuman Shari e Shian Digital Platform",
  description: "Unified digital services for Islamic education, welfare and community",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 min-h-screen w-full overflow-x-hidden p-0 m-0">
        <LanguageProvider>
          <div className="w-full min-h-screen flex flex-col bg-surface relative overflow-x-hidden">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
