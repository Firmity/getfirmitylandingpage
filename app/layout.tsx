import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
// Self-hosted variable font (woff2 shipped in the package, no network
// fetch at build time) — see globals.css for the --font-fraunces token.
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "./globals.css";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://firmity.co";
// GTM container ID for firmity.co. Not secret (it ships in every page's
// HTML either way), so it's safe to default here; NEXT_PUBLIC_GTM_ID still
// overrides for staging/other envs.
const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-NGQHKRF7";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Firmity | Free AI Facility Health Assessment",
  description:
    "A certified surveyor inspects your property across 14 critical areas. Our AI turns it into a complete Facility Health Report in 10 minutes. 100% free, no sales call required.",
  openGraph: {
    title: "Firmity | Free AI Facility Health Assessment",
    description:
      "Find out the real health of your facility before it costs you. Free Facility Health Report in 10 minutes.",
    url: siteUrl,
    siteName: "Firmity",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Firmity | Free AI Facility Health Assessment",
    description: "Free Facility Health Report in 10 minutes. 100% free, no sales call required.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f9fc",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" id="top">
        {/* GTM — firmity.co container. See gtm-setup-react.md. */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>

        <BackgroundGradient />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
