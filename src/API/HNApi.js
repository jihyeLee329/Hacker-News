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
  const data = await axios
    .get(`${baseItem + getdataId}.json`)
    .then(({ data }) => data);
  return data;
};
//--------------- top data--------------- //
export const getTopStoryIds = async () => {
  const { data } = await axios.get(topStoriesUrl);
  return data;
};

//--------------- Ask data--------------- //
export const getAskIds = async ()=>{
  const { data } = await axios.get(askStoriesUrl);
  return data;
}

//--------------- show data--------------- //
export const getShowIds = async ()=>{
  const { data } = await axios.get(showStoriesUrl);
  return data;
}
//--------------- jobs data--------------- //
export const getJobsIds = async ()=>{
  const { data } = await axios.get(jobsStoriesUrl);
  return data;
}
//--------------- item data--------------- //
export const getDetailData = async (itemId)=>{
  const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`);
  return data;
}
//--------------- user data--------------- //
export const getUserData = async (getUserId) => {
  const { data } = await axios
  .get(`https://hacker-news.firebaseio.com/v0/user/${getUserId}.json`);
  return data;
};

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