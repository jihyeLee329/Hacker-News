import React, { useEffect, useState } from 'react'
import {getAskIds, getData} from '../API/HNApi';
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import CheckRadio from '../components/CheckRadio'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-bottom:67px;
`;
function Ask({checked, changeChk, onZoomToggle, onToggle ,listName, setListName, setUserId, setUserChk}){
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
    return () => setEachData([]);
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
    <Wrapper>
      <CheckRadio
        checked={checked}
        changeChk={changeChk}
        onZoomToggle={onZoomToggle}
        onToggle={onToggle}
        listName={listName}
      />
      {eachData
        .slice(0, 10)
        .map((data, index) =>
          onToggle ? (
            <LookZoom data={data} key={data.id} index={index} listName={listName} setUserId={setUserId} setUserChk={setUserChk}/>
          ) : (
            <LookSmallView data={data} key={data.id} index={index} listName={listName} setUserId={setUserId} setUserChk={setUserChk}/>
          )
        )}
    </Wrapper>
  );

}
export default Ask;