import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketService from '../services/socketService';
import { loadMatches, addMsg, loadMatch, closeChat } from '../store/actions/matchActions';
import { getTimeDate } from '../services/utilService';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';


class Chat extends Component {

    constructor(props) {
        super(props);
        this.myChat = React.createRef();
    }

    state = {
        isChatVisible: true,
        msgTxt: '',
        isEmojiesShown: false,
        emojis: []
    }

    componentDidMount() {
        if (this.props.match) {
            this.props.loadMatch(this.props.match._id);
        }
    }

    componentDidUpdate() {
        if (this.myChat.current) {
            this.myChat.current.scrollIntoView();
        }
    }

    onHandleMsgChange = ({ target }) => {
        this.setState({ msgTxt: target.value });
    }


    onSendMsg = async () => {
        const { loggedInUser } = this.props;
        const { msgTxt } = this.state;
        const { match } = this.props;
        await this.props.addMsg(loggedInUser, msgTxt, match._id);
        const targetUserId = this.targetUser.id;
        this.setState({ msgTxt: '' });
        socketService.emit('chat newMsg', { targetUserId });
    }

    onClickHideChat = () => {
        this.setState(prevState => ({ isChatVisible: !prevState.isChatVisible }));
    }

    onClickCloseChat = () => {
        this.props.closeChat();
    }

    get targetUser() {
        const { match, loggedInUser } = this.props;
        for (let key in match) {
            if (key === 'user1' || key === 'user2') {
                if (match[key].id !== loggedInUser._id) {
                    return match[key];
                }
            }
        }
        return null;
    }

    getTimeDate = (timeStamp) => {
        return getTimeDate(timeStamp);
    }

    handleKeyPress = (ev) => {
        if (ev.key === 'Enter') {
            this.onSendMsg();
        }
    }

    onClickEmojiBtn = () => {
        this.setState(prevState => ({ isEmojiesShown: !prevState.isEmojiesShown }));
    }

    addEmoji = (ev) => {
        let sym = ev.unified.split('-');
        let codesArray = [];
        sym.forEach(el => codesArray.push('0x' + el));
        let emoji = String.fromCodePoint(...codesArray);
        this.setState({
            msgTxt: this.state.msgTxt + emoji
        });
    }


    render() {
        const { loggedInUser } = this.props;
        const match = loggedInUser ? this.props.match : '';
        const { isChatVisible, msgTxt, isEmojiesShown } = this.state;
        return (
            (!match) ? '' : <section className="chat flex column space-between">
                <div className="chat-header flex space-between">
                    <div className="chat-header-user-info">
                        <img className="mini-img" src={this.targetUser.imageUrl} alt="" />
                        {this.targetUser.name}
                    </div>
                    <div className="chat-header-btns">
                        <button className="hide-chat-btn" onClick={this.onClickHideChat} >-</button>
                        <button className="close-chat-btn" onClick={this.onClickCloseChat}>X</button>
                    </div>
                </div>
                {isChatVisible && <div className="chat-content flex column align-center space-between justify-end">
                    <ul className="chat-msgs">
                        {(!match.msgs.length) ? '' : match.msgs.map((msg, idx) => {
                            return <li key={idx} className={msg.userId === loggedInUser._id ? 'my-msg' : 'targetUser-msg'}>
                                <div className="msg-info flex space-between align-center">
                                    {msg.userId === loggedInUser._id ? <img className="mini-img" src={loggedInUser.imagesUrls[0]} alt="" />
                                        : <img className="mini-img" src={this.targetUser.imageUrl} alt="no-img" />}
                                    {this.getTimeDate(msg.createdAt)}
                                </div>
                                <p className={`${idx}`}>{msg.txt}</p>
                            </li>
                        })}
                        <div ref={this.myChat} />
                    </ul>
                </div>}
                {isChatVisible && <div className="chat-footer flex column">
                    <section className="chat-inputs" onKeyPress={this.handleKeyPress}>
                        <TextField
                            className="msg-input"
                            id="standard-textarea"
                            placeholder="Type a message"
                            onChange={this.onHandleMsgChange}
                            value={msgTxt}
                            multiline
                        />
                        <span className = "emoji-btn" onClick={this.onClickEmojiBtn}>&#128515;</span>
                        {isEmojiesShown && <Picker style={{ position: 'absolute', bottom: '65px', right: '10px' }}
                            onSelect={this.addEmoji} showPreview={false} title="Twinder" />}
                        <Button variant="contained" className="sendMsg-btn" onClick={this.onSendMsg}>Send</Button>
                    </section>
                </div>}
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        match: state.matchStore.currMatch,
        loggedInUser: state.userStore.loggedInUser,
    }
}

const mapDispatchToProps = {
    addMsg,
    loadMatches,
    loadMatch,
    closeChat
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
