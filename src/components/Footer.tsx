import { botchainTestnet } from "@/config/contract";
import { ExternalLink, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-navy-950/60 backdrop-blur-md py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">Stamply</span>
            <span>•</span>
            <span>Decentralized On-Chain Certificate Stamping</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://scan.bohr.life"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
            >
              <span>BohrScan Explorer</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://rpc.bohr.life"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
            >
              <span>Botchain RPC</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400">
              Chain ID: 968
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-900 text-center text-[11px] text-slate-400">
          Disclaimer: Stamping records data permanently on the Botchain blockchain. It does not certify the truthfulness of real-world claims.
        </div>
      </div>
    </footer>
  );
}
