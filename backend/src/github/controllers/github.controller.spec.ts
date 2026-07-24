import { Test } from '@nestjs/testing';
import { GithubUserResponseDto } from '../dto/github-user-response.dto';
import { GithubRepositoryResponseDto } from '../dto/github-repository-response.dto';
import { GithubService } from '../services/github.service';
import { GithubController } from './github.controller';

describe('GithubController', () => {
  let controller: GithubController;
  let getUser: jest.Mock;
  let getRepositories: jest.Mock;

  const userDto: GithubUserResponseDto = {
    username: 'gustcas',
    name: 'Gustavo Pachacama',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
    bio: null,
    location: 'Ecuador',
    company: null,
    blog: null,
    publicRepos: 20,
    publicGists: 5,
    followers: 35,
    following: 50,
    githubUrl: 'https://github.com/gustcas',
    createdAt: '2019-09-24T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  };

  beforeEach(async () => {
    getUser = jest.fn();
    getRepositories = jest.fn();

    const moduleRef = await Test.createTestingModule({
      controllers: [GithubController],
      providers: [
        { provide: GithubService, useValue: { getUser, getRepositories } },
      ],
    }).compile();

    controller = moduleRef.get(GithubController);
  });

  it('delegates getUser to the service with the validated username', async () => {
    getUser.mockResolvedValue(userDto);

    const result = await controller.getUser({ username: 'gustcas' });

    expect(getUser).toHaveBeenCalledWith('gustcas');
    expect(result).toBe(userDto);
  });

  it('delegates getRepositories to the service', async () => {
    const repos: GithubRepositoryResponseDto[] = [];
    getRepositories.mockResolvedValue(repos);

    const result = await controller.getRepositories({ username: 'gustcas' });

    expect(getRepositories).toHaveBeenCalledWith('gustcas');
    expect(result).toBe(repos);
  });
});
