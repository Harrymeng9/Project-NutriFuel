import React, { Component } from "react";
import Chat from "./chat.jsx";
import FriendList from "./friendlist.jsx";
import Navigation from '../navigation/navigation.jsx';
import { border, Box } from "@mui/system";
import { Button } from "@mui/material";



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
            <Box sx={{ width: '100%', border: 'none', backgroundColor: 'white' }}>
                {this.state.stat === 'friendlist' ? <FriendList setrecipient={this.setrecipient} statHandler={this.statHandler} newMessage={this.props.newMessage} userInfo={this.props.userInfo} /> : null}
                {this.state.stat === 'chat' ? <Chat resetNewMessage={this.props.resetNewMessage} newMessage={this.props.newMessage} recipient={this.state.recipient} userInfo={this.props.userInfo} turnoffnotification={this.props.turnoffnotification} /> : null}
                {this.state.stat === 'friendlist' ? null : <Button variant="outlined" sx={{ width: '100%', marginTop: '60px' }} onClick={(e) => {
                    this.statHandler('BACK')
                }}>BACK</Button>}
                <Navigation userInfo={this.props.userInfo} auth={this.props.auth} />
            </Box>
        )
    }
}
export default FriendNChat