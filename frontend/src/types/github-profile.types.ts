/**
 * Mirrors the normalized response of the NestJS backend
 * (GithubUserResponseDto). The frontend never talks to GitHub directly,
 * so these types describe the BFF contract only.
 */
export interface GithubProfile {
  username: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  githubUrl: string;
  createdAt: string;
  updatedAt: string;
}

/** Mirrors GithubRepositoryResponseDto from the backend. */
export interface GithubRepository {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  createdAt: string;
  updatedAt: string;
}

/** Consistent error body returned by the backend's global filter. */
export interface ApiErrorBody {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}

/** Discriminated error type surfaced to the UI. */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
