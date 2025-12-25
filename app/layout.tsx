import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickTalk - 상황 기반 즉시 소통 서비스",
  description: "상황만 선택하면 바로 쓸 수 있는 문장",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

