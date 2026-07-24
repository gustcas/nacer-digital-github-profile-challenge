import {
  Building2,
  Calendar,
  ExternalLink,
  Link as LinkIcon,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import { formatDate, normalizeBlogUrl, stripProtocol } from '@/lib/utils';
import type { GithubProfile } from '@/types/github-profile.types';

interface ProfileCardProps {
  profile: GithubProfile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const displayName = profile.name ?? profile.username;

  return (
    <section
      aria-label="Perfil de GitHub"
      className="relative animate-fade-in overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all md:p-8 dark:border-gray-800 dark:bg-surface-dark"
    >
      <div className="pointer-events-none absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:gap-8">
        <div className="flex-shrink-0">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-gray-100 shadow-md md:h-36 md:w-36 dark:border-gray-800">
            <Image
              src={profile.avatarUrl}
              alt={`Avatar de ${displayName}`}
              width={144}
              height={144}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        <div className="w-full flex-1 space-y-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">
                {profile.username}
              </h1>
              {profile.name && (
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                  {profile.name}
                </p>
              )}
            </div>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-100 dark:border-indigo-500/30 dark:bg-indigo-600/20 dark:text-indigo-300 dark:hover:bg-indigo-600/30"
            >
              <ExternalLink className="h-4 w-4" />
              Ver en GitHub
            </a>
          </div>

          {profile.bio && (
            <p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {profile.bio}
            </p>
          )}

          <dl className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs font-medium md:text-sm">
            {profile.location && (
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <MapPin className="h-4 w-4 text-indigo-500" />
                <dt className="sr-only">Ubicación</dt>
                <dd>{profile.location}</dd>
              </div>
            )}
            {profile.company && (
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <Building2 className="h-4 w-4 text-indigo-500" />
                <dt className="sr-only">Empresa</dt>
                <dd>{profile.company}</dd>
              </div>
            )}
            {profile.blog && (
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <LinkIcon className="h-4 w-4 text-indigo-500" />
                <dt className="sr-only">Sitio web</dt>
                <dd>
                  <a
                    href={normalizeBlogUrl(profile.blog)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="max-w-[220px] truncate transition-colors hover:text-indigo-500 hover:underline"
                  >
                    {stripProtocol(profile.blog)}
                  </a>
                </dd>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4 text-indigo-500" />
              <dt className="sr-only">Fecha de creación</dt>
              <dd>Se unió el {formatDate(profile.createdAt)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
