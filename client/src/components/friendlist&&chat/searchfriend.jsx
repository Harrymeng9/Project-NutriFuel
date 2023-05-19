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
                color: 'white',
                width: '300',

            }} value={this.state.search} onChange={
                this.inputhandle
            } />
            <Button variant="outlined" margin='dense' sx={{
                marginLeft: '80px',
                background: "white",
                marginTop:1
            }} onClick={this.search}>Search</Button>
            <Divider></Divider>
            {this.state.searchresult === '' ? <Box sx={{
                height: 60,
                backgroundColor: 'white',
                // height: 60,
                border: "none"
            }}></Box> : <Box margin="dense" sx={{
                backgroundColor: 'white',
                height: 60,
                color: 'black',
                fontSize:20
            }}>
                {this.state.searchresult}
                {this.state.searchresult === 'no such person' ? null :
                    <Button variant="outlined" margin="dense" sx={{
                        // backgroundColor: 'white',
                        marginTop: 2,
                        marginLeft: 15
                    }} onClick={this.addfriendhandle}>add friend</Button>}
                <Button variant="outlined" margin="dense" sx={{
                    display: 'inline-block',
                    // backgroundColor: 'white',
                    marginTop: this.state.searchresult === 'no such person' ? -1 : -8,
                    marginLeft: 35
                }} onClick={this.handlecancel}>cancel</Button>
            </Box>}
        </Box>)
    }
}
export default SearchFriend