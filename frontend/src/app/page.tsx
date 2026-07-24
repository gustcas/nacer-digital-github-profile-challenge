'use client';

import { useCallback, useEffect, useState } from 'react';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ProfileCard } from '@/components/profile/profile-card';
import { ProfileStats } from '@/components/profile/profile-stats';
import { RepositoryList } from '@/components/profile/repository-list';
import { TechStack } from '@/components/profile/tech-stack';
import { ErrorState } from '@/components/ui/error-state';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { githubProfileService } from '@/services/github-profile.service';
import {
  ApiError,
  type GithubProfile,
  type GithubRepository,
} from '@/types/github-profile.types';

const DEFAULT_USERNAME = 'gustcas';

interface ErrorInfo {
  statusCode: number;
  message: string;
}

export default function HomePage() {
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repositories, setRepositories] = useState<GithubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorInfo | null>(null);

  const loadProfile = useCallback(async (target: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const [profileData, repositoriesData] = await Promise.all([
        githubProfileService.getProfile(target),
        githubProfileService
          .getRepositories(target)
          .catch(() => [] as GithubRepository[]),
      ]);
      setProfile(profileData);
      setRepositories(repositoriesData);
    } catch (err) {
      const statusCode = err instanceof ApiError ? err.statusCode : 0;
      const message =
        err instanceof ApiError
          ? err.message
          : 'Ocurrió un error inesperado. Inténtalo de nuevo.';
      setError({ statusCode, message });
      setProfile(null);
      setRepositories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProfile(DEFAULT_USERNAME);
  }, [loadProfile]);

  const handleSearch = useCallback(
    (nextUsername: string) => {
      setUsername(nextUsername);
      void loadProfile(nextUsername);
    },
    [loadProfile],
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        initialUsername={username}
        isLoading={isLoading}
        onSearch={handleSearch}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {isLoading && <LoadingSkeleton />}

        {!isLoading && error && (
          <ErrorState
            statusCode={error.statusCode}
            message={error.message}
            onRetry={() => loadProfile(username)}
          />
        )}

        {!isLoading && !error && profile && (
          <>
            <ProfileCard profile={profile} />
            <ProfileStats profile={profile} />
            <RepositoryList
              repositories={repositories}
              githubUrl={profile.githubUrl}
            />
            <TechStack repositories={repositories} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
