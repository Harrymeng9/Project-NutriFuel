
import React, { Component } from "react";

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }
    textareahandle = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    send = () => {
        this.setState({
            content: ''
        })
        console.log(this.state.content)
    }

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