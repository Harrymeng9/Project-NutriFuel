

import React, { Component } from "react";

class Friend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newmassage: false
        }
    }
    changestate = (e) => {
        console.log(e.target.innerHTML)
        this.props.statHandler(e.target.innerHTML)
    }
    render() {
        return <li>{this.props.friend}
            <button onClick={this.changestate}>compete</button>
            <button onClick={this.changestate}>chat</button></li>
    }
}

export default Friend