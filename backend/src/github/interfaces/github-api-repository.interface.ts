/**
 * Shape of the relevant fields returned by
 * GET https://api.github.com/users/:username/repos.
 * Only the properties consumed by the adapter are declared.
 */
export interface GithubApiRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  fork: boolean;
}
