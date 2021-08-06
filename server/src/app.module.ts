import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ArticlesModule,
    MongooseModule.forRoot('mongodb://jasm:secretpass@localhost:27017', {
      dbName: 'articles',
      useFindAndModify: false,
    }),
  ],
})
export class AppModule {}
