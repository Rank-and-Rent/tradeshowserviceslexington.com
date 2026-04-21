import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tradeshowserviceslexington.com"),
  title: {
    default: "Trade Show Services of Lexington",
    template: "%s | Trade Show Services of Lexington"
  },
  description:
    "Lexington trade show planning and production for Central Bank Center, hotel meetings, booth builds, freight, AV, logistics, and show-day support.",
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
