import React from 'react'
import { List, InputItem, Button, WingBlank, WhiteSpace, Picker, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'

const valMap = {
  height: '高',
  width: '宽',
  liaoWidth: '料宽',
  doorAmount: '几扇门',
  boardAmount: '几块板'
}

function validate(fn, ctx) {
  return (function() {
    this.props.form.validateFields((error, value) => {
      console.log(error, value)
      const keys = Object
        .entries(value)
        .filter(([k, v]) => !v)
        .map(([k]) => valMap[k])
      if (keys.length) {
        Toast.info(`请输入${keys[0]}`)
        return
      }
      fn.call(this)
    });
  }).bind(ctx)
}

function toFix2(obj) {
  return Object.entries(obj).reduce((cur, [k, v]) => {
    cur[k] = Math.ceil(v)
    return cur
  }, {})
}

class Home extends React.Component {
  state = {
    shuKuangHeight: '',
    shuKuangAmount: '',
    fangWidth: '',
    upFangAmount: '',
    downFangAmount: '',
    middleFangAmount: '',
    huaWidth: '',
    banZiWidth: '',
    banZiHeight: '',
    huaLunAmount: '',
    maoTiaoLength: '',
    liaoWidthOpts: [
      { label: 10, value: 10 },
      { label: 20, value: 20 },
      { label: 30, value: 30 },
      { label: 40, value: 40 },
      { label: 50, value: 50 },
      { label: 60, value: 60 },
    ]
  }

  calculate = validate(() => {
    let {
      height,
      width,
      liaoWidth,
      doorAmount,
      boardAmount
    } = this.props.form.getFieldsValue()
    height = +height
    width = +width
    liaoWidth = liaoWidth[0]
    doorAmount = +doorAmount
    boardAmount = +boardAmount

    const shuKuangHeight = height - 35
    const shuKuangAmount = doorAmount * 2
    const fangWidth = (width - liaoWidth * (doorAmount + 1)) / doorAmount
    const upFangAmount = doorAmount
    const downFangAmount = doorAmount
    const middleFangAmount = boardAmount - 1
    const huaWidth = width
    const banZiWidth = fangWidth + 15
    const banZiHeight = this.calculateBanZiHeight(shuKuangHeight, boardAmount, liaoWidth)
    const huaLunAmount = doorAmount
    const maoTiaoLength = boardAmount * height

    this.setState(toFix2({
      shuKuangHeight,
      shuKuangAmount,
      fangWidth,
      upFangAmount,
      downFangAmount,
      middleFangAmount,
      huaWidth,
      banZiWidth,
      banZiHeight,
      huaLunAmount,
      maoTiaoLength,
    }))
  }, this)

  calculateBanZiHeight(shuKuangHeight, boardAmount, liaoWidth) {
    if (liaoWidth === 10) {
      return shuKuangHeight - (boardAmount + 1) * 2
    }

    return shuKuangHeight - 60
  }

  render() {
    const { getFieldProps } = this.props.form

    return (
      <div> 
        <InputItem
          {...getFieldProps('height')}
          clear
          type="money"
          moneyKeyboardAlign="right"
        >高</InputItem>
        <InputItem
          {...getFieldProps('width')}
          clear
          type="money"
          moneyKeyboardAlign="right"
        >宽</InputItem>
        <Picker
          {...getFieldProps('liaoWidth')}
          clear
          title="料宽"
          cols={1}
          data={this.state.liaoWidthOpts}
        >
          <List.Item arrow="horizontal">料宽</List.Item>
        </Picker>
        <InputItem
          {...getFieldProps('doorAmount')}
          clear
          type="money"
          moneyKeyboardAlign="right"
        >几扇门</InputItem>
        <InputItem
          {...getFieldProps('boardAmount')}
          clear
          type="money"
          moneyKeyboardAlign="right"
        >几块板</InputItem>

        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button type="primary" onClick={this.calculate}>计算</Button>
        </WingBlank>
        <WhiteSpace></WhiteSpace>

        <List renderHeader={() => '计算结果'}>
          <List.Item extra={this.state.shuKuangHeight}>竖框高度</List.Item>
          <List.Item extra={this.state.shuKuangAmount}>竖框数量</List.Item>
          <List.Item extra={this.state.fangWidth}>（上/中/下）方宽度</List.Item>
          <List.Item extra={this.state.upFangAmount}>上方数量</List.Item>
          <List.Item extra={this.state.middleFangAmount}>中方数量</List.Item>
          <List.Item extra={this.state.downFangAmount}>下方数量</List.Item>
          <List.Item extra={this.state.huaWidth}>（上/下）滑宽度</List.Item>
          <List.Item extra={this.state.banZiWidth}>板子宽度</List.Item>
          <List.Item extra={this.state.banZiHeight}>板子高度</List.Item>
          <List.Item extra={this.state.huaLunAmount}>滑轮数量</List.Item>
          <List.Item extra={this.state.maoTiaoLength}>锚条长度</List.Item>
        </List>
      </div>
    )
  }
}

export default createForm()(Home)
