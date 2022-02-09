import React, { useEffect, useState } from "react";
import { TopItem } from "./TopItem";
import styled from "styled-components";

// Import Swiper
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const TopListWrap = styled.div`
margin-bottom:16px;
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

  .user {
    position: absolute;
    left: 50%;
    bottom: 0;
    padding: 16px 0;
    transform: translate(-50%, 0);
    font-size: 12px;
    line-height: 16px;
    color: #999;
  }
`;

export const TopList = ({ topStoryIds,setUserId, setUserChk }) => {

  return (
    <>
      <TopListWrap>
        <h1>
          Current
          <br />
          Total Top 5
        </h1>
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {topStoryIds.slice(0, 5).map((topStoryId, index) => (
            <SwiperSlide key={index}>
              <TopItem
                topStoryId={topStoryId}
                key={topStoryId}
                index={index}
                 setUserId={setUserId}
                 setUserChk={setUserChk}
              ></TopItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </TopListWrap>
    </>
  );
};
