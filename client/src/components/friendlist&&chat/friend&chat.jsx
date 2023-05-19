import React, { Component } from "react";
import Chat from "./chat.jsx";
import FriendList from "./friendlist.jsx";
import Navigation from '../navigation/navigation.jsx';



class FriendNChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stat: 'friendlist',
            recipient: ''
        }
    }
    componentDidMount() {
        // this.props.resetNewMessage()
        this.props.turnoffnotification(false)
        this.props.otherpage(false)
    }
    componentDidUpdate(prevProps) {
    }
    statHandler = (stat) => {
        stat = stat === 'BACK' ? 'friendlist' : stat
        this.setState({
            stat: stat
        })
    }
    setrecipient = (recipient) => {
        this.setState({
            recipient: recipient
        })
    }
    // function goToDashboardPage() {
    //     navigate('/');
    //   };  const navigate = useNavigate();
    backtodashboard = () => {
        this.props.backtomain('/')
        this.props.otherpage(true)
        this.props.turnoffnotification(false)
    }
    render() {
        return (
            <div>
                {this.state.stat === 'friendlist' ? <FriendList setrecipient={this.setrecipient} statHandler={this.statHandler} newMessage={this.props.newMessage} userInfo={this.props.userInfo} /> : null}
                {this.state.stat === 'chat' ? <Chat resetNewMessage={this.props.resetNewMessage} newMessage={this.props.newMessage} recipient={this.state.recipient} userInfo={this.props.userInfo} turnoffnotification={this.props.turnoffnotification} /> : null}
                {/* {this.state.stat === 'compete' ? <Competition /> : null} */}
                {this.state.stat === 'friendlist' ? null : <button onClick={(e) => {
                    this.statHandler(e.target.innerHTML)
                }}>BACK</button>}
                <Navigation userInfo={this.props.userInfo} auth={this.props.auth} />
            </div>
        )
    }
}
export default FriendNChat