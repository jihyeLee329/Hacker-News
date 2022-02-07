import React, { useEffect, useState } from "react";
import { getShowIds, getData } from "../API/HNApi";
import LookZoom from "../components/LookZoom";
import LookSmallView from "../components/LookSmallView";
import CheckRadio from "../components/CheckRadio";
import axios from "axios";

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
  const [listId, setListId] = useState({});
  useEffect(() => {
    setListName("show");
    getShowIds().then((data) => setShowIds(data));
    return ()=>(
      setShowIds([])
    )
  }, []);


  useEffect(()=>{
    showIds.map((showId)=>(
      getData(showId).then((data)=> data && setListId(data))));
  },[showIds]);
console.log(listId)

  return (
    <>
      <CheckRadio
        checked={checked}
        changeChk={changeChk}
        onZoomToggle={onZoomToggle}
        onToggle={onToggle}
      />
      {/* {showIds
        .slice(0, 10)
        .map((id, index) =>
          onToggle ? (
            <LookZoom id={id} key={id} index={id} listName={listName} />
          ) : (
            <LookSmallView id={id} key={id} index={index} listName={listName} />
          )
        )} */}
    </>
  );
}
export default Show;
