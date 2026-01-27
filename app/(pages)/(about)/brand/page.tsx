"use client";

import Image from "next/image";
import { useState } from "react";

export default function BrandPage() {
    return (
        <div>
            <h2 className="text-sm font-mono text-orange-500 uppercase tracking-widest mb-12 animate-in fade-in duration-500">Identity</h2>

            <div className="w-full h-100 bg-[#0A0A0A] border border-white/5 flex items-center justify-center mb-12 relative group overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]"></div>
                <div className="relative z-10 w-48 h-48 transition-transform duration-700 group-hover:scale-105">
                     <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <DownloadRow format="SVG" label="Vector Logo" file="/logo.svg" />
                <DownloadRow format="PNG" label="Raster (2048px)" file="/logo.png" />
            </div>

            <div className="pt-12 border-t border-white/5">
                <h3 className="text-xs text-neutral-500 mb-6 font-mono">PRIMARY PALETTE (CLICK TO COPY)</h3>
                <div className="flex flex-wrap gap-8">
                    <ColorSwatch color="#F97316" label="Orange 500" />
                    <ColorSwatch color="#050505" label="Rich Black" />
                    <ColorSwatch color="#FFFFFF" label="White" />
                </div>
            </div>
        </div>
    )
}

function DownloadRow({ format, label, file }: any) {
    return (
        <a href={file} download className="flex items-center justify-between group py-4 border-b border-white/5 hover:border-orange-500/50 transition-colors cursor-pointer">
            <div>
                <span className="text-white font-medium block">{format}</span>
                <span className="text-xs text-neutral-500">{label}</span>
            </div>
            <div className="w-8 h-8 flex items-center justify-center text-neutral-500 group-hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            </div>
        </a>
    )
}

function ColorSwatch({ color, label }: { color: string, label: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(color);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onClick={handleCopy}
            className="group flex flex-col gap-3 text-left focus:outline-none"
        >
            <div className="relative w-20 h-20 rounded-lg border border-white/10 overflow-hidden transition-transform duration-300 group-active:scale-95 group-hover:border-white/30">
                <div className="absolute inset-0" style={{ backgroundColor: color }}></div>
                
                <div className={`
                    absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center
                    transition-opacity duration-200
                    ${copied ? "opacity-100" : "opacity-0"}
                `}>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Copied</span>
                </div>
            </div>
            
            <div>
                <p className="text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">{color}</p>
                <p className="text-[10px] text-neutral-600">{label}</p>
            </div>
        </button>
    )
}