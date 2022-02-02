import axios from "axios";
import { useReducer } from 'react';
import { selectFields } from "../components/SelectFields";
export const baseUrl = `https://hacker-news.firebaseio.com/v0/`;
export const topStoriesUrl = `${baseUrl}topstories.json`;
export const newStoriesUrl = `${baseUrl}newstories.json`;
export const askStoriesUrl = `${baseUrl}askstories.json`;
export const baseItem = `${baseUrl}item/`;

// home 에서 top 영역
export const getTopStory = async (topStoryId) => {
  const result = await axios
    .get(`${baseItem + topStoryId}.json`)
    .then(({ data }) => data && selectFields(data));
  return result;
};

export const getTopStoryIds = async () => {
  const result = await axios.get(topStoriesUrl).then(({ data }) => data);
  return result;
};

// new 영역
// export const getNewStory = async (newStoryId) => {
//   const result = await axios
//     .get(`${baseItem + newStoryId}.json`)
//     .then(({ data }) => data && selectFields(data));
//   return result;
// };

export const getNewStoryIds = async () => {
  const result = await axios.get(newStoriesUrl).then(({ data }) => data);
  return result;
};



export const getAsk = async (getAskId) => {
  const result = await axios
    .get(`${baseItem + getAskId}.json`)
    .then(({ data }) => data && selectFields(data));
  return result;
};

export const getAskIds = async ()=>{
  const result = await axios.get(askStoriesUrl).then(({ data }) => data);
  return result;
}


// export const [api,setApi] = useReducer(reducer, []);
// const reducer = (state, action ) =>{
//   switch (action.type) {
//     case "ARTICLE": 
//       return action.data; 
//     case "ASK" : 
//     return action.data; 
//     case "SHOW" : 
//     return action.data; 
//     case "JOBS" : 
//     return action.data;
//     default:
//       action.data;
//   }
// }