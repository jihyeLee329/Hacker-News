import React, { useEffect, useState } from 'react'
import {getTopStoryIds, getData} from '../API/HNApi';
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import CheckRadio from '../components/CheckRadio'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-bottom:67px;
`;
function Article({checked, changeChk, onZoomToggle, onToggle ,listName, setListName, setUserId,setUserChk }){
  const [articleIds, setArticleIds] = useState([]);
  const [listId, setListId] = useState([]);
  const [eachData, setEachData] = useState([]);
  useEffect(()=>{
    setListName("article");
    getTopStoryIds().then((data) => setArticleIds(data));
    return () => setArticleIds([]);
  },[]);
  
  useEffect(() => {
    articleIds
      .slice(0, 10)
      .map((articleId) => getData(articleId).then((data) => data && setListId(data)));
    return () => setListId([]);
  }, [articleIds]);

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
export default Article;