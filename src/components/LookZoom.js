import { useState, useEffect } from "react";
import styled from "styled-components";
import { TimeForToday } from "./TimeForToday";

const List = styled.div`
a{ display:block;}
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
  .userId{color:#767676; line-height:inherit; font-size:inherit; width:45%;
    &:after{content:url(/img/ic_arrow.svg); display:inline-block; vertical-align:top;}
  }
  .listInfo{line-height:inherit; font-size:inherit; width:55%; text-align:right;
    span{display:inline-block; vertical-align:top;}
    span:before {display:inline-block; vertical-align:top; margin-right:3px;}
    .listComments{color:#FF6600; margin-left:8px;
      &:before {content:url(${process.env.PUBLIC_URL +'/img/ic_comment.svg'});}
      }
  }
  .listPoint{color:#505050;
    &:before{content:url(${process.env.PUBLIC_URL +'/img/ic_point.svg'});
  }
  `;

function LookZoom({ data, listName, index, setUserId ,setUserChk}) {
  const [listId, setListId] = useState({}); //각각 list data 
  const [time, setTime] = useState(0); // 시간 계산
  const [detailUrl, setDetailUrl] = useState(""); //각각 list 의 url 
  const [originUrl, setOriginUrl] = useState(""); //본래 해커뉴스 link
  const [idUrl, setIdUrl] = useState(""); //각각 회원 정보 
  const [indexNum , setIndexNum] =useState(0);

  useEffect(()=>{
    setListId(data);
  },[data]);

  useEffect(() => {
    if (listName === "jobs") {
      setDetailUrl(`https://news.ycombinator.com/item?id=${data.id}`);
    } else {
      setDetailUrl(`/${listName}/detail/${data.id}`);
      setOriginUrl(`https://news.ycombinator.com/item?id=${data.id}`)
    }
    return () => {
      setListId({});
      setDetailUrl("");
      setIdUrl("");
    };
  }, [data, listName]);

  useEffect(() => {
    setTime(listId.time);
  }, [listId.time]);

    // index 값에 따라 0 or 00 붙여주기
  useEffect(() => {
   setIndexNum(index);
  }, [index]);
  

  //회원 id 누르면 id 값 가져오기
  function viewUserId(){
    setUserId(listId.by);
    setUserChk(true);
  }

  const IndexNum= (indexNum)=>{
    if(indexNum < 9){
      return `00${indexNum + 1}`
    }else if(9 < indexNum < 99){
      return `0${indexNum + 1}`
    }
  }
  return (
    <List>
      <div className="list_title">
        {listName === 'jobs' ? 
        <a href={detailUrl} rel="noreferrer" target="_blank">
          {listId.title}
        </a>: <a href={detailUrl} rel="noreferrer">
          {listId.title}
        </a>}
        
      </div>
      {listName === "jobs" ? null : (
        <div className="user_wrap">
          <p className="userId" onClick={viewUserId}>{listId.by}</p>
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
