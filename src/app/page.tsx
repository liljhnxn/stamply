"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CreateCertificate, StampedCertificateRecord } from "@/components/CreateCertificate";
import { VerifyCertificate } from "@/components/VerifyCertificate";
import { EcosystemSection } from "@/components/EcosystemSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [latestStamped, setLatestStamped] = useState<StampedCertificateRecord | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-navy-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sticky Header with Navigation & Wallet Connection */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        <Hero />

        {/* Core Actions Container */}
        <div className="mt-8 space-y-12">
          {/* Create Certificate Form & Details Display */}
          <CreateCertificate onCertificateStamped={setLatestStamped} />

          {/* Public Verification Section */}
          <VerifyCertificate />

          {/* BOT Chain Ecosystem Section */}
          <EcosystemSection />
        </div>
      </main>

      {/* Modern Footer */}
      <Footer />
    </div>
  );
}
