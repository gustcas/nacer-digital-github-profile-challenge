import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GithubRepositoryResponseDto } from '../dto/github-repository-response.dto';
import { GithubUserResponseDto } from '../dto/github-user-response.dto';
import { GithubUsernameParamDto } from '../dto/github-username-param.dto';
import { GithubService } from '../services/github.service';

@ApiTags('GitHub')
@Controller('user')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get(':username')
  @ApiOperation({ summary: 'Get a normalized GitHub user profile' })
  @ApiParam({ name: 'username', example: 'gustcas' })
  @ApiOkResponse({ type: GithubUserResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid username' })
  @ApiResponse({ status: 404, description: 'GitHub user not found' })
  @ApiResponse({ status: 429, description: 'GitHub API rate limit exceeded' })
  @ApiResponse({ status: 502, description: 'Unable to reach the GitHub API' })
  @ApiResponse({ status: 504, description: 'GitHub request timed out' })
  getUser(
    @Param() { username }: GithubUsernameParamDto,
  ): Promise<GithubUserResponseDto> {
    return this.githubService.getUser(username);
  }

  @Get(':username/repositories')
  @ApiOperation({
    summary: 'Get up to 6 public repositories sorted by last update',
  })
  @ApiParam({ name: 'username', example: 'gustcas' })
  @ApiOkResponse({ type: GithubRepositoryResponseDto, isArray: true })
  @ApiResponse({ status: 400, description: 'Invalid username' })
  @ApiResponse({ status: 404, description: 'GitHub user not found' })
  @ApiResponse({ status: 429, description: 'GitHub API rate limit exceeded' })
  @ApiResponse({ status: 502, description: 'Unable to reach the GitHub API' })
  @ApiResponse({ status: 504, description: 'GitHub request timed out' })
  getRepositories(
    @Param() { username }: GithubUsernameParamDto,
  ): Promise<GithubRepositoryResponseDto[]> {
    return this.githubService.getRepositories(username);
  }
}
