"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useConnect,
} from "wagmi";
import { parseEventLogs } from "viem";
import {
  STAMPLY_ABI,
  STAMPLY_CONTRACT_ADDRESS,
  activeChain,
} from "@/config/contract";
import {
  Award,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  User,
  Hash,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export interface StampedCertificateRecord {
  id: string;
  title: string;
  description: string;
  creator: string;
  timestamp: number;
  txHash: string;
}

interface CreateCertificateProps {
  onCertificateStamped?: (cert: StampedCertificateRecord) => void;
}

export function CreateCertificate({ onCertificateStamped }: CreateCertificateProps) {
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [stampedRecord, setStampedRecord] = useState<StampedCertificateRecord | null>(null);

  const { isConnected, address, chain } = useAccount();
  const { connect, connectors } = useConnect();

  const isConfigured =
    STAMPLY_CONTRACT_ADDRESS &&
    STAMPLY_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";

  const isWrongNetwork = isConnected && chain?.id !== activeChain.id;

  const {
    writeContract,
    data: txHash,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // When transaction receipt arrives, parse the event to get authentic on-chain certificate data
  useEffect(() => {
    if (receipt && isConfirmed && txHash) {
      try {
        const logs = parseEventLogs({
          abi: STAMPLY_ABI,
          logs: receipt.logs,
          eventName: "CertificateStamped",
        });

        if (logs.length > 0) {
          const stampedEvent = logs[0];
          const newRecord: StampedCertificateRecord = {
            id: stampedEvent.args.id.toString(),
            title: stampedEvent.args.title,
            description: description,
            creator: stampedEvent.args.creator,
            timestamp: Number(stampedEvent.args.timestamp),
            txHash: txHash,
          };
          setStampedRecord(newRecord);
          if (onCertificateStamped) {
            onCertificateStamped(newRecord);
          }
        } else {
          // Fallback if event indexing is structured differently
          const fallbackRecord: StampedCertificateRecord = {
            id: "Confirmed",
            title: title,
            description: description,
            creator: address || "",
            timestamp: Math.floor(Date.now() / 1000),
            txHash: txHash,
          };
          setStampedRecord(fallbackRecord);
        }
      } catch (err) {
        console.error("Error parsing certificate receipt:", err);
      }
    }
  }, [receipt, isConfirmed, txHash]);

  // Validation rules
  const trimmedTitle = title.trim();
  const isTitleEmpty = trimmedTitle.length === 0;
  const isTitleTooLong = title.length > 100;
  const isDescTooLong = description.length > 1000;
  const isValid = !isTitleEmpty && !isTitleTooLong && !isDescTooLong;

  const handleStamp = async (e: React.FormEvent) => {
    e.preventDefault();
    setTitleTouched(true);
    if (!isValid || !isConnected || isWrongNetwork || !isConfigured) return;

    try {
      writeContract({
        address: STAMPLY_CONTRACT_ADDRESS,
        abi: STAMPLY_ABI,
        functionName: "stampCertificate",
        args: [trimmedTitle, description.trim()],
      });
    } catch (err) {
      console.error("Stamp error:", err);
    }
  };

  const handleResetForm = () => {
    setTitle("");
    setDescription("");
    setTitleTouched(false);
    setStampedRecord(null);
    resetWrite();
  };

  const copyToClipboard = (text: string, type: "hash" | "addr") => {
    navigator.clipboard.writeText(text);
    if (type === "hash") {
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-2xl bg-navy-900/60 border border-slate-800 p-8 h-96 animate-pulse" />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* If certificate was just stamped, show the authentic Certificate Details Card */}
      {stampedRecord ? (
        <div className="rounded-2xl bg-gradient-to-b from-navy-850 to-navy-900 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl shadow-emerald-950/20">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Certificate Stamped On-Chain!
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </h3>
                <p className="text-xs text-slate-400">Permanently recorded on {activeChain.name}</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              ID #{stampedRecord.id}
            </span>
          </div>

          {/* Certificate Detail Fields */}
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Certificate Title
              </span>
              <p className="text-lg font-semibold text-white mt-1">{stampedRecord.title}</p>
              {stampedRecord.description && (
                <p className="text-sm text-slate-300 mt-2 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                  {stampedRecord.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  <User className="w-3.5 h-3.5" />
                  <span>Creator Address</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-200 truncate">
                    {stampedRecord.creator.slice(0, 8)}...{stampedRecord.creator.slice(-6)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(stampedRecord.creator, "addr")}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="Copy creator address"
                  >
                    {copiedAddress ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Creation Timestamp</span>
                </div>
                <span className="text-xs font-mono text-slate-200">
                  {new Date(stampedRecord.timestamp * 1000).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "medium",
                  })}
                </span>
              </div>
            </div>

            {/* Transaction Hash with link */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                <Hash className="w-3.5 h-3.5" />
                <span>Transaction Hash</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-slate-300 truncate">
                  {stampedRecord.txHash}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => copyToClipboard(stampedRecord.txHash, "hash")}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="Copy tx hash"
                  >
                    {copiedHash ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={`${activeChain.blockExplorers.default.url}/tx/${stampedRecord.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    <img
                      src="/botchain-logo.png"
                      alt="BOT Chain"
                      className="w-3.5 h-3.5 rounded-sm object-contain"
                    />
                    <span>View on BotchainScan</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleResetForm}
              className="px-5 py-2.5 rounded-xl font-medium text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Stamp Another Certificate
            </button>
          </div>
        </div>
      ) : (
        /* Create Certificate Form Card */
        <div className="rounded-2xl bg-gradient-to-b from-navy-850 to-navy-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create On-Chain Certificate</h2>
              <p className="text-xs text-slate-400">
                Input title & description to stamp a permanent record on Botchain
              </p>
            </div>
          </div>

          <form onSubmit={handleStamp} className="mt-6 space-y-5">
            {/* Title Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="cert-title" className="text-xs font-semibold text-slate-200">
                  Certificate Title <span className="text-rose-400">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono ${
                    isTitleTooLong ? "text-rose-400 font-bold" : "text-slate-500"
                  }`}
                >
                  {title.length} / 100
                </span>
              </div>
              <input
                id="cert-title"
                type="text"
                placeholder="e.g. Master in Web3 Engineering - John Doe"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setTitleTouched(true)}
                maxLength={120}
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all ${
                  titleTouched && isTitleEmpty
                    ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/20"
                    : isTitleTooLong
                    ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/20"
                    : "border-slate-800 focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/20"
                }`}
              />
              {titleTouched && isTitleEmpty && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Certificate title is required.
                </p>
              )}
              {isTitleTooLong && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Title cannot exceed 100 characters.
                </p>
              )}
            </div>

            {/* Description Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="cert-desc" className="text-xs font-semibold text-slate-200">
                  Description <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <span
                  className={`text-[11px] font-mono ${
                    isDescTooLong ? "text-rose-400 font-bold" : "text-slate-500"
                  }`}
                >
                  {description.length} / 1000
                </span>
              </div>
              <textarea
                id="cert-desc"
                rows={4}
                placeholder="Add optional certificate details, issuing organization, grade, or verification references..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={1100}
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all resize-none ${
                  isDescTooLong
                    ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/20"
                    : "border-slate-800 focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/20"
                }`}
              />
              {isDescTooLong && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Description cannot exceed 1000 characters.
                </p>
              )}
            </div>

            {/* Status / Error Displays */}
            {!isConfigured && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  Contract address is not configured. Please verify that the contract is deployed on Botchain Mainnet.
                </div>
              </div>
            )}

            {isWrongNetwork && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2.5 text-xs text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Your wallet is connected to the wrong network. Please switch to {activeChain.name} (Chain ID: {activeChain.id}).</span>
              </div>
            )}

            {writeError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="break-all">
                  <span className="font-semibold">Transaction Error: </span>
                  {writeError.message.includes("User rejected")
                    ? "Transaction was rejected in your wallet."
                    : writeError.message.slice(0, 160) + "..."}
                </div>
              </div>
            )}

            {/* Pending States */}
            {isConfirming && (
              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2.5 text-xs text-indigo-300 animate-pulse">
                <Loader2 className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
                <span>
                  Confirming transaction on {activeChain.name} block explorer... Hash:{" "}
                  <code className="font-mono text-white">{txHash?.slice(0, 10)}...</code>
                </span>
              </div>
            )}

            {/* Submit Button */}
            {!isConnected ? (
              <button
                type="button"
                onClick={() => {
                  const connector = connectors[0];
                  if (connector) connect({ connector });
                }}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Connect Wallet to Stamp Certificate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isValid || isWritePending || isConfirming || isWrongNetwork || !isConfigured}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isWritePending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirm in Wallet...</span>
                  </>
                ) : isConfirming ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Stamping on Blockchain...</span>
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4" />
                    <span>Stamp Certificate</span>
                  </>
                )}
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
