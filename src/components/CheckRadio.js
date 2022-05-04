import {useEffect, useState} from 'react'
import styled from 'styled-components'
import IconComment from '../img/ic_comment.svg'
import IconSmallMode from '../img/ic_small_mode.svg'
import IconZoomMode from '../img/ic_zoom_mode.svg'
import IconCheck from '../img/ic_check.png'
import IconCheckDefault from '../img/ic_check.svg'
const CheckRadioBlick = styled.div`
${({ listName }) => {
  return listName==='detail' ? `padding:24px 20px 20px`:`padding: 20px 20px 12px`;
}};
  position:relative;
  input{width:0; height:0; visibility:hidden; margin:0; font-size:0;}
  input:checked + label {color:#FF6600; background-image:url(${IconCheck});}
  label {font-size:14px; line-height:20px; color:#999; 
    padding-left:20px; background-repeat:no-repeat; background-position:left center; background-size:20px auto;
    background-image:url(${IconCheckDefault});  
  &:nth-of-type(1) {margin-right:4px;}
  }
  .comment_length{
    position: absolute;
    right: 20px; top:24px;
    color: #ff6600;
    font-size: 12px;
    line-height: 16px;
    img{vertical-align:text-bottom; margin-right:2px;}
  }
`
const ModeChgBtn = styled.button`
  border:none; outline:none; background:none;
  height:20px; padding:0; vertical-align:top;
  position:absolute; right:20px;
`;

export default function CheckRadio ({sortChecked, changeChk, onZoomToggle, onToggle, listName, comments}){
  return <CheckRadioBlick listName={listName}>
    {listName === 'jobs' ?
    <>
      <input onChange={changeChk} checked={sortChecked} id="new" type="radio" name="list"/>
      <label htmlFor="new">NEW</label>
    </> :
    <>
      <input onChange={changeChk} checked={!sortChecked} id="new" type="radio" name="list"/>
      <label htmlFor="new">NEW</label>
      <input onChange={changeChk} checked={sortChecked} id="top" type="radio" name="list" />
      <label htmlFor="top" >TOP</label>
    </>
  }
    {listName === 'detail' ?
   <div className='comment_length'><img src={IconComment} alt="코멘트갯수"/>{comments}</div>
  : <ModeChgBtn onClick={onZoomToggle} checked={onToggle}>
      {onToggle ? <img src={IconSmallMode} alt="작게보기"/> :
       <img src={IconZoomMode} alt="크게보기"/>}
    </ModeChgBtn>
    }
    
    </CheckRadioBlick>
}