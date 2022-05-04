import React, { useEffect, useState } from "react";
import { getShowIds, getData } from "../API/HNApi";
import LookZoom from "../components/LookZoom";
import LookSmallView from "../components/LookSmallView";
import CheckRadio from "../components/CheckRadio";
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-bottom:67px;
`;
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
      .slice(0, 15)
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

  return (
    <Wrapper>
      <CheckRadio
        sortChecked={sortChecked}
        changeChk={changeChk}
        onZoomToggle={onZoomToggle}
        onToggle={onToggle}
        listName={listName}
      />
      {dataList
        .slice(0, 15)
        .map((data, index) =>
          onToggle ? (
            <LookZoom data={data} key={data.id} index={index} listName={listName} setUserId={setUserId} setUserChk={setUserChk}/>
          ) : (
            <LookSmallView data={data} key={data.id} index={index} listName={listName} setUserId={setUserId} setUserChk={setUserChk} />
          )
        )}
    </Wrapper>
  );
}
export default Show;
