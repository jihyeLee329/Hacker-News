import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavUl = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
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
  return (
    <NavUl>
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
    </NavUl>
  );
}

export default Nav;
