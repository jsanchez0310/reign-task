import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
    ArticlesModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: 'articles',
      useFindAndModify: false,
    }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
