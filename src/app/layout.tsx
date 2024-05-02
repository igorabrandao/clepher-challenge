import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { GenericLayout } from "@Application/layouts/Generic/Generic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alpha Vantage",
  description: "Alpha Vantage - Crypto Currencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GenericLayout>{children}</GenericLayout>
      </body>
    </html>
  );
}
