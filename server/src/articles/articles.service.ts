import { HttpService } from '@nestjs/axios';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './articles.schema';

@Injectable()
export class ArticlesService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    private httpService: HttpService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.fetchData();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCronData() {
    await this.fetchData();
    console.log('Data up to date!');
  }

  async fetchData() {
    await this.httpService
      .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
      .subscribe((res) => {
        res.data.hits.forEach(async (article) => {
          await this.articleModel.findOneAndUpdate(
            {
              objectID: article.objectID,
              isDeleted: false,
            },
            article,
            {
              upsert: true,
              setDefaultsOnInsert: true,
            },
          );
        });
      });
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find({ isDeleted: false }).exec();
  }

  async remove(id: string): Promise<string> {
    return (
      await this.articleModel.findOneAndUpdate({ _id: id }, { isDeleted: true })
    )._id;
  }
}
