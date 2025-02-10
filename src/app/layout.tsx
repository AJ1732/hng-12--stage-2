import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ticz | Conference ticket generator",
  description: "Generate your tickets for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-roboto min-h-svh text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
