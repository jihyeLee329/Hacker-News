import {useState} from 'react'
import styled from 'styled-components'

const CheckRadioBlick = styled.div`
  padding:20px 20px 12px; 
  position:relative;
  input{width:0; height:0; visibility:hidden;}
  input:checked + label {color:#FF6600; background-image:url(/img/ic_check.png);}
  label {font-size:14px; line-height:20px; color:#999; 
    padding-left:20px; background-repeat:no-repeat; background-position:left center; background-size:20px auto;
    background-image:url(/img/ic_check.svg);  
  }
`
const ModeChgBtn = styled.button`
  border:none; outline:none; background:none;
  height:20px; padding:0; vertical-align:top;
  position:absolute; right:20px;
`;

export default function CheckRadio ({checked, changeChk, onZoomToggle, onToggle, listName}){

  return <CheckRadioBlick>
    <input onChange={changeChk} checked={!checked} id="new" type="radio" name="list"/>
    <label htmlFor="new">NEW</label>
    
    {listName === 'jobs' ? null :
    <>
    <input onChange={changeChk} checked={checked} id="top" type="radio" name="list" />
    <label htmlFor="top" >TOP</label>
    </>}
    
    <ModeChgBtn onClick={onZoomToggle} checked={onToggle}>
      {onToggle ? <img src="/img/ic_small_mode.svg" alt="작게보기"/> : <img src="/img/ic_zoom_mode.svg" alt="크게보기"/>}
    </ModeChgBtn>
    </CheckRadioBlick>
}