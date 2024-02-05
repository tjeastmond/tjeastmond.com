import "@/css/static.css";
import meta from "@/app/metadata";
import { Source_Code_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

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
      </body>
    </html>
  );
}
