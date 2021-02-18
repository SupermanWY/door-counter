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
      <Route exact path="/" component={Home} onEnter={() => document.title="材料计算器"}></Route>
      <Route exact path="/YiMen" component={YiMen} onEnter={() => document.title="移门"}></Route>
      <Route exact path="/buXiuGang" component={BuXiuGang} onEnter={() => document.title="不锈钢"}></Route>
      <Route exact path="/LvXingCai" component={LvXingCai} onEnter={() => document.title="铝型材"}></Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
