import React, { Component } from "react";
import Competition from "./competition.jsx";
import Chat from "./chat.jsx";
import FriendList from "./friendlist.jsx";
import socket from "../../helpers/socket.js";

class FriendNChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stat: 'friendlist',
            number: 0
        }
    }
    componentDidMount() {
        socket.on('hello', (a) => {
            this.setState({ number: a })
        })
    }
    statHandler = (stat) => {
        stat = stat === 'BACK' ? 'friendlist' : stat
        this.setState({
            stat: stat
        })
    }
    render() {
        return (
            <div>
                <div>number::{this.state.number}</div>
                {this.state.stat === 'friendlist' ? <FriendList statHandler={this.statHandler} /> : null}
                {this.state.stat === 'chat' ? <Chat chatHistory={['hello', 'Hi']} /> : null}
                {this.state.stat === 'compete' ? <Competition /> : null}
                <button onClick={(e) => {
                    this.statHandler(e.target.innerHTML)
                }}>BACK</button>
            </div>
        )
    }
}
export default FriendNChat