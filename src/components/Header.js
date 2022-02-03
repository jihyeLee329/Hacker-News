import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Nav from "./Nav";

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
  return (
    <HeaderWrap>
      <div>
        <LogoWrap>
          <Link to="/">
            <LogoImg src="img/ic_logo.svg" alt="logo" />
          </Link>
        </LogoWrap>
        <IconWrap>
          <span
            className="mode"
            style={{ backgroundImage: "url(img/ic_mode.svg)" }}
          ></span>
          <span
            className="info"
            style={{ backgroundImage: "url(img/ic_info.svg)" }}
          ></span>
        </IconWrap>
      </div>
      <Nav></Nav>
    </HeaderWrap>
  );
}
export default Header;
