import styled from "styled-components";
import {useRecoilState} from 'recoil'
import { DimmedAtom,UserChkAtom } from "../atom";

const DimmedBlock = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  background: #111;
  opacity: 0.5;
`;

export default function Dimmed() {
  const [dimmed, setDimmed] = useRecoilState(DimmedAtom);
  const [userChk, setUserChk]= useRecoilState(UserChkAtom);
  function closeUserBox(){
    setUserChk((userChk) => !userChk);
    setDimmed((dimmed)=> !dimmed);
  }
  return dimmed && <DimmedBlock onClick={closeUserBox} />;
}
