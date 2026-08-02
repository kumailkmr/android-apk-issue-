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
      <body className="antialiased bg-slate-50 lg:bg-slate-950 min-h-screen flex items-center justify-center p-0 m-0 overflow-x-hidden">
        <LanguageProvider>
          <div className="flex items-center justify-center gap-8 w-full max-w-full lg:max-w-6xl mx-auto min-h-screen p-0 m-0">
            <AndroidFrame>
              {children}
            </AndroidFrame>
            <DesktopApkPanel />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
