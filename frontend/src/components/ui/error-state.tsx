import { AlertTriangle, RefreshCw, SearchX, TimerReset } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ErrorStateProps {
  statusCode: number;
  message: string;
  onRetry: () => void;
}

function resolveVisuals(statusCode: number): {
  icon: LucideIcon;
  title: string;
} {
  if (statusCode === 404) {
    return { icon: SearchX, title: 'Usuario no encontrado' };
  }
  if (statusCode === 429) {
    return { icon: TimerReset, title: 'Límite de peticiones alcanzado' };
  }
  return { icon: AlertTriangle, title: 'Algo salió mal' };
}

export function ErrorState({ statusCode, message, onRetry }: ErrorStateProps) {
  const { icon: Icon, title } = resolveVisuals(statusCode);

  return (
    <div
      role="alert"
      className="flex animate-fade-in flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm dark:border-gray-800 dark:bg-surface-dark"
    >
      <span className="mb-4 rounded-full bg-red-50 p-4 text-red-500 dark:bg-red-500/10">
        <Icon className="h-8 w-8" />
      </span>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
      >
        <RefreshCw className="h-4 w-4" />
        Reintentar
      </button>
    </div>
  );
}
