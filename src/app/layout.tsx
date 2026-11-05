import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUNOR | Scandinavian Furniture",
  description: "Timeless Design, Contemporary Living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}