import React, { useEffect, useState } from 'react'
import {getAskIds} from '../API/HNApi';
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import CheckRadio from '../components/CheckRadio'
// import {Link, Route} from 'react-router-dom'

function Ask(){
  const [listName, setListName] = useState('ask');
  const [askIds, setAskIds] = useState([]);
  useEffect(()=>{
    getAskIds().then((data) => setAskIds(data));
  },[]);

  
  return(
    <>
    <CheckRadio/>
    {askIds.slice(0,30).map((id,index)=>(
      // <LookZoom id={id} key={id} index={id} listName={listName} />
      <LookSmallView  id={id} key={id} index={index} listName={listName}  />
    ))}
    </>
  )

}
export default Ask;