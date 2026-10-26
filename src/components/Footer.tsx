import { activeChain, STAMPLY_CONTRACT_ADDRESS } from "@/config/contract";
import { ExternalLink, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-navy-950/90 backdrop-blur-md pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-850">
          {/* Column 1: Stamply Project Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-500 to-violet-500 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-navy-900 rounded-[7px] flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-cyan-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Stamply</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                dApp
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Decentralized, immutable certificate recorder and public verification protocol.
              Timestamped forever on the blockchain with zero centralized databases.
            </p>
            <div className="pt-1">
              <a
                href={`${activeChain.blockExplorers.default.url}/address/${STAMPLY_CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain"
                  className="w-3.5 h-3.5 rounded-sm object-contain"
                />
                <span>Mainnet Contract: {STAMPLY_CONTRACT_ADDRESS.slice(0, 6)}...{STAMPLY_CONTRACT_ADDRESS.slice(-4)}</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Column 2: BOT Chain Ecosystem & Official Links */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              {/* BOT Chain Official Logo */}
              <div className="w-7 h-7 rounded-md bg-black border border-emerald-500/30 flex items-center justify-center p-1 shadow-sm shadow-emerald-500/20">
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
                BOT Chain Ecosystem
              </h4>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Official network resources and blockchain explorers for BOT Chain.
            </p>

            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://botchain.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors font-medium group"
                >
                  <img
                    src="/botchain-logo.png"
                    alt="BOT Chain"
                    className="w-4 h-4 rounded-sm object-contain shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <span>BOT Chain Website:</span>
                  <span className="text-emerald-400 underline decoration-emerald-500/40 underline-offset-2">
                    https://botchain.ai
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://scan.botchain.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors font-medium group"
                >
                  <img
                    src="/botchain-logo.png"
                    alt="BOT Chain Explorer"
                    className="w-4 h-4 rounded-sm object-contain shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <span>BOT Chain Explorer:</span>
                  <span className="text-cyan-400 underline decoration-cyan-500/40 underline-offset-2">
                    https://scan.botchain.ai
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Network Parameters */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
              Network Details
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center justify-between py-1 border-b border-slate-900">
                <span>Network Name</span>
                <span className="font-semibold text-slate-200">BOT Chain Mainnet</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-900">
                <span>Chain ID</span>
                <span className="font-mono text-cyan-400">677</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-900">
                <span>Native Token</span>
                <span className="font-mono text-slate-200">BOT (150M Supply)</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>RPC URL</span>
                <a
                  href="https://rpc.botchain.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>rpc.botchain.ai</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Disclaimer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Stamply</span>
            <span>•</span>
            <div className="inline-flex items-center gap-1.5 text-slate-300">
              <img
                src="/botchain-logo.png"
                alt="BOT Chain"
                className="w-3.5 h-3.5 object-contain"
              />
              <span>Built on BOT Chain</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center sm:text-right max-w-xl">
            Disclaimer: Stamping records metadata permanently on BOT Chain. Stamply provides cryptographic proof of existence and timestamping, not certification of external claims.
          </div>
        </div>
      </div>
    </footer>
  );
}
