import React, { useEffect, useState } from 'react'
import {getAskIds, getData} from '../API/HNApi';
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import CheckRadio from '../components/CheckRadio'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-bottom:67px;
`;
function Ask({sortChecked, changeChk, onZoomToggle, onToggle, setUserId, setUserChk}){
  //listName 내가 어떤 페이지인지
  const [listName, setListName] = useState("");
  const [askIds, setAskIds] = useState([]);
  const [listId, setListId] = useState([]);  
  const [dataList, setDataList] = useState([]);
  useEffect(()=>{
    setListName("ask");
    getAskIds().then((data) => setAskIds(data));
    return () => setAskIds([]);
  },[]);

  useEffect(() => {
    askIds
      .slice(0, 10)
      .map((askId) => getData(askId).then((data) => data && setListId(data)));
    return () => setListId([]);
  }, [askIds]);

  useEffect(() => {
    setDataList(dataList.concat(listId));
    return () => setDataList([]);
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
        .slice(0, 10)
        .map((data, index) =>
          onToggle ? (
            <LookZoom data={data} key={data.id} index={index} listName={listName} setUserId={setUserId} setUserChk={setUserChk}/>
          ) : (
            <LookSmallView data={data} key={data.id} index={index} listName={listName} setUserId={setUserId} setUserChk={setUserChk}/>
          )
        )}
    </Wrapper>
  );

}
export default Ask;