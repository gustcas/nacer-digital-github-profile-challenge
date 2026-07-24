import { Book, Star, UserPlus, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { GithubProfile } from '@/types/github-profile.types';

interface ProfileStatsProps {
  profile: GithubProfile;
}

interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export function ProfileStats({ profile }: ProfileStatsProps) {
  const stats: Stat[] = [
    {
      label: 'Repositorios públicos',
      value: profile.publicRepos,
      icon: Book,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-500/10',
    },
    {
      label: 'Seguidores',
      value: profile.followers,
      icon: Users,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      label: 'Siguiendo',
      value: profile.following,
      icon: UserPlus,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-500/10',
    },
    {
      label: 'Gists públicos',
      value: profile.publicGists,
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
    },
  ];

  return (
    <section
      aria-label="Estadísticas del perfil"
      className="grid animate-fade-in grid-cols-2 gap-4 md:grid-cols-4"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-surface-dark"
        >
          <span className={`rounded-xl p-3 ${stat.bg}`}>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </span>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
