import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop()
  title: string;

  @Prop()
  created_at: string;

  @Prop()
  url: string;

  @Prop()
  author: string;

  @Prop()
  points: number;

  @Prop()
  comment_text: string;

  @Prop()
  num_comments: number;

  @Prop()
  story_id: number;

  @Prop()
  story_text: string;

  @Prop()
  story_title: string;

  @Prop()
  story_url: string;

  @Prop()
  parent_id: number;

  @Prop()
  objectID: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
