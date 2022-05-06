import React, { useEffect, useState, useCallback, useRef } from "react";
import { getShowIds, getData } from "../API/HNApi";
import LookZoom from "../components/LookZoom";
import LookSmallView from "../components/LookSmallView";
import CheckRadio from "../components/CheckRadio";
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-bottom:67px;
`;


const RefWrapper = React.forwardRef((props, ref)=>{
  return <div ref={ref}>
    {props.children}
  </div>

});

function Show({
  sortChecked,
  changeChk,
  onZoomToggle,
  onToggle,
  setUserId,
  setUserChk
}) {
  
  //listName 내가 어떤 페이지인지
  const [listName, setListName] = useState("");
  const [showIds, setShowIds] = useState([]);
  const [listId, setListId] = useState([]);
  const [dataList, setDataList] = useState([]);

  //ListName 정의, show API 받아오기
  useEffect(() => {
    setListName("show");
    getShowIds().then((data) => setShowIds(data));
    return () => setShowIds([]);
  }, []);

  //받아온 API (id) 값을 이용하여 item 조회 & 하나의 배열로 합쳐주기
  useEffect(() => {
    showIds
      .map((showId) => getData(showId).then((data) => data && setListId(data)));
    return () => setListId([]);
  }, [showIds]);

  useEffect(() => {
    setDataList(dataList.concat(listId));
    return ()=>setDataList([]);
  }, [listId]);

  if(sortChecked === false){
    dataList.sort(function(a,b){
      return b.time - a.time; 
    });
  }else{
    dataList.sort(function(a,b){
      return b.score - a.score; 
    });
  }


  const [datas, setDatas] = useState([]); //데이터 보여줄거 
  const [scrollOptions, setScrollOptions] = useState({
    childLength: 10, // 첫 렌더될 아이템의 개수
    fullHeight: 0, // 총 스크롤의 크기
  });
  const initialDatas = dataList;

  //설정한 api 갯수만큼 보여주기
  useEffect(() => {
    setDatas(initialDatas.slice(0, scrollOptions.childLength));
  }, [initialDatas, scrollOptions.childLength]);

  const fullContent = useRef();
  const childContent = React.createRef();
  
  const onScroll =useCallback(
    (e) => {   
      const scrollAreaHeight = fullContent.current.clientHeight; // 한 눈에 보이는 스크롤 영역
      const myScroll = e.target.scrollTop + scrollAreaHeight; // 사용자의 스크롤 위치
      const childHeight = e.target.children.clientHeight; // 스크롤안의 아이템의 높이
      scrollOptions.fullHeight = e.nativeEvent.target.scrollHeight;
      const showMoreData = () => {
          setScrollOptions({ ...scrollOptions,
          childLength : scrollOptions.childLength + 10,
          fullHeight : childHeight * scrollOptions.childLength
        })
      }

      myScroll === scrollOptions.fullHeight && showMoreData(); // 사용자의 스크롤 영역이 하단에 도달했을때 shoowMoreData함수를 실행시킨다.
    },[scrollOptions, setScrollOptions]
  )

  return (
    <Wrapper>
      <CheckRadio
        sortChecked={sortChecked}
        changeChk={changeChk}
        onZoomToggle={onZoomToggle}
        onToggle={onToggle}
        listName={listName}
      />
      <div className="list-container" ref={fullContent} onScroll={onScroll} style={{height:'calc(100vh - 160px)', overflowY:'auto'}}>
      {datas.map((data, index) =>
          onToggle ? (
            <RefWrapper ref={childContent} key={data.id} >
              <LookZoom data={data} index={index} listName={listName} setUserId={setUserId} setUserChk={setUserChk}/>
            </RefWrapper>
          ) : (
            <RefWrapper ref={childContent} key={data.id} >
            <LookSmallView  data={data} key={data.id} index={index} listName={listName} setUserId={setUserId} setUserChk={setUserChk} />
            </RefWrapper>
            )
        )}
        </div>
    </Wrapper>
  );
}
export default Show;
