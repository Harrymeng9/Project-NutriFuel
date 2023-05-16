

import React, { Component } from "react";
import socket from "../../../helpers/socket";

class Friend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newMessage: { content: '', from: '' }
        }
    }
    componentDidMount() {
        console.log('>>>>', this.props.newMessage)
        this.setState({
            newMessage: this.props.newMessage
        })
        socket.on("private message", ({ content, from }) => {

            if (this.props.friend === from) {
                // console.log('something', content, from, this.props.friend)
                this.setState({
                    newMessage: { content: content, from: from }
                })
            }
        })
    }
    changestate = (e) => {
        if (e.target.innerHTML === 'chat') {
            console.log('??????chat')
            this.props.clearnewmessage()
            this.props.setrecipient(this.props.friend)
            this.setState({ newMessage: { content: '', from: '' } })
        }
        this.props.statHandler(e.target.innerHTML)

    }
    render() {
        return <div>{this.props.friend}
            <button onClick={this.changestate}>compete</button>
            <button onClick={this.changestate} friend={this.props.friend}>chat</button>
            {this.state.newMessage.content !== '' ? <span>new message</span> : null}
        </div>

    }
}

export default Friend