import "@/css/tj.style.css";
import meta from "@/app/metadata";
import { Nunito_Sans } from "next/font/google";

const font = Nunito_Sans({
  // fallback: ["Helvetica", "sans-serif"],
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata = meta;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={font.className}>{children}</body>
    </html>
  );
}
