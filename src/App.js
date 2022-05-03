//css
import { GlobalStyle } from "./css/Common";
import Header from "./components/Header";
import UserInfo from "./components/UserInfo";
import { ScrollTopButton } from "./components/ScrollTopButton";
import React, { useState } from "react";
import Dimmed from "./components/Dimmed";
import AboutSite from "./components/AboutSite";
import AppRouter from "./Router/AppRoute";

function App() {
  //dimmed 효과
  const [dimmed, setDimmed] = useState(false);
  function onDimmed() {
    setDimmed(!dimmed);
  }

  //about 사이트
  const [showAboutSite , setShowAboutSite ] = useState(false);

  //사용자 정보
  const [userId, setUserId] = useState("");
  const [userChk, setUserChk] = useState(false);

  //체크여부
  const [sortChecked, setSortChecked] = useState(true);
  function changeChk() {
    setSortChecked(!sortChecked);
  }

  //List에서 보기모드 변경 버튼
  const [onToggle, setOnToggle] = useState(true);
  function onZoomToggle() {
    setOnToggle(!onToggle);
  }

  // //listName 내가 어떤 페이지인지
  // const [listName, setListName] = useState("");

  return (
    <>
      <GlobalStyle userChk={userChk} />
      <div className="wrapper">
        <Dimmed
          dimmed={dimmed}
          setUserChk={setUserChk}
          userChk={userChk}
          setDimmed={setDimmed}
        />
        <Header setShowAboutSite={setShowAboutSite} showAboutSite={showAboutSite} />
        <AppRouter
          setUserId={setUserId}
          setUserChk={setUserChk}
          sortChecked={sortChecked}
          changeChk={changeChk}
          onToggle={onToggle}
          onZoomToggle={onZoomToggle}
          onDimmed={onDimmed}
        />
      </div>
      <AboutSite showAboutSite={showAboutSite} setShowAboutSite={setShowAboutSite} />
      <UserInfo
        userId={userId}
        userChk={userChk}
        setUserId={setUserId}
        setUserChk={setUserChk}
        dimmed={dimmed}
        setDimmed={setDimmed}
      />
      <ScrollTopButton />
    </>
  );
}

export default App;
