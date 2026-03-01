import Card from "@/app/components/card";
import { Bug } from "@/app/components/icons/bug";
import { Calendar } from "@/app/components/icons/calendar";
import { Code } from "@/app/components/icons/code";
import { Github } from "@/app/components/icons/github";
import { Shield } from "@/app/components/icons/shield";
import { Users } from "@/app/components/icons/user";

export default function CardsGrid() {
    return (
                  <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-auto gap-6">
            <Card className="md:col-span-4 min-h-75">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                    <Code />
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
                  <Github className="w-5 h-5" />
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
                    <Bug />
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
                    <Users />
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
                  <Calendar />
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
                    <Shield />
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
    )
}