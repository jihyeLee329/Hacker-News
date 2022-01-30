import { Link} from 'react-router-dom'
import styled from 'styled-components'

const NavUl = styled.ul`
border-bottom:1px solid #FF6600;
display:table; table-layout:fixed; width:100%;
 li{
  display:table-cell; text-align:center;font-size:18px; line-height:24px; color:#767676
 }
 a{padding:8px 0 7px; display:block;}

`;

//---------- 네비게이션 컴포넌트  ------------- //
export default function Nav(){
  return(
   <NavUl>
     <li><Link to="/Article">Article</Link></li>
     <li><Link to="/Ask">Ask</Link></li>
     <li><Link to="/Show">Show</Link></li>
     <li><Link to="/Jobs">Jobs</Link></li>
   </NavUl> 
  );


}