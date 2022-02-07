import React, { useEffect, useState } from 'react'
import {getJobsIds, getData} from '../API/HNApi';
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import CheckRadio from '../components/CheckRadio'
// import {Link, Route} from 'react-router-dom'

function Ask({checked, changeChk, onZoomToggle, onToggle ,listName, setListName}){
  const [jobsIds, setJobsIds] = useState([]);
  const [listId, setListId] = useState([]);
  const [eachData, setEachData] = useState([]);
  useEffect(()=>{
    setListName("jobs");
    getJobsIds().then((data) => setJobsIds(data));
    return () => setJobsIds([]);
  },[]);

  
  useEffect(() => {
    jobsIds
      .slice(0, 10)
      .map((jobsId) => getData(jobsId).then((data) => data && setListId(data)));
    return () => setListId([]);
  }, [jobsIds]);

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