"use client";

import Background from "@/components/background";
import Button from "@/components/button";
import { Icon } from "@/components/Icon";
import { Book } from "@/components/icons/book";
import Link from "next/link";

export default function DownloadPage() {
  return (
    <div className="relative min-h-screen w-full font-sans selection:bg-orange-500/30 text-neutral-900 dark:text-neutral-200 overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-300 mx-auto mb-32">
          <OSCard
            id="source"
            title="Source Code"
            isActive={true}
            badgeText="Available"
            icon="github"
            version="Build locally"
            delay={100}
          >
            <div className="flex flex-col gap-4 mt-auto">
              <Button
                href="https://github.com/jiramo/jiramo/blob/main/DOCS.md"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                <Book className="w-4 h-4" />
                Documentation
              </Button>
              <Link
                href={"https://github.com/jiramo/jiramo"}
                target="_blank"
                className="text-center text-[10px] text-neutral-500 dark:text-neutral-600 font-mono hover:text-orange-600 dark:hover:text-orange-400 hover:underline transition-colors"
              >
                github.com/jiramo/jiramo
              </Link>
            </div>
          </OSCard>

          <OSCard
            id="macos"
            title="macOS"
            isActive={false}
            icon="apple"
            version="Universal .dmg"
            delay={200}
          >
            <div className="flex flex-col gap-4 mt-auto">
              <div className="w-full h-10 rounded-lg text-sm font-bold flex items-center justify-center gap-2 bg-neutral-100 dark:bg-white/5 text-neutral-400 dark:text-neutral-500 border border-neutral-200 dark:border-white/5 cursor-not-allowed">
                Coming Soon
              </div>
            </div>
          </OSCard>

          <OSCard
            id="windows"
            title="Windows"
            isActive={false}
            icon="windows"
            version="Installer .exe"
            delay={300}
          >
            <div className="flex flex-col gap-4 mt-auto">
              <div className="w-full h-10 rounded-lg text-sm font-bold flex items-center justify-center gap-2 bg-neutral-100 dark:bg-white/5 text-neutral-400 dark:text-neutral-500 border border-neutral-200 dark:border-white/5 cursor-not-allowed">
                Coming Soon
              </div>
            </div>
          </OSCard>

          <OSCard
            id="linux"
            title="Linux"
            isActive={false}
            icon="linux"
            version=".deb / .rpm"
            delay={400}
          >
            <div className="flex flex-col gap-4 mt-auto">
              <div className="w-full h-10 rounded-lg text-sm font-bold flex items-center justify-center gap-2 bg-neutral-100 dark:bg-white/5 text-neutral-400 dark:text-neutral-500 border border-neutral-200 dark:border-white/5 cursor-not-allowed">
                Coming Soon
              </div>
            </div>
          </OSCard>
        </div>
      </div>
    </div>
  );
}

function OSCard({ id, title, isActive, badgeText = "Recommended", icon, version, children, delay }: any) {
  return (
    <div
      className={`
        group relative flex flex-col p-6 rounded-3xl border transition-all duration-500 h-full
        ${
          isActive
            ? "bg-white dark:bg-[#0A0A0A] border-orange-500/40 shadow-[0_0_40px_-15px_rgba(249,115,22,0.15)] dark:shadow-[0_0_50px_-15px_rgba(249,115,22,0.3)] z-10 scale-[1.02]"
            : "bg-neutral-50 dark:bg-[#0A0A0A]/40 border-neutral-200 dark:border-white/5 opacity-60 hover:opacity-100 transition-opacity"
        }
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {isActive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border border-orange-400 whitespace-nowrap z-20">
          {badgeText}
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
                  ? "bg-orange-500/10 text-orange-600 dark:text-orange-500"
                  : "bg-neutral-200/50 dark:bg-white/5 text-neutral-500"
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
            className={`text-xl font-bold mb-1 transition-colors ${
              isActive ? "text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-400"
            }`}
          >
            {title}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 font-mono">{version}</p>
        </div>

        {children}
      </div>
    </div>
  );
}