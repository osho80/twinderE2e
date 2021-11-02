import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeChat } from '../store/actions/matchActions';

class Home extends Component {
  componentDidMount() {
    this.props.closeChat();
  }

  render() {
    return (
      <section className="home-page">
        <article className="main-header flex align-center column">
          <h2>Post Your Love</h2>
          <h2>Find Your Match</h2>
        </article>
        <article className="action-call">
          <h3>Signup and join our incredible community</h3>
          <h3>thousands of amazing people are just a click away...</h3>
          {/* <h3>Signup and begin an exciting journey</h3>
        <h3>and meet thousands of amazi</h3> */}
        </article>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userStore.currUser,
    loggedUser: state.userStore.loggedInUser
  }
}

const mapDispatchToProps = {
  closeChat
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


