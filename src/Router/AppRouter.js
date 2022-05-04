import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Article from "./Article";
import Ask from "./Ask";
import Show from "./Show";
import Jobs from "./Jobs";
import { Detail } from "./Detail";
export default function AppRouter({ sortChecked, changeChk, onZoomToggle, onToggle, setUserId, setUserChk ,onDimmed}){
    return (
        <>
        <Route path="/article/detail/:id" render={(props) =>(<Detail setUserId={setUserId} setUserChk={setUserChk} sortChecked={sortChecked}
              changeChk={changeChk} {...props}/>)} />
        <Route
          path="/article"
          exact
          render={() => (
            <Article
            sortChecked={sortChecked}
              changeChk={changeChk}
              onZoomToggle={onZoomToggle}
              onToggle={onToggle}
              setUserId={setUserId}
              setUserChk={setUserChk}
            />
          )}
        />
        <Route path="/ask/detail/:id" render={(props) =>(<Detail setUserId={setUserId} setUserChk={setUserChk} sortChecked={sortChecked}
              changeChk={changeChk} {...props}/>)} />
        <Route
          path="/ask"
          exact
          render={() => (
            <Ask
              sortChecked={sortChecked}
              changeChk={changeChk}
              onZoomToggle={onZoomToggle}
              onToggle={onToggle}
              setUserId={setUserId}
              setUserChk={setUserChk}
            />
          )}
        />

        <Route path="/show/detail/:id" render={(props) =>(<Detail setUserId={setUserId} setUserChk={setUserChk} sortChecked={sortChecked}
              changeChk={changeChk} {...props}/>)} />
        <Route
          path="/show"
          exact
          render={() => (
            <Show
              sortChecked={sortChecked}
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
              sortChecked={sortChecked}
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
              onDimmed={onDimmed}
              sortChecked={sortChecked}
              changeChk={changeChk}
              onZoomToggle={onZoomToggle}
              onToggle={onToggle}
              setUserId={setUserId}
              setUserChk={setUserChk}
              {...props}
            />
          )}
        /></>
    )

}