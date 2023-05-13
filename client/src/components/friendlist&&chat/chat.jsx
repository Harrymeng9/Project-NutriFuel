
import React, { Component } from "react";
import socket from "../../helpers/socket";
import axios from "axios";

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chatHistory: [],
            content: ''
        }
    }
    componentDidMount() {
        if (this.props.newMessage.content !== '') {
            this.setState({
                chatHistory: [this.props.newMessage]
            })
        }
        socket.on("private message", ({ content, from }) => {
            let a = this.state.chatHistory
            a.push({ content, from })
            this.setState({
                chatHistory: a
            })
        });
    }
    textareahandle = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    send = () => {
        let a = this.state.chatHistory
        console.log(this.props.recipient)
        a.push({ from: 'jack', content: this.state.content })
        socket.emit('private message', {
            content: this.state.content,
            to: this.props.recipient,
            from: 'jack'
        })
        this.setState({
            chatHistory: a,
            content: ''
        })
    }
    showhistory = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/getchathistory',
            params: {
                sender: 'jack',
                recipient: 'tom'
            }
        }).then((a) => {
            a = a.data
            let b = []
            for (let i = 0; i < a.length; i++) {
                b.push({
                    from: a[i].sender,
                    content: a[i].message
                })
            }
            this.setState({
                chatHistory: b
            })
        })
    }
    render() {
        return (
            <div>
                <div id="chatbox" style={{ 'height': "100px", 'width': '200px', 'border': '1px solid black', 'overflow': 'scroll' }}>
                    <button onClick={this.showhistory}>show history</button>
                    <ul>
                        {this.state.chatHistory.map((item) => {
                            return <li>{item.from}:{item.content}</li>
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