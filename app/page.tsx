import Image from "next/image";
import Button from "./components/button";
import { AnnouncementBadge } from "./components/badge";
import Card from "./components/card";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      </div>

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

          <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-auto gap-6">
            <Card className="md:col-span-4 min-h-75">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                    <CodeIcon />
                  </div>
                  <h3 className="text-xl font-bold dark:text-white">
                    One-line SDK Integration
                  </h3>
                </div>
                <p className="text-neutral-500 text-sm max-w-md">
                  Import `jiramo` to unlock payment gating, analytics, and
                  feature flags. Works with Next.js, Vue, and Remix.
                </p>
                <div className="mt-auto pt-6">
                  <div className="rounded-lg bg-[#111] border border-neutral-800 p-4 font-mono text-xs text-neutral-300 shadow-xl overflow-hidden relative">
                    <div className="flex gap-4">
                      <span className="text-neutral-600 select-none">1</span>
                      <p>
                        <span className="text-purple-400">import</span>{" "}
                        {"{ Jiramo }"}{" "}
                        <span className="text-purple-400">from</span>{" "}
                        <span className="text-green-400">'@jiramo/core'</span>;
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-neutral-600 select-none">2</span>
                      <p className="text-neutral-500">
                        // Lock features if invoice is overdue
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-neutral-600 select-none">3</span>
                      <p>
                        <span className="text-blue-400">const</span> isLocked ={" "}
                        <span className="text-yellow-400">await</span>{" "}
                        Jiramo.checkPaymentStatus();
                      </p>
                    </div>
                    <div className="absolute right-4 top-4 text-xs text-neutral-600">
                      TypeScript
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="md:col-span-2 md:row-span-2 flex flex-col">
              <div className="mb-4 flex items-center gap-3">
                <div className="p-2 bg-neutral-800 rounded-lg text-white">
                  <GitIcon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold dark:text-white">Git Sync</h3>
              </div>
              <p className="text-neutral-500 text-xs mb-6">
                Link commits to milestones. Auto-update project status based on
                merged PRs.
              </p>

              <div className="flex-1 w-full bg-neutral-100 dark:bg-[#111] rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 font-mono text-[10px] overflow-hidden relative group">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-neutral-300 dark:bg-neutral-800"></div>
                <div className="flex flex-col gap-4 relative z-10">
                  {[
                    {
                      msg: "feat: add stripe checkout",
                      hash: "a1b2c3",
                      user: "JD",
                    },
                    {
                      msg: "fix: mobile responsiveness",
                      hash: "d4e5f6",
                      user: "AL",
                    },
                    {
                      msg: "chore: update dependencies",
                      hash: "98a7b6",
                      user: "JD",
                    },
                    {
                      msg: "feat: customer dashboard",
                      hash: "123abc4",
                      user: "Bot",
                    },
                  ].map((commit, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-1"
                    >
                      <div className="w-4 h-4 rounded-full bg-neutral-400 dark:bg-neutral-700 border-2 border-white dark:border-[#111] z-10"></div>
                      <div className="flex-1 bg-white dark:bg-neutral-900 p-2 rounded border border-neutral-200 dark:border-neutral-800 shadow-sm">
                        <div className="flex justify-between opacity-70 mb-1">
                          <span>{commit.hash}</span>
                          <span>{commit.user}</span>
                        </div>
                        <span className="text-neutral-900 dark:text-neutral-200">
                          {commit.msg}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="md:col-span-2 group">
              <div className="flex flex-col gap-3 h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-purple-500">
                    <BugIcon />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Issue Reporting
                    </span>
                  </div>
                  <h3 className="text-lg font-bold dark:text-white">
                    Direct Feedback
                  </h3>
                </div>
                <div className="relative mt-2 p-3 bg-white dark:bg-neutral-900 rounded border border-l-4 border-neutral-200 dark:border-neutral-800 border-l-red-500 shadow-sm transition-transform group-hover:-rotate-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      Homepage Crash
                    </span>
                    <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded">
                      High
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-500">
                    "The payment modal doesn't open on Safari..."
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-purple-500 text-white text-[8px] flex items-center justify-center">
                      C
                    </div>
                    <span className="text-[9px] text-neutral-400">
                      Customer reported 2m ago
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="md:col-span-2">
              <div className="flex flex-col h-full justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-orange-500">
                    <UsersIcon />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Team
                    </span>
                  </div>
                  <h3 className="text-lg font-bold dark:text-white">
                    Collaborators
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 border-2 border-white dark:border-black flex items-center justify-center text-xs font-bold transition-transform hover:-translate-y-1 hover:z-10"
                      >
                        {["JD", "AL", "MK"][i - 1]}
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 border-2 border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-xs text-neutral-400 cursor-pointer hover:border-orange-500 hover:text-orange-500">
                      +
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500">
                    <span className="font-bold text-neutral-900 dark:text-white">
                      Multiplayer
                    </span>{" "}
                    access control included.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="md:col-span-3">
              <div className="flex flex-col gap-2 relative z-10">
                <div className="flex items-center gap-2 text-green-500 mb-1">
                  <CalendarIcon />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Scheduling
                  </span>
                </div>
                <h3 className="text-xl font-bold dark:text-white">
                  Event Organizer
                </h3>
                <p className="text-sm text-neutral-500">
                  Sync launch dates and maintenance windows directly with your
                  client's calendar.
                </p>
              </div>
              <div className="mt-6 flex gap-2 overflow-hidden opacity-80">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                  <div
                    key={day}
                    className={`flex-1 p-2 rounded border text-center ${i === 2 ? "bg-orange-500 border-orange-600 text-white shadow-lg z-10" : "bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"}`}
                  >
                    <div className="text-[10px] uppercase opacity-70">
                      {day}
                    </div>
                    <div className="text-sm font-bold">{12 + i}</div>
                    {i === 2 && (
                      <div className="mt-1 h-1 w-full bg-white/50 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="md:col-span-3 bg-linear-to-br from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-950 relative overflow-hidden">
              <input
                type="checkbox"
                id="toggle-protection"
                className="peer sr-only"
              />

              <div
                className="flex justify-between items-start transition-colors duration-300 
                  peer-checked:[&_.text-red-500]:text-green-500 
                  peer-checked:[&_.bg-red-500]:bg-green-500
                  peer-checked:[&_.translate-x-5]:translate-x-0
                  peer-checked:[&_.border-red-500]:border-green-500"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-red-500 mb-1 transition-colors duration-300">
                    <ShieldIcon />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      <span className="peer-checked:hidden">Protection</span>
                    </span>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white">
                    Payment Gating
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Toggle access based on invoice status.
                  </p>
                </div>

                <label
                  htmlFor="toggle-protection"
                  className="flex items-center gap-3 bg-white dark:bg-black p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm cursor-pointer select-none transition-colors"
                >
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse transition-colors duration-300"></div>

                  <div className="text-xs font-mono font-bold text-red-500 transition-colors duration-300 w-14 text-center">
                    <span className="block peer-checked:hidden">LOCKED</span>
                    <span className="hidden peer-checked:block">ACTIVE</span>
                  </div>

                  <div className="w-10 h-5 bg-red-500 rounded-full p-0.5 transition-colors duration-300">
                    <div className="h-4 w-4 bg-white rounded-full shadow-sm translate-x-5 transition-transform duration-300 ease-in-out"></div>
                  </div>
                </label>
              </div>
            </Card>
          </div>
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

const CodeIcon = ({ className }: { className?: string }) => (
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
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);
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
const BugIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m8 2 1.88 1.88" />
    <path d="M14.12 3.88 16 2" />
    <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
    <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
    <path d="M12 20v-9" />
    <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
    <path d="M6 13H2" />
    <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
    <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
    <path d="M22 13h-4" />
    <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
  </svg>
);
const UsersIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const CalendarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
const ShieldIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
