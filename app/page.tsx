export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100">
      <div className="relative px-6 text-center max-w-xl">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
          Jiramo
        </h1>

        <p className="mt-3 text-neutral-400 text-sm md:text-base">
          A CRM built for developers.
        </p>

        <p className="mt-6 text-neutral-500 text-sm leading-relaxed">
          We’re building a focused, API-first CRM that fits naturally
          into modern development workflows.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="https://github.com/jiramo/jiramo"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-neutral-800 bg-neutral-900/40 px-5 py-2.5 text-sm text-neutral-300 backdrop-blur transition
                       hover:border-neutral-700 hover:bg-neutral-900 hover:text-neutral-100"
          >
            <svg
              className="h-4 w-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0.5C5.65 0.5.5 5.85.5 12.45c0 5.28 3.44 9.76 8.2 11.34.6.11.82-.27.82-.59v-2.1c-3.34.76-4.04-1.67-4.04-1.67-.55-1.42-1.34-1.8-1.34-1.8-1.1-.77.08-.76.08-.76 1.21.09 1.85 1.29 1.85 1.29 1.08 1.9 2.84 1.35 3.53 1.03.11-.8.42-1.35.76-1.66-2.66-.31-5.46-1.38-5.46-6.13 0-1.36.46-2.47 1.23-3.34-.12-.31-.53-1.57.12-3.27 0 0 1-.33 3.3 1.27a11.1 11.1 0 0 1 6 0c2.3-1.6 3.3-1.27 3.3-1.27.65 1.7.24 2.96.12 3.27.77.87 1.23 1.98 1.23 3.34 0 4.76-2.8 5.82-5.48 6.13.43.38.81 1.13.81 2.28v3.38c0 .33.22.71.83.59 4.75-1.58 8.18-6.06 8.18-11.34C23.5 5.85 18.35.5 12 .5z" />
            </svg>

            <span>View on GitHub</span>
          </a>
        </div>

        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800 px-4 py-2 text-xs text-neutral-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            In active development
          </span>
        </div>
      </div>
    </div>
  );
}
