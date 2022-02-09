import { useState } from "react";
import styled from 'styled-components'


const DimmedAbout = styled.div`
  width:100vw; height:100vh; background:rgba(17,17,17,0.5);
  position:fixed; top:0; leff:0; right:0; bottom:0;  z-index:10;
`;
const AboutWrap = styled.div`
  width:100vw; height:calc(100vh - 212px);
  position:fixed;
  transition:all .4s;
  z-index:15;
  ${({ aboutBtn }) => {
    return aboutBtn ? `bottom: -100%; opacity:0;` :` bottom:0; opacity:1;  transition:all .4s;`;
  }};
  background:#fff;
  box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0px 0px;
  padding:0 20px 41px;
    .closeBtn{position:relative; height:40px;
      >span {width:36px; height:4px; background:#BBBBC0; border-radius: 2px;
        position:absolute; transform:translate(-50%, 0); left:50%; top:8px;}
    }
    >p {padding:20px 0 32px; border-bottom: 1px solid #F0F0F6; text-align:center;
    font-size:28px; font-weight:500; color:#111;}

    .content{padding:20px 0 40px;font-size:14px; line-height:20px; color:#999;}
`;
export default function AboutSite({aboutBtn, viewAbout}){

  return(
  <>
  {aboutBtn ?
  <>
    <DimmedAbout />
    <AboutWrap>
      <div className='closeBtn' onClick={viewAbout}><span/></div>
      <p>About This Site</p>  
      <div className="content">
        This is a simple Hacker News clone, built with React.
        It was created as part of a collaboration project, [KDT]Megabyte School : UXUI & K-Digital Training FE.
        <br/><br/>
        You can't write on this site, but only read.
        It suports some unique setting options. Below are some tips to help you use the site.
      </div>
      
    </AboutWrap>
  </>
  :null
  }
  
  </>
  );
}