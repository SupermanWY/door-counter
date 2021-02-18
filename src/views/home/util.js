import { Toast } from 'antd-mobile'

export function validate(valMap, ctx, fn) {
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

export function ceil(obj) {
  return Object.entries(obj).reduce((cur, [k, v]) => {
    cur[k] = Math.ceil(v)
    return cur
  }, {})
}
