import React from "react";
import { Component } from "react";
import Friend from "./subcomponents/friend.jsx";
import SearchFriend from "./searchfriend.jsx";
import axios from "axios";



class FriendList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            friendlist: [],
            newMessage: { content: '', from: '' }
        }
    }
    componentDidMount() {
        console.log('ppp',this.props)
        this.setState({
            newMessage: this.props.newMessage
        })
        axios('http://localhost:3000/friendlist?user=tom').then((friendlist) => {

            this.setState({
                friendlist: friendlist.data
            })
        })
    }
    componentDidUpdate(prevProps) {

    }
    clearnewmessage = () => {
        this.setState({
            newMessage: { content: '', from: '' }
        })
    }
    render() {
        return (<div>
            <SearchFriend />
            <ul>
                {this.state.friendlist.length === 0 ? null : this.state.friendlist.map((friend1) => {
                    return <li><Friend statHandler={this.props.statHandler} friend={friend1} newMessage={
                        friend1 === this.state.newMessage.from ? this.state.newMessage : { content: '', from: '' }
                    }
                        clearnewmessage={this.clearnewmessage}
                        setrecipient={this.props.setrecipient} />
                        {friend1 === this.state.newMessage.from ? <div>new message</div> : null}
                    </li>
                })}
            </ul>
        </div>)


    }
}

export default FriendList