import React,{useState, useEffect} from 'react';
import { getStory } from '../HNApi';
export const NewsItem = ({storyId}) => {
  const [news,setNews] = useState({})
  useEffect(()=>{
    getStory(storyId).then(data=>data && data.url && setNews(data))
  },[]);
  return  news && news.url?(
    <>
    (<a href={news.url}>{news.title}</a> By : <p>{news.by}</p>
    Posted : <p>{news.time}</p>
    <p>ID: {news.id}</p>
    </>
      ): null;

}