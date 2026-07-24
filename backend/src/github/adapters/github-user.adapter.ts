import { Injectable } from '@nestjs/common';
import { GithubUserResponseDto } from '../dto/github-user-response.dto';
import { GithubApiUser } from '../interfaces/github-api-user.interface';

/**
 * Adapter Pattern: translates the raw GitHub user payload into the
 * internal, frontend-facing DTO. Keeping this mapping isolated means the
 * rest of the application never depends on GitHub's response shape.
 */
@Injectable()
export class GithubUserAdapter {
  toDto(user: GithubApiUser): GithubUserResponseDto {
    return {
      username: user.login,
      name: user.name ?? null,
      avatarUrl: user.avatar_url,
      bio: user.bio ?? null,
      location: user.location ?? null,
      company: user.company ?? null,
      blog: user.blog ? user.blog : null,
      publicRepos: user.public_repos,
      publicGists: user.public_gists,
      followers: user.followers,
      following: user.following,
      githubUrl: user.html_url,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }
}
