import { ArrowRight, GitBranch, Github, Star } from 'lucide-react';
import { getLanguageColor } from '@/lib/utils';
import { RepoBanner } from '@/components/profile/repo-banner';
import type { GithubRepository } from '@/types/github-profile.types';

interface RepositoryCardProps {
  repository: GithubRepository;
  index: number;
  onSelect: (repository: GithubRepository) => void;
}

export function RepositoryCard({
  repository,
  index,
  onSelect,
}: RepositoryCardProps) {
  return (
    <article className="group flex w-[290px] flex-shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl sm:w-[320px] dark:border-gray-800 dark:bg-canvas-dark dark:hover:border-indigo-500/50">
      <div>
        <button
          type="button"
          onClick={() => onSelect(repository)}
          aria-label={`Ver detalles de ${repository.name}`}
          className="relative block w-full cursor-pointer overflow-hidden text-left"
        >
          <RepoBanner index={index} language={repository.language} />
          <span className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/60 px-2.5 py-1 text-xs font-bold text-white shadow-md backdrop-blur-md">
            <span
              className={`h-2 w-2 rounded-full ${getLanguageColor(repository.language)}`}
            />
            {repository.language ?? 'N/D'}
          </span>
        </button>

        <div className="space-y-2 p-4">
          <button
            type="button"
            onClick={() => onSelect(repository)}
            className="block max-w-full truncate text-left text-base font-bold text-indigo-600 transition-colors hover:text-indigo-800 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {repository.name}
          </button>
          <p className="line-clamp-2 min-h-[32px] text-xs leading-relaxed text-gray-600 dark:text-gray-400">
            {repository.description ?? 'Sin descripción disponible.'}
          </p>
        </div>
      </div>

      <div className="space-y-3 px-4 pb-4 pt-2">
        <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs font-semibold dark:border-gray-800/60">
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(repository.language)}`}
            />
            <span className="text-gray-700 dark:text-gray-300">
              {repository.language ?? 'N/D'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {repository.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitBranch className="h-3.5 w-3.5" />
              {repository.forks}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => onSelect(repository)}
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Ver detalles <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <a
            href={repository.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver ${repository.name} en GitHub`}
            title="Ver en GitHub"
            className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
