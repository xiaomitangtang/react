// import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import logger from 'redux-logger'
import { createStore,applyMiddleware  } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider  } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers'
import { BrowserRouter as Router,HashRouter,Switch, Route, Link,NavLink, Redirect, withRouter } from "react-router-dom";
import './index.css'
import ScrollToTop from './scrollToTop'
import 'element-theme-default';
const loggerMiddleware = logger
// let oldstate={todos:[
//         {text:'默认的第一个', completed: false},
//         {text:123123123, completed: false},
//         {text:123123123, completed: false},
//         {text:123123123, completed: false},
//     ],test:"小米秘密吗"}
// let store = createStore(todoApp,oldstate)


// let store = createStore(todoApp,applyMiddleware(
//     thunkMiddleware, // 允许我们 dispatch() 函数
//     loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
// ))//第二个参数是初始的state，

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore)
let oldstate={todos:[
        {text:'默认的第一个', completed: false},
        {text:123123123, completed: false},
        {text:123123123, completed: false},
        {text:123123123, completed: false},
    ],test:"小米秘密吗"}
let store = createStoreWithMiddleware(todoApp,oldstate)//这样就使用了中间件
 let unsubscribe=store.subscribe(() =>
    console.log(store.getState())
)//store.subscribe可以注册一个更新state之后的回调函数，并且返回一个函数，用于注销此回调函数
        setTimeout(()=>{
            unsubscribe()//运行注册回调函数的返回函数，将注销该回调函数
        },3000)
let rootElement = document.getElementById('root')
//使用Provider即是react中注入state的方式
render(
    <Provider store={store}>
        <Router>
            <ScrollToTop>
                <App></App>
            </ScrollToTop>

        </Router>

    </Provider>,
    rootElement
)