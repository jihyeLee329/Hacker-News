import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Comments from "../components/Comments";
import { TimeForToday } from "../components/TimeForToday";
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
  background: #ffffff;
  filter: drop-shadow(0px 3px 16px rgba(0, 0, 0, 0.08));
  border-radius: 0px 0px 24px 24px;
  .time {
    color: #ff6600;
    opacity: 0.5;
    font-size: 12px;
    line-height: 16px;
  }
  .title {
    margin: 4px 0 16px;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #111;
  }
  .user_info {
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }
  .user {
    margin-left: 10px;
  }
  .user:after {
    content: url(${process.env.PUBLIC_URL +'/img/ic_arrow.svg'});
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
    border-top: 1px solid #f0f0f6;
  }
  
`;
const CommentsWrap = styled.div`
  padding: 0 20px;
  box-shadow: 0px -2px 16px rgba(0, 0, 0, 0.08);
  border-radius: 24px 24px 0px 0px;
  margin-top: 8px;
  .commentsTop {
    display: inline-block;
    vertical-align: top;
    .comments_length {
      position: absolute;
      right: 20px;
      color: #ff6600;
      font-size: 12px;
      line-height: 16px;
    }
  }
`;
const CommentsList = styled.div`
  border-radius: 24px 24px 0px 0px;
  padding-bottom:40px;
`;

export function Detail(props, setUserId, setUserChk){
  const match = props.match;
  const [detail, setDetail] = useState({});
  const [detailTime, setDetailTime] = useState(0);
  const [kids, setKids] = useState([]);

  console.log(props.setUserId)
  //현재 페이지의 data 가져오기
  const getDetailData = async () => {
    const result = await axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${match.params.id}.json`)
      .then(({ data }) => data);
    return result;
  };
  
  //data 가공
  useEffect(() => {
    getDetailData().then((data) => setDetail(data));
    return ()=>{setDetail({})};
  }, []);

  //현재 페이지의 kids api 가져오기
  useEffect(() => {
    setKids(detail.kids);
    return ()=>{ setKids([])};
  }, [detail.kids]);

  //시간 계산해주기
  useEffect(() => {
    setDetailTime(detail.time);
    return ()=>{setDetailTime(0)}
  }, [detail]);

  //회원 id 누르면 id 값 가져오기
  function viewUserId(){
    props.setUserId(detail.by);
    // setUserChk(true);
    
  }

  return (
    <>
      <DetailContent>
        <p className="time">{TimeForToday(detailTime)}</p>
        <div className="title">{detail.title}</div>
        <div className="user_info">
          <div>
            <span className="point">{detail.score} points</span>
            <span className="user" onClick={viewUserId}>{detail.by}</span>
          </div>
          {detail.url ? <a href={detail.url} className="news_url" target="_blank" rel="noreferrer">{detail.url} <img src={process.env.PUBLIC_URL +'/img/ic_link_s.png'} alt="뉴스링크" /></a> : 
          <a href={`https://news.ycombinator.com/item?id=${detail.id}`} className="news_url" target="_blank" rel="noreferrer">news.ycombinator.com <img src={process.env.PUBLIC_URL +'/img/ic_link_s.png'} alt="뉴스링크" /></a>}
          
        </div>
        {detail.text && <div className="content"  dangerouslySetInnerHTML={{ __html: detail.text }}></div>}
      </DetailContent>

      <CommentsWrap>
        <div className="commentsTop">
          <input id="new" type="radio" name="list" />
          <label htmlFor="new">NEW</label>
          <input id="top" type="radio" name="list" />
          <label htmlFor="top">TOP</label>
          <span className="comments_length">{detail.descendants}</span>
        </div>
        <CommentsList>
          {kids && kids.map((kid, index) => <Comments kid={kid} key={index} setUserId={setUserId} setUserChk={setUserChk}/>)}
        </CommentsList>
      </CommentsWrap>
    </>
  );
};

