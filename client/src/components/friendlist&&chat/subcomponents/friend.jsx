import React, { Component } from "react";
import socket from "../../../helpers/socket";
import { Avatar, Button, ListItemIcon, ListItemButton, ListItemText } from "@mui/material";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

class Friend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newMessage: { content: '', from: '' }
        }
    }
    componentDidMount() {
        console.log('>>>>', this.props.newMessage)
        this.setState({
            newMessage: this.props.newMessage
        })
        socket.on("private message", ({ content, from }) => {

            if (this.props.friend === from) {
                // console.log('something', content, from, this.props.friend)
                this.setState({
                    newMessage: { content: content, from: from }
                })
            }
        })
    }
    changestate = (e) => {

        this.props.clearnewmessage()
        this.props.setrecipient(this.props.friend)
        this.setState({ newMessage: { content: '', from: '' } })

        this.props.statHandler('chat')

    }
    render() {
        return <ListItemButton onClick={this.changestate}><Avatar sx={{ width: 42, height: 42 }}>{this.props.friend[0]}</Avatar>
            <ListItemText sx={{
                backgroundColor: 'white',
                color: 'black',
                margin: '30px'
            }} primary={this.props.friend} />
            {this.state.newMessage.content !== '' ? < ChatBubbleIcon /> : null}
        </ListItemButton>

    }
}
//friend={this.props.friend}
export default Friend