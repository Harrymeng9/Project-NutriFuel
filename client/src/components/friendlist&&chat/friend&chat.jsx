import React, { Component } from "react";
import Competition from "./competition.jsx";
import Chat from "./chat.jsx";
import FriendList from "./friendlist.jsx";


class FriendNChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stat: 'friendlist'
        }
    }
    componentDidMount() {
        this.props.resetNewMessage()
        this.props.turnoffnotification()
    }
    componentDidUpdate() {
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
                {this.state.stat === 'friendlist' ? <FriendList statHandler={this.statHandler} newMessage={this.props.newMessage} /> : null}
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