import React, { useEffect, useState } from "react";
import { getTopStoryIds } from "../HNApi";
import { TopItem } from "./TopItem";
import styled from "styled-components";

// Import Swiper
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const TopListWrap = styled.div`
  h1 {
    padding: 32px 22px 24px;
    font-size: 28px;
    line-height: 1;
  }
  .swiper-horizontal > .swiper-pagination-bullets {
    top: auto;
    bottom: 32px;
    .swiper-pagination-bullet {
      width: 5px;
      height: 5px;
      background: #e5e5ec;
      margin: 0 4px;
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      background: #ff6600;
    }
  }
`;

const TopItemWrap = styled.div`
  width: 100%;
  background: #f2f3f7;
  padding: 54px 0 73px;
`;
const TopItemCard = styled.div`
  position: relative;
  width: calc(100vw - 176px);
  width: 200px;
  height: 300px;
  margin: 0 auto;

  > div {
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(158.71deg, #e8ebf2 2.84%, #f2f3f7 97.53%);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    box-shadow: 10px 10px 30px rgba(15, 41, 107, 0.12);
    border-radius: 24px;
    padding: 64px 20px 16px;
  }
  :before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    width: 100%;
    height: 100%;
    background: #ffffff;
    filter: blur(20px);
    border-radius: 24px;
    z-index: 0;
  }
  .ranking {
    font-size: 28px;
    color: #ff6600;
    font-style: italic;
  }
  .title {
    margin: 12px 0;
    font-size: 18px;
    line-height: 24px;
    color: #767676;
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* ★★ line-height:20px일때 ★★ */
    height: 96px; /* ★★ line-height * 3 ★★ */
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .topStory_user {
    position: absolute;
    bottom: 16px;
    width: 100%;
    text-align: center;
    color: red;
  }
`;
export const TopList = () => {
  // const [top, setTop] = useState({});
  // useEffect(() => {
  //   getTopStory(topStoryId).then((data) => data && data.url && setTop(data));
  // }, []);

  const [topStoryIds, setTopStoryIds] = useState([]);
  useEffect(() => {
    getTopStoryIds().then((data) => setTopStoryIds(data));
  }, []);

  return (
    <TopListWrap>
      <h1>
        Current
        <br />
        Total Top 5
      </h1>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {topStoryIds.slice(0, 5).map((topStoryId, index) => (
          <SwiperSlide>
            <TopItem topStoryId={topStoryId} key={topStoryId}>
              <TopItemWrap>
                <TopItemCard>
                  <div>
                    <a href={topStoryId.url}>
                      <span className="ranking">{topStoryId.index}</span>
                      <div className="title">{topStoryId.title}</div>
                    </a>
                    <p className="user">{topStoryId.by}</p>
                  </div>
                </TopItemCard>
              </TopItemWrap>
            </TopItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </TopListWrap>
  );
};
