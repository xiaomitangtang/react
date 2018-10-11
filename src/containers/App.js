import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router,HashRouter,Switch, Route, Link,NavLink, Redirect, withRouter } from "react-router-dom";

import {
    ADD_TODO,
    addTodo,
    testF,
    COMPLETE_TODO,
    completeTodo,
    SET_VISIBILITY_FILTER,
    setVisibilityFilter,
    VisibilityFilters
} from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'
import TestRouter from '../textRouter'
class App extends Component {
    constructor(){
        super()
    }
    render() {
        // Injected by connect() call:
        const { dispatch, visibleTodos, visibilityFilter } = this.props
        return (

            <div>
                <AddTodo
                    onAddClick={text => {
                        dispatch(addTodo(text))// { type: ADD_TODO, text }
                    }
                    } />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={index =>
                        dispatch(completeTodo(index))//{ type: COMPLETE_TODO, index }
                    } />
                <div  onClick={()=>{
                    dispatch(testF('testtttFFF'))
                }}>aaaaaaaaaaaaaaaa</div>
                <Footer
                    filter={visibilityFilter}

                    onFilterChange={nextFilter =>
                        dispatch(setVisibilityFilter(nextFilter))//{ type: SET_VISIBILITY_FILTER, filter }
                    } />
                <TestRouter/>
            </div>
        )
    }
}


function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)
//使用connect的组件可以获得dispatch，并且接受的第一个参数为一个方法，用于接受全局的state以及返回所需要的props