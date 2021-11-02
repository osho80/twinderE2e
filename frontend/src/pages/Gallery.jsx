import React, { Component } from 'react';
import { UserPreview } from '../cmps/UserPreview';
import { connect } from 'react-redux';
import { loadUsers } from '../store/actions/userActions';
import {closeChat} from '../store/actions/matchActions';



class Gallery extends Component {
    
    componentDidMount() { 
        const { loggedInUser } = this.props;
        if (!loggedInUser) return this.props.history.push('/login');
        this.props.loadUsers(loggedInUser.userPrefs);
        
        if (this.props.match) this.props.closeChat();
    }


    render() {
        const { users, history } = this.props;
        return (
            (!users) ? 'Loading...' : <section className="gallery-container">
                {users.map((user, idx) => <UserPreview key={idx} user={user} history = {history} />)}
            </section>
        )
    }
}   


const mapStateToProps = (state) => {
    return {
        users: state.userStore.users,
        loggedInUser: state.userStore.loggedInUser,
        match: state.matchStore.currMatch
    }
}

const mapDispatchToProps = {
    loadUsers,
    closeChat
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
