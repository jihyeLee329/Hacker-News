import React,{useEffect, useState} from "react";
import { TopList } from "../components/Top/TopList";
import CheckRadio from '../components/CheckRadio'
import LookZoom from '../components/LookZoom';
import { getTopStoryIds } from '../API/HNApi'

//---------- 메인 컴포넌트  ------------- //
export default function Home({onDimmed}) {

  const [topStoryIds, setTopStoryIds] = useState([]);
  useEffect(() => {
    getTopStoryIds().then((data) => setTopStoryIds(data));
  }, []);


  return (
    <>
      <TopList onDimmed={onDimmed} topStoryIds={topStoryIds}/>
      <CheckRadio/>
      <LookZoom />
    </>
  );
}
