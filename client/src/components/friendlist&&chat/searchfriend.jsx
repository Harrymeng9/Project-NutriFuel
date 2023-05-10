import React from "react";
import { Component } from "react";
import axios from "axios";

class SearchFriend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchresult: ''
        }
    }
    search = () => {
        this.setState({
            search: ''
        })
    }
    inputhandle = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    addfriendhandle = (e) => {

    }
    handlecancel = () => {

    }

    render() {
        return (<div>
            <input type="text" value={this.state.search} onChange={
                this.inputhandle
            } />
            <button onClick={this.search}>search friend</button>
            {this.state.searchresult === '' ? null : <div>
                {this.state.searchresult}
                {this.state.searchresult === 'no user founded' ? null : <div>
                    <button onClick={this.addfriendhandle}>add friend</button>
                    <button onClick={this.handlecancel}>cancel</button>
                </div>}
            </div>}
        </div>)
    }
}
export default SearchFriend