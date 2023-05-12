

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
            newMessage: this.props.newMessage
        })
    }
    changestate = (e) => {
        console.log(this.state.newMessage)
        if (e.target.innerHTML === 'chat') {
            this.props.clearnewmessage()
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