'use client';

import { ArrowRight, Book, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { RepositoryCard } from '@/components/profile/repository-card';
import { RepositoryModal } from '@/components/profile/repository-modal';
import { EmptyState } from '@/components/ui/empty-state';
import type { GithubRepository } from '@/types/github-profile.types';

interface RepositoryListProps {
  repositories: GithubRepository[];
  githubUrl: string;
}

export function RepositoryList({
  repositories,
  githubUrl,
}: RepositoryListProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<GithubRepository | null>(null);

  const scroll = (direction: 'prev' | 'next') => {
    const node = carouselRef.current;
    if (!node) {
      return;
    }
    const amount = node.clientWidth * 0.8;
    node.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  const selectedIndex = selected
    ? repositories.findIndex((repo) => repo.id === selected.id)
    : -1;

  return (
    <section
      aria-label="Repositorios públicos"
      className="relative animate-fade-in rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-surface-dark"
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Book className="h-5 w-5" />
          </span>
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-gray-900 dark:text-white">
            Repositorios públicos
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600 dark:bg-gray-800 dark:text-indigo-400">
              {repositories.length}
            </span>
          </h2>
        </div>
        <a
          href={`${githubUrl}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400 sm:text-sm"
        >
          Ver todos los repositorios
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {repositories.length === 0 ? (
        <EmptyState
          title="Sin repositorios públicos"
          description="Este usuario todavía no tiene repositorios públicos para mostrar."
        />
      ) : (
        <div className="group/carousel relative">
          <button
            type="button"
            onClick={() => scroll('prev')}
            aria-label="Repositorios anteriores"
            className="absolute -left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-800 opacity-90 shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-indigo-600 hover:text-white group-hover/carousel:opacity-100 dark:border-gray-700 dark:bg-gray-900/90 dark:text-white dark:hover:border-indigo-500 dark:hover:bg-indigo-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => scroll('next')}
            aria-label="Repositorios siguientes"
            className="absolute -right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-800 opacity-90 shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-indigo-600 hover:text-white group-hover/carousel:opacity-100 dark:border-gray-700 dark:bg-gray-900/90 dark:text-white dark:hover:border-indigo-500 dark:hover:bg-indigo-600"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2 pt-1 scrollbar-none"
          >
            {repositories.map((repository, index) => (
              <RepositoryCard
                key={repository.id}
                repository={repository}
                index={index}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>
      )}

      {selected && (
        <RepositoryModal
          repository={selected}
          index={selectedIndex < 0 ? 0 : selectedIndex}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
