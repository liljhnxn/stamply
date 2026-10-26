"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain, useBalance } from "wagmi";
import { activeChain, botchainMainnet } from "@/config/contract";
import { Wallet, LogOut, AlertTriangle, CheckCircle2, ChevronDown, Copy, Check, ExternalLink } from "lucide-react";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);

  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const { data: balance } = useBalance({
    address,
    chainId: activeChain.id,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWrongNetwork = isConnected && chain?.id !== activeChain.id;

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-navy-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-violet-500 p-[1.5px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
              <svg
                className="w-6 h-6 text-cyan-400"
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
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Stamply
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                dApp
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">On-Chain Certificate Registry</p>
          </div>
        </div>

        {/* Right Action: Network & Wallet */}
        <div className="flex items-center gap-3">
          {/* Network Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
            <img
              src="/botchain-logo.png"
              alt="BOT Chain"
              className="w-3.5 h-3.5 rounded-sm object-contain"
            />
            <span className="text-slate-300 font-medium">{activeChain.name}</span>
            <span className="text-slate-500 font-mono text-[11px]">({activeChain.id})</span>
          </div>

          {/* Direct Mainnet Explorer Link */}
          <a
            href="https://scan.botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
            title="Open BOT Chain Explorer"
          >
            <img
              src="/botchain-logo.png"
              alt="BOT Chain"
              className="w-3.5 h-3.5 rounded-sm object-contain"
            />
            <span>Explorer</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>

          {!mounted ? (
            <div className="h-10 w-36 bg-slate-800/50 rounded-xl animate-pulse" />
          ) : !isConnected ? (
            <button
              onClick={() => {
                const connector = connectors[0];
                if (connector) connect({ connector });
              }}
              disabled={isConnecting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-95 disabled:opacity-50"
            >
              <Wallet className="w-4 h-4" />
              <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
            </button>
          ) : isWrongNetwork ? (
            <button
              onClick={() => switchChain({ chainId: activeChain.id })}
              disabled={isSwitching}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all duration-200"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{isSwitching ? "Switching..." : "Switch to Botchain Mainnet"}</span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowWalletMenu(!showWalletMenu)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-600 transition-colors"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-500/20" />
                <span className="text-sm font-mono text-slate-200 font-medium">
                  {address ? truncateAddress(address) : ""}
                </span>
                {balance && (
                  <span className="hidden sm:inline-block text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    {parseFloat(balance.formatted).toFixed(2)} BOT
                  </span>
                )}
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* Wallet Dropdown Menu */}
              {showWalletMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-navy-900 border border-slate-800 p-2 shadow-2xl shadow-black/80 z-50">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs text-slate-400">Connected Wallet</p>
                    <p className="text-xs font-mono text-slate-200 truncate mt-0.5">{address}</p>
                    {balance && (
                      <p className="text-xs text-cyan-400 font-mono mt-1">
                        Balance: {parseFloat(balance.formatted).toFixed(4)} BOT
                      </p>
                    )}
                  </div>

                  <div className="pt-1.5 flex flex-col gap-1">
                    <button
                      onClick={copyAddress}
                      className="flex items-center justify-between w-full px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied!" : "Copy Address"}
                      </span>
                    </button>
                    <a
                      href={`${activeChain.blockExplorers.default.url}/address/${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <img
                          src="/botchain-logo.png"
                          alt="BOT Chain"
                          className="w-3.5 h-3.5 rounded-sm object-contain"
                        />
                        <span>View on BotchainScan</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                    <button
                      onClick={() => {
                        disconnect();
                        setShowWalletMenu(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Disconnect</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
