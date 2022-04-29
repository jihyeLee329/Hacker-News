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
  try {
    const { data } = await axios.get(`${baseItem + getdataId}.json`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
//--------------- top data--------------- //
export const getTopStoryIds = async () => {
  try {
    const { data } = await axios.get(topStoriesUrl);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//--------------- Ask data--------------- //
export const getAskIds = async () => {
  try {
    const { data } = await axios.get(askStoriesUrl);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//--------------- show data--------------- //
export const getShowIds = async () => {
  try {
    const { data } = await axios.get(showStoriesUrl);
    return data;
  } catch (err) {
    console.log(err);
  }
};
//--------------- jobs data--------------- //
export const getJobsIds = async () => {
  try {
    const { data } = await axios.get(jobsStoriesUrl);
    return data;
  } catch (err) {
    console.log(err);
  }
};
//--------------- item data--------------- //
export const getDetailData = async (itemId) => {
  try {
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
//--------------- user data--------------- //
export const getUserData = async (getUserId) => {
  try {
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/user/${getUserId}.json`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
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
