import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadMatches, loadMatch, openMatch } from '../store/actions/matchActions';
import { logout, loadUsers, loadUser, addPost, setLoggedinUser, activeBgScreen, closeBgScreen } from '../store/actions/userActions';
import { MatchList } from '../cmps/MatchList';
import socketService from '../services/socketService';
import { userService } from '../services/userService';


class Navbar extends Component {
    state = {
        isProfileBtnActive: false,
        isMatchBtnActive: false,
        isAddPostActive: false,
        view: 'encounter',
        isEncounter: true,
        isNewMatch: null,
        //isBackAddPostShown: false

    }

    componentDidMount() {
        if (this.props.loggedInUser) {
            this.setUpNavbar();
        }


    }

    componentDidUpdate(prevProps) {
        if (this.props.loggedInUser !== prevProps.loggedInUser && this.props.loggedInUser && !prevProps.loggedInUser) {
            this.setUpNavbar();
        }
        
        

    }

    setUpNavbar = async () => {
        const updatedUser = await userService.getById(this.props.loggedInUser._id)
        socketService.runSockets(updatedUser);
        this.props.setLoggedinUser(updatedUser);
        this.props.loadMatches(this.props.loggedInUser._id);
        socketService.on('new match', (match) => {
            this.props.loadMatches(this.props.loggedInUser._id);
            this.onNewMatch(match);
        });
        socketService.on('new msg', () => {
            this.props.loadMatch(this.props.match._id);
        });
        socketService.on('post added', ({ userId }) => {
            this.props.loadUser(userId);
        });
    }

    onNewMatch = (match) => {
        console.log('Matched made in heaven...', match);
        let matchName = this.getMatchName(match)
        console.log('Matched made with...', matchName);
        this.setState({ isNewMatch: matchName })
        setTimeout(() => {
            this.setState({ isNewMatch: null })

        }, 1200)

    }

    onClickGoHomePage = () => {
        //this.setState({ isBackAddPostShown: false })
        this.props.history.push('/')
    }

    onClickProfileBtn = () => {
        this.setState(prevState => ({ isProfileBtnActive: !prevState.isProfileBtnActive, isMatchBtnActive: false }));
        
    }

    onClickMatchBtn = () => {
        this.setState(prevState => ({ isMatchBtnActive: !prevState.isMatchBtnActive, isProfileBtnActive: false }));
    }

    onToggleView = () => {
        let { isEncounter } = this.state;
        //this.setState({ isBackAddPostShown: true })

        if (isEncounter) {
            this.props.history.push('/gallery');
            this.setState({ isEncounter: false })
        } else {
            this.props.history.push('/encounter');
            this.setState({ isEncounter: true })
        }
    }

    onOpenMatchChat = (matchId) => {
        if (window.location.pathname === '/gallery') return;
        this.setState({ isMatchBtnActive: false });
        this.props.openMatch(this.props.loggedInUser._id, matchId);
        this.props.loadMatch(matchId);
    }

    onAddPostBtn = () => {
        this.setState(prevState => ({ isAddPostActive: !prevState.isAddPostActive }), () => {
            if (window.location.pathname === '/addpost') this.props.history.push('/profile')
            else this.props.history.push('/addpost');
        })
    }

    onOpenMyProfile = () => {
        this.setState({ isProfileBtnActive: false}); //isBackAddPostShown: true 
    }

    onLogOut = () => {
        this.props.logout();
        this.setState({ isProfileBtnActive: false });
    }

    get matchCnt() {
        const { matches, loggedInUser } = this.props;
        return matches.reduce((acc, match) => {
            if (match.user1.id === loggedInUser._id) {
                acc = match.user1.isOpenNotification ? acc : acc + 1;
            } else {
                acc = match.user2.isOpenNotification ? acc : acc + 1;
            }
            return acc;
        }, 0);
    }

    getMatchName = (match) => {
        const { loggedInUser } = this.props;
        let matchName;
        for (let key in match) {
            if (key === 'user1') {
                if (match[key].name !== loggedInUser.fullName) matchName = matchName = match[key].name;
            } else if (key === 'user2') {
                if (match[key].name !== loggedInUser.fullName) matchName = match[key].name;
            }
        }
        return matchName;
    }

    onGoLogin = (value) => {
        //console.log('value: ', value);
        //this.setState({ isBackAddPostShown: true })
        this.props.history.push(`/${value}`)
    }

    render() {
        const { matches, loggedInUser } = this.props;
        const { isProfileBtnActive, isMatchBtnActive, isEncounter, isNewMatch } = this.state;
        return (
            <section className="navbar flex space-between align-center">
                <div className="logo" onClick={this.onClickGoHomePage}>
                    T<span>w</span>inder
                </div>
                {!loggedInUser && <div className="nav-login flex justify-end align-center">
                    <img className="get-started-btn" title="Get Started" src='../assets/images/get-started2.png' alt="" onClick={() => this.onGoLogin('encounter')} />
                    <img className="login-btn" title="Login / Signup" src='../assets/images/login7.png' alt="" onClick={() => this.onGoLogin('login')} />
                    {/* <Link to="/encounter" className="nav-link link">Get Started</Link>
                    <Link to="/login" className="nav-link link">Login/SignUp</Link> */}
                </div>}
                {loggedInUser && <div className="navbar-nav flex space-between">
                    {(window.location.pathname !== '/') && <img className="add-post-btn2" title="Add Post" src='../assets/images/add3.png' alt="" onClick={this.onAddPostBtn} />}
                    {isEncounter && <img className="nav-gallery-btn" src='../assets/images/gallery-icon.png' alt="" onClick={this.onToggleView} />}
                    {!isEncounter && <img className="nav-encounter-btn" src='../assets/images/playing_cards.png' alt="" onClick={this.onToggleView} />}
                    <div className="option-btn flex space-between">
                        <article>
                            <img className="nav-match-btn" src={(this.matchCnt > 0) ? '../assets/images/match-full.png' : '../assets/images/match.png'} alt="" onClick={this.onClickMatchBtn} />
                            {(this.matchCnt > 0) && <span title="New matches!" className="match-count">{this.matchCnt} </span>}
                            {isMatchBtnActive && matches.length && <MatchList matches={matches} loggedInUser={loggedInUser} onOpenMatch={this.onOpenMatchChat} />}
                        </article>
                        <button className="nav-profile-btn" onClick={this.onClickProfileBtn} >
                            <img className="mini-img" src={loggedInUser.imagesUrls[0]} alt="" />
                        </button>
                        {isProfileBtnActive && <div className="profile-dropdown navbar-modal flex column align-center">
                            <img className="arrow-menu" src="../assets/images/menu-arrow.png" alt="" />
                            <Link to={`/profile`} className="link" onClick={this.onOpenMyProfile}>Profile</Link>
                            <Link to={`/`} className="link" onClick={this.onLogOut}>Logout</Link>
                            <Link to="/about" className="navbar-about link">About</Link>
                        </div>}
                    </div>
                    {loggedInUser && (window.location.pathname !== '/') && <img className="go-back-btn" src='../assets/images/go-back3.png' alt="" onClick={() => this.props.history.goBack()} />}

                </div>}
                {isNewMatch && <div className="new-match">
                    <h2>NEW MATCH WITH </h2>
                    <h2>{isNewMatch}</h2>
                    <h3>Start chatting and discover someone new</h3>
                </div>}
            </section>
        )
    }
}

// {isNewMatch && <div className="new-match">
//                     <div className="new-match-img">
//                     </div> 
//                     <div className="new-match-txt">
//                         <h2>NEW MATCH WITH </h2>
//                         <h2>{isNewMatch}</h2>
//                         <h3>Start chatting and get acquainted</h3>
//                             {/* discover a new world */}
//                     </div>
//                 </div>}

const mapStateToProps = (state) => {
    return {
        matches: state.matchStore.matches,
        match: state.matchStore.currMatch,
        newMatchCnt: state.matchStore.newMatchCnt,
        users: state.userStore.users,
        loggedInUser: state.userStore.loggedInUser
    }
}

const mapDispatchToProps = {
    loadMatches,
    loadMatch,
    addPost,
    loadUsers,
    loadUser,
    setLoggedinUser,
    logout,
    openMatch,
    activeBgScreen,
    closeBgScreen
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
