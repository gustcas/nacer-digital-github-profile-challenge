import { Activity, Code2, Layers, Smartphone, Sparkles } from 'lucide-react';

interface RepoBannerProps {
  index: number;
  language: string | null;
}

const THEME_COUNT = 6;

/**
 * Decorative, deterministic banner rendered at the top of each repository
 * card — purely visual (gradients + abstract shapes). The only textual data
 * shown is the repository's real primary language; no fabricated project
 * content is displayed.
 */
export function RepoBanner({ index, language }: RepoBannerProps) {
  const theme = index % THEME_COUNT;
  const label = language ?? 'Repositorio';

  switch (theme) {
    case 0:
      return (
        <div className="relative flex h-40 w-full items-center justify-between overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-950 p-4 transition-transform duration-500 group-hover:scale-105">
          <div className="z-10 max-w-[55%] space-y-2 text-white">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider opacity-90">
              <Smartphone className="h-3.5 w-3.5 text-indigo-300" />
              <span>{label}</span>
            </div>
            <div className="flex gap-1.5 pt-1">
              <span className="h-6 w-6 rounded-lg bg-white/20 backdrop-blur" />
              <span className="h-6 w-6 rounded-lg bg-white/20 backdrop-blur" />
              <span className="h-6 w-6 rounded-lg bg-white/20 backdrop-blur" />
            </div>
          </div>
          <div className="relative h-32 w-24 -translate-y-1 rotate-6 rounded-2xl border-2 border-indigo-400/40 bg-gray-900 p-2 shadow-2xl transition-all duration-500 group-hover:rotate-0">
            <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-gray-700" />
            <div className="space-y-1 rounded-lg bg-indigo-600/30 p-2">
              <div className="h-2 w-10 rounded bg-indigo-400/50" />
              <div className="h-3 w-14 rounded bg-white/40" />
              <div className="grid grid-cols-2 gap-1 pt-1">
                <div className="h-4 rounded bg-purple-500/40" />
                <div className="h-4 rounded bg-purple-500/40" />
              </div>
            </div>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="relative flex h-40 w-full items-center justify-between overflow-hidden bg-gradient-to-br from-emerald-950 via-gray-900 to-black p-4 transition-transform duration-500 group-hover:scale-105">
          <div className="z-10 max-w-[50%] space-y-1 text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-black">
                {label.charAt(0).toUpperCase()}
              </span>
              <span className="text-sm font-bold tracking-tight text-emerald-300">
                {label}
              </span>
            </div>
          </div>
          <div className="relative h-32 w-28 -translate-y-1 -rotate-3 rounded-2xl border border-emerald-500/30 bg-gray-900 p-2 shadow-2xl transition-all duration-500 group-hover:rotate-0">
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-slate-800/80 p-1.5">
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] opacity-20 [background-size:8px_8px]" />
              <div className="mx-auto mt-8 h-3 w-3 animate-ping rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="relative flex h-40 w-full items-center justify-between overflow-hidden bg-gradient-to-br from-slate-100 via-indigo-50 to-blue-100 p-4 transition-transform duration-500 group-hover:scale-105 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
          <div className="z-10 max-w-[50%] space-y-2">
            <div className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">
              <Code2 className="h-3 w-3" />
              {label}
            </div>
          </div>
          <div className="h-28 w-24 translate-x-1 translate-y-1 space-y-2 rounded-xl border border-indigo-200 bg-white p-2 shadow-xl transition-all duration-500 group-hover:translate-x-0 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-8 w-full items-end gap-1 rounded bg-indigo-100 p-1 dark:bg-indigo-950">
              <div className="h-[40%] w-1/4 rounded-t bg-indigo-400" />
              <div className="h-[70%] w-1/4 rounded-t bg-indigo-500" />
              <div className="h-[50%] w-1/4 rounded-t bg-indigo-400" />
              <div className="h-[90%] w-1/4 rounded-t bg-indigo-600" />
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="relative flex h-40 w-full items-center justify-between overflow-hidden bg-gradient-to-br from-cyan-950 via-teal-900 to-slate-900 p-4 transition-transform duration-500 group-hover:scale-105">
          <div className="z-10 max-w-[55%] space-y-2 text-white">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
              <Activity className="h-4 w-4 animate-pulse text-cyan-400" />
              <span>{label}</span>
            </div>
          </div>
          <div className="flex h-28 w-24 -translate-y-1 -rotate-3 flex-col justify-between rounded-xl border border-cyan-500/30 bg-slate-900/90 p-2 shadow-xl transition-all duration-500 group-hover:rotate-0">
            <div className="rounded border border-cyan-800 bg-cyan-950 p-1 font-mono text-[8px] text-cyan-300">
              &gt; build
            </div>
            <div className="rounded border border-teal-700 bg-teal-900/60 p-1 font-mono text-[8px] text-teal-200">
              &gt; deploy
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-cyan-500/40">
              <div className="h-full w-2/3 animate-pulse bg-cyan-400" />
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="relative flex h-40 w-full items-center justify-between overflow-hidden bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950 p-4 transition-transform duration-500 group-hover:scale-105">
          <div className="z-10 max-w-[55%] space-y-2 text-white">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>{label}</span>
            </div>
          </div>
          <div className="flex h-28 w-28 translate-y-1 flex-col gap-1.5 rounded-xl border border-purple-500/30 bg-gray-900 p-2 shadow-xl transition-all duration-500 group-hover:translate-y-0">
            <div className="h-3 w-14 rounded bg-purple-500/40" />
            <div className="h-2 w-20 rounded bg-gray-700" />
            <div className="mt-1 grid grid-cols-2 gap-1">
              <div className="h-10 rounded border border-purple-500/20 bg-purple-900/30" />
              <div className="h-10 rounded border border-indigo-500/20 bg-indigo-900/30" />
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="relative flex h-40 w-full items-center justify-between overflow-hidden bg-gradient-to-br from-orange-950 via-amber-900 to-gray-900 p-4 transition-transform duration-500 group-hover:scale-105">
          <div className="z-10 max-w-[55%] space-y-2 text-white">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <Layers className="h-4 w-4 text-amber-400" />
              <span>{label}</span>
            </div>
          </div>
          <div className="flex h-28 w-24 translate-y-1 rotate-3 flex-col justify-between rounded-xl border border-amber-500/30 bg-gray-900 p-2 shadow-xl transition-all duration-500 group-hover:rotate-0">
            <div className="grid grid-cols-3 gap-1">
              <div className="h-6 rounded bg-amber-500/30" />
              <div className="h-6 rounded bg-amber-500/20" />
              <div className="h-6 rounded bg-amber-500/30" />
            </div>
            <div className="rounded bg-amber-500/80 py-1 text-center text-[8px] font-bold text-black">
              {label}
            </div>
          </div>
        </div>
      );
  }
}
