import { Book, Github, Terminal } from 'lucide-react';

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
).replace(/\/$/, '');

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/gustcas',
    icon: Github,
  },
  {
    label: 'Backend API',
    href: API_URL,
    icon: Terminal,
  },
  {
    label: 'Documentación (Swagger)',
    href: `${API_URL}/api/docs`,
    icon: Book,
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white py-10 transition-colors dark:border-gray-800/80 dark:bg-canvas-dark">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-base font-bold text-gray-900 dark:text-white">
                GitHub Profile Viewer
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Aplicación desarrollada como parte del reto técnico de Nacer
              Digital.
            </p>
          </div>

          <nav aria-label="Enlaces del proyecto" className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Enlaces
            </h2>
            <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 transition-colors hover:text-indigo-500"
                  >
                    <link.icon className="h-3.5 w-3.5" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Información
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Los datos provienen de la API pública de GitHub, consumida a
              través del backend en NestJS.
            </p>
            <p className="pt-2 text-xs text-gray-500">
              Autor:{' '}
              <a
                href="https://github.com/gustcas"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Gustavo Pachacama
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
