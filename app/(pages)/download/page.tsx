"use client";

import Background from "@/app/components/background";
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
                <Icon
                  name="book"
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
      <Icon
        name="download"
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
          <Icon name="check" className="w-3.5 h-3.5 text-orange-500" />
        ) : (
          <Icon
            name="copy"
            className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>
    </button>
  );
}

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const p = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "apple":
      return (
        <svg
          {...p}
          fill="currentColor"
          stroke="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M447.1 332.7C446.9 296 463.5 268.3 497.1 247.9C478.3 221 449.9 206.2 412.4 203.3C376.9 200.5 338.1 224 323.9 224C308.9 224 274.5 204.3 247.5 204.3C191.7 205.2 132.4 248.8 132.4 337.5C132.4 363.7 137.2 390.8 146.8 418.7C159.6 455.4 205.8 545.4 254 543.9C279.2 543.3 297 526 329.8 526C361.6 526 378.1 543.9 406.2 543.9C454.8 543.2 496.6 461.4 508.8 424.6C443.6 393.9 447.1 334.6 447.1 332.7zM390.5 168.5C417.8 136.1 415.3 106.6 414.5 96C390.4 97.4 362.5 112.4 346.6 130.9C329.1 150.7 318.8 175.2 321 202.8C347.1 204.8 370.9 191.4 390.5 168.5z" />
        </svg>
      );
    case "windows":
      return (
        <svg
          {...p}
          fill="currentColor"
          stroke="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M96 157.7L279.6 132.4L279.6 309.8L96 309.8L96 157.7zM96 482.3L279.6 507.6L279.6 332.4L96 332.4L96 482.3zM299.8 510.3L544 544L544 332.4L299.8 332.4L299.8 510.3zM299.8 129.7L299.8 309.8L544 309.8L544 96L299.8 129.7z" />
        </svg>
      );
    case "linux":
      return (
        <svg
          {...p}
          fill="currentColor"
          stroke="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M316.9 187.3C317.9 187.8 318.7 189 319.9 189C321 189 322.7 188.6 322.8 187.5C323 186.1 320.9 185.2 319.6 184.6C317.9 183.9 315.7 183.6 314.1 184.5C313.7 184.7 313.3 185.2 313.5 185.6C313.8 186.9 315.8 186.7 316.9 187.3zM295 189C296.2 189 297 187.8 298 187.3C299.1 186.7 301.1 186.9 301.5 185.7C301.7 185.3 301.3 184.8 300.9 184.6C299.3 183.7 297.1 184 295.4 184.7C294.1 185.3 292 186.2 292.2 187.6C292.3 188.6 294 189.1 295 189zM516 467.8C512.4 463.8 510.7 456.2 508.8 448.1C507 440 504.9 431.3 498.3 425.7C497 424.6 495.7 423.6 494.3 422.8C493 422 491.6 421.3 490.2 420.8C499.4 393.5 495.8 366.3 486.5 341.7C475.1 311.6 455.2 285.3 440 267.3C422.9 245.8 406.3 225.4 406.6 195.3C407.1 149.4 411.7 64.1 330.8 64C228.4 63.8 254 167.4 252.9 199.2C251.2 222.6 246.5 241 230.4 263.9C211.5 286.4 184.9 322.7 172.3 360.6C166.3 378.5 163.5 396.7 166.1 413.9C159.6 419.7 154.7 428.6 149.5 434.1C145.3 438.4 139.2 440 132.5 442.4C125.8 444.8 118.5 448.4 114 456.9C111.9 460.8 111.2 465 111.2 469.3C111.2 473.2 111.8 477.2 112.4 481.1C113.6 489.2 114.9 496.8 113.2 501.9C108 516.3 107.3 526.3 111 533.6C114.8 540.9 122.4 544.1 131.1 545.9C148.4 549.5 171.9 548.6 190.4 558.4C210.2 568.8 230.3 572.5 246.3 568.8C257.9 566.2 267.4 559.2 272.2 548.6C284.7 548.5 298.5 543.2 320.5 542C335.4 540.8 354.1 547.3 375.6 546.1C376.2 548.4 377 550.7 378.1 552.8L378.1 552.9C386.4 569.6 401.9 577.2 418.4 575.9C435 574.6 452.5 564.9 466.7 548C480.3 531.6 502.7 524.8 517.6 515.8C525 511.3 531 505.7 531.5 497.5C531.9 489.3 527.1 480.2 516 467.8zM319.8 151.3C329.6 129.1 354 129.5 363.8 150.9C370.3 165.1 367.4 181.8 359.5 191.3C357.9 190.5 353.6 188.7 346.9 186.4C348 185.2 350 183.7 350.8 181.8C355.6 170 350.6 154.8 341.7 154.5C334.4 154 327.8 165.3 329.9 177.5C325.8 175.5 320.5 174 316.9 173.1C315.9 166.2 316.6 158.5 319.8 151.3zM279.1 139.8C289.2 139.8 299.9 154 298.2 173.3C294.7 174.3 291.1 175.8 288 177.9C289.2 169 284.7 157.8 278.4 158.3C270 159 268.6 179.5 276.6 186.4C277.6 187.2 278.5 186.2 270.7 191.9C255.1 177.3 260.2 139.8 279.1 139.8zM265.5 200.5C271.7 195.9 279.1 190.5 279.6 190C284.3 185.6 293.1 175.8 307.5 175.8C314.6 175.8 323.1 178.1 333.4 184.7C339.7 188.8 344.7 189.1 356 194C364.4 197.5 369.7 203.7 366.5 212.2C363.9 219.3 355.5 226.6 343.8 230.3C332.7 233.9 324 246.3 305.6 245.2C301.7 245 298.6 244.2 296 243.1C288 239.6 283.8 232.7 276 228.1C267.4 223.3 262.8 217.7 261.3 212.8C259.9 207.9 261.3 203.8 265.5 200.5zM268.8 534.5C266.1 569.6 224.9 568.9 193.5 552.5C163.6 536.7 124.9 546 117 530.6C114.6 525.9 114.6 517.9 119.6 504.2L119.6 504C122 496.4 120.2 488 119 480.1C117.8 472.3 117.2 465.1 119.9 460.1C123.4 453.4 128.4 451 134.7 448.8C145 445.1 146.5 445.4 154.3 438.9C159.8 433.2 163.8 426 168.6 420.9C173.7 415.4 178.6 412.8 186.3 414C194.4 415.2 201.4 420.8 208.2 430L227.8 465.6C237.3 485.5 270.9 514 268.8 534.5zM267.4 508.6C263.3 502 257.8 495 253 489C260.1 489 267.2 486.8 269.7 480.1C272 473.9 269.7 465.2 262.3 455.2C248.8 437 224 422.7 224 422.7C210.5 414.3 202.9 404 199.4 392.8C195.9 381.6 196.4 369.5 199.1 357.6C204.3 334.7 217.7 312.4 226.3 298.4C228.6 296.7 227.1 301.6 217.6 319.2C209.1 335.3 193.2 372.5 215 401.6C215.6 380.9 220.5 359.8 228.8 340.1C240.8 312.7 266.1 265.2 268.1 227.4C269.2 228.2 272.7 230.6 274.3 231.5C278.9 234.2 282.4 238.2 286.9 241.8C299.3 251.8 315.4 251 329.3 243C335.5 239.5 340.5 235.5 345.2 234C355.1 230.9 363 225.4 367.5 219C375.2 249.4 393.2 293.3 404.7 314.7C410.8 326.1 423 350.2 428.3 379.3C431.6 379.2 435.3 379.7 439.2 380.7C453 345 427.5 306.5 415.9 295.8C411.2 291.2 411 289.2 413.3 289.3C425.9 300.5 442.5 323 448.5 348.3C451.3 359.9 451.8 372 448.9 384C465.3 390.8 484.8 401.9 479.6 418.8C477.4 418.7 476.4 418.8 475.4 418.8C478.6 408.7 471.5 401.2 452.6 392.7C433 384.1 416.6 384.1 414.3 405.2C402.2 409.4 396 419.9 392.9 432.5C390.1 443.7 389.3 457.2 388.5 472.4C388 480.1 384.9 490.4 381.7 501.4C349.6 524.3 305 534.3 267.4 508.6zM524.8 497.1C523.9 513.9 483.6 517 461.6 543.6C448.4 559.3 432.2 568 418 569.1C403.8 570.2 391.5 564.3 384.3 549.8C379.6 538.7 381.9 526.7 385.4 513.5C389.1 499.3 394.6 484.7 395.3 472.9C396.1 457.7 397 444.4 399.5 434.2C402.1 423.9 406.1 417 413.2 413.1C413.5 412.9 413.9 412.8 414.2 412.6C415 425.8 421.5 439.2 433 442.1C445.6 445.4 463.7 434.6 471.4 425.8C480.4 425.5 487.1 424.9 494 430.9C503.9 439.4 501.1 461.2 511.1 472.5C521.7 484.1 525.1 492 524.8 497.1zM269.4 212.7C271.4 214.6 274.1 217.2 277.4 219.8C284 225 293.2 230.4 304.7 230.4C316.3 230.4 327.2 224.5 336.5 219.6C341.4 217 347.4 212.6 351.3 209.2C355.2 205.8 357.2 202.9 354.4 202.6C351.6 202.3 351.8 205.2 348.4 207.7C344 210.9 338.7 215.1 334.5 217.5C327.1 221.7 315 227.7 304.6 227.7C294.2 227.7 285.9 222.9 279.7 218C276.6 215.5 274 213 272 211.1C270.5 209.7 270.1 206.5 267.7 206.2C266.3 206.1 265.9 209.9 269.4 212.7z" />
        </svg>
      );
    case "docker":
      return (
        <svg
          {...p}
          fill="currentColor"
          stroke="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M349.9 300.3L283.8 300.3L283.8 240.9L349.9 240.9L349.9 300.3zM349.9 96L283.8 96L283.8 156.7L349.9 156.7L349.9 96zM428.1 240.8L362 240.8L362 300.2L428.1 300.2L428.1 240.8zM271.8 168.7L205.7 168.7L205.7 228.8L271.8 228.8L271.8 168.7zM349.9 168.7L283.8 168.7L283.8 228.8L349.9 228.8L349.9 168.7zM626.7 268.7C612.3 259 579.1 255.5 553.6 260.3C550.3 236.3 536.9 215.4 512.5 196.6L498.5 187.3L489.2 201.3C470.8 229.1 465.8 274.9 485.5 305.1C476.8 309.8 459.7 316.2 437.1 315.8L2.4 315.8C-6.3 366.6 8.2 432.6 46.4 477.9C83.5 521.8 139.1 544.1 211.8 544.1C369.2 544.1 485.7 471.6 540.2 339.9C561.6 340.3 607.8 340 631.5 294.7C633 292.2 638.1 281.5 640 277.6L626.7 268.7zM115.6 240.8L49.6 240.8L49.6 300.2L115.7 300.2L115.7 240.8L115.6 240.8zM193.7 240.8L127.6 240.8L127.6 300.2L193.7 300.2L193.7 240.8zM271.8 240.8L205.7 240.8L205.7 300.2L271.8 300.2L271.8 240.8zM193.7 168.7L127.6 168.7L127.6 228.8L193.7 228.8L193.7 168.7z" />
        </svg>
      );
    case "terminal":
      return (
        <svg {...p}>
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" x2="20" y1="19" y2="19" />
        </svg>
      );
    case "download":
      return (
        <svg {...p}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      );
    case "book":
      return (
        <svg {...p}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "copy":
      return (
        <svg {...p}>
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      );
    case "check":
      return (
        <svg {...p} strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    default:
      return null;
  }
};
