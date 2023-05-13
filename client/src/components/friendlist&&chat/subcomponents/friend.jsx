

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
        this.setState({
            newMessage: this.props.newMessage
        })
        socket.on("private message", ({ content, from }) => {
            if (this.props.friend === from) {
                this.setState({
                    content: content,
                    from: from
                })
            }
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
            <button onClick={this.changestate}>chat</button>
            {this.state.newMessage.content!==''?<div>new message</div>:null}
            </div>
            
    }
}

export default Friend