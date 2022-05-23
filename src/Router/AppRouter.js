import React from 'react';
import { HashRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Home from "./Home";
import Article from "./Article";
import Ask from "./Ask";
import Show from "./Show";
import Jobs from "./Jobs";
import ListPage from'./ListPage';
import { Detail } from "./Detail";
export default function AppRouter({scrollOptions, setScrollOptions}){

    return (
        <>
        {/* <Route path="/list" render={(props)=>(
           <ListPage scrollOptions={scrollOptions} setScrollOptions={setScrollOptions}
           sortChecked={sortChecked}
             changeChk={changeChk}
             onZoomToggle={onZoomToggle}
             onToggle={onToggle}
             setUserId={setUserId}
             setUserChk={setUserChk} {...props} />
        )}>
         
        </Route> */}
        <Routes>
          <Route path="/article/:id" element={<Detail/>} />
          <Route path="/article" element={ <Article scrollOptions={scrollOptions} setScrollOptions={setScrollOptions} />} />
          <Route path="/ask/:id" element={<Detail />} />
          <Route path="/ask" element={ <Ask scrollOptions={scrollOptions} setScrollOptions={setScrollOptions}/>}/>
          <Route path="/show/:id" element={<Detail/>} />
          <Route path="/show" element={ <Show scrollOptions={scrollOptions} setScrollOptions={setScrollOptions}/>}/>
          <Route path="/jobs" element={<Jobs scrollOptions={scrollOptions} setScrollOptions={setScrollOptions}/> }/>
          <Route path="/" element={<Home />}/>
        </Routes>
        </>
    )

}