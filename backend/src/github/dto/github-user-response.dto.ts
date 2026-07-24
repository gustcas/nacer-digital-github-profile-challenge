import { ApiProperty } from '@nestjs/swagger';

/**
 * Normalized GitHub profile returned to the frontend.
 * This is intentionally a subset of the raw GitHub payload.
 */
export class GithubUserResponseDto {
  @ApiProperty({ example: 'gustcas' })
  username!: string;

  @ApiProperty({ example: 'Gustavo Pachacama', nullable: true })
  name!: string | null;

  @ApiProperty({ example: 'https://avatars.githubusercontent.com/u/1?v=4' })
  avatarUrl!: string;

  @ApiProperty({ example: 'Full Stack Developer', nullable: true })
  bio!: string | null;

  @ApiProperty({ example: 'Ecuador', nullable: true })
  location!: string | null;

  @ApiProperty({ example: null, nullable: true })
  company!: string | null;

  @ApiProperty({ example: 'https://example.com', nullable: true })
  blog!: string | null;

  @ApiProperty({ example: 20 })
  publicRepos!: number;

  @ApiProperty({ example: 5 })
  publicGists!: number;

  @ApiProperty({ example: 35 })
  followers!: number;

  @ApiProperty({ example: 50 })
  following!: number;

  @ApiProperty({ example: 'https://github.com/gustcas' })
  githubUrl!: string;

  @ApiProperty({ example: '2019-09-24T00:00:00Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-01-01T00:00:00Z' })
  updatedAt!: string;
}
