import { useState, useEffect } from "react";
import Detail from "../Router/Detail";
import styled from "styled-components";
import { TimeForToday } from "./TimeForToday";

const List = styled.div`
& +& {margin-top:12px;}
width:calc(100vw - 40px); 
margin:0 auto;
span, .userId{ font-size:12px; line-height:16px;}
box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
border-radius: 16px;
padding:16px 16px 0; background:#fff;
  .list_top{position:relative;}
  .list_rank{
    font-size:20px; line-height:22px; color:#FF6600; margin-right:4px; 
  }
  .list_link{
    position:absolute; right:0; bottom:0; color:#999;
    img{width:16px; vertical-align:top;}
  }
  .time{ color:#FF660080; margin: 0 10px;}
  .list_title{
    font-size:14px; line-height:20px;
    padding-bottom:12px; 
    & + div{border-top: 1px solid F0F0F6;}
  }
  >div:not(.list_top) {display:flex;justify-content:space-between; padding-top:8px;padding-bottom:12px; }
  .userId{color:#767676; width:45%;
    &:after{content:url(/img/ic_arrow.svg); display:inline-block; vertical-align:top;}
  }
  .userId + a {width:74.5%;text-align:right;}
  .listInfo{line-height:inherit; font-size:inherit;
    >span{display:inline-block; vertical-align:top;}
    >span:before {display:inline-block; vertical-align:top; margin-right:3px;}
    .listComments{color:#FF6600; margin-left:8px;
      &:before {content:url(${process.env.PUBLIC_URL +'/img/ic_comment.svg'});}
      }
  }
  .listPoint{color:#505050;
    &:before{content:url(${process.env.PUBLIC_URL +'/img/ic_point.svg'});
  }
  `;

function LookSmallView({ data, listName,index }) {
  const [listId, setListId] = useState({});
  const [time, setTime] = useState(0);
  const [idUrl, setIdUrl] = useState("");
  const [detailUrl, setDetailUrl] = useState("");

  //시간 구하는 함수

  useEffect(() => {
    setListId(data);
    if (listName === "jobs") {
      setDetailUrl(`https://news.ycombinator.com/item?id=${data.id}`);
    } else {
      setDetailUrl(`/${listName}/detail/${data.id}`);
    }
    return () => {
      setListId({});
      setDetailUrl("");
    };
  }, [data, listName]);

  useEffect(() => {
    setTime(listId.time);
  }, [listId.time]);

  return (
    <List>
      <a href={detailUrl} target="__blank">
        <div className="list_top">
          <span className="list_rank">
            {index < 9 ? `0${index + 1}` : index + 1}
          </span>
          <span className="time">{TimeForToday(time)}</span>
          <span className="list_link">
            github.com
            <img src={process.env.PUBLIC_URL + '/img/ic_link_s.png'} alt="link" />
          </span>
        </div>
      </a>
      <div className="list_title">
        <a href={detailUrl} target="__blank">{listId.title}</a>
      </div>
      {listName === "jobs" ? null : (
        <div>
          <p className="userId">{listId.by}</p>
          <a href={detailUrl} target="__blank">
            <div className="listInfo">
              <span className="listPoint">{listId.score}</span>
              <span className="listComments">
                {listId.descendants ? listId.descendants : 0}
              </span>
            </div>
          </a>
        </div>
      )}
    </List>
  );
}

export default LookSmallView;
