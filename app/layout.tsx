import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tradeshowservicesdesmoines.com"),
  title: {
    default: "Trade Show Services of Des Moines",
    template: "%s | Trade Show Services of Des Moines"
  },
  description:
    "Turnkey Des Moines trade show execution with booth design, fabrication, labor, AV, logistics, venue coordination, and show-site supervision.",
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
