//css
import "./css/common.css";
import Header from "./components/Header";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./Router/Home";
import Article from "./Router/Article";
import Ask from "./Router/Ask";
import Show from "./Router/Show";
import Jobs from "./Router/Jobs";
import { Detail } from "./Router/Detail";

import React, { useEffect, useState } from "react";
import Dimmed from "./components/Dimmed";

function App() {
  //dimmed 효과
  const [dimmed, setDimmed] = useState(false);
  function onDimmed() {
    setDimmed(!dimmed);
    console.log(dimmed);
  }

  //사용자 정보
  const [user, setUser] = useState({});

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
      <div className="wrapper">
        <Dimmed dimmed={dimmed} />
        <Header />
        <Route path="/article/detail/:id" component={Detail} />
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
            />
          )}
        />
        <Route path="/ask/detail/:id" component={Detail} />
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
            />
          )}
        />

        <Route path="/show/detail/:id" component={Detail} />
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
            />
          )}
        />
        <Route
          path="/"
          exact
          render={() => (
            <Home
              listName={listName}
              setListName={setListName}
              onDimmed={onDimmed}
              checked={checked}
              changeChk={changeChk}
              onZoomToggle={onZoomToggle}
              onToggle={onToggle}
            />
          )}
        />
      </div>
      {/* <전체>
        <헤더></헤더>
        <헤더제외 컨텐츠>
          <랭킹5 나우 >
            <컴포넌트랭킹></컴포넌트랭킹>  
          </랭킹5>
          <인조이헤커뉴스>
            <뉴or탑></뉴or탑>
            <뉴></뉴>
            <탑>
            <탑컴포넌트></탑컴포넌트>
            </탑>
          </인조이헤커뉴스>
        </헤더제외>
      </전체> */}
    </>
  );
}

export default App;
