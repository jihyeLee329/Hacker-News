import './css/common.css';
import Header from './components/Header'
import { HashRouter as Router, Route, Link} from 'react-router-dom'
import Home from './Router/Home'
import Article from './Router/Article'
import Ask from './Router/Ask'
import Show from './Router/Show'
import Jobs from './Router/Jobs'

import React, {useEffect, useState} from 'react'
import axios from 'axios'
//import ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';
function App() {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=kr&apiKey=22ff47f773bd4db9b21428aa8f6185e1',
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
        <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          rows={7}
          value={JSON.stringify(data, null, 2)}
          readOnly={true}
        />
      )}
    </div>
    <div className="wrapper">
      <Header />
      <Router>
        <Route path="/article"> <Article /></Route>
        <Route path="/ask" ><Ask /></Route>
        <Route path="/show"><Show /></Route>
        <Route path="/jobs"><Jobs /></Route>
        <Route path="/" exact><Home/></Route> 
      </Router>
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
