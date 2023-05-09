import React, { Component } from "react";
import Competition from "./competition.jsx";
import Chat from "./chat.jsx";
import FriendList from "./friendlist.jsx";
import socket from "../../socket.js";

class FriendNChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stat: 'friendlist'
        }
    }
    componentDidMount() {
        console.log('hhh')
        socket.on('connection', (a) => {
            console.log('ajja')
            console.log(a, 'hahah')
        });
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