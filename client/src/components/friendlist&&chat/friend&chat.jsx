import React, { Component } from "react";
import Competition from "./competition.jsx";
import Chat from "./chat.jsx";
import FriendList from "./friendlist.jsx";
import socket from "../../helpers/socket.js";

class FriendNChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stat: 'friendlist'
        }
    }
    /*socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.userID = userID;
    }); */
    componentDidMount() {
        socket.auth = {username: 'marry'}
        const sessionID = localStorage.getItem("sessionID");
        console.log('www', sessionID)
        if (sessionID) {
            socket.auth = { sessionID}
            console.log(socket.auth)
        }
        socket.connect()
        // socket.on("private message", (arg, callback) => {
        //     console.log(arg); // "world"
        //     callback("got it!");
        // });
        socket.on("session", ({ sessionID, userID }) => {
            socket.auth = { sessionID };
            localStorage.setItem("sessionID", sessionID);
            socket.userID = userID;
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