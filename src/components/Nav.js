import { withRouter, Link} from 'react-router-dom'
import styled from 'styled-components'

const NavUl = styled.div`
display:table; table-layout:fixed; width:100%;
`;
const NavLi = styled(Link)`
position:relative; display:table-cell;padding:8px 0 7px;text-align:center; 
border-radius:2px 2px 0 0;
display:table-cell; font-size:18px; line-height:24px; 
  color: ${props => props.current ? "#FF6600" : "#767676"};
  border-bottom: ${props => props.current ? " 2px solid #FF6600" : "1px solid #F0F0F6"};
};
`

//---------- 네비게이션 컴포넌트  ------------- //
// export default function Nav(){
//   return(
//    <NavUl>
//      <li><Link to="/Article">Article</Link></li>
//      <li><Link to="/Ask">Ask</Link></li>
//      <li><Link to="/Show">Show</Link></li>
//      <li><Link to="/Jobs">Jobs</Link></li>
//    </NavUl> 
//   );
// }

export default withRouter(({location:{pathname}}) => (
  <NavUl>
   <NavLi current={pathname === "/Article"} to="/Article">Article</NavLi>
    <NavLi current={pathname === "/Ask"} to="/Ask">Ask</NavLi>
    <NavLi current={pathname === "/Show"} to="/Show" >Show</NavLi>
    <NavLi current={pathname === "/Jobs"} to="/Jobs">Jobs</NavLi>
  </NavUl> 
));