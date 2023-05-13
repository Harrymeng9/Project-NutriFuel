import React from "react";
import { Component } from "react";
import axios from "axios";
import socket from "../../helpers/socket";

class SearchFriend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchresult: ''
        }
    }
    search = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/searchfriend',
            params: {
                friend: this.state.search
            }
        }).then((data) => {
            console.log(data.data)
            this.setState({
                searchresult: data.data
            })

        })
        // this.setState({
        //     search: ''
        // })
    }
    inputhandle = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    addfriendhandle = (e) => {
        socket.emit('addfriend',{
            from:'tom',
            to: this.state.searchresult
        })
        this.setState({
            searchresult:''
        })
    }
    handlecancel = () => {
        this.setState({
            searchresult:''
        })
    }

    render() {
        return (<div>
            <input type="text" value={this.state.search} onChange={
                this.inputhandle
            } />
            <button onClick={this.search}>search friend</button>
            {this.state.searchresult === '' ? null : <div>
                {this.state.searchresult}
                {this.state.searchresult === 'no such person' ? null : <div>
                    <button onClick={this.addfriendhandle}>add friend</button>
                    
                </div>}
                <button onClick={this.handlecancel}>cancel</button>
            </div>}
        </div>)
    }
}
export default SearchFriend