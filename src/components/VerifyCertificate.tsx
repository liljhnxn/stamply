"use client";

import { useState } from "react";
import { createPublicClient, http } from "viem";
import {
  STAMPLY_ABI,
  STAMPLY_CONTRACT_ADDRESS,
  activeChain,
  BOTCHAIN_RPC_URL,
} from "@/config/contract";
import {
  Search,
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  User,
  ShieldCheck,
  Info,
} from "lucide-react";

interface VerifiedCertificate {
  id: string;
  title: string;
  description: string;
  creator: string;
  timestamp: number;
}

export function VerifyCertificate() {
  const [searchId, setSearchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerifiedCertificate | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searchedId, setSearchedId] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const isConfigured =
    STAMPLY_CONTRACT_ADDRESS &&
    STAMPLY_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchId.trim();
    if (!trimmed || isNaN(Number(trimmed)) || Number(trimmed) <= 0) {
      setErrorMessage("Please enter a valid positive certificate ID number.");
      return;
    }

    if (!isConfigured) {
      setErrorMessage("Contract is not configured yet. Please configure the contract address.");
      return;
    }

    setIsLoading(true);
    setNotFound(false);
    setResult(null);
    setErrorMessage(null);
    setSearchedId(trimmed);

    try {
      const publicClient = createPublicClient({
        chain: activeChain,
        transport: http(BOTCHAIN_RPC_URL),
      });

      // First check if certificate exists
      const exists = await publicClient.readContract({
        address: STAMPLY_CONTRACT_ADDRESS,
        abi: STAMPLY_ABI,
        functionName: "certificateExists",
        args: [BigInt(trimmed)],
      });

      if (!exists) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      // Fetch certificate data
      const data = await publicClient.readContract({
        address: STAMPLY_CONTRACT_ADDRESS,
        abi: STAMPLY_ABI,
        functionName: "getCertificate",
        args: [BigInt(trimmed)],
      });

      setResult({
        id: data[0].toString(),
        title: data[1],
        description: data[2],
        creator: data[3],
        timestamp: Number(data[4]),
      });
    } catch (err: any) {
      console.error("Verification error:", err);
      // If reverted with "Certificate does not exist"
      if (err?.message?.includes("Certificate does not exist") || err?.shortMessage?.includes("Certificate does not exist")) {
        setNotFound(true);
      } else {
        setErrorMessage("Failed to query Botchain Mainnet RPC. Please verify your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <div className="rounded-2xl bg-gradient-to-b from-navy-850 to-navy-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Public Certificate Verification</h2>
            <p className="text-xs text-slate-400">
              Query any certificate ID directly from the Botchain blockchain
            </p>
          </div>
        </div>

        {/* Verification Search Form */}
        <form onSubmit={handleVerify} className="mt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="number"
                min="1"
                step="1"
                placeholder="Enter Certificate ID (e.g. 1)"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                  setErrorMessage(null);
                }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-violet-500/80 focus:ring-2 focus:ring-violet-500/20 text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !searchId.trim()}
              className="px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-600/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Certificate</span>
                </>
              )}
            </button>
          </div>

          {errorMessage && (
            <p className="mt-2 text-xs text-rose-400 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              {errorMessage}
            </p>
          )}
        </form>

        {/* Verification Result: Not Found */}
        {notFound && (
          <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-200">
            <XCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Certificate #{searchedId} Not Found</p>
              <p className="text-xs text-amber-300/80 mt-1">
                No certificate with ID #{searchedId} has been stamped on Botchain Mainnet. Please check the certificate ID number and verify again.
              </p>
            </div>
          </div>
        )}

        {/* Verification Result: Found & Valid */}
        {result && (
          <div className="mt-6 rounded-xl bg-slate-900/90 border border-emerald-500/30 p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>On-Chain Record Verified</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ID #{result.id}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Certificate Title
              </span>
              <p className="text-base font-semibold text-white mt-0.5">{result.title}</p>
            </div>

            {result.description && (
              <div>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Description
                </span>
                <p className="text-xs text-slate-300 mt-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                  {result.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  <User className="w-3 h-3" />
                  <span>Creator Address</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-200 truncate">
                    {result.creator.slice(0, 8)}...{result.creator.slice(-6)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyAddress(result.creator)}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                      title="Copy address"
                    >
                      {copiedAddress ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                    <a
                      href={`${activeChain.blockExplorers.default.url}/address/${result.creator}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                      title="View creator on BotchainScan"
                    >
                      <img
                        src="/botchain-logo.png"
                        alt="BOT Chain"
                        className="w-3 h-3 rounded-sm object-contain"
                      />
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  <Calendar className="w-3 h-3" />
                  <span>Timestamp</span>
                </div>
                <span className="text-xs font-mono text-slate-200">
                  {new Date(result.timestamp * 1000).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "medium",
                  })}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                Data queried live from {activeChain.name} smart contract at block timestamp{" "}
                <code className="text-cyan-400 font-mono">{result.timestamp}</code>.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
