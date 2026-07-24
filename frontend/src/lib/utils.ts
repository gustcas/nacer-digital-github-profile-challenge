/** Joins truthy class names. A tiny alternative to `clsx`. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Formats an ISO date into a readable Spanish long date. */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Strips the protocol prefix from a URL for display. */
export function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/** Ensures a blog value is an absolute, clickable URL. */
export function normalizeBlogUrl(blog: string): string {
  return /^https?:\/\//.test(blog) ? blog : `https://${blog}`;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-emerald-500',
  Java: 'bg-orange-600',
  'C#': 'bg-purple-600',
  'C++': 'bg-pink-500',
  Dart: 'bg-teal-400',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-500',
  Ruby: 'bg-red-500',
  PHP: 'bg-indigo-400',
  HTML: 'bg-orange-500',
  CSS: 'bg-purple-500',
  Shell: 'bg-green-500',
  Vue: 'bg-emerald-400',
  Kotlin: 'bg-violet-500',
  Swift: 'bg-orange-400',
};

/** Returns a Tailwind background class for a repository language dot. */
export function getLanguageColor(language: string | null): string {
  if (!language) {
    return 'bg-gray-400';
  }
  return LANGUAGE_COLORS[language] ?? 'bg-gray-400';
}
