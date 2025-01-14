import meta from "@app/metadata";
import "@styles/hack.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Viewport } from "next";
import { Source_Code_Pro } from "next/font/google";
import CSPostHogProvider from "./posthog";

export const viewport: Viewport = {
  themeColor: "#1d1e22",
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
        <CSPostHogProvider>{children}</CSPostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
