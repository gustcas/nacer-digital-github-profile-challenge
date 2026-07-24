import { Code } from 'lucide-react';
import { getLanguageColor } from '@/lib/utils';
import type { GithubRepository } from '@/types/github-profile.types';

interface TechStackProps {
  repositories: GithubRepository[];
}

/**
 * Technologies are derived exclusively from the languages of the user's
 * real repositories. No hardcoded or invented data is shown.
 */
export function TechStack({ repositories }: TechStackProps) {
  const languages = Array.from(
    new Set(
      repositories
        .map((repository) => repository.language)
        .filter((language): language is string => Boolean(language)),
    ),
  );

  if (languages.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Tecnologías"
      className="animate-fade-in rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-surface-dark"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <Code className="h-5 w-5" />
        </span>
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
          Tecnologías
        </h2>
      </div>

      <ul className="flex flex-wrap gap-2">
        {languages.map((language) => (
          <li
            key={language}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-xs font-semibold text-gray-700 transition-all hover:scale-105 hover:border-indigo-300 hover:bg-white dark:border-gray-800 dark:bg-canvas-dark dark:text-gray-300 dark:hover:border-indigo-500/50"
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(language)}`}
              aria-hidden="true"
            />
            {language}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] text-gray-400 dark:text-gray-500">
        Derivadas de los lenguajes de los repositorios públicos.
      </p>
    </section>
  );
}
