import React from 'react'
import { List } from 'antd-mobile'

class Home extends React.Component {
  go(path) {
    this.props.history.push(path)
  }

  render() {
    return (
      <List>
        <List.Item arrow="horizontal" onClick={() => this.go('/yiMen')}>移门</List.Item>
        <List.Item arrow="horizontal" onClick={() => this.go('/buXiuGang')}>不锈钢</List.Item>
        <List.Item arrow="horizontal" onClick={() => this.go('/lvXingCai')}>铝型材</List.Item>
      </List>
    )
  }
}

export default Home