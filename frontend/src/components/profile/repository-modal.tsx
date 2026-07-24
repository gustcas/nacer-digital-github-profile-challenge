'use client';

import { Calendar, ExternalLink, GitBranch, Github, Star, X } from 'lucide-react';
import { useEffect } from 'react';
import { RepoBanner } from '@/components/profile/repo-banner';
import { formatDate, getLanguageColor, normalizeBlogUrl } from '@/lib/utils';
import type { GithubRepository } from '@/types/github-profile.types';

interface RepositoryModalProps {
  repository: GithubRepository;
  index: number;
  onClose: () => void;
}

export function RepositoryModal({
  repository,
  index,
  onClose,
}: RepositoryModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Detalles de ${repository.name}`}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-2xl dark:border-gray-800 dark:bg-surface-dark dark:text-white"
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <span
              className={`h-3 w-3 rounded-full ${getLanguageColor(repository.language)}`}
            />
            <div>
              <h3 className="text-xl font-bold">{repository.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {repository.language ?? 'Sin lenguaje principal'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-xl p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[75vh] space-y-6 overflow-y-auto p-6">
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            <RepoBanner index={index} language={repository.language} />
          </div>

          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-500">
              Descripción del proyecto
            </h4>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {repository.description ?? 'Este repositorio no tiene descripción.'}
            </p>
          </div>

          {repository.topics.length > 0 && (
            <div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-indigo-500">
                Temas ({repository.topics.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {repository.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-lg border border-gray-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:border-gray-800 dark:bg-canvas-dark dark:text-gray-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-slate-50 p-3 text-xs font-semibold text-gray-700 dark:border-gray-800 dark:bg-canvas-dark dark:text-gray-300">
              <Calendar className="h-4 w-4 text-indigo-500" />
              Creado el {formatDate(repository.createdAt)}
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-slate-50 p-3 text-xs font-semibold text-gray-700 dark:border-gray-800 dark:bg-canvas-dark dark:text-gray-300">
              <Calendar className="h-4 w-4 text-indigo-500" />
              Actualizado el {formatDate(repository.updatedAt)}
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2 text-sm font-semibold">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {repository.stars} Stars
            </span>
            <span className="flex items-center gap-1.5">
              <GitBranch className="h-4 w-4 text-indigo-400" />
              {repository.forks} Forks
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-canvas-dark">
          <a
            href={repository.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-xs font-bold transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <Github className="h-4 w-4" />
            Ver código
          </a>
          {repository.homepage && (
            <a
              href={normalizeBlogUrl(repository.homepage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-indigo-500"
            >
              <ExternalLink className="h-4 w-4" />
              Ver demo en vivo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
