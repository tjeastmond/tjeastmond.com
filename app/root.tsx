import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import "@styles/global.css";

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    href: "/fonts/cormorant-garamond/cormorant-garamond-400.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/fonts/cormorant-garamond/cormorant-garamond-400-italic.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/fonts/cormorant-garamond/cormorant-garamond-600-italic.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/fonts/geist-mono/geist-mono-500.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/fonts/geist-mono/geist-mono-600.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  { rel: "stylesheet", href: "/fonts/fonts.css" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/images/icons/favicon-16x16.png" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/images/icons/favicon-32x32.png" },
  { rel: "shortcut icon", href: "/images/icons/favicon.ico" },
  {
    rel: "apple-touch-icon",
    href: "/images/icons/apple-touch-icon.png",
    sizes: "180x180",
    type: "image/png",
  },
  { rel: "mask-icon", href: "/images/icons/safari-pinned-tab.svg", color: "#da532c" },
  { rel: "manifest", href: "/images/icons/site.webmanifest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f5f2eb" />
        <meta name="application-name" content="tjeastmond.com" />
        <meta
          name="keywords"
          content="TJ Eastmond, TJ, T.J. Eastmond, tjeastmond, Architect for the Modern Web, Software Engineer, Engineering, Design Portfolio, GitHub"
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Outlet />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
  }

  return (
    <div className="content">
      <h1>{message}</h1>
      <p>{details}</p>
    </div>
  );
}
