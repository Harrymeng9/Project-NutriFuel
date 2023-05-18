import React from "react";
import { Component } from "react";
import axios from "axios";
import socket from "../../helpers/socket";
import Button from '@mui/material/Button';

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
            <Button variant="contained" onClick={this.search}>search friend</Button>
            {this.state.searchresult === '' ? null : <div>
                {this.state.searchresult}
                {this.state.searchresult === 'no such person' ? null : <div>
                    <Button onClick={this.addfriendhandle}>add friend</Button>
                    
                </div>}
                <Button onClick={this.handlecancel}>cancel</Button>
            </div>}
        </div>)
    }
}
export default SearchFriend