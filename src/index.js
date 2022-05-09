import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
const RightMode = {
  bgColor:'#fff',
  txtColor: '#111',
}
const DarkMode = {
  bgColor : '#111',
  txtColor: '#fff',
}
ReactDOM.render(


  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={DarkMode}>
        <App />
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
