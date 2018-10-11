import React, { Component } from 'react'
export default class HOME extends Component {
    constructor(data){
        super()
        console.log(data);
        this.state={
            id:data.match.params.id,
            propmpt:false
        }
    }
    render() {
        return (
            <div>
                {'ssss'+this.state.propmpt}
                <h1 onClick={()=>{
                    this.setState({propmpt:!this.state.propmpt})
                }}>home</h1>
                <div> {this.state.id}</div>
                <div> {this.props.data}</div>
            </div>
        )
    }
}