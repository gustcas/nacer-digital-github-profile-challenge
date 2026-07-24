import { ApiProperty } from '@nestjs/swagger';

/**
 * Normalized public repository returned to the frontend.
 */
export class GithubRepositoryResponseDto {
  @ApiProperty({ example: 123456789 })
  id!: number;

  @ApiProperty({ example: 'awesome-project' })
  name!: string;

  @ApiProperty({ example: 'A short project description', nullable: true })
  description!: string | null;

  @ApiProperty({ example: 'https://github.com/gustcas/awesome-project' })
  htmlUrl!: string;

  @ApiProperty({
    example: 'https://awesome-project.vercel.app',
    nullable: true,
    description: 'Project homepage / live demo URL, when the repo defines one',
  })
  homepage!: string | null;

  @ApiProperty({ example: 'TypeScript', nullable: true })
  language!: string | null;

  @ApiProperty({ example: ['nestjs', 'nextjs'], type: [String] })
  topics!: string[];

  @ApiProperty({ example: 42 })
  stars!: number;

  @ApiProperty({ example: 7 })
  forks!: number;

  @ApiProperty({ example: '2020-07-12T18:45:37Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-01-01T00:00:00Z' })
  updatedAt!: string;
}
