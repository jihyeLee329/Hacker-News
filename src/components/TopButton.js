import {useState, useEffect} from 'react' 
import styled from 'styled-components'
import arrowTop from '../img/arrow_top.png';

const ButtonWrap = styled.div`
  position:fixed; right:10px; bottom:56px; 
`;
const ScrollTop = styled.button`

transition:all 0.4s;
position:fixed; bottom: 56px; right:10px; 
background: #FFFFFF;
box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);
border-radius: 12px;
width:40px; height:40px; border:none; outline:none;
padding:12px 14px 13px;
opacity:0;
&.active{opacity:1;}
img{max-width:100%;}
`;
export const TopButton = ({scrollY})=> {
  const [BtnStatus, setBtnStatus] = useState(false); 
  const wrapperDiv = document.querySelector('.wrapper');
  // const [ScrollY, setScrollY] = useState(0); //스크롤값 저장용
  // const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태
  // let scrollY = 0;
  //스크롤 여부에 따른 버튼 노출
   const handleFollow = () => {
    if(scrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  }


  const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
    wrapperDiv.scroll({
      top:0, 
      behavior:'smooth'
    });
    // wrapperDiv.scrollTop = 0;
    // scrollY = 0;  // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  }

  useEffect(() => {
    const watch = () => {
      handleFollow()
    }
    watch();
  },[scrollY])


  return <ButtonWrap>
  <ScrollTop onClick={handleTop} className={BtnStatus ? "topBtn active" : "topBtn"}><img src={arrowTop} alt="위로가기버튼"/></ScrollTop>
  
  </ButtonWrap>

}