import React from 'react'
import ReactDOM from 'react-dom'
import Home from './views/home'
import LvXingCai from './views/home/lvXingCai'
import BuXiuGang from './views/home/buXiuGang'
import YiMen from './views/home/yiMen'
import 'antd-mobile/dist/antd-mobile.css'

import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/door-counter">
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/YiMen" component={YiMen}></Route>
      <Route exact path="/buXiuGang" component={BuXiuGang}></Route>
      <Route exact path="/LvXingCai" component={LvXingCai}></Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
