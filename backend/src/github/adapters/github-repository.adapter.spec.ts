import { GithubRepositoryAdapter } from './github-repository.adapter';
import { GithubApiRepository } from '../interfaces/github-api-repository.interface';

const makeRepo = (
  overrides: Partial<GithubApiRepository>,
): GithubApiRepository => ({
  id: 1,
  name: 'repo',
  description: 'desc',
  html_url: 'https://github.com/gustcas/repo',
  homepage: null,
  language: 'TypeScript',
  topics: [],
  stargazers_count: 0,
  forks_count: 0,
  created_at: '2020-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
  fork: false,
  ...overrides,
});

describe('GithubRepositoryAdapter', () => {
  const adapter = new GithubRepositoryAdapter();

  it('sorts by most recently updated and caps at 6 repositories', () => {
    const repos = Array.from({ length: 10 }, (_, i) =>
      makeRepo({
        id: i,
        name: `repo-${i}`,
        updated_at: `2026-01-${String(i + 1).padStart(2, '0')}T00:00:00Z`,
      }),
    );

    const result = adapter.toDtoList(repos);

    expect(result).toHaveLength(6);
    expect(result[0].name).toBe('repo-9');
    expect(result[5].name).toBe('repo-4');
  });

  it('maps repository fields and normalizes null description/language', () => {
    const [dto] = adapter.toDtoList([
      makeRepo({
        id: 42,
        name: 'awesome',
        description: null,
        homepage: '',
        language: null,
        topics: ['nestjs', 'nextjs'],
        stargazers_count: 12,
        forks_count: 3,
      }),
    ]);

    expect(dto).toEqual({
      id: 42,
      name: 'awesome',
      description: null,
      htmlUrl: 'https://github.com/gustcas/repo',
      homepage: null,
      language: null,
      topics: ['nestjs', 'nextjs'],
      stars: 12,
      forks: 3,
      createdAt: '2020-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    });
  });
});
