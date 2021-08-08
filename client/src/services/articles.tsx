import axios, { AxiosResponse } from 'axios';
import { Article } from 'feed';
const server = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

export const fetchArticles = async () => {
  try {
    const res: AxiosResponse<{ articles: Article[] }> = await axios.get(`${server}/articles`);
    return res.data.articles;
  } catch (err) {
    throw err;
  }
}