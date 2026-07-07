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
  title: "Ak.dev | Full-Stack Developer",
  description: "Full-Stack Developer building scalable web applications and cloud-native solutions. Specializing in React, Node.js, AWS, and modern web technologies.",
  keywords: ["Full-Stack Developer", "Web Developer", "React", "Node.js", "TypeScript", "AWS", "Cloud", "Portfolio"],
  authors: [{ name: "Ak" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Ak.dev | Full-Stack Developer",
    description: "Full-Stack Developer building scalable web applications and cloud-native solutions.",
    url: "https://ak.dev",
    siteName: "Ak.dev Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ak.dev | Full-Stack Developer",
    description: "Full-Stack Developer building scalable web applications and cloud-native solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
