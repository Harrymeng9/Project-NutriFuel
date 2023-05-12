
import React, { Component } from "react";
import socket from "../../helpers/socket";

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chatHistory:[],
            content: ''
        }
    }
    textareahandle = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    send = () => {
        socket.emit('private message',{
            content:this.state.content,
            to: 'marry'
        })
        this.setState({
            content: ''
        })
    }
/*
onMessage(content) {
  if (this.selectedUser) {
    socket.emit("private message", {
      content,
      to: this.selectedUser.userID,
    });
    this.selectedUser.messages.push({
      content,
      fromSelf: true,
    });
  }
}*/ 
    render() {
        return (
            <div>
                <div id="chatbox" style={{'height':"100px", 'width':'200px','border':'1px solid black'}}>
                    <ul>
                        {this.props.chatHistory.map((item) => {
                            return <li>{item}</li>
                        })}
                    </ul>
                </div>
                <input onChange={this.textareahandle} value={this.state.content}></input>
                <button onClick={this.send}>send</button>
            </div>
        )
    }
}
export default Chat