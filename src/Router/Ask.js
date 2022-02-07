import React, { useEffect, useState } from 'react'

import {getAskIds, getData} from '../API/HNApi';
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import CheckRadio from '../components/CheckRadio'
// import {Link, Route} from 'react-router-dom'

function Ask({checked, changeChk, onZoomToggle, onToggle ,listName, setListName}){
  const [askIds, setAskIds] = useState([]);
  const [listId, setListId] = useState([]);
  const [eachData, setEachData] = useState([]);
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
      <CheckRadio
        checked={checked}
        changeChk={changeChk}
        onZoomToggle={onZoomToggle}
        onToggle={onToggle}
      />
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
export default Ask;