import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center dark:border-gray-700 dark:bg-canvas-dark">
      <span className="mb-3 rounded-full bg-gray-100 p-3 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
        <FolderOpen className="h-6 w-6" />
      </span>
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {title}
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
