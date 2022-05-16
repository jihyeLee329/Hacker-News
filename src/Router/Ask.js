import React, { useEffect, useState } from "react";
import { getAskIds, getData } from "../API/HNApi";
import LookZoom from "../components/LookZoom";
import LookSmallView from "../components/LookSmallView";
import CheckRadio from "../components/CheckRadio";
import styled from "styled-components";
import { ListModeToggle, SortCheckedAtom } from "../atom";
import { useRecoilValue } from "recoil";

const Wrapper = styled.div`
  padding-bottom: 67px;
`;

const RefWrapper = React.forwardRef((props, ref)=>{
  return <div ref={ref}>
    {props.children}
  </div>
});

function Ask({
  scrollOptions
}) {
  //listName 내가 어떤 페이지인지
  const [listName, setListName] = useState("");
  const [askIds, setAskIds] = useState([]);
  const [listId, setListId] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [datas, setDatas] = useState([]); //데이터 보여줄거 
  const sortChecked = useRecoilValue(SortCheckedAtom);
  const listModeToggle = useRecoilValue(ListModeToggle);
  const initialDatas = dataList;
  const childContent = React.createRef();

  //설정한 api 갯수만큼 보여주기
  useEffect(() => {
    setDatas(initialDatas.slice(0, scrollOptions.childLength));
    return ()=>setDatas([]);
  }, [initialDatas, scrollOptions.childLength]);


  useEffect(() => {
    setListName("ask");
    getAskIds().then((data) => setAskIds(data));
    return () => setAskIds([]);
  }, []);

  useEffect(() => {
    askIds.map((askId) => getData(askId).then((data) => data && setListId(data)));
    return () => setListId([]);
  }, [askIds]);

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
        listName={listName}
      />
      {datas.map((data, index) =>
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
