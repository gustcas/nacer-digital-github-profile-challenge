import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  GatewayTimeoutException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of, throwError, TimeoutError } from 'rxjs';
import { GithubRepositoryAdapter } from '../adapters/github-repository.adapter';
import { GithubUserAdapter } from '../adapters/github-user.adapter';
import { GithubApiUser } from '../interfaces/github-api-user.interface';
import { GithubService } from './github.service';

const axiosResponse = <T>(data: T): AxiosResponse<T> =>
  ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: { headers: {} },
  }) as AxiosResponse<T>;

const rawUser: GithubApiUser = {
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

describe('GithubService', () => {
  let service: GithubService;
  let httpGet: jest.Mock;
  let configGet: jest.Mock;

  beforeEach(async () => {
    httpGet = jest.fn();
    configGet = jest.fn().mockReturnValue(undefined);

    const moduleRef = await Test.createTestingModule({
      providers: [
        GithubService,
        GithubUserAdapter,
        GithubRepositoryAdapter,
        { provide: HttpService, useValue: { get: httpGet } },
        { provide: ConfigService, useValue: { get: configGet } },
      ],
    }).compile();

    service = moduleRef.get(GithubService);
  });

  describe('getUser', () => {
    it('returns a normalized user on success', async () => {
      httpGet.mockReturnValue(of(axiosResponse(rawUser)));

      const result = await service.getUser('gustcas');

      expect(result.username).toBe('gustcas');
      expect(result.avatarUrl).toBe(rawUser.avatar_url);
      expect(result.publicRepos).toBe(20);
      expect(httpGet).toHaveBeenCalledWith(
        'https://api.github.com/users/gustcas',
        expect.objectContaining({
          headers: expect.objectContaining({
            Accept: 'application/vnd.github+json',
            'User-Agent': 'nacer-digital-github-profile-challenge',
          }),
        }),
      );
    });

    it('sends an Authorization header only when a token is configured', async () => {
      configGet.mockReturnValue('secret-token');
      httpGet.mockReturnValue(of(axiosResponse(rawUser)));

      await service.getUser('gustcas');

      const headers = httpGet.mock.calls[0][1].headers as Record<
        string,
        string
      >;
      expect(headers.Authorization).toBe('Bearer secret-token');
    });

    it('maps a GitHub 404 to NotFoundException', async () => {
      httpGet.mockReturnValue(
        throwError(() => ({ response: { status: HttpStatus.NOT_FOUND } })),
      );

      await expect(service.getUser('ghost')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('maps a GitHub 403 rate limit to HTTP 429', async () => {
      httpGet.mockReturnValue(
        throwError(() => ({ response: { status: HttpStatus.FORBIDDEN } })),
      );

      await expect(service.getUser('gustcas')).rejects.toMatchObject({
        status: HttpStatus.TOO_MANY_REQUESTS,
      });
    });

    it('maps a timeout to GatewayTimeoutException', async () => {
      httpGet.mockReturnValue(throwError(() => new TimeoutError()));

      await expect(service.getUser('gustcas')).rejects.toBeInstanceOf(
        GatewayTimeoutException,
      );
    });

    it('maps a network error to BadGatewayException', async () => {
      httpGet.mockReturnValue(throwError(() => ({ message: 'ECONNREFUSED' })));

      await expect(service.getUser('gustcas')).rejects.toBeInstanceOf(
        BadGatewayException,
      );
    });
  });

  describe('getRepositories', () => {
    it('returns at most 6 repositories sorted by update date', async () => {
      const repos = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        name: `repo-${i}`,
        description: null,
        html_url: `https://github.com/gustcas/repo-${i}`,
        language: 'TypeScript',
        stargazers_count: i,
        forks_count: 0,
        updated_at: `2026-01-0${(i % 9) + 1}T00:00:00Z`,
        fork: false,
      }));
      httpGet.mockReturnValue(of(axiosResponse(repos)));

      const result = await service.getRepositories('gustcas');

      expect(result).toHaveLength(6);
      expect(httpGet).toHaveBeenCalledWith(
        'https://api.github.com/users/gustcas/repos',
        expect.objectContaining({
          params: { per_page: 100, sort: 'updated', type: 'owner' },
        }),
      );
    });
  });
});
