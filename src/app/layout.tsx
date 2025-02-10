import type { Metadata } from "next";
import { Navigation } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: "ticz | Conference ticket generator",
  description: "Generate your tickets for you",
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-roboto min-h-svh space-y-8 p-6 text-white antialiased`}
      >
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
