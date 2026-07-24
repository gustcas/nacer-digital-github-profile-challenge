import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  GatewayTimeoutException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom, timeout, TimeoutError } from 'rxjs';
import { GithubRepositoryAdapter } from '../adapters/github-repository.adapter';
import { GithubUserAdapter } from '../adapters/github-user.adapter';
import { GithubRepositoryResponseDto } from '../dto/github-repository-response.dto';
import { GithubUserResponseDto } from '../dto/github-user-response.dto';
import { GithubApiRepository } from '../interfaces/github-api-repository.interface';
import { GithubApiUser } from '../interfaces/github-api-user.interface';

const GITHUB_API_BASE_URL = 'https://api.github.com';
const REQUEST_TIMEOUT_MS = 5000;

/**
 * Encapsulates all communication with the GitHub public API.
 * The controller depends on this service; the service depends on the
 * adapters to produce the normalized DTOs (Controller-Service pattern).
 */
@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly userAdapter: GithubUserAdapter,
    private readonly repositoryAdapter: GithubRepositoryAdapter,
  ) {}

  async getUser(username: string): Promise<GithubUserResponseDto> {
    const user = await this.request<GithubApiUser>(
      `/users/${encodeURIComponent(username)}`,
    );
    return this.userAdapter.toDto(user);
  }

  async getRepositories(
    username: string,
  ): Promise<GithubRepositoryResponseDto[]> {
    const repositories = await this.request<GithubApiRepository[]>(
      `/users/${encodeURIComponent(username)}/repos`,
      { params: { per_page: 100, sort: 'updated', type: 'owner' } },
    );
    return this.repositoryAdapter.toDtoList(repositories);
  }

  /**
   * Performs a GET request to GitHub with a hard timeout and maps any
   * failure to a safe HTTP exception. Raw Axios errors never leak out.
   */
  private async request<T>(
    path: string,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    const url = `${GITHUB_API_BASE_URL}${path}`;

    const response$ = this.httpService
      .get<T>(url, { ...config, headers: this.buildHeaders() })
      .pipe(
        timeout(REQUEST_TIMEOUT_MS),
        catchError((error: unknown) => {
          throw this.mapError(error);
        }),
      );

    const { data } = await firstValueFrom(response$);
    return data;
  }

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'nacer-digital-github-profile-challenge',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    const token = this.configService.get<string>('GITHUB_TOKEN');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Maps external/transport errors to consistent HTTP exceptions.
   * - GitHub 404            -> 404 Not Found
   * - GitHub 403 / 429      -> 429 Too Many Requests (rate limit)
   * - Timeout               -> 504 Gateway Timeout
   * - Network / other       -> 502 Bad Gateway
   */
  private mapError(error: unknown): HttpException {
    if (error instanceof TimeoutError) {
      this.logger.warn('GitHub request timed out');
      return new GatewayTimeoutException(
        'The request to GitHub timed out. Please try again.',
      );
    }

    const axiosError = error as AxiosError;
    const status = axiosError?.response?.status;

    if (status === HttpStatus.NOT_FOUND) {
      return new NotFoundException('GitHub user not found');
    }

    if (
      status === HttpStatus.FORBIDDEN ||
      status === HttpStatus.TOO_MANY_REQUESTS
    ) {
      this.logger.warn('GitHub rate limit reached');
      return new HttpException(
        'GitHub API rate limit exceeded. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    this.logger.error(
      `Unexpected GitHub error: ${axiosError?.message ?? 'unknown'}`,
    );
    return new BadGatewayException(
      'Unable to reach the GitHub API. Please try again later.',
    );
  }
}
