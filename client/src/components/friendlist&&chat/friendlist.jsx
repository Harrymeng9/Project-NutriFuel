import React from "react";
import { Component } from "react";
import Friend from "./subcomponents/friend.jsx";
import SearchFriend from "./searchfriend.jsx";
import axios from "axios";
import socket from "../../helpers/socket.js";
import { List, ListItem, Divider, Box } from "@mui/material";

{/* <ListItemButton component="a" href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemButton> */}

class FriendList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            friendlist: [],
            newMessage: { content: '', from: '' }
        }
    }
    componentDidMount() {
        this.setState({
            newMessage: this.props.newMessage
        })
        console.log("username", this.props.userInfo.current.username)
        axios(`http://localhost:3000/friendlist?user=${this.props.userInfo.current.username}`).then((friendlist) => {

            this.setState({
                friendlist: friendlist.data
            })
        })
        socket.on('makefriend', ({ from }) => {
            let c = this.state.friendlist
            c.push(from)
            this.setState({
                friendlist: c
            })
        })
    }


    clearnewmessage = () => {
        this.setState({
            newMessage: { content: '', from: '' }
        })
    }
    render() {
        return (<Box sx={{
            backgroundColor: 'white'
        }}>
            <SearchFriend />
            <List >
                <Divider />
                {this.state.friendlist.length === 0 ? null : this.state.friendlist.map((friend1) => {
                    return <ListItem disablePadding divider={true}><Friend statHandler={this.props.statHandler} friend={friend1} newMessage={
                        friend1 === this.state.newMessage.from ? this.state.newMessage : { content: '', from: '' }
                    }
                        clearnewmessage={this.clearnewmessage}
                        setrecipient={this.props.setrecipient} />
                        {/* {friend1 === this.state.newMessage.from ? <div>new message</div> : null} */}
                    </ListItem>
                })}
            </List>
        </Box>)


    }
}

export default FriendList