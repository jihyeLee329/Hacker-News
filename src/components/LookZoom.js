import { useState, useEffect } from "react";
import { getData } from "../API/HNApi";
import styled from "styled-components";
import { TimeForToday } from "./TimeForToday";

const List = styled.div`
& +& {margin-top:12px;}
width:calc(100vw - 40px); 
margin:0 auto;
box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
border-radius: 16px;
padding:16px 16px 0; background:#fff;
  .list_title{
    font-size:18px; line-height:24px;
    padding-bottom:12px; 
  }
  .user_wrap {
    border-top: 1px solid #F0F0F6;
    padding-top:8px; padding-bottom:12px; display:flex; justify-content:space-between; font-size:12px; line-height:16px;}
  .userId{color:#767676; line-height:inherit; font-size:inherit; width:35%;
    &:after{content:url(/img/ic_arrow.svg); display:inline-block; vertical-align:top;}
  }
  .listInfo{line-height:inherit; font-size:inherit; width:74%; text-align:right;
    span{display:inline-block; vertical-align:top;}
    span:before {display:inline-block; vertical-align:top; margin-right:3px;}
    .listComments{color:#FF6600; margin-left:8px;
      &:before {content:url(/img/ic_comment.svg);}
      }
  }
  .listPoint{color:#505050;
    &:before{content:url(/img/ic_point.svg);
  }
  `;

function LookZoom({ id, listName }) {
  const [listId, setListId] = useState({});
  const [time, setTime] = useState(0);
  const [idUrl, setIdUrl] = useState("");
  const [detailUrl, setDetailUrl] = useState("");

  useEffect(() => {
    getData(id).then((data) => data && setListId(data));
    if (listName === "jobs") {
      setDetailUrl(`https://news.ycombinator.com/item?id=${id}`);
    } else {
      setDetailUrl(`/${listName}/detail/${id}`);
    }
    return () => {
      setListId({});
      setIdUrl("");
    };
  }, [id, listName]);

  useEffect(() => {
    setTime(listId.time);
  }, [listId.time]);

  return (
    <List>
      <div className="list_title">
        <a href={detailUrl} rel="noreferrer">
          {listId.title}
        </a>
      </div>
      {listName === "jobs" ? null : (
        <div className="user_wrap">
          <p className="userId">{listId.by}</p>
          <div className="listInfo">
            <a href={detailUrl} rel="noreferrer">
              <span className="listPoint">{listId.score}</span>
              <span className="listComments">
                {listId.descendants ? listId.descendants : 0}
              </span>
            </a>
          </div>
        </div>
      )}
      <div>{TimeForToday(time)}</div>
    </List>
  );
}

export default LookZoom;
