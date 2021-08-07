import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

describe('ArticlesController', () => {
  const mockData = [
    {
      isDeleted: false,
      _id: '610dc2451ffcf9a910557788',
      objectID: 28091864,
      __v: 0,
      author: 'bob1029',
      comment_text:
        '&gt; Splay trees aren&#x27;t a dynamic programming thing<p>My mistake - I meant to write &quot;dynamic optimality&quot;.<p>As for the &quot;not used in any database storage backends&quot;, I have personally started experimenting with them due to higher-order effects they can provide relative to their optimization technique.<p>The fact that the most recently accessed node is always at the root also means that incremental tree updates are well-bounded in terms of # of nodes that would need to be rewritten to disk.  This allows for much more efficient usage of storage-friendly things like append-only log structures.',
      created_at: '2021-08-06T19:40:46.000Z',
      num_comments: null,
      parent_id: 28091318,
      points: null,
      story_id: 28088213,
      story_text: null,
      story_title: 'New UUID Formats – IETF Draft',
      story_url:
        'https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format',
      url: null,
    },
  ];
  let articlesController: ArticlesController;
  const mockArticlesService = {
    findAll: () => mockData,
    remove: (id: string) => {
      //pretending this value was extracted from object that was returned by findOneAndUpdate();
      return id;
    },
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: mockArticlesService,
        },
      ],
    }).compile();

    articlesController = moduleRef.get<ArticlesController>(ArticlesController);
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      expect(await articlesController.findAll()).toStrictEqual({
        articles: mockArticlesService.findAll(),
      });
    });
  });

  describe('remove', () => {
    it('should return an _id of deleted article', async () => {
      expect(await articlesController.remove(mockData[0]._id)).toBe(
        mockData[0]._id,
      );
    });
  });
});
