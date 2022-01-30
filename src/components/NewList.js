import React, {useEffect, useState} from 'react'
import { getStoryIds } from "../HNApi";
import {NewsItem} from './NewsItem'

export const NewList = ()=> {
  const [storyIds, setStoryIds] = useState([]);
  useEffect(() => {
    getStoryIds().then(data => setStoryIds(data));
  }, []);


  return storyIds.map((storyId)=> <NewsItem storyId={storyId} key={storyId } />);
};