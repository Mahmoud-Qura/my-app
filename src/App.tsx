import Updowngame from './updowngame/Updowngame'

export default function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.25),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.16),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.05),_transparent_36%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_45%,_#e7efff_100%)] px-3 py-4 text-slate-900 sm:px-4 lg:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-6rem] top-24 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5rem] top-40 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/75 px-4 py-4 shadow-[0_18px_50px_rgba(15,30,45,0.08)] backdrop-blur-md md:flex-row md:items-center md:justify-between md:px-5">
        <div className="flex items-center gap-3 text-center md:text-left">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,#0f172a,#2563eb_55%,#14b8a6)] text-sm font-extrabold tracking-[0.18em] text-white shadow-lg shadow-sky-500/30">
            UDG
          </span>
          <div>
            <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
              Number Game
            </p>
            <h1 className="text-[clamp(1.05rem,1vw+0.9rem,1.45rem)] font-semibold leading-tight text-slate-900">
              The Flipped Number
            </h1>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-2 md:justify-end" aria-label="Primary">
          <a
            className="rounded-full border border-slate-200/80 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-slate-900 hover:text-white"
            href="#game"
          >
            Game
          </a>
          <a
            className="rounded-full border border-slate-200/80 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-slate-900 hover:text-white"
            href="#how-to-play"
          >
            How to play
          </a>
          <a
            className="rounded-full border border-slate-200/80 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-slate-900 hover:text-white"
            href="#restart"
          >
            Restart
          </a>
        </nav>
      </header>

      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-6 py-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:py-10">
        <aside className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_24px_70px_rgba(15,30,45,0.08)] backdrop-blur-md sm:p-8">
          <div className="absolute right-0 top-0 h-28 w-28 translate-x-1/3 -translate-y-1/3 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="relative space-y-5">
            <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.28em] text-sky-600">
              Logic sprint
            </p>
            <h2 className="max-w-md text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              Read the mirror, beat the clock, and clear the board.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Each round shows a flipped number. Enter the original value, keep your streak alive, and
              finish all six before the timer runs out.
            </p>
          </div>

          <div className="relative mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-4 shadow-sm">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-sky-600">
                Round style
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Six fast mirrored challenges</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-emerald-600">
                Timer
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">120 seconds to finish strong</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-amber-600">
                Feedback
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Instant, clear, and readable</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Replay
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">One click to start again</p>
            </div>
          </div>
        </aside>

        <div className="flex justify-center">
          <Updowngame />
        </div>
      </section>
    </main>
  )
}
