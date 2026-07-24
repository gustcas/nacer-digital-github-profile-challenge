import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  /**
   * Redirects the API root to the Swagger documentation so visiting
   * http://localhost:3001/ lands on something useful instead of a 404.
   */
  @Get()
  @ApiExcludeEndpoint()
  @Redirect('/api/docs', 302)
  root(): void {}
}
