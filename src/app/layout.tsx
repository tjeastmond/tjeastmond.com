import "@styles/hack.css";
import meta from "@app/metadata";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Viewport } from "next";
import { Source_Code_Pro } from "next/font/google";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffcf7" },
    { media: "(prefers-color-scheme: dark)", color: "#fffcf7" },
  ],
};

const font = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = meta;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={font.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
