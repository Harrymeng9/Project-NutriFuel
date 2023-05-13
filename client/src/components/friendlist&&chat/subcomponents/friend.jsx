

import React, { Component } from "react";

class Friend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newMessage: { content: '', from: '' }
        }
    }
    componentDidMount() {
        this.setState({
            newMessage:this.props.newMessage
        })
    }
    changestate = (e) => {
        if (e.target.innerHTML === 'chat') {
            this.props.clearnewmessage()
            this.props.setrecipient(this.props.friend)
        }
        this.props.statHandler(e.target.innerHTML)
    }
    render() {
        return <div>{this.props.friend}
            <button onClick={this.changestate}>compete</button>
            <button onClick={this.changestate}>chat</button></div>
    }
}

export default Friend