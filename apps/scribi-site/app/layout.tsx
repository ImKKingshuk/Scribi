import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scribi – Developer-First WYSIWYG Editor for React",
  description:
    "A feature-rich, customizable, and framework-agnostic rich text editor for React. No vendor lock-in. No forced features. Use any storage provider.",
  keywords: [
    "react editor",
    "wysiwyg",
    "rich text editor",
    "tiptap",
    "typescript",
    "markdown",
    "notion-like editor",
  ],
  authors: [{ name: "ImKKingshuk" }],
  openGraph: {
    title: "Scribi – Developer-First WYSIWYG Editor for React",
    description:
      "A feature-rich, customizable, and framework-agnostic rich text editor for React.",
    type: "website",
    url: "https://scribi.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribi – Developer-First WYSIWYG Editor for React",
    description:
      "A feature-rich, customizable, and framework-agnostic rich text editor for React.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
