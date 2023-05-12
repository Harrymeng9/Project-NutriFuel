
import React, { Component } from "react";
import socket from "../../helpers/socket";

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chatHistory: [],
            content: ''
        }
    }
    componentDidMount() {
        console.log('i am chat')
        socket.on("private message", ({ content, from }) => {
            console.log('something', content, from)
            let a = this.state.chatHistory
            a.push(content)
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
        a.push(this.state.content)
        socket.emit('private message', {
            content: this.state.content,
            to: 'tom',
            from: 'jerry'
        })
        this.setState({
            chatHistory: a,
            content: ''
        })
    }
    render() {
        return (
            <div>
                <div id="chatbox" style={{ 'height': "100px", 'width': '200px', 'border': '1px solid black' }}>
                    <ul>
                        {this.state.chatHistory.map((item) => {
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