import React, { useEffect, useState } from 'react'
import {getAskIds} from '../API/HNApi';
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import CheckRadio from '../components/CheckRadio'
// import {Link, Route} from 'react-router-dom'

function Ask({checked, changeChk, onZoomToggle, onToggle ,listName, setListName}){
  const [askIds, setAskIds] = useState([]);
  useEffect(()=>{
    setListName("ask");
    getAskIds().then((data) => setAskIds(data));
  },[]);
  
  return(
    <>
    <CheckRadio checked={checked} changeChk={changeChk} onZoomToggle={onZoomToggle} onToggle={onToggle}/>
    {askIds.slice(0,10).map((id,index)=>(
      onToggle ? 
        <LookZoom id={id} key={id} index={id} listName={listName} /> :
        <LookSmallView  id={id} key={id} index={index} listName={listName}/>
    ))}
    </>
  )

}
export default Ask;