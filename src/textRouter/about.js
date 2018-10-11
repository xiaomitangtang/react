import React, { Component } from 'react'
export default class ABOUT extends Component {
    constructor(data){
        super()
        console.log(data);
        this.state={
            id:data.match.params.id
        }
    }
    render() {
        return (
            <div>
              <h1> ABOUT</h1>
                {this.state.id}
            </div>
        )
    }

}