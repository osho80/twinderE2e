import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { addPost } from '../store/actions/userActions';
import Button from '@material-ui/core/Button';
import { Picker } from 'emoji-mart';


class AddPost extends Component {
    state = {
        newPostTxt: '',
        isEmojiesShown: false
    }

    handelPostChange = ({ target }) => {
        this.setState({ newPostTxt: target.value });
    }

    onAddPost = (ev) => {
        ev.preventDefault();
        const { newPostTxt } = this.state;
        const { loggedInUser } = this.props;
        this.props.addPost(loggedInUser._id, newPostTxt);
        this.props.history.goBack();
    }

    onClickEmojiBtn = () => {
        this.setState(prevState => ({ isEmojiesShown: !prevState.isEmojiesShown }));
    }

    addEmoji = (ev) => {
        console.log('entered')
        let sym = ev.unified.split('-');
        let codesArray = [];
        sym.forEach(el => codesArray.push('0x' + el));
        let emoji = String.fromCodePoint(...codesArray);
        this.setState({
            newPostTxt: this.state.newPostTxt + emoji
        });
    }


    render() {
        const { isEmojiesShown, newPostTxt } = this.state;
        return (
            (!this.props.loggedInUser) ? '' : <section className="add-post flex column">
                <h1>Add Post</h1>
                <TextField
                    id="filled-multiline-static"
                    className="textarea"
                    label="Post"
                    multiline
                    rows={10}
                    value={newPostTxt}
                    placeholder={`What is on your mind ${this.props.loggedInUser.fullName}`}
                    variant="filled"
                    onChange={this.handelPostChange}
                />
                <span className="emoji-btn" onClick={this.onClickEmojiBtn}>&#128515;</span>
                {isEmojiesShown && <Picker onSelect={this.addEmoji} showPreview={false} title="Twinder" />}
                <Button className="post-btn" variant="outlined" color="primary" onClick={this.onAddPost}>
                    Post
                    </Button>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.userStore.loggedInUser
    }
}

const mapDispatchToProps = {
    addPost
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);