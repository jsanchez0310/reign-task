declare namespace feed {
  export interface Article {
    isDeleted: boolean;
    _id: string,
    objectID: number,
    author: string,
    comment_text?: string,
    created_at: string,
    num_comments: number,
    parent_id?: number,
    points: number,
    story_id?: number,
    story_text: string,
    story_title?: string,
    story_url?: string,
    title: string,
    url?: string
  }
}

declare module 'feed' {
  export = feed;
}