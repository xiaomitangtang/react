react  脚手架
    npm install create-react-app -g     这一步将安装脚手架到本地
    create-react-app demo-app           使用脚手架创建项目
    cd demo-app                         转到项目内
    npm install react-router-dom        安装路由依赖
    npm install --save redux            安装redux     此包并非为react开发，所以需要安装连接器
    npm install --save react-redux      安装react与redux连接器


import React from 'react'                   提供基础库，react项目基本依赖
import { render } from 'react-dom'          render负责将项目挂载渲染到页面
import logger from 'redux-logger'           一个打印日志的库，用于redux改变时更方便观察变化过程
import { createStore,applyMiddleware  } from 'redux'
import thunkMiddleware from 'redux-thunk'   异步redux的依赖中间件

import { Provider,connect  } from 'react-redux' Provider用于将redux注入项目，connect用于将redux注入到具体组件
import { BrowserRouter as Router,
HashRouter,Switch,
 Route, Link,NavLink, Redirect, withRouter }
  from "react-router-dom";                      从引入与路由相关的组件
  import 'element-theme-default';               引入element样式


createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore)     在redux注入项目之前使用中间件
store = createStoreWithMiddleware(todoApp,oldstate)             将默认的状态结合项目的reducer生成store
unsubscribe=store.subscribe(callback)                           给redux订阅一个钩子函数，返回一个可以注销此函数的函数


render(
    <Provider store={store}>
        <Router>
            <ScrollToTop>
                <App></App>
           </ScrollToTop>
        </Router>
    </Provider>,
    rootElement
)                                           一个融合了路由和redux的项目



connect(select)(App)                将app组件与redux连接的组件，select为一个方法，该方法接受state状态树，并返回需要挂载到组件的props
                                    使用connect连接的组件props会注入一个dispatch，可以用于触发reducer更新store


dispatch(completeTodo(index))       组件内部调用action触发store的更新

action             如果返回{ type: ADD_TODO, text }     这样的普通对象，则为同步更新store的action
                    如果返回一个函数 则该函数会被redux执行，
                    并且该函数接收（dispatch,getState）作为参数，用于在异步回调之后，可以再次触发其他dispatch更新store，或者获取store的快照
                       例如
    export function testF (test) {
      return (dispatch,getState)=>{
          dispatch(addTodo('demo'))
          setTimeout(()=>{
              dispatch(addTodo('demo2'))
              console.log('getstate',getState());
          },3000)

      }

    }


reducer
        import { combineReducers } from 'redux'     引入redux的融合器，可以将多个独立的reducer融合为一个reducer

     reducer为纯同步函数 接收 （state,action） state为当前reducer管理的状态树，action为页面通过dispatch传递过来的交互类型以及参数
                        reducer必须返回新的state进行更新替换旧的state

        const todoApp = combineReducers({
            test,
            visibilityFilter,
            todos
        })





需要访问路由的组件需要使用withRouter（app）进行包裹        会在props中注入history   location等
路由相关的内容必须在路由器内部，Router, 分为两种
        BrowserRouter   去除#
        HashRouter      带有#
    跳转链接
        Link
        NavLink     与当前路由匹配是会给自己加上对应的类名

    Route   用于对应链接跳转的内容
   Switch   用于包裹多个  Route
