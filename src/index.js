import React from 'react'
import ReactDOM from 'react-dom'
import  Home from './views/home'
import 'antd-mobile/dist/antd-mobile.css'
import VConsole from 'vconsole'

new VConsole();

ReactDOM.render(
  <React.StrictMode>
    <Home></Home>
  </React.StrictMode>,
  document.getElementById('root')
);
