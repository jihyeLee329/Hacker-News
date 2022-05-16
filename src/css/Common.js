import {createGlobalStyle } from 'styled-components'
import { UserChkAtom } from '../atom';

export const GlobalStyle =  createGlobalStyle`
html,body,div,span,applet,objectiframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,q,s,samp,small,
strike,strong,sub,sup,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,
details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
  background-color:${(props) => props.theme.bgColor};
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
input:focus {
  outline: none;
}
a {
  color: inherit;
  text-decoration: none;
}
span {
  color: inherit;
  font-size: inherit;
  line-height: inherit;
}
.wrapper {
  font-family: "Roboto", sans-serif;
  color: ${(props) => props.theme.textColor};
  max-width: 1050px;
  width: 100%;
  max-height:100vh; 
  overflow-y: auto;
}

html,body{
    ${({ UserChkAtom }) => {
        return UserChkAtom ? `overflow: hidden;` : `overflow-y:auto;`
    }};
}

`;
