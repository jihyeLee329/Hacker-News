import './css/common.css';
import Header from './components/Header'
import { HashRouter as Router, Route, Link} from 'react-router-dom'
import Home from './Router/Home'
import Article from './Router/Article'
import Ask from './Router/Ask'
import Show from './Router/Show'
import Jobs from './Router/Jobs'
import {NewList} from './components/NewList'

import React, {useEffect, useState} from 'react'

//import ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';
function App() {
  
  
  return (
    <>
     <NewList />
    <div className="wrapper">
      <Header />
        <Route path="/article"> <Article /></Route>
        <Route path="/ask" ><Ask /></Route>
        <Route path="/show"><Show /></Route>
        <Route path="/jobs"><Jobs /></Route>
        <Route path="/" exact><Home/></Route> 
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
