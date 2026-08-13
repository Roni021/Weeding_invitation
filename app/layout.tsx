import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anindita & Rocky | Wedding Invitation",
  description: "Join us as we celebrate the beginning of our forever.",
  openGraph: {
    title: "Anindita & Rocky | Wedding Invitation",
    description: "Join us as we celebrate the beginning of our forever.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
