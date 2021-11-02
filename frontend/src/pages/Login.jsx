import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { login, logout, signup, loadUsers } from '../store/actions/userActions';
import { loadMatches } from '../store/actions/matchActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Login extends Component {
    state = {
        loginCred: {
            email: 'johns@gmail.com',
            password: 'j1234'
        },
        msg: ''
    }

    loginHandleChange = ({ target }) => {
        const field = target.name;
        const value = (target.type === 'number') ? parseInt(target.value) : target.value;
        this.setState(prevState => ({ loginCred: { ...prevState.loginCred, [field]: value } }));
    }

    handleKeyPress = (ev) => {
        if (ev.key === 'Enter') {
            this.doLogin();
        }
    }

    doLogin = async () => {
        const { email, password } = this.state.loginCred;
        if (!email || !password) {
            return this.setState({ msg: 'Please enter user/password' });
        }
        const userCreds = { email, password };
        await this.props.login(userCreds);
        await this.props.loadMatches(this.props.loggedInUser._id);
        this.props.history.push('/encounter');
    }

    render() {
        const { msg } = this.state;
        return (
            <div className="login-container">
                <h1>Login</h1>
                <section className="login-form flex column align-center" onKeyPress={this.handleKeyPress}>
                    <TextField
                        id="standard-textarea"
                        label="Email"
                        name="email"
                        value={this.state.loginCred.email}
                        multiline
                        onChange={this.loginHandleChange}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        value={this.state.loginCred.password}
                        onChange={this.loginHandleChange}
                        autoComplete="current-password"
                    />
                    {msg && msg}
                    <Link to="/signup" className="sign-up-link">New Member? Sign up</Link>
                    <Button variant="contained" onClick={this.doLogin}>Login</Button>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.userStore.users,
        loggedInUser: state.userStore.loggedInUser,
    }
}

const mapDispatchToProps = {
    login,
    logout,
    signup,
    loadUsers,
    loadMatches
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
