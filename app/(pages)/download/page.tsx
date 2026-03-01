"use client";

import Background from "@/app/components/background";
import { Icon } from "@/app/components/Icon";
import { Book } from "@/app/components/icons/book";
import { Check } from "@/app/components/icons/check";
import { Copy } from "@/app/components/icons/copy";
import { Download } from "@/app/components/icons/download";
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
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-neutral-400 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Latest Release v2.4.0
          </div>

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
              <div className="grid grid-cols-2 gap-2 h-10.5">
                <div className="flex items-center justify-center text-[10px] font-mono text-neutral-500 bg-white/5 rounded-lg border border-white/5">
                  Debian
                </div>
                <div className="flex items-center justify-center text-[10px] font-mono text-neutral-500 bg-white/5 rounded-lg border border-white/5">
                  RedHat
                </div>
              </div>
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
                <CopySnippet text="docker pull jiramo/app" small />
              </div>
              <Link
                href="/docs/docker"
                className="group w-full h-10 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-orange-400"
              >
                <Book
                  className="w-4 h-4 text-neutral-500 group-hover:text-orange-400 transition-colors"
                />{" "}
                Setup Guide
              </Link>
              <p className="text-center text-[10px] text-neutral-600 font-mono">
                v2.4.0-stable
              </p>
            </div>
          </OSCard>
        </div>

        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-6 text-center">
            Or install via Terminal
          </h2>

          <div className="group bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative transition-all hover:border-white/20">
            <div className="flex items-center border-b border-white/5 bg-black/40 px-4 pt-3 gap-2">
              <div className="flex gap-1.5 mr-4 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>

              <PMTab
                id="brew"
                label="Homebrew"
                icon="terminal"
                activePM={activePM}
                setActivePM={setActivePM}
              />
              <PMTab
                id="winget"
                label="WinGet"
                icon="windows"
                activePM={activePM}
                setActivePM={setActivePM}
              />
              <PMTab
                id="snap"
                label="Snap"
                icon="linux"
                activePM={activePM}
                setActivePM={setActivePM}
              />
            </div>

            <div className="p-8 bg-black/80 font-mono text-sm relative min-h-30 flex items-center backdrop-blur-sm">
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent pointer-events-none"></div>

              <div className="w-full">
                {activePM === "brew" && (
                  <CopySnippet
                    text="brew install --cask jiramo"
                    terminalStyle
                  />
                )}
                {activePM === "winget" && (
                  <CopySnippet text="winget install Jiramo.App" terminalStyle />
                )}
                {activePM === "snap" && (
                  <CopySnippet text="snap install jiramo" terminalStyle />
                )}
              </div>
            </div>
          </div>
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

function PMTab({ id, label, icon, activePM, setActivePM }: any) {
  const isActive = activePM === id;
  return (
    <button
      onClick={() => setActivePM(id)}
      className={`
                flex items-center gap-2 px-4 py-2 rounded-t-lg text-xs font-medium relative top-px outline-none overflow-hidden
                ${
                  isActive
                    ? "bg-white/5 text-white border border-white/10"
                    : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5 border border-transparent"
                }
            `}
    >
      <Icon
        name={icon}
        className={`w-3.5 h-3.5 ${isActive ? "text-orange-500" : "text-neutral-600"}`}
      />
      {label}
      {isActive && (
        <div className="absolute top-0 left-0 right-0 h-px bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
      )}
    </button>
  );
}

function CopySnippet({
  text,
  small = false,
  terminalStyle = false,
}: {
  text: string;
  small?: boolean;
  terminalStyle?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (terminalStyle) {
    return (
      <div
        className="flex items-center justify-between w-full group cursor-pointer"
        onClick={handleCopy}
      >
        <div className="flex items-center gap-3">
          <span className="text-neutral-600 select-none animate-pulse">$</span>
          <code className="text-sm md:text-base text-neutral-200 group-hover:text-white transition-colors">
            <span className="text-orange-500 font-bold">
              {text.split(" ")[0]}
            </span>{" "}
            {text.split(" ").slice(1).join(" ")}
          </code>
        </div>
        <div className="shrink-0 transition-opacity duration-300">
          {copied ? (
            <div className="flex items-center gap-1.5 text-[10px] text-orange-500 font-bold uppercase tracking-wider bg-orange-500/10 px-2 py-1 rounded">
              <Icon name="check" className="w-3.5 h-3.5" /> Copied
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 group-hover:text-neutral-300 transition-colors opacity-0 group-hover:opacity-100">
              <Icon name="copy" className="w-3.5 h-3.5" /> Copy
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`
                group relative w-full flex items-center justify-between
                bg-black/20 border border-white/10 hover:border-orange-500/30 rounded-lg
                text-neutral-400 font-mono transition-all cursor-pointer text-left
                ${small ? "p-2 text-[10px]" : "px-4 py-3 text-xs"}
            `}
    >
      <span className="truncate mr-2 group-hover:text-neutral-200">
        <span className="text-orange-500 mr-2">$</span>
        {text}
      </span>
      <div className="shrink-0">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-orange-500" />
        ) : (
          <Copy
            className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>
    </button>
  );
}