import React, { useEffect, useState } from "react";
import { getShowIds, getData } from "../API/HNApi";
import LookZoom from "../components/LookZoom";
import LookSmallView from "../components/LookSmallView";
import CheckRadio from "../components/CheckRadio";


// import {Link, Route} from 'react-router-dom'

function Show({
  checked,
  changeChk,
  onZoomToggle,
  onToggle,
  listName,
  setListName,
}) {
  const [showIds, setShowIds] = useState([]);
  const [listId, setListId] = useState([]);
  const [eachData, setEachData] = useState([]);
  useEffect(() => {
    setListName("show");
    getShowIds().then((data) => setShowIds(data));
    return () => setShowIds([]);
  }, []);

  useEffect(() => {
    showIds
      .slice(0, 10)
      .map((showId) => getData(showId).then((data) => data && setListId(data)));
    return () => setListId([]);
  }, [showIds]);

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
  // console.log(eachData);
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
export default Show;
