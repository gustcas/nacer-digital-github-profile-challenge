/**
 * Shape of the relevant fields returned by GET https://api.github.com/users/:username.
 * Only the properties consumed by the adapter are declared.
 */
export interface GithubApiUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
  updated_at: string;
}
