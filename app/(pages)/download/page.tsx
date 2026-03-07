"use client";

import Background from "@/components/background";
import { Icon } from "@/components/Icon";
import { Book } from "@/components/icons/book";
import { Check } from "@/components/icons/check";
import { Copy } from "@/components/icons/copy";
import { Download } from "@/components/icons/download";
import Link from "next/link";
import { useState, useEffect } from "react";

type OSType = "macos" | "windows" | "linux" | "docker" | null;
type PMType = "brew" | "winget" | "snap";

export default function DownloadPage() {
  const [activeOS, setActiveOS] = useState<OSType>(null);
  const [macArch, setMacArch] = useState<"silicon" | "intel">("silicon");
  const [activePM, setActivePM] = useState<PMType>("brew");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("mac") !== -1) setActiveOS("macos");
    else if (ua.indexOf("win") !== -1) setActiveOS("windows");
    else if (ua.indexOf("linux") !== -1) setActiveOS("linux");
  }, []);

  return (
    <div className="relative min-h-screen w-full font-sans selection:bg-orange-500/30 text-neutral-200 overflow-hidden">
      <Background />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
            Install Jiramo everywhere.
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-xl mx-auto">
            Native performance. Local-first architecture.{" "}
            <br className="hidden md:block" />
            Sync seamlessly across all your devices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-350 mx-auto mb-32">
          <OSCard
            id="macos"
            title="macOS"
            isActive={activeOS === "macos"}
            icon="apple"
            version="Universal .dmg"
            delay={100}
          >
            <div className="flex flex-col gap-4 mt-auto">
              <div className="bg-white/5 p-1 rounded-lg flex border border-white/5">
                <button
                  onClick={() => setMacArch("silicon")}
                  className={`flex-1 text-[10px] font-bold py-1.5 rounded-md transition-all ${macArch === "silicon" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-white"}`}
                >
                  Apple Silicon
                </button>
                <button
                  onClick={() => setMacArch("intel")}
                  className={`flex-1 text-[10px] font-bold py-1.5 rounded-md transition-all ${macArch === "intel" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-white"}`}
                >
                  Intel
                </button>
              </div>
              <DownloadButton
                primary={activeOS === "macos"}
                label="Download for Mac"
              />
              <p className="text-center text-[10px] text-neutral-600 font-mono">
                Requires macOS 11+
              </p>
            </div>
          </OSCard>

          <OSCard
            id="windows"
            title="Windows"
            isActive={activeOS === "windows"}
            icon="windows"
            version="Installer .exe"
            delay={200}
          >
            <div className="flex flex-col gap-4 mt-auto">
              <div className="h-10.5 flex items-center justify-center text-neutral-500 text-[11px] font-mono bg-white/5 rounded-lg border border-white/5">
                Windows 10/11 (x64)
              </div>
              <DownloadButton
                primary={activeOS === "windows"}
                label="Download for Windows"
              />
              <div className="text-center">
                <Link
                  href="#"
                  className="text-[10px] text-neutral-600 hover:text-orange-400 font-mono underline decoration-neutral-800 underline-offset-4 transition-colors"
                >
                  Download MSI
                </Link>
              </div>
            </div>
          </OSCard>

          <OSCard
            id="linux"
            title="Linux"
            isActive={activeOS === "linux"}
            icon="linux"
            version=".deb / .rpm"
            delay={300}
          >
            <div className="flex flex-col gap-4 mt-auto">
              <DownloadButton
                primary={activeOS === "linux"}
                label="Get AppImage"
              />
              <div className="text-center">
                <Link
                  href="#"
                  className="text-[10px] text-neutral-600 hover:text-orange-400 font-mono underline decoration-neutral-800 underline-offset-4 transition-colors"
                >
                  Snap / Flatpak
                </Link>
              </div>
            </div>
          </OSCard>

          <OSCard
            id="docker"
            title="Docker"
            isActive={activeOS === "docker"}
            icon="docker"
            version="Official Image"
            delay={400}
          >
            <div className="flex flex-col gap-4 mt-auto">
              <div className="h-10.5 flex items-center">
                <CopySnippet text="docker pull jiramo/app" />
              </div>
              <Link
                href="/docs/docker"
                className="group w-full h-10 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-orange-400"
              >
                <Book className="w-4 h-4 text-neutral-500 group-hover:text-orange-400 transition-colors" />{" "}
                Setup Guide
              </Link>
              <p className="text-center text-[10px] text-neutral-600 font-mono">
                v2.4.0-stable
              </p>
            </div>
          </OSCard>
        </div>
      </div>
    </div>
  );
}

function OSCard({ id, title, isActive, icon, version, children, delay }: any) {
  return (
    <div
      className={`
                group relative flex flex-col p-6 rounded-3xl border transition-all duration-500 h-full
                ${
                  isActive
                    ? "bg-[#0A0A0A] border-orange-500/50 shadow-[0_0_50px_-15px_rgba(249,115,22,0.3)] z-10 scale-[1.02]"
                    : "bg-[#0A0A0A]/40 border-white/5 hover:border-white/10 hover:bg-[#0A0A0A] hover:-translate-y-1"
                }
            `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {isActive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border border-orange-400 whitespace-nowrap z-20">
          Recommended
        </div>
      )}

      {isActive && (
        <div className="absolute inset-0 bg-orange-500/5 rounded-3xl pointer-events-none"></div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 flex justify-between items-start">
          <div
            className={`
                        p-3 rounded-2xl transition-all duration-300
                        ${
                          isActive
                            ? "bg-orange-500/10 text-orange-500"
                            : "bg-white/5 text-neutral-400 group-hover:bg-white/10 group-hover:text-white"
                        }
                    `}
          >
            <Icon name={icon} className="w-8 h-8" />
          </div>
          {isActive && (
            <div className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_currentColor] animate-pulse"></div>
          )}
        </div>

        <div className="mb-8">
          <h3
            className={`text-xl font-bold mb-1 transition-colors ${isActive ? "text-white" : "text-neutral-200 group-hover:text-white"}`}
          >
            {title}
          </h3>
          <p className="text-xs text-neutral-500 font-mono">{version}</p>
        </div>

        {children}
      </div>
    </div>
  );
}

function DownloadButton({
  primary,
  label,
}: {
  primary: boolean;
  label: string;
}) {
  return (
    <button
      className={`
            w-full h-10 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300
            ${
              primary
                ? "bg-orange-600 text-white hover:bg-orange-500 hover:scale-[1.02] shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-orange-400"
            }
        `}
    >
      <Download
        className={`w-4 h-4 ${!primary && "text-neutral-500 group-hover:text-orange-400 transition-colors"}`}
      />
      {label}
    </button>
  );
}

function CopySnippet({
  text,
}: {
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="
                group relative w-full flex items-center justify-between
                bg-black/20 border border-white/10 hover:border-orange-500/30 rounded-lg
                text-neutral-400 font-mono transition-all cursor-pointer text-left
                p-2 text-[10px]
            "
    >
      <span className="truncate mr-2 group-hover:text-neutral-200">
        <span className="text-orange-500 mr-2">$</span>
        {text}
      </span>
      <div className="shrink-0">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-orange-500" />
        ) : (
          <Copy className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </button>
  );
}