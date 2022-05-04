import React,{useEffect, useState} from "react";
import { TopList } from "../components/Top/TopList";
import CheckRadio from '../components/CheckRadio'
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import { getTopStoryIds, getData } from '../API/HNApi'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-bottom:67px;
`;
//---------- 메인 컴포넌트  ------------- //
export default function Home({onDimmed, sortChecked, changeChk ,onZoomToggle, onToggle, setUserId, setUserChk}) {
  
  //listName 내가 어떤 페이지인지
  const [listName, setListName] = useState("");
  const [topStoryIds, setTopStoryIds] = useState([]);
  const [listId, setListId] = useState([]);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setListName('article');
    getTopStoryIds().then((data) => setTopStoryIds(data));
    return () => setTopStoryIds([]);
  }, []);

  useEffect(() => {
    topStoryIds
      .slice(0, 10)
      .map((topStoryId) => getData(topStoryId).then((data) => data && setListId(data)));
    return () => setListId([]);
  }, [topStoryIds]);

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
      <TopList topStoryIds={dataList} setUserId={setUserId} setUserChk={setUserChk}/>
      <CheckRadio sortChecked={sortChecked} changeChk={changeChk} onZoomToggle={onZoomToggle} onToggle={onToggle} listName={listName}/>
      {dataList
        .slice(0, 10)
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
