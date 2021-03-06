import React, { useEffect, useState } from 'react'
import {getJobsIds, getData} from '../API/HNApi';
import LookZoom from '../components/LookZoom';
import LookSmallView from '../components/LookSmallView';
import CheckRadio from '../components/CheckRadio'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil';
import { ListModeToggle, SortCheckedAtom } from '../atom';

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

const RefWrapper = React.forwardRef((props, ref)=>{
  return <div ref={ref}>
    {props.children}
  </div>
});

function Ask({scrollOptions
}){
  
  //listName 내가 어떤 페이지인지
  const [listName, setListName] = useState("");
  const [jobsIds, setJobsIds] = useState([]);
  const [listId, setListId] = useState([]);
  const [dataList, setDataList] = useState([]);
  const sortChecked = useRecoilValue(SortCheckedAtom);
  const listModeToggle = useRecoilValue(ListModeToggle);
  const [datas, setDatas] = useState([]); //데이터 보여줄거 
  const initialDatas = dataList;
  const childContent = React.createRef();
  const totalLength = jobsIds.length;


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
        listName={listName}
      />
      <h1 className="total-length">TOTAL : {totalLength}</h1>
      {datas
        .map((data, index) =>
        listModeToggle ? (
            <RefWrapper ref={childContent} key={data.id} >
              <LookZoom data={data} index={index} listName={listName}/>
            </RefWrapper>
          ) : (
            <RefWrapper ref={childContent} key={data.id} >
              <LookSmallView  data={data} key={data.id} index={index} listName={listName} />
            </RefWrapper>
            )
        )}
    </Wrapper>
  );

}
export default Ask;