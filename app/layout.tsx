import "#/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIS Vessel Tracking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-mono bg-neutral-900 text-white">
      <body>{children}</body>
    </html>
  );
}
