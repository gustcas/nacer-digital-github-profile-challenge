function Shimmer({ className }: { className: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10" />
    </div>
  );
}

/** Skeleton placeholder shown while the profile is loading. */
export function LoadingSkeleton() {
  return (
    <div
      className="space-y-8"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Cargando perfil…</span>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 dark:border-gray-800 dark:bg-surface-dark">
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          <Shimmer className="h-28 w-28 rounded-full md:h-36 md:w-36" />
          <div className="flex-1 space-y-4">
            <Shimmer className="h-8 w-48" />
            <Shimmer className="h-4 w-32" />
            <Shimmer className="h-4 w-full max-w-lg" />
            <Shimmer className="h-4 w-40" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Shimmer key={index} className="h-20" />
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-surface-dark">
        <Shimmer className="mb-6 h-6 w-56" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Shimmer key={index} className="h-40" />
          ))}
        </div>
      </div>
    </div>
  );
}
