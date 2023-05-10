import React from "react";
import { Component } from "react";
import Friend from "./subcomponents/friend.jsx";
import SearchFriend from "./searchfriend.jsx";
import axios from "axios";



class FriendList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            friendlist: []
        }
    }
    componentDidMount() {
        axios('http://localhost:3000/friendlist?user=hasha').then((friendlist) => {
            this.setState({
                friendlist: friendlist.data
            })
        })
    }
    componentDidUpdate(prevProps) {

    }

    render() {
        return (<div>
            <SearchFriend />
            <ul>
                {this.state.friendlist.length === 0 ? null : this.state.friendlist.map((friend) => {
                    return <Friend statHandler={this.props.statHandler} friend={friend} />
                })}
            </ul>
        </div>)


    }
}

export default FriendList