import { Github } from 'lucide-react';
import { SearchForm } from '@/components/ui/search-form';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface HeaderProps {
  initialUsername: string;
  isLoading: boolean;
  onSearch: (username: string) => void;
}

export function Header({ initialUsername, isLoading, onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-md transition-colors dark:border-gray-800/80 dark:bg-canvas-dark/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Github className="h-6 w-6" />
          </span>
          <span className="hidden text-lg font-bold tracking-tight text-gray-900 sm:block dark:text-white">
            GitHub Profile Viewer
          </span>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <SearchForm
            initialValue={initialUsername}
            isLoading={isLoading}
            onSearch={onSearch}
          />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
