import axios from "axios";
import { selectFields } from "../components/SelectFields";
export const baseUrl = `https://hacker-news.firebaseio.com/v0/`;
export const topStoriesUrl = `${baseUrl}topstories.json`;
export const newStoriesUrl = `${baseUrl}newstories.json`;
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

// home 에서 top 영역
export const getNewStory = async (newStoryId) => {
  const result = await axios
    .get(`${baseItem + newStoryId}.json`)
    .then(({ data }) => data && selectFields(data));
  return result;
};

export const getNewStoryIds = async () => {
  const result = await axios.get(newStoriesUrl).then(({ data }) => data);
  return result;
};

// export const getStory = async (storyId) => {
//   const result = await axios
//     .get(`${storyUrl + storyId}.json`)
//     .then(({ data }) => data);

//   return result;
// };
