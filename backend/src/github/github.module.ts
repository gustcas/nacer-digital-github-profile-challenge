import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GithubRepositoryAdapter } from './adapters/github-repository.adapter';
import { GithubUserAdapter } from './adapters/github-user.adapter';
import { GithubController } from './controllers/github.controller';
import { GithubService } from './services/github.service';

@Module({
  imports: [HttpModule],
  controllers: [GithubController],
  providers: [GithubService, GithubUserAdapter, GithubRepositoryAdapter],
})
export class GithubModule {}
