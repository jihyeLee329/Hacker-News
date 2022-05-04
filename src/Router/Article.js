import React, { useEffect, useState } from 'react'
import {getTopStoryIds, getData} from '../API/HNApi';
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import CheckRadio from '../components/CheckRadio'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-bottom:67px;
`;
function Article({sortChecked, changeChk, onZoomToggle, onToggle, setUserId,setUserChk }){
  //listName 내가 어떤 페이지인지
  const [listName, setListName] = useState("");
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

  if(sortChecked === false){
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
        sortChecked={sortChecked}
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