import React from 'react'
import styled from 'styled-components'
import {Routes, Route, BrowserRouter , Link } from 'react-router-dom'; 

const HeaderWrap = styled.header`
  width:100%;
  padding: 15px 20px; box-sizing: border-box;
`;
const LogoWrap = styled.div`
  display:inline-block; height:30px;
  width:calc(100% - 50px); font-size:0;
`;
const LogoImg = styled.img`
display:inline-block; 
width: 28px; height: auto;
`;
const LogoTxt = styled.div`
  display:inline-block; vertical-align:top; margin-left:8px;
  span{font-size:10px; color:#111; opacity:.4; font-weight:300;}
  h1{font-size:18px; line-height:1.2; font-weight:300;}
`
const IconWrap = styled.div`
  font-size:0; display:inline-block; vertical-align:top ;height:30px;
  span{ 
    width: 25px; height: 100%;
    display: inline-block; vertical-align: top; background-position: center;
    background-size: 14px auto; background-repeat: no-repeat;
  }
`;

function Header (){
    return (
       <HeaderWrap>
          <LogoWrap>
            <LogoImg src="img/ic_logo.svg" alt="logo"/>
            <LogoTxt>
              <span>React</span>
              <h1>Hacker News</h1>
            </LogoTxt>
          </LogoWrap>
          <IconWrap>
            <span style={{backgroundImage : 'url(img/ic_mode.svg)'}}></span>
            <span style={{backgroundImage : 'url(img/ic_tooltip.svg)'}}></span>
        </IconWrap>
        </HeaderWrap>
    );
}
export default Header; 