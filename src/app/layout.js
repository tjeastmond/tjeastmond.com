import "@/css/tj.style.css";
import meta from "@/app/metadata";
import { Nunito_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const font = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
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
