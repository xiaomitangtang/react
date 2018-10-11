import React, { Component } from 'react'
import { BrowserRouter as Router,HashRouter,Switch, Route, Link,NavLink, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import ABOUT from './about'
import HOME from './home'
import NotFound from './notfund'
import {
    addTodo
} from '../actions'

import { Button ,InputNumber,Select,Pagination} from 'element-react';
 class testRouter extends Component {
     constructor(){
         super()
         this.state = {
             options: [{
                 value: '选项1',
                 label: '黄金糕'
             }, {
                 value: '选项2',
                 label: '双皮奶'
             }, {
                 value: '选项3',
                 label: '蚵仔煎'
             }, {
                 value: '选项4',
                 label: '龙须面'
             }, {
                 value: '选项5',
                 label: '北京烤鸭'
             }],
             value: ''
         };
     }
    render() {
        console.log(this);
        let str = JSON.stringify(this.props.location)
        return (

            <div>
                <Button onClick={()=>{
                    alert('点击了element的按钮')
                }}>button</Button>
                <InputNumber onChange={(data)=>{
                   alert(data)
                }}></InputNumber>
                <input type='text' ref='input' />
                <Pagination layout="prev, pager, next" total={1000}/>
                <Select value={this.state.value}>
                    {
                        this.state.options.map(el => {
                            return <Select.Option key={el.value} label={el.label} value={el.value} />
                        })
                    }
                </Select>
                {str}
                <button onClick={(e) => this.handleClick(e)}>
                    Add
                </button>
                <div>
                    HashRouter           带有#号
                </div>
                <div>   BrowserRouter        不带#号</div>
                <pre>
                    Route exact path="/" component=Home   <br/>
                    path="/about" <br/>
                    render=(props) => About     ...props    extra=someVariable <br/>
                    上面两种是正确的 <br/>
                    下面这么做是不对的 <br/>
                     component=props => Contact ...props extra=someVariable <br/>
                </pre>

                <HashRouter>
                    <div>
                        <ul>
                            <li>
                                <NavLink activeClassName='activelink'  to="/123">Home</NavLink>
                            </li>
                            <li>
                                <NavLink  activeClassName='activelink' to="/about/456">About</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName='activelink'  to="/aat/ss6">没有设置的url</NavLink>
                            </li>

                        </ul>
                        <hr />
                        <Switch>
                            <Route exact path="/:id" render={props=>(<HOME {...props} data='这是我的data'/>)} />
                            <Route path="/about/:id" component={ABOUT} />
                            <Route component={NotFound} />
                        </Switch>

                    </div>
                </HashRouter>
            </div>
        )
    }

    handleClick(e) {
        console.log(this);
        const node = this.refs.input
        const text = node.value.trim()
        console.log(text);
        this.props.dispatch(addTodo(text))
    }
}
function select(state) {
    return state
}
export default withRouter(connect(select)(testRouter))