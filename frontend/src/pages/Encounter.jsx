import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hammer from 'react-hammerjs';
import { updateUser, login, loadUser, loadUsers, addReaction } from '../store/actions/userActions.js';




class Encounter extends Component {

    state = {
        currProfileIdx: 0,
        imgIdx: 0,
        numOfProfiles: null,
        isRight: false,
        isLeft: false
    }

    componentDidMount() {
        const { loggedInUser } = this.props;
        if (!loggedInUser) return this.props.history.push('/login');
        this.props.loadUsers(loggedInUser.userPrefs);
    }

    setEncounter() {
        let { currProfileIdx } = this.state;
        if (this.state.currProfileIdx === this.props.users.length - 1) {
            this.setState({ imgIdx: 0, currProfileIdx: 0 })
        } else {

            this.setState({ imgIdx: 0, currProfileIdx: ++currProfileIdx })
        }
    }



    onPrevImg = () => {
        const { users } = this.props;
        let { imgIdx, currProfileIdx } = this.state
        const i = users[currProfileIdx].imagesUrls.length
        if (imgIdx <= 0) imgIdx = (i - 1)
        else --imgIdx
        this.setState({ imgIdx })
    }

    onNextImg = () => {
        let { imgIdx, currProfileIdx } = this.state
        const { users } = this.props
        if (imgIdx >= users[currProfileIdx].imagesUrls.length - 1) imgIdx = 0
        else imgIdx++

        this.setState({ imgIdx })
    }

    onReaction = (reaction) => {
        const { users } = this.props
        const { currProfileIdx } = this.state
        let targetUser = users[currProfileIdx]
        this.props.addReaction(this.props.loggedInUser._id, targetUser._id, reaction)

        this.setEncounter();


    }


    onViewProfile = () => {
        const { currProfileIdx } = this.state;
        const { users } = this.props;
        this.props.history.push(`/profile/${users[currProfileIdx]._id}`)
    }

    get currUser() {
        return this.props.users[this.state.currProfileIdx]
    }

    handleSwipe = (ev) => {
        const { users } = this.props
        const { currProfileIdx } = this.state
        let targetUser = users[currProfileIdx]
        if (ev.deltaX > 100) {
            this.props.addReaction(this.props.loggedInUser._id, targetUser._id, 'like')
            this.setState({ isRight: true })
        }
        if (ev.deltaX < -100) {
            this.props.addReaction(this.props.loggedInUser._id, targetUser._id, 'dislike')
            this.setState({ isLeft: true })
        }
        setTimeout(() => {
            this.setState({ isRight: false, isLeft: false })
            this.setEncounter();
        }, 800)
    }

    render() {
        const { currProfileIdx, imgIdx, isRight, isLeft } = this.state;
        const { users } = this.props;
        return (!users.length) ? <h3>Loading.... </h3> :

            <section className="encounter-display">
                <div className="enc-action-zone">
                    <div className="enc-nav-btns">
                        <img className="enc-right-btn" src='../assets/images/next.png' alt="" onClick={this.onNextImg} />
                        <img className="enc-left-btn" src='../assets/images/next.png' alt="" onClick={this.onPrevImg} />

                    </div>
                    <Hammer onSwipe={this.handleSwipe}>
                        <div className="top card flex">
                            {isRight && <span className="reaction yeah">YEAP</span>}
                            {isLeft && <p className="reaction nope">NOPE</p>}
                            <img className={`currCard ${isRight ? 'right' : ''} ${isLeft ? 'left' : ''}`} src={`${users[currProfileIdx].imagesUrls[imgIdx]}`} alt={`${users[currProfileIdx].fullName}`} />
                        </div>
                    </Hammer>
                    <div className="enc-yesno-btns">
                        <img className="love" src='../assets/images/heart-circle-pinkier.png' alt="" onClick={() => this.onReaction('like')} />
                        <img className="pass" src='../assets/images/new-x.png' alt="" onClick={() => this.onReaction('dislike')} />

                    </div>
                    {(users[currProfileIdx + 1] === undefined) ? '' :
                        <div className="bottom card">
                            <img src={`${users[currProfileIdx + 1].imagesUrls[imgIdx]}`} alt={`${users[currProfileIdx + 1].fullName}`} />
                        </div>}


                </div>
                <section className="encounter-profile-section flex justify-center align-start column">
                    <div className="encounter-profile-overview">
                        <div className="enc-profile-basics">
                            <h2>{users[currProfileIdx].fullName}, {users[currProfileIdx].age} </h2>
                            <h3>{users[currProfileIdx].city}</h3>
                        </div>


                    </div>

                    {(!this.currUser.posts.length) ? '' : <div className="enc-post">
                        <h4>{this.currUser.posts[0].txt}</h4>
                    </div>}
                    <div className="enc-view-profile">
                        <img title="View Profile" src='../assets/images/view-profile-pinkish.png' alt="" onClick={this.onViewProfile} />
                    </div>
                    {/* <button className="enc-view-profile-btn" onClick={this.onViewProfile}>View Profile</button> */}
                </section>
            </section>

    }
}



const mapStateToProps = (state) => {
    return {
        user: state.userStore.currUser,
        users: state.userStore.users,
        loggedInUser: state.userStore.loggedInUser
    };
};

const mapDispatchToProps = {
    loadUser,
    loadUsers,
    login,
    updateUser,
    addReaction
};

export default connect(mapStateToProps, mapDispatchToProps)(Encounter);