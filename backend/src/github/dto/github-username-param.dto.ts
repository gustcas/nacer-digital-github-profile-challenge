import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength } from 'class-validator';

/**
 * Validates the :username route parameter.
 *
 * GitHub usernames may only contain alphanumeric characters or single hyphens,
 * cannot begin or end with a hyphen, and are limited to 39 characters.
 */
export class GithubUsernameParamDto {
  @ApiProperty({
    description: 'GitHub username to look up',
    example: 'gustcas',
    minLength: 1,
    maxLength: 39,
  })
  @IsString()
  @MaxLength(39)
  @Matches(/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/, {
    message:
      'username must be a valid GitHub username (alphanumeric and single hyphens, not at the start or end)',
  })
  username!: string;
}
