import React, { Component } from "react";
import Competition from "./competition.jsx";
import Chat from "./chat.jsx";
import FriendList from "./friendlist.jsx";


class FriendNChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stat: 'friendlist',
            recipient:''
        }
    }
    componentDidMount() {
        // this.props.resetNewMessage()
        this.props.turnoffnotification()
        console.log('wwwww',this.props.newMessage)
    }
    componentDidUpdate(prevProps) { 
    }
    statHandler = (stat) => {
        stat = stat === 'BACK' ? 'friendlist' : stat
        this.setState({
            stat: stat
        })
    }
    setrecipient=(recipient)=>{
        this.setState({
            recipient:recipient
        })
    }
    render() {
        return (
            <div>
                {this.state.stat === 'friendlist' ? <FriendList setrecipient={this.setrecipient} statHandler={this.statHandler} newMessage={this.props.newMessage} /> : null}
                {this.state.stat === 'chat' ? <Chat newMessage={this.props.newMessage} recipient={this.state.recipient}/> : null}
                {this.state.stat === 'compete' ? <Competition /> : null}
                <button onClick={(e) => {
                    this.statHandler(e.target.innerHTML)
                }}>BACK</button>
            </div>
        )
    }
}
export default FriendNChat