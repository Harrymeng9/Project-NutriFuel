
import React, { Component } from "react";
import socket from "../../helpers/socket";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, TextField, List, ListItem, ListItemText, Avatar, ListItemAvatar } from "@mui/material";

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chatHistory: [],
            content: ''
        }
    }
    componentDidMount() {
        if (this.props.newMessage.from === this.props.recipient) {
            this.setState({
                chatHistory: [this.props.newMessage]
            })
        }
        this.props.turnoffnotification(false)
        socket.on("private message", ({ content, from }) => {
            let a = this.state.chatHistory
            a.push({ content, from })
            this.setState({
                chatHistory: a
            })
        });
        this.props.resetNewMessage()
    }
    textareahandle = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    send = () => {
        let a = this.state.chatHistory
        console.log(this.props.recipient)
        a.push({ from: this.props.userInfo.current.username, content: this.state.content })
        socket.emit('private message', {
            content: this.state.content,
            to: this.props.recipient,
            from: this.props.userInfo.current.username
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
                sender: this.props.userInfo.current.username,
                recipient: this.props.recipient
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
            <Box sx={{
                height: '680px',
                backgroundColor: 'white'
            }}>
                <Box id="chatbox" sx={{ height: "100%", width: '100%', border: '1px solid green', borderRadius: '5px', overflow: 'scroll', 'backgroundColor': 'white', color: 'black' }}>
                    <Button onClick={this.showhistory}>show history</Button>
                    <List>
                        {this.state.chatHistory.map((item) => {
                            return <ListItem>
                                <Avatar>{item.from}</Avatar>
                                <ListItemText sx={{
                                    backgroundColor: 'white',
                                    fontSize: 30,
                                    color: 'black',
                                    marginLeft: 2
                                }} primary={item.content} /></ListItem>
                        })}
                    </List>
                </Box>
                <TextField variant="outlined" sx={{
                    width: '70%',
                    height: 42
                }} onChange={this.textareahandle} value={this.state.content}></TextField>
                <Button variant="outlined" sx={{
                    height: 56,
                    width: '30%'
                }} onClick={this.send}>send</Button>
            </Box>
        )
    }
}
export default Chat