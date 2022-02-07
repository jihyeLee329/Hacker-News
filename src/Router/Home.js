import React,{useEffect, useState} from "react";
import { TopList } from "../components/Top/TopList";
import CheckRadio from '../components/CheckRadio'
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import { getTopStoryIds, getData } from '../API/HNApi'

//---------- 메인 컴포넌트  ------------- //
export default function Home({onDimmed, checked, changeChk ,onZoomToggle, onToggle, listName, setListName}) {
  const [topStoryIds, setTopStoryIds] = useState([]);
  const [listId, setListId] = useState([]);
  const [eachData, setEachData] = useState([]);
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
    setEachData(eachData.concat(listId));
  }, [listId]);

  if(checked === false){
    eachData.sort(function(a,b){
      return b.time - a.time; 
    });
  }else{
    eachData.sort(function(a,b){
      return b.score - a.score; 
    });
  }
  

  return (
    <>
      <TopList onDimmed={onDimmed} topStoryIds={topStoryIds} />
      <CheckRadio checked={checked} changeChk={changeChk} onZoomToggle={onZoomToggle} onToggle={onToggle}/>
      {eachData
        .slice(0, 10)
        .map((data, index) =>
          onToggle ? (
            <LookZoom data={data} key={data.id} index={index} listName={listName} />
          ) : (
            <LookSmallView data={data} key={data.id} index={index} listName={listName}  />
          )
        )}
    </>
  );
}
