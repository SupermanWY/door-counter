import React from 'react'
import { List, InputItem, Button, WingBlank, WhiteSpace, Picker, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import { validate, ceil } from './util'

const valMap = {
  height: '高',
  width: '宽',
  liaoWidth: '料宽',
  doorAmount: '几扇门',
  banZiAmount: '几块板'
}

class LvXingCai extends React.Component {
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

  calculate = validate(valMap, this, () => {
    let {
      height,
      width,
      liaoWidth,
      doorAmount,
      banZiAmount
    } = this.props.form.getFieldsValue()
    height = +height
    width = +width
    liaoWidth = liaoWidth[0]
    doorAmount = +doorAmount
    banZiAmount = +banZiAmount

    const shuKuangHeight = height - 35
    const shuKuangAmount = doorAmount * 2
    const fangWidth = (width - liaoWidth * (doorAmount + 1)) / doorAmount
    const upFangAmount = doorAmount
    const downFangAmount = doorAmount
    const middleFangAmount = this.calculateMiddleFangAmount(banZiAmount, doorAmount, liaoWidth)
    const huaWidth = width
    const banZiWidth = fangWidth + 15
    const banZiHeight = this.calculateBanZiHeight(shuKuangHeight, banZiAmount, liaoWidth)
    const huaLunAmount = doorAmount
    const maoTiaoLength = shuKuangAmount * height

    this.setState(ceil({
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
  })

  calculateBanZiHeight(shuKuangHeight, banZiAmount, liaoWidth) {
    if (liaoWidth === 10) {
      return shuKuangHeight - (banZiAmount + 1) * 2
    }

    return shuKuangHeight - 60
  }

  calculateMiddleFangAmount(banZiAmount,doorAmount, liaoWidth) {
    if (liaoWidth === 10) {
      return (banZiAmount - 1) * doorAmount
    }

    return 0
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
          {...getFieldProps('banZiAmount')}
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

export default createForm()(LvXingCai)
