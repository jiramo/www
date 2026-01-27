import { AnnouncementBadge } from "@/app/components/badge";
import Button from "@/app/components/button";
import Card from "@/app/components/card";
import Image from "next/image";
import CardsGrid from "./cardsGrid";
import Background from "@/app/components/background";

export default function Home() {
  return (
    <>
      <Background />

      <main className="flex flex-col items-center justify-center pt-24 pb-10 gap-24">
        <section className="text-center max-w-5xl flex flex-col items-center gap-8 px-6 relative">
          <AnnouncementBadge href="/blog/v2" variant="brand">
            v2.0 Early Access
          </AnnouncementBadge>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] text-neutral-900 dark:text-white">
            The Operating System for <br />
            <span className="relative whitespace-nowrap">
              <span className="absolute -inset-1 -rotate-1 bg-orange-500/10 dark:bg-orange-500/20 rounded-lg blur-sm"></span>
              <span className="relative text-transparent bg-clip-text bg-linear-to-br from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-500">
                Modern Agencies
              </span>
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Sync git repos to client projects, automate billing with a
            kill-switch, and manage support tickets in one unified dashboard.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 w-full sm:w-auto">
            <Button
              size="lg"
              shortcut="C"
              href="https://github.com/jiramo/jiramo"
              leftIcon={<GitIcon className="w-5 h-5" />}
            >
              Clone Repo
            </Button>
            <Button size="lg" variant="secondary" href="">
              View Demo
            </Button>
          </div>
        </section>

        <section className="w-full max-w-6xl px-6">
          <div className="group relative rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden ring-1 ring-white/10 transition-transform duration-500">
            <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-900/50 px-4 py-3 backdrop-blur-md">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="mx-auto text-xs font-mono text-neutral-500">
                jiramo.dashboard.local
              </div>
            </div>
            <div className="relative aspect-16/10 bg-[#0A0A0A]">
              <Image
                src="/ui.png"
                alt="Dashboard UI"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl w-full px-6 flex flex-col gap-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold dark:text-white tracking-tight">
              Full-stack project management
            </h2>
            <p className="text-neutral-500 text-lg">
              Features designed to keep your code and your clients in sync.
            </p>
          </div>

          <CardsGrid />
        </section>

        <section className="text-center py-20 px-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-orange-500/20 blur-[120px] rounded-full pointer-events-none"></div>
          <h2 className="text-4xl md:text-5xl font-bold leading-15 mb-6 dark:text-white relative z-10">
            Stop chasing clients. <br />
            Start building.
          </h2>
          <Button
            size="lg"
            href="https://github.com/jiramo/jiramo"
            className="relative z-10"
          >
            Get Started for Free
          </Button>
        </section>
      </main>
    </>
  );
}


const GitIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="6" x2="6" y1="3" y2="15"></line>
    <circle cx="18" cy="6" r="3"></circle>
    <circle cx="6" cy="18" r="3"></circle>
    <path d="M18 9a9 9 0 0 1-9 9"></path>
  </svg>
);

