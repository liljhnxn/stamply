import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stamply | Permanent Digital Certificate Record on Botchain",
  description:
    "Create and publicly verify permanent digital certificate records on the Botchain blockchain. Fast, decentralized, and transparent.",
  keywords: ["blockchain", "certificate", "botchain", "web3", "verification", "smart contract"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Stamply - Web3 Digital Certificate Record",
    description: "Stamp It. Store It. Verify It. Permanent on-chain certificate stamping.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased text-slate-100 min-h-screen flex flex-col`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
