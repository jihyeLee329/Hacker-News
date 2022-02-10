import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
const NavUl = styled.div`
  >div{
    display: table;
    table-layout: fixed;
    width: 100%;
  }
  .is-sticky {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding:0 20px;
    z-index: 10;
    background-color: #fff !important;
    animation: 500ms ease-in-out 0s normal none 1 running fadeInDown;
    > a{ padding:8px 0; 
      &:after{content:""; position:absolute; bottom:0; left:0; width:100%;
    background: #FF6600; height:1px;} 
    }
  }
`;
const NavLi = styled(NavLink)`
position:relative; display:table-cell;padding:8px 0 7px;text-align:center; 
border-radius:2px 2px 0 0;
display:table-cell; font-size:18px; line-height:24px; 
color:#767676; border-bottom: 1px solid #f0f0f6;
  &.active{position:relative;color:#FF6600;font-weight:bold;}
  &.active:after{content:""; width:100%; height:2px; background:#FF6600; position:absolute; left:0; bottom:0; border-radius: 2px 2px 0px 0px;}
};
`;

function Nav() {
   // Sticky Menu Area
  useEffect(() => {
      window.addEventListener('scroll', isSticky);
      return () => {
          window.removeEventListener('scroll', isSticky);
      };
  });
  
 //스크롤했을 때, .header-section 을 가져와서 
 // 윈도우 스크롤이 10 이상일 경우 addClass i-sticky 
  const isSticky = (e) => {
      const header = document.querySelector('.header-section');
      const scrollTop = window.scrollY;
      scrollTop >= 10 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
  };



  return (
    <NavUl>
      <div className="header-section">
        <NavLi to="/article" activeClassName="active">
          Article
        </NavLi>
        <NavLi to="/ask" activeClassName="active">
          Ask
        </NavLi>
        <NavLi to="/show" activeClassName="active">
          Show
        </NavLi>
        <NavLi to="/jobs" activeClassName="active">
          Jobs
        </NavLi>
        </div>
    </NavUl>
  );
}

export default Nav;
