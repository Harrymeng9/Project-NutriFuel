import React from "react";
import { Component } from "react";

class SearchFriend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
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

    render() {
        return (<div>
            <input type="text" value={this.state.search} onChange={
                this.inputhandle
            } />
            <button onClick={this.search}>search friend</button>
        </div>)
    }
}
export default SearchFriend