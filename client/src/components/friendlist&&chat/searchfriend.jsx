import React from "react";
import { Component } from "react";
import axios from "axios";
import socket from "../../helpers/socket";
import Button from '@mui/material/Button';
import { border, Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import { Divider } from "@mui/material";


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
        socket.emit('addfriend', {
            from: 'tom',
            to: this.state.searchresult
        })
        this.setState({
            searchresult: ''
        })
    }
    handlecancel = () => {
        this.setState({
            searchresult: ''
        })
    }

    render() {
        return (<Box
            component='from'
            noValidate
            autoComplete="off"
            sx={{
                backgroundColor: 'white'
            }}>
            <TextField variant="outlined" label="Search Friend" sx={{
                width:'200',
                background: "white"
            }} value={this.state.search} onChange={
                this.inputhandle
            } />
            <Button variant="contained" sx={{
                marginLeft: '70px',
                background: "white",
            }} onClick={this.search}>Search</Button>
            <Divider></Divider>
            {this.state.searchresult === '' ? <Box sx={{
                height: 60,
                backgroundColor: 'white',
                // height: 60,
                border: "none"
            }}></Box> : <Box sx={{
                backgroundColor: 'white',
                height: 60,

            }}>
                {this.state.searchresult}
                {this.state.searchresult === 'no such person' ? null :
                    <Button variant="contained" onClick={this.addfriendhandle}>add friend</Button>}
                <Button variant="contained" sx={{
                    backgroundColor: 'white',
                    marginLeft:30
                }} onClick={this.handlecancel}>cancel</Button>
            </Box>}
        </Box>)
    }
}
export default SearchFriend