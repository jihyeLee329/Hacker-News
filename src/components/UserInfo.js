import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {getUserData} from '../API/HNApi'


const UserInforBox = styled.div`
    position:fixed; 
    transition:all .5s;
    ${({ userChk }) => {
      return userChk ? `bottom: 0vh; opacity:1;` : `bottom:-100vh; opacity:0; transition:all .8s;`
    }};
    z-index:100;
    width:100vw; height:calc(100vh - 212px); background:#fff;
    box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.2);
    border-radius: 20px 20px 0px 0px;
    padding:0 20px 41px;

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

export default function UserInfo({userChk, setUserChk, userId, setUserId, setDimmed, dimmed}){
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
 
  //user API조회하여 setUser에 세팅
  useEffect(()=>{
      getUserData(userId).then((data)=> data && setUser(data) )
      return ()=>setUser({});
  },[userChk]);

  //userChk = true 이면 dimmed 깔아주기
    useEffect(()=>{
      if(userChk){
          setDimmed(true);
      }else{
          setDimmed(false);
      }
    },[setDimmed, userChk]);

    //close button 누르면 data 초기화 & userChk = false, dimmed = false
    function closeUserBox(){
      setUserChk(!userChk);
      setDimmed(!dimmed);
    }

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
        <div className='content' dangerouslySetInnerHTML={{ __html: user.about }}></div>
        <div className='profileWrap'>
          <a className='profile'><img src={process.env.PUBLIC_URL + '/img/ic_user_link.svg'} alt="link" />Submissions</a>
          <a className='profile'><img src={process.env.PUBLIC_URL + '/img/ic_user_link.svg'} alt="link" />Favorites</a>
          <a className='profile'><img src={process.env.PUBLIC_URL + '/img/ic_user_link.svg'} alt="link" />Comments</a>
        </div>
    </UserInforBox>
)

}
