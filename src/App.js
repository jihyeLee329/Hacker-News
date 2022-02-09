//css
import {GlobalStyle}  from './css/Common'
import Header from "./components/Header";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./Router/Home";
import Article from "./Router/Article";
import Ask from "./Router/Ask";
import Show from "./Router/Show";
import Jobs from "./Router/Jobs";
import { Detail } from "./Router/Detail";
import UserInfo from './components/UserInfo'

import React, { useEffect, useState } from "react";
import Dimmed from "./components/Dimmed";
import AboutSite from './components/AboutSite'

function App() {
  //dimmed 효과
  const [dimmed, setDimmed] = useState(false);
  function onDimmed() {
    setDimmed(!dimmed);
  }

  //사용자 정보
  const [userId, setUserId] = useState('');
  const [userChk, setUserChk] = useState(false);

  //체크여부
  const [checked, setChecked] = useState(true);
  function changeChk() {
    setChecked(!checked);
  }

  //look 버튼
  const [onToggle, setOnToggle] = useState(true);
  function onZoomToggle() {
    setOnToggle(!onToggle);
  }
  //listName 내가 어떤 페이지인지
  const [listName, setListName] = useState("");

  return (
    <>
    <GlobalStyle  userChk={userChk} />
      <div className="wrapper">
        <Dimmed dimmed={dimmed} setUserChk={setUserChk} userChk={userChk} setDimmed={setDimmed} />
        <Header />
        <Route path="/article/detail/:id" render={(props) =>(<Detail setUserId={setUserId} setUserChk={setUserChk} checked={checked}
              changeChk={changeChk} listName={listName} setListName={setListName} {...props}/>)} />
        <Route
          path="/article"
          exact
          render={() => (
            <Article
              listName={listName}
              setListName={setListName}
              checked={checked}
              changeChk={changeChk}
              onZoomToggle={onZoomToggle}
              onToggle={onToggle}
              setUserId={setUserId}
              setUserChk={setUserChk}
            />
          )}
        />
        <Route path="/ask/detail/:id" render={(props) =>(<Detail setUserId={setUserId} setUserChk={setUserChk} checked={checked}
              changeChk={changeChk} listName={listName} setListName={setListName} {...props}/>)} />
        <Route
          path="/ask"
          exact
          render={() => (
            <Ask
              listName={listName}
              setListName={setListName}
              checked={checked}
              changeChk={changeChk}
              onZoomToggle={onZoomToggle}
              onToggle={onToggle}
              setUserId={setUserId}
              setUserChk={setUserChk}
            />
          )}
        />

        <Route path="/show/detail/:id" render={(props) =>(<Detail setUserId={setUserId} setUserChk={setUserChk} checked={checked}
              changeChk={changeChk} listName={listName} setListName={setListName} {...props}/>)} />
        <Route
          path="/show"
          exact
          render={() => (
            <Show
              listName={listName}
              setListName={setListName}
              checked={checked}
              changeChk={changeChk}
              onZoomToggle={onZoomToggle}
              onToggle={onToggle}
              setUserId={setUserId}
              setUserChk={setUserChk}
            />
          )}
        />
        <Route
          path="/jobs"
          exact
          render={() => (
            <Jobs
              listName={listName}
              setListName={setListName}
              checked={checked}
              changeChk={changeChk}
              onZoomToggle={onZoomToggle}
              onToggle={onToggle}
              setUserId={setUserId}
              setUserChk={setUserChk}
            />
          )}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <Home
              listName={listName}
              setListName={setListName}
              onDimmed={onDimmed}
              checked={checked}
              changeChk={changeChk}
              onZoomToggle={onZoomToggle}
              onToggle={onToggle}
              setUserId={setUserId}
              setUserChk={setUserChk}
              {...props}
            />
          )}
        />
      </div>
      <AboutSite onDimmed={onDimmed}/>
      <UserInfo userId={userId} userChk={userChk} setUserId={setUserId} setUserChk={setUserChk} dimmed={dimmed} setDimmed={setDimmed}/>
    </>
  );
}

export default App;
