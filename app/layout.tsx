import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const anthropicSerif = localFont({
  src: [
    {
      path: "../public/fonts/AnthropicSerif-Regular.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/AnthropicSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AnthropicSerif-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

const anthropicMono = localFont({
  src: [
    {
      path: "../public/fonts/AnthropicMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AnthropicMono-Regular.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zenus Bank - Premium Banking Reimagined",
    template: "%s | Zenus Bank",
  },
  description:
    "Experience modern banking with Zenus. Secure, fast, and beautifully designed for the way you live.",
  keywords: [
    "banking",
    "finance",
    "digital bank",
    "premium banking",
    "modern bank",
  ],
  authors: [{ name: "Zenus Bank" }],
  creator: "Zenus Bank",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Zenus Bank",
    title: "Zenus Bank - Premium Banking Reimagined",
    description:
      "Experience modern banking with Zenus. Secure, fast, and beautifully designed for the way you live.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenus Bank - Premium Banking Reimagined",
    description:
      "Experience modern banking with Zenus. Secure, fast, and beautifully designed for the way you live.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anthropicSerif.variable} ${anthropicMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
