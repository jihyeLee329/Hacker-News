import React, { useEffect, useState } from 'react'
import {getJobsIds, getData} from '../API/HNApi';
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import CheckRadio from '../components/CheckRadio'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-bottom:67px;
`;

const RefWrapper = React.forwardRef((props, ref)=>{
  return <div ref={ref}>
    {props.children}
  </div>
});

function Ask({sortChecked, changeChk, onZoomToggle, onToggle , setUserId, setUserChk, scrollOptions
}){
  
  //listName 내가 어떤 페이지인지
  const [listName, setListName] = useState("");
  const [jobsIds, setJobsIds] = useState([]);
  const [listId, setListId] = useState([]);
  const [dataList, setDataList] = useState([]);

  const [datas, setDatas] = useState([]); //데이터 보여줄거 
  const initialDatas = dataList;
  const childContent = React.createRef();

  //설정한 api 갯수만큼 보여주기
  useEffect(() => {
    setDatas(initialDatas.slice(0, scrollOptions.childLength));
    return ()=>setDatas([]);
  }, [initialDatas, scrollOptions.childLength]);

  useEffect(()=>{
    setListName("jobs");
    getJobsIds().then((data) => setJobsIds(data));
    return () => setJobsIds([]);
  },[]);

  
  useEffect(() => {
    jobsIds
      .map((jobsId) => getData(jobsId).then((data) => data && setListId(data)));
    return () => setListId([]);
  }, [jobsIds]);

  useEffect(() => {
    setDataList(dataList.concat(listId));
    return ()=>setDataList([]);
  }, [listId]);

  if(sortChecked === false){
    dataList.sort(function(a,b){
      return b.time - a.time; 
    });
  }else{
    dataList.sort(function(a,b){
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
      {datas
        .map((data, index) =>
          onToggle ? (
            <RefWrapper ref={childContent} key={data.id} >
              <LookZoom data={data} index={index} listName={listName} setUserId={setUserId} setUserChk={setUserChk}/>
            </RefWrapper>
          ) : (
            <RefWrapper ref={childContent} key={data.id} >
            <LookSmallView  data={data} key={data.id} index={index} listName={listName} setUserId={setUserId} setUserChk={setUserChk} />
            </RefWrapper>
            )
        )}
    </Wrapper>
  );

}
export default Ask;