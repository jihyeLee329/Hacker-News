import React,{useEffect, useState} from "react";
import { TopList } from "../components/Top/TopList";
import CheckRadio from '../components/CheckRadio'
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import { getTopStoryIds } from '../API/HNApi'

//---------- 메인 컴포넌트  ------------- //
export default function Home({onDimmed, checked, changeChk ,onZoomToggle, onToggle, listName, setListName}) {

  const [topStoryIds, setTopStoryIds] = useState([]);
  useEffect(() => {
    setListName('top');
    getTopStoryIds().then((data) => setTopStoryIds(data));
  }, []);


  return (
    <>
      <TopList onDimmed={onDimmed} topStoryIds={topStoryIds} />
      <CheckRadio checked={checked} changeChk={changeChk} onZoomToggle={onZoomToggle} onToggle={onToggle}/>
      {topStoryIds.slice(0, 10).map((id, index) => (
         onToggle ? 
         <LookZoom id={id} key={id} index={id} listName={listName} /> :
         <LookSmallView  id={id} key={id} index={index} listName={listName}/>
      ))}
    </>
  );
}
