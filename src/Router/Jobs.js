import React, { useEffect, useState } from "react";
import { getJobsIds, getData } from "../API/HNApi";
import LookZoom from "../components/LookZoom";
import LookSmallView from "../components/LookSmallView";
import CheckRadio from "../components/CheckRadio";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-bottom: 67px;
`;
function Ask({
  sortChecked,
  changeChk,
  onZoomToggle,
  onToggle,
  setUserId,
  setUserChk,
}) {
  const [listName, setListName] = useState("");
  const [jobsIds, setJobsIds] = useState([]);
  const [listId, setListId] = useState([]);
  const [eachData, setEachData] = useState([]);
  useEffect(() => {
    setListName("jobs");
    getJobsIds().then((data) => setJobsIds(data));
    return () => setJobsIds([]);
  }, []);

  useEffect(() => {
    jobsIds
      .slice(0, 10)
      .map((jobsId) => getData(jobsId).then((data) => data && setListId(data)));
    return () => setListId([]);
  }, [jobsIds]);

  useEffect(() => {
    setEachData(eachData.concat(listId));
    return () => setEachData([]);
  }, [listId]);

  if (sortChecked === false) {
    eachData.sort(function (a, b) {
      return b.time - a.time;
    });
  } else {
    eachData.sort(function (a, b) {
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
            <LookZoom
              data={data}
              key={data.id}
              index={index}
              listName={listName}
              setUserId={setUserId}
              setUserChk={setUserChk}
            />
          ) : (
            <LookSmallView
              data={data}
              key={data.id}
              index={index}
              listName={listName}
              setUserId={setUserId}
              setUserChk={setUserChk}
            />
          )
        )}
    </Wrapper>
  );
}
export default Ask;
