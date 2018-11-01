import "./form.scss"
import React, { Component } from 'react'

// 增加一个表单测试flex 应用stretch

class Form extends Component {

  render() {
    return (
      <div className="form-contain">
        <form action="">
          <input type="email" name="email" />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}
export default Form
