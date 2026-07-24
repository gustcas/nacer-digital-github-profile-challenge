import { GithubUserAdapter } from './github-user.adapter';
import { GithubApiUser } from '../interfaces/github-api-user.interface';

describe('GithubUserAdapter', () => {
  const adapter = new GithubUserAdapter();

  const baseUser: GithubApiUser = {
    login: 'gustcas',
    name: 'Gustavo Pachacama',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    bio: 'Full Stack Developer',
    location: 'Ecuador',
    company: null,
    blog: 'https://example.com',
    public_repos: 20,
    public_gists: 5,
    followers: 35,
    following: 50,
    html_url: 'https://github.com/gustcas',
    created_at: '2019-09-24T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  };

  it('maps the raw GitHub payload to the internal DTO', () => {
    const dto = adapter.toDto(baseUser);

    expect(dto).toEqual({
      username: 'gustcas',
      name: 'Gustavo Pachacama',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
      bio: 'Full Stack Developer',
      location: 'Ecuador',
      company: null,
      blog: 'https://example.com',
      publicRepos: 20,
      publicGists: 5,
      followers: 35,
      following: 50,
      githubUrl: 'https://github.com/gustcas',
      createdAt: '2019-09-24T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    });
  });

  it('normalizes empty optional fields to null', () => {
    const dto = adapter.toDto({
      ...baseUser,
      name: null,
      bio: null,
      location: null,
      blog: '',
    });

    expect(dto.name).toBeNull();
    expect(dto.bio).toBeNull();
    expect(dto.location).toBeNull();
    expect(dto.blog).toBeNull();
  });
});
