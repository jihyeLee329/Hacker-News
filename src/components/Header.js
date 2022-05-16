import React, {useState,useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from '../img/ic_logo.svg'
import IconMode from '../img/ic_mode.svg'
import IconInfo from '../img/ic_Info.svg'
import Nav from "./Nav";
import { useRecoilSnapshot, useRecoilState } from "recoil";
import { ShowAboutAtom } from "../atom";

const HeaderWrap = styled.header`
  width: 100%;
  padding: 0 20px;
  > div {
    padding: 16px 0 0;
    box-sizing: border-box;
  }
`;
const LogoWrap = styled.div`
  display: inline-block;
  height: 32px;
  width: calc(100% - 65px);
  font-size: 0;
`;
const LogoImg = styled.img`
  display: inline-block;
  width: 102px;
  height: auto;
`;

const IconWrap = styled.div`
  font-size: 0;
  display: inline-block;
  vertical-align: top;
  height: 30px;
  span {
    width: 32px;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    background-position: center;
    background-size: auto;
    background-repeat: no-repeat;
  }
`;

//---------- 헤더 컴포넌트  ------------- //
function Header() {
  const [showAboutSite , setShowAboutSite] =useRecoilState(ShowAboutAtom);
  //헤더에서 about info 버튼 클릭여부 알려주는 함수 
  function viewAbout(){
    setShowAboutSite(!showAboutSite);
  }

  return (
    <HeaderWrap >
      <div>
        <LogoWrap>
          <Link to="/">
            <LogoImg src={Logo} alt="logo" />
          </Link>
        </LogoWrap>
        <IconWrap>
          <span
            className="mode"
            style={{ backgroundImage: `url(${IconMode})` }}
          ></span>
          <span onClick={viewAbout}
            className="info"
            style={{ backgroundImage: `url(${IconInfo})`  }}
          ></span>
        </IconWrap>
      </div>
      <Nav></Nav>
    </HeaderWrap>
  );
}
export default Header;
