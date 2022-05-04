import { tab } from "@testing-library/user-event/dist/tab";
import { useState, useRef } from "react";
import styled from 'styled-components'
import IconGrayArrow from '../img/gray_arrow.svg'
import titleModeSlideR from '../img/title_mode_slide_r.png'
import titleModeSlideL from '../img/title_mode_slide_l.png'
import titleModeZoom from "../img/title_mode_zoom.png"
import titleModeSmall from "../img/title_mode_small.png"
import sortOptionTop from '../img/sort_option_top.png'
import sortOptionNew from '../img/sort_option_new.png'
import whiteMode from '../img/whitemode.png'
import blackMode from '../img/blackmode.png'
import IconGrayInfo from '../img/gray_info.svg'

const DimmedAbout = styled.div`
  width:100vw; height:100vh; background:rgba(17,17,17,0.5);
  position:fixed; top:0; leff:0; right:0; bottom:0;  z-index:10;
`;
const AboutWrap = styled.div`
  width:100vw; height:calc(100vh - 212px);
  position:fixed;
  transition:all .8s;
  z-index:15;
 
  ${({ aboutBtn }) => {
    return aboutBtn ? `bottom: -100%; opacity:0;` :` bottom:0; opacity:1;  transition:all 1.2s;`;
  }};
  background:#fff;
  box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0px 0px;
  padding:0 20px 0;
    .closeBtn{position:relative; height:40px;
      >span {width:36px; height:4px; background:#BBBBC0; border-radius: 2px;
        position:absolute; transform:translate(-50%, 0); left:50%; top:8px;}
    }
    >p {padding:20px 0 32px; border-bottom: 1px solid #F0F0F6; text-align:center;
    font-size:28px; font-weight:500; color:#111;}

    .content{padding:20px 0 40px;font-size:14px; line-height:20px; color:#999;}

  .tabContainer{height:calc(100% - 122px); overflow-y:auto; padding-bottom:100px;}
`;
const Tab = styled.div`
background: #F9FAFB;position:relative;
border-radius: 8px; padding: 12px 12px 12px 52px;
background-image:url(${IconGrayInfo}); background-size:24px auto; background-position: 20px center; background-repeat:no-repeat;
  > span{position:absolute; right:20px; top:50%; transform:translate(0, -50%); }
  > p{font-size:16px; line-height:24px; }
  & + &{margin-top:8px;}
  img{transition: .3s;
  ${({ tabClick }) => {
    return tabClick ? `transform: rotate(0deg); ` 
    :` transform: rotate(180deg);`;
  }}; }
`;

const TabContent = styled.div`
  padding:32px 16px; 
  > div + div{margin-top:32px;}
  >div {
    p{font-size:16px; line-height:24px; font-weight:500;margin-bottom:4px;}
    div{font-size:16px; line-height:24px; color:#767676;}
  }

  .ImgWrap{
    img{max-width:100%;}
    margin-top:20px; 
   >span {display:inline-block; vertical-align:top;
    & + span{margin-top:16px;}
   }
  }
  .info > span{display:block; font-size: 16px;
    line-height: 24px;
    &.name {color:rgba(255, 102, 0, 0.5);}
    &.email{color:#858585;}
  }
  .copyRight{font-size:10px; color:#999;margin-top:40px;};
`;

export default function AboutSite({showAboutSite, setShowAboutSite }){
  const [tabClick, setTabClick] = useState(false);
  const [tabName, setTabName] = useState("");
  const TabBar = useRef();
  function clikTab(e){
    setTabName(e.target.outerText);
    setTabClick(tabClick => !tabClick);
    TabBar.current.focus();
  };

  function viewAbout(){
    setShowAboutSite(!showAboutSite);
  }
  return(
  <>
  {showAboutSite ?
  <>
    <DimmedAbout />
    <AboutWrap>
      <div className='closeBtn' onClick={viewAbout}><span/></div>
      <p>About This Site</p>  
      <div className="tabContainer">
      <div className="content">
        This is a simple Hacker News clone, built with React.
        It was created as part of a collaboration project, [KDT]Megabyte School : UXUI & K-Digital Training FE.
        <br/><br/>
        You can't write on this site, but only read.
        It suports some unique setting options. Below are some tips to help you use the site.
      </div>
     
      <div className="tabWrap">
        <Tab onClick={clikTab} ref={TabBar} >
          <p>Menu</p><span><img src={IconGrayArrow} alt="arrow"/></span>
        </Tab>
        { tabClick && tabName === 'Menu' ? 
          <TabContent>
            <div>
              <p>Home</p>
              <div>You can see all Hacker News submissions at once on the front page</div>
            </div>
            <div>
              <p>Article</p>
              <div>Article is for anything that gratifies one's intellectual curiosity to good hackers.</div>
            </div>
            <div>
              <p>Ask</p>
              <div>Ask lists questions and other text submissions.</div>
            </div>
            <div>
              <p>Show</p>
              <div>Show is for sharing hacker’s personal work, which is something hackers have made that other people can play with.</div>
            </div>
            <div>
              <p>Jobs</p>
              <div>Jobs is for job ads reserved for YC-funded startups. Only one is on the front page at a time. The rest are listed at Jobs.</div>
            </div>
          </TabContent> :null}
        <Tab onClick={clikTab} ref={TabBar} >
          <p>Appearance</p><span><img src={IconGrayArrow} alt="arrow"/></span>
        </Tab>
        { tabClick && tabName === 'Appearance' ?
          <TabContent>
            <div>
              <p>Tap the icon to change the theme</p>
              <div>Let's focus on the article, sometimes brighter and sometimes longer.</div>
            </div>
            <div className="ImgWrap">
              <span>
               <img src={whiteMode} alt="Appearance1"/>
              </span>
              <span>
                <img src={blackMode} alt="Appearance2"/>
              </span>
            </div>
          </TabContent> :null}
        <Tab onClick={clikTab}>
          <p>Sort option</p><span><img src={IconGrayArrow} alt="arrow"/></span>
        </Tab>
        { tabClick && tabName === 'Sort option' ?
          <TabContent>
            <div>
              <p>Sort with one tap</p>
              <div>Choose a sorting mode more easily.</div>
            </div>
            <div className="ImgWrap">
              <span>
               <img src={sortOptionTop} alt="sort top"/>
              </span>
              <span>
                <img src={sortOptionNew} alt="sort new"/>
              </span>
            </div>
          </TabContent> :null}
        <Tab onClick={clikTab}>
          <p>Title mode</p><span><img src={IconGrayArrow} alt="arrow"/></span>
        </Tab>
        { tabClick && tabName === 'Title mode' ?
          <TabContent>
            <div>
              <p>Tap to select the title size.</p>
              <div>It's easier to see at a glance, or it's bigger and simpler.</div>
            </div>
            <div className="ImgWrap">
              <span>
               <img src={titleModeZoom} alt="zoom mode"/>
              </span>
              <span>
                <img src={titleModeSmall} alt="small mode"/>
              </span>
            </div>
            <div>
              <p>Swipe for more information.</p>
              <div>Swipe right to see the ranking and time. Swipe left to go to the link.</div>
            </div>
            <div className="ImgWrap">
              <span>
               <img src={titleModeSlideR} alt="slide right"/>
              </span>
              <span>
                <img src={titleModeSlideL} alt="slide left"/>
              </span>
            </div>
          </TabContent> :null}
        <Tab onClick={clikTab}>
          <p>Credit for</p><span><img src={IconGrayArrow} alt="arrow"/></span>
        </Tab>
        { tabClick && tabName === 'Credit for' ?
          <TabContent>
            <div>
              <p>UXUI Designer</p>
              <div className="info">
                <span className="name">Choi Heegyeong</span>
                <span className="email">hg259401@gmail.com</span>
              </div>
              <div className="info">
                <span className="name">Yang Soyeon</span>
              </div>
            </div>
            <div>
              <p>Frontend developer</p>
              <div className="info">
                <span className="name">Jihye Lee</span>
                <span className="email">jihyelee.329@gmail.com</span>
              </div>
            </div>
            <p className="copyRight">Copyright 2022. 02. Hacker News. All rights reserved</p>
          </TabContent> :null}
      </div>
      </div>
    </AboutWrap>
  </>
  :null
  }
  
  </>
  );
}