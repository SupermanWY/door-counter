import React from 'react'
import { List, InputItem, Button, WingBlank, WhiteSpace, Radio } from 'antd-mobile'
import { createForm } from 'rc-form'
import { validate, ceil } from './util'

const RadioItem = Radio.RadioItem

const valMap = {
  height: '高',
  shangWidth: '上宽',
  xiaWidth: '下宽',
}

class BuXiuGang extends React.Component {
  state = {
    height: '',
    shangWidth: '',
    xiaWidth: '',
    yiType: 'liangYi'
  }

  calculate = validate(valMap, this, () => {
    let {
      height,
      shangWidth,
      xiaWidth
    } = this.props.form.getFieldsValue()
    height = +height
    shangWidth = +shangWidth
    xiaWidth = +xiaWidth

    const dangShuiShiJi = xiaWidth
    const xiaTiao =height
    const laShou = '??'
    const guBoGao = height -  40
    const guBoKuan = (shangWidth - 96) / 2
    const yiBoGaoYiGuYiYi = height - 90
    const yiBoKuan = (shangWidth + 112) / 2
    const yiBoGaoLiangYi = height - 90
    const liangYiKuan= shangWidth / 2 + 10

    this.setState(ceil({
      dangShuiShiJi,
      xiaTiao,
      laShou,
      guBoGao,
      guBoKuan,
      yiBoGaoYiGuYiYi,
      yiBoKuan,
      yiBoGaoLiangYi,
      liangYiKuan
    }))
  }, this)

  render() {
    const { getFieldProps } = this.props.form
    const yiTypeRadios = [
      {
        value: 'liangYi',
        label: '两移'
      },
      {
        value: 'yiGuYiYi',
        label: '一固一移'
      }
    ]
    const {
      dangShuiShiJi,
      xiaTiao,
      laShou,
      yiType
    } = this.state

    return (
      <div> 
        <InputItem
          {...getFieldProps('height')}
          clear
          type="money"
          moneyKeyboardAlign="right"
        >高</InputItem>
        <InputItem
          {...getFieldProps('shangWidth')}
          clear
          type="money"
          moneyKeyboardAlign="right"
        >上宽</InputItem>
        <InputItem
          {...getFieldProps('xiaWidth')}
          clear
          type="money"
          moneyKeyboardAlign="right"
        >下宽</InputItem>
        {
          yiTypeRadios.map(item => (
            <RadioItem
              key={item.value}
              checked={item.value===this.state.yiType}
              onClick={() => this.setState({ yiType: item.value })}
            >{item.label}</RadioItem>
          ))
        }

        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button type="primary" onClick={this.calculate}>计算</Button>
        </WingBlank>
        <WhiteSpace></WhiteSpace>

        <List renderHeader={() => '计算结果'}>
          <List.Item extra={dangShuiShiJi}>挡水石基</List.Item>
          <List.Item extra={xiaTiao}>下条</List.Item>
          <List.Item extra={laShou}>拉手</List.Item>
          {
            yiType === 'liangYi' ? this.renderLiangYi() : this.renderYiGuYiYi()
          }
        </List>
      </div>
    )
  }

  renderYiGuYiYi() {
    const {
      guBoGao,
      guBoKuan,
      yiBoGaoYiGuYiYi,
      yiBoKuan
    } = this.state
    return (
      <React.Fragment>
        <List.Item extra="2个">滑轮</List.Item>
        <List.Item extra={guBoGao}>固玻高</List.Item>
        <List.Item extra={guBoKuan}>固玻宽</List.Item>
        <List.Item extra={yiBoGaoYiGuYiYi}>移玻高</List.Item>
        <List.Item extra={yiBoKuan}>移玻宽</List.Item>
      </React.Fragment>
    )
  }

  renderLiangYi() {
    const { yiBoGaoLiangYi, liangYiKuan } = this.state
    return (
      <React.Fragment>
        <List.Item extra="4个">滑轮</List.Item>
        <List.Item extra={yiBoGaoLiangYi}>移玻高</List.Item>
        <List.Item extra={liangYiKuan}>两移宽</List.Item>
      </React.Fragment>
    )
  }
}

export default createForm()(BuXiuGang)
