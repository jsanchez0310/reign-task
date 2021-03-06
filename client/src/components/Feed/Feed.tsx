import { Article } from 'feed';
import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { deleteArticle, fetchArticles } from '../../services/articles';
import './Feed.css';

const Feed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const getArticles = async () => {
    setArticles(await fetchArticles());
  }

  useEffect(() => {
    getArticles();
  }, []);

  const onDeleteArticle = async (id: string) => {
    const deletedId = await deleteArticle(id);
    const _articles = articles.filter((article) => article._id !== deletedId);
    setArticles(_articles);
  };

  const handleCreatAt = (date: string) => {
    const dt = DateTime.fromISO(date);
    const diffDays = dt.startOf('day').diffNow('days').days;
    
    if(diffDays <= -2){
      return dt.toFormat('LLL dd');
    }else if (diffDays <= -1){
      return dt.toRelativeCalendar();
    }else{
      return dt.toFormat('hh:mm a')
    }
  }

  return (
    <div className='feed'>
      {articles
        .filter(({ story_title, title }) => title || story_title)
        .map((article, i) => (
          <div key={`article_${i + 1}`} className='article'>
            <div className='article-title flex-grow'>
              <p>
                {article.story_title || article.title}.<span style={{ color: '#999' }}> - {article.author} - </span>
              </p>
            </div>
            <div className='article-time'>{handleCreatAt(article.created_at)}</div>
            <div className='delete' onClick={() => onDeleteArticle(article._id)}>
              <svg
                stroke='currentColor'
                fill='currentColor'
                strokeWidth='0'
                viewBox='0 0 1024 1024'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z'></path>
              </svg>
            </div>
            <a href={article.story_url || article.url} target='_blank' rel='noreferrer' />
          </div>
        ))}
    </div>
  );
};

export default Feed;
