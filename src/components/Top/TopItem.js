import React, { useState, useEffect } from "react";
import { getData } from "../../API/HNApi";
import styled from "styled-components";
import "swiper/css";
import { useRecoilState } from "recoil";
import { UserChkAtom, UserIdAtom } from "../../atom";


const TopItemWrap = styled.div`
  width: 100%;
  background: ${(props) => props.theme.bannerColor};
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
    background: ${(props) => props.theme.bannerGradient};
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
    color: ${(props) => props.theme.mainColor};
    font-style: italic;
  }
  .title {
    margin: 12px 0;
    font-size: 18px;
    line-height: 24px;
    color: ${(props) => props.theme.grayColor};
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 4; 
    height: 96px;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
export const TopItem = ({ topStoryId, index }) => {
  const [top, setTop] = useState({});
  const [userChk, setUserChk]= useRecoilState(UserChkAtom);
  const [userId, setUserId]= useRecoilState(UserIdAtom);
  // useEffect(() => {
  //   getData(topStoryId).then((data) => data && data.url && setTop(data));
  // }, []);
  //회원 id 누르면 id 값 가져오기
  function viewUserId(){
    setUserId(topStoryId.by);
    setUserChk(true);
  }
  return topStoryId && topStoryId.url ? (
    <>
      <TopItemWrap>
        <TopItemCard>
          <div>
            <a href={topStoryId.url}>
              <span className="ranking">0{index + 1}</span>
              <div className="title">{topStoryId.title}</div>
            </a>
            <div className="user" onClick={viewUserId} userid={topStoryId.id}>
              {topStoryId.by}
            </div>
          </div>
        </TopItemCard>
      </TopItemWrap>
      
    </>
  ) : null;
};
