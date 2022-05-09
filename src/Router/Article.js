import React, { useEffect, useState } from "react";
import { getTopStoryIds, getData } from "../API/HNApi";
import LookZoom from "../components/LookZoom";
import LookSmallView from "../components/LookSmallView";
import CheckRadio from "../components/CheckRadio";
import styled from "styled-components";

const Wrapper = styled.div`
 padding-bottom: 67px;

 .total-length{
   padding:10px 25px 15px;
   color:#FF6600;
   font-size: 13px;
   line-height: 20px;
   font-weight:normal;
 }
`;

const RefWrapper = React.forwardRef((props, ref) => {
 return <div ref={ref}>{props.children}</div>;
});

function Article({
 sortChecked,
 changeChk,
 onZoomToggle,
 onToggle,
 setUserId,
 setUserChk,
 scrollOptions,
}) {
 //listName 내가 어떤 페이지인지
 const [listName, setListName] = useState("");
 const [articleIds, setArticleIds] = useState([]);
 const [listId, setListId] = useState([]);
 const [dataList, setDataList] = useState([]);
 const [datas, setDatas] = useState([]); //데이터 보여줄거
 const initialDatas = dataList;
 const childContent = React.createRef();
 const totalLength = articleIds.length;


 //설정한 api 갯수만큼 보여주기
 useEffect(() => {
  setDatas(initialDatas.slice(0, scrollOptions.childLength));
  return () => setDatas([]);
 }, [initialDatas, scrollOptions.childLength]);

 useEffect(() => {
  setListName("article");
  getTopStoryIds().then((data) => setArticleIds(data));
  return () => setArticleIds([]);
 }, []);

 useEffect(() => {
  articleIds.forEach((articleId) =>
   getData(articleId).then((data) => data && setListId(data))
  );
  return () => setListId([]);
 }, [articleIds]);

 useEffect(() => {
  setDataList(dataList.concat(listId));
  return () => setDataList([]);
 }, [listId]);

 if (sortChecked === false) {
  dataList.sort(function (a, b) {
   return b.time - a.time;
  });
 } else {
  dataList.sort(function (a, b) {
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
   <h1 className="total-length">TOTAL : {totalLength}</h1>
   {datas.map((data, index) =>
    onToggle ? (
     <RefWrapper ref={childContent} key={data.id}>
      <LookZoom
       data={data}
       index={index}
       listName={listName}
       setUserId={setUserId}
       setUserChk={setUserChk}
      />
     </RefWrapper>
    ) : (
     <RefWrapper ref={childContent} key={data.id}>
      <LookSmallView
       data={data}
       key={data.id}
       index={index}
       listName={listName}
       setUserId={setUserId}
       setUserChk={setUserChk}
      />
     </RefWrapper>
    )
   )}
  </Wrapper>
 );
}
export default Article;
