import { useState, useEffect } from "react";
import { getData } from "../API/HNApi";
import styled from "styled-components";
import { TimeForToday } from "./TimeForToday";
const Comment = styled.div`
  span {
    font-size: 12px;
    line-height: 16px;
  }
  & + & {
    border-top: 1px solid #f0f0f6;
  }
  padding: 16px 0;
  > div {
    position: relative;
  }
  .user {
    color: #ff6600;
    padding: 0 12px;
    border: 1px solid #ff6600;
    border-radius: 20px;
  }
  .time {
    color: #999;
    margin-left: 8px;
  }
  button {
    position: absolute;
    right: 20px;
    outline:none; border:none; margin:0; padding:0;background:none;
  }
  .text {
    margin-top: 8px;
    font-size: 16px;
    line-height: 24px;
    color: #505050;
    word-break: break-word;
    pre{white-space:pre-line;}
  }
`;
export default function Comments({ kid ,setUserId, setUserChk }) {
  const [kidData, setkidData] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);
  function allView() {
    setToggleBtn(!toggleBtn);
  }
  useEffect(() => {
    getData(kid).then((data) => data && setkidData(data));
    return ()=>{setkidData([])}
  }, [kid]);

   //회원 id 누르면 id 값 가져오기
   function viewUserId(){
    setUserId(kidData.by);
    setUserChk(true);
  }

  return (
    <Comment>
      {kidData && (
        <>
          <div>
            <span className="user" onClick={viewUserId}>{kidData.by}</span>
            <span className="time">{TimeForToday(kidData.time)}</span>
            <button value={toggleBtn} onClick={allView}>
              {toggleBtn ? (
                <img src= {process.env.PUBLIC_URL + "/img/comment_toggle_view.svg"} alt="펼쳐보기" />
              ) : (
                <img src= {process.env.PUBLIC_URL + "/img/comment_toggle_sm.svg"} alt="줄여보기" />
              )}
            </button>
          </div>
          {toggleBtn ? null : <div className="text" dangerouslySetInnerHTML={{ __html: kidData.text }}></div>}
        </>
      )}
    </Comment>
  );
}
