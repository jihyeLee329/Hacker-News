import React, { useEffect, useState } from "react";
import { TopItem } from "./TopItem";
import styled from "styled-components";
import {getTopStoryIds, getData} from '../../API/HNApi'

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
    color:${(props) => props.theme.textColor};
  }
  .swiper-horizontal > .swiper-pagination-bullets {
    top: auto;
    bottom: 32px;
    .swiper-pagination-bullet {
      width: 5px;
      height: 5px;
      background: ${(props) => props.theme.swiperPagination};
      margin: 0 4px;
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      background:${(props) => props.theme.mainColor};
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
    color: ${(props) => props.theme.noneColor};
  }
`;

export const TopList = ({ topStoryIds}) => {
  const [currentTops, setCurrentTops]=useState([]);
  const [currentTop, setCurrentTop] =useState([]);
  const [topFive, setTopFive] = useState([]);

  useEffect(() => {
    getTopStoryIds().then((data) => setCurrentTops(data));
    return () => setCurrentTops([]);
  }, []);

  useEffect(() => {
    currentTops
      .slice(0, 10)
      .map((ct) => getData(ct).then((data) => data && setCurrentTop(data)));
    return () => setCurrentTop([]);
  }, [currentTops]);

  useEffect(() => {
    setTopFive(topFive.concat(currentTop));
  }, [currentTop]);

  useEffect(()=>{
    topFive.sort(function(a,b){
      return b.score - a.score; 
    });
  },[topFive]);


  return (
    <>
      <TopListWrap>
        <h1>
          Current
          <br />
          Total Top 5
        </h1>
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {topFive.slice(0, 5).map((topfive, index) => (
            <SwiperSlide key={index}>
              <TopItem
                topStoryId={topfive}
                key={topfive}
                index={index}
              ></TopItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </TopListWrap>
    </>
  );
};
