import {useState} from 'react'
import styled from 'styled-components'

const CheckRadioBlick = styled.div`
  padding:20px 20px 12px; 
  input{width:0; height:0; visibility:hidden;}
  input:checked + label {color:#FF6600; background-image:url(/img/ic_check.png);}
  label {font-size:14px; line-height:20px; color:#999; 
    padding-left:20px; background-repeat:no-repeat; background-position:left center; background-size:20px auto;
    background-image:url(/img/ic_check.svg);  
  }
`

export default function CheckRadio (){
  const [checked ,setChecked] = useState(true);
  function changeChk (){
    setChecked(!checked)
  }
  return <CheckRadioBlick>
    <input onChange={changeChk} checked={!checked} id="new" type="radio" name="list"/>
    <label htmlFor="new">NEW</label>
    <input onChange={changeChk} checked={checked} id="top" type="radio" name="list" />
    <label htmlFor="top" >TOP</label>
    
      </CheckRadioBlick>
}