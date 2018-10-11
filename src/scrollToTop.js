import React, { Component } from 'react'
import { BrowserRouter as Router,HashRouter,Switch, Route, Link,NavLink, Redirect, withRouter } from "react-router-dom";

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        console.log(this);
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);