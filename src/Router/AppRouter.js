import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
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
        <Route path="/article/detail/:id" render={(props) =>(<Detail {...props}/>)} />
        <Route
          path="/article"
          exact
          render={() => (
            <Article
            scrollOptions={scrollOptions} setScrollOptions={setScrollOptions}
            />
          )}
        />
        <Route path="/ask/detail/:id" render={(props) =>(<Detail
              {...props}/>)} />
        <Route
          path="/ask"
          exact
          render={() => (
            <Ask
            scrollOptions={scrollOptions} setScrollOptions={setScrollOptions}
            />
          )}
        />

        <Route path="/show/detail/:id" render={(props) =>(<Detail {...props}/>)} />
        <Route
          path="/show"
          exact
          render={() => (
            <Show
              scrollOptions={scrollOptions} setScrollOptions={setScrollOptions}
            />
          )}
        />
        <Route
          path="/jobs"
          exact
          render={() => (
            <Jobs
            scrollOptions={scrollOptions} setScrollOptions={setScrollOptions}
            />
          )}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <Home
              {...props}
            />
          )}
        /></>
    )

}