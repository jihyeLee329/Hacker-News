//css
import "./css/common.css";
import Header from "./components/Header";
import { HashRouter as Router, Route} from "react-router-dom";
import Home from "./Router/Home";
import Article from "./Router/Article";
import Ask from "./Router/Ask";
import Show from "./Router/Show";
import Jobs from "./Router/Jobs";

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
  const [checked ,setChecked] = useState(true);
  function changeChk (){
    setChecked(!checked)
  }

  //look 버튼 
  const [onToggle, setOnToggle] = useState(true);
  function onZoomToggle(){
    setOnToggle(!onToggle);
  }

  return (
    <>
      <div className="wrapper">
        <Dimmed dimmed={dimmed} />
        <Header />

        <Route path="/article">
          <Article checked={checked} changeChk={changeChk} onZoomToggle={onZoomToggle} onToggle={onToggle}/>
        </Route>
        <Route path="/ask">
          <Ask checked={checked} changeChk={changeChk} onZoomToggle={onZoomToggle}/>
        </Route>
        <Route path="/show">
          <Show />
        </Route>
        <Route path="/jobs">
          <Jobs />
        </Route>
        <Route path="/" exact>
          <Home onDimmed={onDimmed} />
        </Route>
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
