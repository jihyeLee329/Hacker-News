import React, { useEffect, useState } from "react";
import { getShowIds } from "../API/HNApi";
import LookZoom from "../components/LookZoom";
import LookSmallView from "../components/LookSmallView";
import CheckRadio from "../components/CheckRadio";

// import {Link, Route} from 'react-router-dom'

function Show({
  checked,
  changeChk,
  onZoomToggle,
  onToggle,
  listName,
  setListName,
}) {
  const [showIds, setShowIds] = useState([]);
  useEffect(() => {
    setListName("show");
    getShowIds().then((data) => setShowIds(data));
  }, []);

  return (
    <>
      <CheckRadio
        checked={checked}
        changeChk={changeChk}
        onZoomToggle={onZoomToggle}
        onToggle={onToggle}
      />
      {showIds
        .slice(0, 10)
        .map((id, index) =>
          onToggle ? (
            <LookZoom id={id} key={id} index={id} listName={listName} />
          ) : (
            <LookSmallView id={id} key={id} index={index} listName={listName} />
          )
        )}
    </>
  );
}
export default Show;
