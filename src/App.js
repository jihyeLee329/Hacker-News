import styles from './css/common.css';
import Header from './components/Header'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <>
    <div className="wrapper">
      <Header />
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
