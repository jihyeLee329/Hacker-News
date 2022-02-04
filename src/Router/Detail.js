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
    setDetailTime(detail.time);
  }, [detail]);
  return (
    <>
      <DetailContent>
        <p className="time">{TimeForToday(detailTime)}</p>
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
        <CommentsList>
          {kids && kids.map((kid, index) => <Comments kid={kid} key={index} />)}
        </CommentsList>
      </CommentsWrap>
    </>
  );
};

export default Detail;
