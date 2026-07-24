import { Injectable } from '@nestjs/common';
import { GithubRepositoryResponseDto } from '../dto/github-repository-response.dto';
import { GithubApiRepository } from '../interfaces/github-api-repository.interface';

const MAX_REPOSITORIES = 6;

/**
 * Adapter Pattern: translates raw GitHub repository payloads into the
 * internal DTO, sorts them by most recently updated and caps the result
 * at {@link MAX_REPOSITORIES} entries.
 */
@Injectable()
export class GithubRepositoryAdapter {
  toDtoList(
    repositories: GithubApiRepository[],
  ): GithubRepositoryResponseDto[] {
    return repositories
      .slice()
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      )
      .slice(0, MAX_REPOSITORIES)
      .map((repo) => this.toDto(repo));
  }

  private toDto(repo: GithubApiRepository): GithubRepositoryResponseDto {
    return {
      id: repo.id,
      name: repo.name,
      description: repo.description ?? null,
      htmlUrl: repo.html_url,
      homepage: repo.homepage ? repo.homepage : null,
      language: repo.language ?? null,
      topics: repo.topics ?? [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
    };
  }
}
