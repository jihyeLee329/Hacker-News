import axios from "axios";
import { selectFields } from "./components/SelectFields";
export const baseUrl = `https://hacker-news.firebaseio.com/v0/`;
export const topStoriesUrl = `${baseUrl}topstories.json`;
export const topStory = `${baseUrl}item/`;

export const getTopStory = async (topStoryId) => {
  const result = await axios
    .get(`${topStory + topStoryId}.json`)
    .then(({ data }) => data && selectFields(data));
  return result;
};

// export const getStory = async (storyId) => {
//   const result = await axios
//     .get(`${storyUrl + storyId}.json`)
//     .then(({ data }) => data);

//   return result;
// };

export const getTopStoryIds = async () => {
  const result = await axios.get(topStoriesUrl).then(({ data }) => data);
  return result;
};
