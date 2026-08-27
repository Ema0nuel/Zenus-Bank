import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig, siteUrl } from "@/lib/site";
import { AuthProvider } from "@/components/auth/auth-provider";
import { LanguageProvider } from "@/components/language-provider";

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

const anthropicSans = localFont({
  src: "../public/fonts/AnthropicSans-Variable.woff2",
  weight: "300 800",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.tagline
      ? `${siteConfig.name} - ${siteConfig.tagline}`
      : siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "banking",
    "finance",
    "digital bank",
    "premium banking",
    "modern bank",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  icons: {
    icon: "/images/logo-nobg.png",
    shortcut: "/images/logo-nobg.png",
    apple: "/images/logo-nobg.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
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
      className={`${anthropicSerif.variable} ${anthropicMono.variable} ${anthropicSans.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("zenus-theme");var d=t==="light"?false:t==="dark"?true:!window.matchMedia("(prefers-color-scheme: light)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){document.documentElement.classList.add("dark");}})();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <AuthProvider />
        <LanguageProvider />
        {children}
      </body>
    </html>
  );
}
