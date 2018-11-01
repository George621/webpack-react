import "./home.scss"
import React, { Component } from 'react'
import { BrowserRouter, HashRouter, Switch, Route, Link } from 'react-router-dom'
import { MemoryRouter } from 'react-router'
import PrimaryLayout from "../primaryLayout/PrimaryLayout"
import Form from "../form/Form"

class Home extends Component {
  render() {
    return <div className="home-contain">
        <h3>webpack + es6 + babel + react + 工作流配置</h3>
        <div className="banner-img"></div>
        {/* 需要服务器支持 */}
        {/* <BrowserRouter>
          <PrimaryLayout></PrimaryLayout>
        </BrowserRouter> */}
        {/* hash 这个自己搞定 不需要后端支持 */}
        <HashRouter>
          <PrimaryLayout></PrimaryLayout>
        </HashRouter>
        {/* url nothing change */}
        {/* <MemoryRouter>
          <PrimaryLayout></PrimaryLayout>
        </MemoryRouter> */}
        <Form />
      </div>
  }
}

export default Home