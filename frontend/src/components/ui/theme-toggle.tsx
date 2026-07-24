'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * Accessible light/dark toggle. Renders a stable placeholder until mounted
 * to avoid a hydration mismatch between server and client themes.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={
        mounted
          ? isDark
            ? 'Activar modo claro'
            : 'Activar modo oscuro'
          : 'Cambiar tema'
      }
      className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-indigo-600 dark:border-gray-800 dark:bg-surface-dark dark:text-yellow-400 dark:hover:bg-gray-800"
    >
      {mounted && isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
