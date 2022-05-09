import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {getUserData} from '../API/HNApi'
import IconUserLink from '../img/ic_user_link.svg'

const UserInforBox = styled.div`
    position:fixed; 
    transition:all .4s;
    ${({ userChk }) => {
      return userChk ? `bottom: 0vh; opacity:1;` :` bottom:-100vh; opacity:0;  transition:all .8s;`;
    }};
    z-index:100;
    width:100vw; height:calc(100vh - 212px); background:#fff;
    box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.2);
    border-radius: 20px 20px 0px 0px;
    padding:0 20px 41px;
    overflow-y:auto;
    .closeBtn{position:relative; height:40px;
      >span {width:36px; height:4px; background:#BBBBC0; border-radius: 2px;
        position:absolute; transform:translate(-50%, 0); left:50%; top:8px;}
    }

    .userId{padding:20px; font-size:28px; line-height:1; color:#111; font-weight:500; text-align:center;
    > span {display:block; margin-top:2px;font-size:10px; line-height:1; color:#bfbfbf;font-weight:300;}
    }

    .userCreate{display:flex;justify-content:center; padding-bottom:32px; border-bottom: 1px solid #F0F0F6;
      >div {padding:0 32px;}
       h3{color:#767676; font-size:14px; line-height:20px; text-align:center;padding-bottom:4px;}
       p{color:#FF6600; font-size:20px; line-height:22px; font-weight:500; text-align:center;}
    }
    .content{min-height:168px; max-height:168px; overflow-y:scroll; margin:16px 0; font-size:14px;line-height:20px; color:#767676;
      *{word-break: break-word; max-width:100%;}
    }
    .profileWrap{
      > .profile{display:block;
        background: #F9FAFB; border-radius: 8px;padding:12px 12px 12px 20px; font-size:16px; line-height:24px; color:#111;
      }
      > .profile + .profile{margin-top:8px;}
      > .profile img{
        display:inline-block; vertical-align:top; margin-right:8px;
      }
    }
`;

export default function UserInfo({userChk, setUserChk, userId, setDimmed, dimmed}){
  const [user, setUser] = useState({}); //클릭해서 받아온 유저아이디 저장용

  //user API조회하여 setUser에 세팅
  // userId 를 클릭 전엔 userId 값이 비어 있음. 따라서 비어있는 상태에서 userChk에 따라 api를 불러오면 401 에러 발생. 
  // userId를 눌렀을 때, userId가 저장 되면 그때 api 불러오기
  useEffect(()=>{
    userId !== '' && getUserData(userId).then((data)=> data && setUser(data) ); 
    console.log(userId);
      return ()=>setUser({});
  },[userChk]);

  //userChk = true 이면 dimmed 깔아주기
    useEffect(()=>{
      userChk ?  setDimmed(true) : setDimmed(false)
    },[setDimmed, userChk]);

    //close button 누르면 data 초기화 & userChk = false, dimmed = false
    function closeUserBox(){
      setUserChk(!userChk);
      setDimmed(!dimmed);
    }

    // 가입한 날짜로부터 시간 계산해주는 함수 
   const TimeForToday = (timestamp) => {
    const pstTime = timestamp * 1000;
    const todayTime = new Date().getTime();
    const betweenTime = Math.floor((todayTime - pstTime) / 1000 / 60);

    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime} Today`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour} Hago`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay} Dago`;
    }

    return `${Math.floor(betweenTimeDay / 365)} Yago`;
  };

return(
    <UserInforBox userChk={userChk}>
        <div className='closeBtn' onClick={closeUserBox}><span /></div>
        <div className="userId">{user.id} <span>profile with Hacker News</span></div>
        <div className="userCreate">
          <div>
            <h3>Joined</h3>
            <p>{TimeForToday(user.created)}</p>
          </div>
          <div>
            <h3>karma</h3>
            <p>{user.karma}</p>
          </div>
        </div>

        <div className='content'><div dangerouslySetInnerHTML={{ __html: user.about }}></div></div>
        <div className='profileWrap'>
          <Link to="/" className='profile'><img src={IconUserLink} alt="link" />Submissions</Link>
          <Link to="/" className='profile'><img src={IconUserLink} alt="link" />Favorites</Link>
          <Link to="/" className='profile'><img src={IconUserLink} alt="link" />Comments</Link>
        </div>
    </UserInforBox>
)

}
