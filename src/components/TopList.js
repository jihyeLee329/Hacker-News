import React, { useEffect, useState } from "react";
import { getTopStoryIds } from "../HNApi";
import { TopItem } from "./TopItem";
import styled from "styled-components";

const TopListWrap = styled.div`
  h1 {
    padding: 32px 22px 24px;
    font-size: 28px;
    line-height: 1;
  }
`;

export const TopList = () => {
  const [topStoryIds, setTopStoryIds] = useState([]);
  useEffect(() => {
    getTopStoryIds().then((data) => setTopStoryIds(data));
  }, []);

  return (
    <TopListWrap>
      <h1>
        Total
        <br /> Ranking 5 Now
      </h1>
      {topStoryIds.slice(0, 5).map((topStoryId) => (
        <TopItem topStoryId={topStoryId} key={topStoryId} />
      ))}
    </TopListWrap>
  );
};
