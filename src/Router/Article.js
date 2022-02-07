import React, { useEffect, useState } from 'react'
import {getNewIds} from '../API/HNApi';
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import CheckRadio from '../components/CheckRadio'
// import {Link, Route} from 'react-router-dom'

function Article({checked, changeChk, onZoomToggle, onToggle ,listName, setListName}){
  const [topIds, setTopIds] = useState([]);
  useEffect(()=>{
    setListName("article");
    getNewIds().then((data) => setTopIds(data));
  },[]);

  
  return(
    <>
    <CheckRadio checked={checked} changeChk={changeChk} onZoomToggle={onZoomToggle} onToggle={onToggle}/>
    {topIds.slice(0,10).map((id,index)=>(
      onToggle ? 
        <LookZoom id={id} key={id} index={id} listName={listName} /> :
        <LookSmallView  id={id} key={id} index={index} listName={listName}/>
    ))}
    </>
  )

}
export default Article;