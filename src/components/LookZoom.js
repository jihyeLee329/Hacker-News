import {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import {TimeForToday} from "./TimeForToday";
import IconComment from '../img/ic_comment.svg'
import IconPoint from '../img/ic_point.svg'
import IconLinkBig from '../img/ic_link_big.png'
import IconArrow from '../img/ic_arrow.svg'


//list마다 swiper 하는 모듈
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type as ListType
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

const List = styled.div `
a{ display:block;}
padding:16px 16px 0; 
background:#fff;
width:100%;
  .list_title{
    font-size:18px; line-height:24px;
    padding-bottom:12px; 
  }
  .user_wrap {
    border-top: 1px solid #F0F0F6;
    padding-top:8px; padding-bottom:12px; display:flex; justify-content:space-between; font-size:12px; line-height:16px;}
  .userId{color:#767676; line-height:inherit; font-size:inherit; width:45%;
    &:after{content:url(${IconArrow}); display:inline-block; vertical-align:top;}
  }
  .listInfo{line-height:inherit; font-size:inherit; width:55%; text-align:right;
    span{display:inline-block; vertical-align:top;}
    span:before {display:inline-block; vertical-align:top; margin-right:3px;}
    .listComments{color:#FF6600; margin-left:8px;
      &:before {content:url(${IconComment});}
      }
  }
  .listPoint{color:#505050;
    &:before{content:url(${IconPoint});
  }
  `;

//리스트 드래그시, 왼쪽 박스
const LeftBox = styled.div `
  background:#FF6600;
  border-radius: 16px 0 0 16px;
  display:flex;align-items:center; 
  padding-left:24px;
  text-align:left;
    h1{font-size:20px; line-height:22px; color:#fff;}
    p{margin-top:4px;font-size:12px; color:#fff; word-break:break-word;width:50px;}
  `;

//리스트 드래그시, 오른쪽 박스
const RightBox = styled.a `
  background: #AFD8D8;
  border-radius:0 16px 16px 0;
  display:flex;align-items:center; 
  padding-right:16px;
  span{
    width:48px;height:48px; background-image:url(${IconLinkBig});
  background-size:40px auto; background-position: center;
  background-repeat:no-repeat;}
  `;

// swiper-list 각각 css
const SwiperBox = styled.div`
  & +& {margin-top:12px;}
  width:calc(100vw - 40px); 
  overflow:hidden;
  margin:0 auto;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  .swipe-action{min-width:80px;}
`;
function LookZoom({data, listName, index, setUserId, setUserChk}) {
  const [listId, setListId] = useState({}); //각각 list data
  const [time, setTime] = useState(0); // 시간 계산
  const [detailUrl, setDetailUrl] = useState(""); //각각 list 의 url
  const [originUrl, setOriginUrl] = useState(""); //본래 해커뉴스 link
  const [idUrl, setIdUrl] = useState(""); //각각 회원 정보
  const [indexNum, setIndexNum] = useState(0);
 
 

    useEffect(() => {
      setListId(data);
    }, [data]);

    useEffect(() => {
      if (listName === "jobs") {
        setDetailUrl(`https://news.ycombinator.com/item?id=${data.id}`);
      } else {
        setDetailUrl(`/${listName}/detail/${data.id}`);
        setOriginUrl(`https://news.ycombinator.com/item?id=${data.id}`)
      }
      return() => {
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
    function viewUserId() {
      setUserId(listId.by);
      setUserChk(true);
    }

    const IndexNum = (indexNum) => {
      if (indexNum < 9) {
        return `00${indexNum + 1}`
      } else if (9 < indexNum < 99) {
        return `0${indexNum + 1}`
      }
    }
  
    const goUrl = () =>{
      myLink.current.click();
    }
    const myLink = useRef(null);
    const leadingActions = () => (
      <LeadingActions>
        <SwipeAction
          destructive={false}
          onClick={() => console.info('swipe action triggered')}>
          <LeftBox>
              <div>
                  <h1>{IndexNum(index)}</h1>
                  <p>{TimeForToday(time)}</p>
              </div>
          </LeftBox>
        </SwipeAction>
      </LeadingActions>
    );

    const trailingActions = () => (
      <TrailingActions>
        <SwipeAction
            destructive={false}
            onClick={goUrl}
          >
            <RightBox href={detailUrl} ref={myLink}>
                <span></span>
            </RightBox>
        </SwipeAction>
      </TrailingActions>
    )

  return (
    <> 
    <SwiperBox>
    <SwipeableList> 
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
        onSwipeEnd={goUrl} >
        <List>
          <div className="list_title">
            {
              listName === 'jobs'
                ? <a href={detailUrl} rel="noreferrer" target="_blank">
                      {listId.title}
                  </a>
                : <a href={detailUrl} rel="noreferrer">
                    {listId.title}
                  </a>
            }
          </div>
            {
              listName === "jobs"
                ? null
                : (
                <div className="user_wrap">
                  <p className="userId" onClick={viewUserId}>{listId.by}</p>
                  <div className="listInfo">
                    <a href={detailUrl} rel="noreferrer">
                      <span className="listPoint">{listId.score}</span>
                      <span className="listComments">
                          {listId.descendants ? listId.descendants : 0 }
                      </span>
                    </a>
                  </div>
                </div>
              )
            }
        </List>
      </SwipeableListItem>
    </SwipeableList>
    </SwiperBox>
  </>
  );
}

export default LookZoom;
