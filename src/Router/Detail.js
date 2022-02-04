import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Comments from "../components/Comments";

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
    content: url(/img/ic_arrow.svg);
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
  .content {
    padding: 29px 16px 0;
    line-height: 24px;
    border-top: 1px solid #f0f0f6;
  }
`;
const CommentsWrap = styled.div`
  padding: 0 20px;
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

const Detail = (props) => {
  const match = props.match;
  const [detail, setDetail] = useState({});
  const [detailTime, setDetailTime] = useState(0);
  const [kids, setKids] = useState([]);
  console.log(kids);
  const getDetailData = async () => {
    const result = await axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${match.params.id}.json`)
      .then(({ data }) => data);
    return result;
  };
  useEffect(() => {
    getDetailData().then((data) => setDetail(data));
  }, []);

  useEffect(() => {
    setKids(detail.kids);
  }, [detail.kids]);

  // console.log(kids);
  useEffect(() => {
    const timeForToday = () => {
      const pstTime = detail.time * 1000;
      const todayTime = new Date().getTime();
      const betweenTime = Math.floor((todayTime - pstTime) / 1000 / 60);
      if (betweenTime < 1) return "방금전";
      if (betweenTime < 60) {
        return `${betweenTime} minutes ago`;
      }
      const betweenTimeHour = Math.floor(betweenTime / 60);
      if (betweenTimeHour < 24) {
        return `${betweenTimeHour} hours ago`;
      }
      const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
      if (betweenTimeDay < 365) {
        return `${betweenTimeDay} days ago`;
      }
    };
    setDetailTime(timeForToday);
  }, [detail]);
  return (
    <>
      <DetailContent>
        <p className="time">{detailTime}</p>
        <div className="title">{detail.title}</div>
        <div className="user_info">
          <div>
            <span className="point">{detail.score} points</span>
            <span className="user">{detail.by}</span>
          </div>
          <a href={detail.url}>{detail.url}</a>
        </div>
        {detail.text && <div className="content">{detail.text}</div>}
      </DetailContent>

      <CommentsWrap>
        <div className="commentsTop">
          <input id="new" type="radio" name="list" />
          <label htmlFor="new">NEW</label>
          <input id="top" type="radio" name="list" />
          <label htmlFor="top">TOP</label>
          <span className="comments_length">{detail.descendants}</span>
        </div>
        {kids && kids.map((kid, index) => <Comments kid={kid} key={index} />)}
      </CommentsWrap>
    </>
  );
};

export default Detail;
