import React, { useEffect, useState } from 'react'
import {getTopStoryIds, getData} from '../API/HNApi';
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import CheckRadio from '../components/CheckRadio'
// import {Link, Route} from 'react-router-dom'

function Article({checked, changeChk, onZoomToggle, onToggle ,listName, setListName}){
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
export default Article;