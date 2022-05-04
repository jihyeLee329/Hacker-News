//css
import {GlobalStyle}  from './css/Common'
import Header from "./components/Header";
import UserInfo from './components/UserInfo'
import { Button } from './components/Button';
import React, { useEffect, useState } from "react";
import Dimmed from "./components/Dimmed";
import AboutSite from './components/AboutSite'
import AppRouter from './Router/AppRouter';

function App() {
  //dimmed 효과
  const [dimmed, setDimmed] = useState(false);
  function onDimmed() {
    setDimmed(!dimmed);
  }

  //about 사이트 
  const [aboutBtn, setAboutBtn] = useState(false);
  
  //사용자 정보
  const [userId, setUserId] = useState('');
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

  return (
    <>
    <GlobalStyle  userChk={userChk} />
      <div className="wrapper">
        <Dimmed dimmed={dimmed} setUserChk={setUserChk} userChk={userChk} setDimmed={setDimmed} />
        <Header setAboutBtn={setAboutBtn} aboutBtn={aboutBtn}/>
        <AppRouter 
              sortChecked={sortChecked}
              changeChk={changeChk}
              onZoomToggle={onZoomToggle}
              onToggle={onToggle}
              setUserId={setUserId}
              setUserChk={setUserChk} 
              onDimmed={onDimmed}/>
      </div>
      <AboutSite aboutBtn={aboutBtn} setAboutBtn={setAboutBtn}/>
      <UserInfo userId={userId} userChk={userChk} setUserId={setUserId} setUserChk={setUserChk} dimmed={dimmed} setDimmed={setDimmed}/>
      <Button />
    </>
  );
}

export default App;
