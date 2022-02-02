import React, { useEffect, useState } from 'react'
import {getJobsIds} from '../API/HNApi';
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import CheckRadio from '../components/CheckRadio'
// import {Link, Route} from 'react-router-dom'

function Ask({checked, changeChk, onZoomToggle, onToggle ,listName, setListName}){
  const [jobsIds, setJobsIds] = useState([]);
  useEffect(()=>{
    setListName("jobs");
    getJobsIds().then((data) => setJobsIds(data));
  },[]);

  
  return(
    <>
    <CheckRadio checked={checked} changeChk={changeChk} onZoomToggle={onZoomToggle} onToggle={onToggle}/>
    {jobsIds.slice(0,10).map((id,index)=>(
      onToggle ? 
        <LookZoom id={id} key={id} index={id} listName={listName} /> :
        <LookSmallView  id={id} key={id} index={index} listName={listName}/>
    ))}
    </>
  )

}
export default Ask;