import { useState, useEffect } from "react";
import styled from "styled-components";
import { TimeForToday } from "./TimeForToday";
import IconComment from '../img/ic_comment.svg'
import IconPoint from '../img/ic_point.svg'
import IconLinkSmall from '../img/ic_link_s.png'
import IconArrow from '../img/ic_arrow.svg'


const List = styled.div`
a{display:block;}
width:calc(100vw - 40px); 
margin:0 auto 12px;
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
  >div:not(.list_top) {display:flex;justify-content:space-between; padding-top:8px;padding-bottom:12px; 
 }
 .userWrap{  border-top:1px solid #F0F0F6;}
  .userId{color:#767676; width:45%;
    &:after{content:url(${IconArrow}); display:inline-block; vertical-align:top;}
  }
  .userId + a {width:74.5%;text-align:right;}
  .listInfo{line-height:inherit; font-size:inherit;
    >span{display:inline-block; vertical-align:top;}
    >span:before {display:inline-block; vertical-align:top; margin-right:3px;}
    .listComments{color:#FF6600; margin-left:8px;
      &:before {content:url(${IconComment});}
      }
  }
  .listPoint{color:#505050;
    &:before{content:url(${IconPoint});
  }
  `;

function LookSmallView({ data, listName, index , setUserId ,setUserChk}) {
  const [eachListData, setEachListData] = useState({}); //각각 data
  const [time, setTime] = useState(0); //시간 함수에 넣을 time 
  const [detailUrl, setDetailUrl] = useState(""); //디테일 page link
  const [originUrl, setOriginUrl] = useState(""); //본래 해커뉴스 link
  const [indexNum , setIndexNum] =useState(0);

  const LIST_NAME = {JOBS : 'jobs'}
  //url 값 세팅
  useEffect(() => {
    setEachListData(data);
    if (listName === LIST_NAME.JOBS) {
      setDetailUrl(`https://news.ycombinator.com/item?id=${data.id}`);
    } else {
      setDetailUrl(`/${listName}/detail/${data.id}`);
      setOriginUrl(`https://news.ycombinator.com/item?id=${data.id}`)
    }
    return () => {
      setEachListData({});
      setDetailUrl("");
    };
  }, [data, listName]);

  //시간 구하기 
  useEffect(() => {
    setTime(eachListData.time);
  }, [eachListData.time]);

  // index 값에 따라 0 or 00 붙여주기
 useEffect(() => {
  setIndexNum(index);
  }, [index]);
  
   //회원 id 누르면 id 값 가져오기
  function viewUserId(){
    setUserId(eachListData.by);
    setUserChk(true);
  }

  //url split 
  function urlSplit(url){
    return url.split('/')[2];
  }

  const IndexNum = (indexNum)=>{
    return String(indexNum).padStart(3, "00");
  }
  // {index < 9 ? `0${index + 1}` : index + 1}

  return (
    <List>
      <div className="list_top">
        {listName === LIST_NAME.JOBS ?
        <>
          <a href={detailUrl} target="__blank" rel="noreferrer"> 
            <span className="list_rank">{IndexNum(indexNum + 1)}</span>
            <span className="time">{TimeForToday(time)}</span>
          </a> 
          <span className="list_link">
            <a href={detailUrl} target="_blank" rel="noreferrer">
            {urlSplit(detailUrl)}
            <img src={IconLinkSmall} alt="link" />
            </a>
          </span>
          </>
         : <>
          <a href={detailUrl}> 
            <span className="list_rank">{IndexNum(indexNum + 1)}</span>
            <span className="time">{TimeForToday(time)}</span>
          </a> 
          <span className="list_link">
            <a href={originUrl} >
            {urlSplit(originUrl)}
            <img src={IconLinkSmall} alt="link" />
            </a>
          </span>
          </>
         }
      </div>
      <div className="list_title">
        {listName === LIST_NAME.JOBS ?   
        <a href={detailUrl} target="__blank">{eachListData.title}</a>: 
        <a href={detailUrl}>{eachListData.title}</a>
        }
        
      </div>
      {listName === LIST_NAME.JOBS ? null : (
        <div className="userWrap">
          <p className="userId" onClick={viewUserId}>{eachListData.by}</p>
          <a href={detailUrl}>
            <div className="listInfo">
              <span className="listPoint">{eachListData.score}</span>
              <span className="listComments">
                {eachListData.descendants ? eachListData.descendants : 0}
              </span>
            </div>
          </a>
        </div>
      )}
    </List>
  );
}

export default LookSmallView;
