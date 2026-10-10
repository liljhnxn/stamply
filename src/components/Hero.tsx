"use client";

import { useReadContract } from "wagmi";
import { STAMPLY_ABI, STAMPLY_CONTRACT_ADDRESS, botchainTestnet } from "@/config/contract";
import { ShieldCheck, Info, FileText, CheckCircle, ExternalLink } from "lucide-react";

export function Hero() {
  const isAddressConfigured =
    STAMPLY_CONTRACT_ADDRESS &&
    STAMPLY_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";

  const { data: certificateCount } = useReadContract({
    address: STAMPLY_CONTRACT_ADDRESS,
    abi: STAMPLY_ABI,
    functionName: "certificateCount",
    query: {
      enabled: isAddressConfigured,
      refetchInterval: 10000,
    },
  });

  return (
    <section className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 text-center overflow-hidden">
      {/* Background radial glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/15 to-violet-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Network & Protocol Pills */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-inner mb-6 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-medium">Botchain Testnet Network</span>
          <span className="text-slate-500">•</span>
          <span className="text-cyan-400 font-mono">Chain ID 968</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Stamp It. Store It.{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Verify It.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal mb-8 leading-relaxed">
          Create a permanent digital certificate record on the blockchain. Publicly verifiable, tamper-evident, and securely timestamped forever.
        </p>

        {/* Live Metrics / Status Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-sm">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Total Stamped:</span>
            <span className="font-semibold text-white font-mono">
              {isAddressConfigured && certificateCount !== undefined
                ? certificateCount.toString()
                : "Active"}
            </span>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Public Registry:</span>
            <span className="font-semibold text-emerald-400">Decentralized</span>
          </div>

          {isAddressConfigured && (
            <a
              href={`${botchainTestnet.blockExplorers.default.url}/address/${STAMPLY_CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <span>Contract: {STAMPLY_CONTRACT_ADDRESS.slice(0, 6)}...{STAMPLY_CONTRACT_ADDRESS.slice(-4)}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Transparent Disclaimer Notice */}
        <div className="max-w-2xl mx-auto rounded-xl bg-slate-900/50 border border-slate-800/80 p-4 text-left flex items-start gap-3.5 text-xs sm:text-sm text-slate-400 leading-relaxed shadow-sm">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-medium text-slate-300">Public Record Notice: </span>
            Stamping records certificate information on-chain with an immutable timestamp and creator address, but does not prove that a certificate's claims are authentic. Stamply is a public certificate-recording tool, not an official certificate authority.
          </div>
        </div>
      </div>
    </section>
  );
}
