"use client";

import { ExternalLink } from "lucide-react";
import { activeChain, STAMPLY_CONTRACT_ADDRESS } from "@/config/contract";

export function EcosystemSection() {
  return (
    <section className="mt-16 pt-12 pb-6 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto text-center px-4">
        {/* Section Pill with Official Logo */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium mb-4">
          <img
            src="/botchain-logo.png"
            alt="BOT Chain"
            className="w-4 h-4 rounded-sm object-contain"
          />
          <span>BOT Chain Ecosystem</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Powered by{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            BOT Chain
          </span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Stamply is engineered natively on BOT Chain (Chain ID: 677) — delivering lightning-fast finality, 
          ultra-low gas fees, and permanent cryptographic immutability for on-chain certificates.
        </p>

        {/* Two Featured Ecosystem Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8 text-left">
          {/* BOT Chain Website Card */}
          <a
            href="https://botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-navy-900/80 border border-slate-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-12 h-12 rounded-xl bg-black border border-emerald-500/30 flex items-center justify-center p-1.5 shadow-md shadow-emerald-500/10 group-hover:scale-105 transition-transform">
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain Website"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                <img
                  src="/botchain-logo.png"
                  alt="BOT"
                  className="w-3 h-3 object-contain"
                />
                <span>botchain.ai</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2.5">
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain"
                  className="w-5 h-5 rounded-sm object-contain shrink-0"
                />
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  BOT Chain Website
                </h3>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Discover the official BOT Chain portal, ecosystem architecture, developer documentation, 
                and high-throughput EVM network roadmap.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <img
                src="/botchain-logo.png"
                alt="BOT Chain"
                className="w-3.5 h-3.5 object-contain"
              />
              <span>Visit Official Website</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          {/* BOT Chain Explorer Card */}
          <a
            href="https://scan.botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-navy-900/80 border border-slate-800 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-12 h-12 rounded-xl bg-black border border-cyan-500/30 flex items-center justify-center p-1.5 shadow-md shadow-cyan-500/10 group-hover:scale-105 transition-transform">
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain Explorer"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/40 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <img
                  src="/botchain-logo.png"
                  alt="BOT"
                  className="w-3 h-3 object-contain"
                />
                <span>scan.botchain.ai</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2.5">
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain"
                  className="w-5 h-5 rounded-sm object-contain shrink-0"
                />
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  BOT Chain Explorer
                </h3>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Inspect live blocks, stamped certificate transactions, validator metrics, 
                and explore the deployed Stamply contract on BotchainScan.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs text-cyan-400 font-medium">
              <img
                src="/botchain-logo.png"
                alt="BOT Chain"
                className="w-3.5 h-3.5 object-contain"
              />
              <span>Open Block Explorer</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
