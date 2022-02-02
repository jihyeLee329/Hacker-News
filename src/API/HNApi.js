import axios from "axios";
import { useReducer } from 'react';
import { selectFields } from "../components/SelectFields";
export const baseUrl = `https://hacker-news.firebaseio.com/v0/`;
export const topStoriesUrl = `${baseUrl}topstories.json`;
export const newStoriesUrl = `${baseUrl}newstories.json`;
export const askStoriesUrl = `${baseUrl}askstories.json`;
export const showStoriesUrl = `${baseUrl}showstories.json`;
export const jobsStoriesUrl = `${baseUrl}jobstories.json`;
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

//--------------- new data--------------- //
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



//--------------- Ask data--------------- //
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



//--------------- show data--------------- //
export const getShow = async (getShowId) => {
  const result = await axios
    .get(`${baseItem + getShowId}.json`)
    .then(({ data }) => data && selectFields(data));
  return result;
};

export const getShowIds = async ()=>{
  const result = await axios.get(showStoriesUrl).then(({ data }) => data);
  return result;
}


//--------------- jobs data--------------- //
export const getJobs = async (getJobsId) => {
  const result = await axios
    .get(`${baseItem + getJobsId}.json`)
    .then(({ data }) => data && selectFields(data));
  return result;
};

export const getJobsIds = async ()=>{
  const result = await axios.get(jobsStoriesUrl).then(({ data }) => data);
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