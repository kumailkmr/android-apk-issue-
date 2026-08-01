import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AndroidFrame } from "@/components/layout/AndroidFrame";
import { DesktopApkPanel } from "@/components/layout/DesktopApkPanel";

export const metadata: Metadata = {
  title: "Anjuman Shari e Shian Digital Platform",
  description: "Unified digital services for Islamic education, welfare and community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 min-h-screen flex items-center justify-center p-2 sm:p-4">
        <LanguageProvider>
          <div className="flex items-center justify-center gap-8 w-full max-w-6xl mx-auto">
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
