'use client';

import { Search } from 'lucide-react';
import { useState, type FormEvent } from 'react';

interface SearchFormProps {
  initialValue?: string;
  isLoading: boolean;
  onSearch: (username: string) => void;
}

/**
 * Presentational search form. Validates non-empty input and disables the
 * submit button while a request is in flight.
 */
export function SearchForm({
  initialValue = '',
  isLoading,
  onSearch,
}: SearchFormProps) {
  const [value, setValue] = useState(initialValue);

  const trimmed = value.trim();
  const canSubmit = trimmed.length > 0 && !isLoading;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }
    onSearch(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="relative w-full max-w-xs"
    >
      <label htmlFor="github-username" className="sr-only">
        Buscar usuario de GitHub
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      </div>
      <input
        id="github-username"
        name="username"
        type="text"
        autoComplete="off"
        placeholder="Usuario de GitHub"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="block w-full rounded-xl border border-gray-200 bg-gray-100 py-2 pl-9 pr-20 text-sm text-gray-900 placeholder-gray-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-800 dark:bg-canvas-dark dark:text-white dark:placeholder-gray-500"
      />
      <button
        type="submit"
        disabled={!canSubmit}
        className="absolute inset-y-1 right-1 rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Buscar
      </button>
    </form>
  );
}
