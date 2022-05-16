import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Comments from "../components/Comments";
import { TimeForToday } from "../components/TimeForToday";
import {getDetailData} from '../API/HNApi'
import CheckRadio from '../components/CheckRadio'
import IconArrow from '../img/ic_arrow.svg'
import IconLinkSmall from '../img/ic_link_s.png'
import { useRecoilState } from "recoil";
import { UserChkAtom, UserIdAtom } from "../atom";

const DetailContent = styled.div`
  a,
  span {
    display: inline-block;
    position: relative;
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 20px 40px;
  background: ${(props) => props.theme.bgColor};
  filter: drop-shadow(0px 3px 16px rgba(0, 0, 0, 0.08));
  .time {
    color: ${(props) => props.theme.mainColor};
    opacity: 0.5;
    font-size: 12px;
    line-height: 16px;
  }
  .title {
    margin: 4px 0 16px;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: ${(props) => props.theme.textColor};
  }
  .user_info {
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    color:${(props) => props.theme.grayColor}
  }
  .user {
    margin-left: 10px;
  }
  .user:after {
    content: url(${IconArrow});
    display: inline-block;
    vertical-align: top;
    width: 16px;
    height: 16px;
  }
  .user:before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: -6px;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: #e5e5ec;
  }
  .user_info * {
    font-size: 12px;
    line-height: 16px;
    color: #767676;
  }
  .news_url{position:relative;
    & > img{width:16px; vertical-align:top;}
  }
  
  .content {
    max-width: 100%;
    word-break: break-word;
    padding: 29px 16px 0;
    line-height: 24px;
    border-top: 1px solid ${(props) => props.theme.borderColor};
    pre{white-space:pre-line;}
  }
  
`;
const CommentsWrap = styled.div`
  box-shadow: 0px -2px 16px rgba(0, 0, 0, 0.08);
  border-radius: 24px 24px 0px 0px;
  margin-top: 8px;
  .commentsTop {
    display: inline-block;
    vertical-align: top;
    .comments_length {
     
    }
  }
`;
const CommentsList = styled.div`
  border-radius: 24px 24px 0px 0px;
  padding: 0 20px 40px;
`;

export function Detail({match}){
  
  //listName 내가 어떤 페이지인지
  const [listName, setListName] = useState("");
  const [detail, setDetail] = useState({});
  const [userChk, setUserChk]= useRecoilState(UserChkAtom);
  const [userId, setUserId]= useRecoilState(UserIdAtom);
  const matchFn = match.params;
 
  useEffect(() => {
    getDetailData(matchFn.id).then((data) => setDetail(data));
    return ()=>{setDetail({})};
  }, [matchFn.id]);

  useEffect(()=>{
    setListName('detail');
  },[detail]);

  function urlSplit(url){
    return url.split('/')[2];
  }
   //회원 id 누르면 id 값 가져오기
   function viewUserId(){
    setUserId(detail.by);
    setUserChk(true);
  }

  return (
    <>
      <DetailContent>
        <p className="time">{TimeForToday(detail.time)}</p>
        <div className="title">{detail.title}</div>
        <div className="user_info">
          <div>
            <span className="point">{detail.score} points</span>
            <span className="user" onClick={viewUserId}>{detail.by}</span>
          </div>
          {detail.url ? 
          <a href={detail.url} className="news_url" target="_blank" rel="noopener  noreferrer" title="새창으로 열기" >{urlSplit(detail.url)} <img src={IconLinkSmall} alt="뉴스링크" /></a> : 
          <a href={`https://news.ycombinator.com/item?id=${detail.id}`} className="news_url" target="_blank" rel="noopener noreferrer" title="새창으로 열기" >news.ycombinator.com <img src={IconLinkSmall} alt="뉴스링크" /></a>}
          
        </div>
        {detail.text && <div className="content" dangerouslySetInnerHTML={{ __html: detail.text }}></div>}
      </DetailContent>
      <CommentsWrap>
      <CheckRadio listName={listName} comments={detail.descendants}/>
        <CommentsList>
          {detail.kids && detail.kids.map((kid, index) => <Comments kid={kid} key={index} setUserId={setUserId} setUserChk={setUserChk}/>)}
        </CommentsList>
      </CommentsWrap>
    </>
  );
};

