import styled from "styled-components";

const DimmedBlock = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: #111;
  opacity: 0.5;
`;

export default function Dimmed({ setUserChk, userChk, setDimmed, dimmed }) {
  function closeUserBox(){
    setUserChk(!userChk);
    setDimmed(!dimmed);
  }
  return dimmed && <DimmedBlock onClick={closeUserBox} />;
}
