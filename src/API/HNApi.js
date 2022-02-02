import axios from "axios";

export const baseUrl = `https://hacker-news.firebaseio.com/v0/`;
export const topStoriesUrl = `${baseUrl}topstories.json`;
export const newStoriesUrl = `${baseUrl}newstories.json`;
export const askStoriesUrl = `${baseUrl}askstories.json`;
export const showStoriesUrl = `${baseUrl}showstories.json`;
export const jobsStoriesUrl = `${baseUrl}jobstories.json`;
export const baseItem = `${baseUrl}item/`;

// ------------ 공통으로 data 가져오는 함수 ---------- //
export const getData = async (getdataId) => {
  const result = await axios
    .get(`${baseItem + getdataId}.json`)
    .then(({ data }) => data);
  return result;
};
//--------------- top data--------------- //
export const getTopStoryIds = async () => {
  const result = await axios.get(topStoriesUrl).then(({ data }) => data);
  return result;
};

//--------------- new data--------------- //
export const getNewIds = async () => {
  const result = await axios.get(newStoriesUrl).then(({ data }) => data);
  return result;
};

//--------------- Ask data--------------- //
export const getAskIds = async ()=>{
  const result = await axios.get(askStoriesUrl).then(({ data }) => data);
  return result;
}

//--------------- show data--------------- //
export const getShowIds = async ()=>{
  const result = await axios.get(showStoriesUrl).then(({ data }) => data);
  return result;
}
//--------------- jobs data--------------- //
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