//css
import {GlobalStyle}  from './css/Common'
import Header from "./components/Header";
import UserInfo from './components/UserInfo'
import { TopButton } from './components/TopButton';
import React, { useRef, useState ,useCallback } from "react";
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
  const [showAboutSite , setShowAboutSite ] = useState(false);
  
  //사용자 정보
  const [userId, setUserId] = useState('');
  const [userChk, setUserChk] = useState(false);

  //체크여부
  const [sortChecked, setSorChecked] = useState(true);
  function changeChk() {
    setSorChecked(!sortChecked);
  }

  //List에서 보기모드 변경 버튼
  const [onToggle, setOnToggle] = useState(true);
  function onZoomToggle() {
    setOnToggle(!onToggle);
  }

  // 무한스크롤
  const fullContent = useRef();
  const [scrollOptions, setScrollOptions] = useState({
    childLength: 15, // 첫 렌더될 아이템의 개수
    fullHeight: 0, // 총 스크롤의 크기
  });
  const [scrollY, setScrollY] = useState(0);
  
  const onScroll = useCallback(
    (e) => {   
      setScrollY(fullContent.current.scrollTop);
      const scrollAreaHeight = fullContent.current.clientHeight; // 한 눈에 보이는 스크롤 영역
      const myScroll = e.target.scrollTop + scrollAreaHeight; // 사용자의 스크롤 위치
      const childHeight = e.target.children.clientHeight; // 스크롤안의 아이템의 높이
      scrollOptions.fullHeight = e.nativeEvent.target.scrollHeight;
      const showMoreData = () => {
          setScrollOptions({ ...scrollOptions,
          childLength : scrollOptions.childLength + 15,
          fullHeight : childHeight * scrollOptions.childLength
        })
      }

      myScroll === scrollOptions.fullHeight && showMoreData(); // 사용자의 스크롤 영역이 하단에 도달했을때 shoowMoreData함수를 실행시킨다.
    },[scrollOptions, setScrollOptions]
  )

  return (
    <>
    <GlobalStyle  userChk={userChk} />
      <div className="wrapper" ref={fullContent} onScroll={onScroll}>
        <Dimmed dimmed={dimmed} setUserChk={setUserChk} userChk={userChk} setDimmed={setDimmed} />
        <Header setShowAboutSite={setShowAboutSite} showAboutSite={showAboutSite}/>
        <AppRouter scrollOptions={scrollOptions} setScrollOptions={setScrollOptions}
              sortChecked={sortChecked}
              changeChk={changeChk}
              onZoomToggle={onZoomToggle}
              onToggle={onToggle}
              setUserId={setUserId}
              setUserChk={setUserChk} 
              onDimmed={onDimmed}/>
        <TopButton scrollY={scrollY} />
      </div>
      <AboutSite showAboutSite={showAboutSite} setShowAboutSite={setShowAboutSite}/>
      <UserInfo userId={userId} userChk={userChk} setUserId={setUserId} setUserChk={setUserChk} dimmed={dimmed} setDimmed={setDimmed}/>
       </>
  );
}

export default App;
