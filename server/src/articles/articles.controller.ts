import { Controller, Get } from '@nestjs/common';
import { Article } from './articles.schema';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return await this.articlesService.findAll();
  }
}
