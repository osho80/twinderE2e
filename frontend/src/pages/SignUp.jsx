import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userService } from '../services/userService';
import { signup } from '../store/actions/userActions';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

class SignUp extends Component {
    state = {
        signupCred: {
            fullName: '',
            gender: '',
            city: '',
            age: '',
            email: '',
            password: '',
            imagesUrls: [],
            userPrefs: {
                minAge: '',
                maxAge: '',
                gender: '',
                city: ''
            }
        },
        msg: ''
    }
    signupHandleChange = ({ target }) => {
        const field = target.name;
        const value = (target.type === 'number' && target.value !== '') ? parseInt(target.value) : target.value;
        this.setState(prevState => ({ signupCred: { ...prevState.signupCred, [field]: value } }));
    }

    signupPrefsHandleChange = ({ target }) => {
        const field = target.name;
        const value = (target.type === 'number' && target.value !== '') ? parseInt(target.value) : target.value;

        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                userPrefs: { ...prevState.signupCred.userPrefs, [field]: value }
            }
        }));
    }

    onImgUpload = ({ target }) => {
        const files = Object.values(target.files);
        files.forEach(async (file) => {
            const img = await userService.uploadImg(file)
            this.setState(prevState => ({
                signupCred: {
                    ...prevState.signupCred, imagesUrls:
                        [...prevState.signupCred.imagesUrls, img.url]
                }
            }));
        });
    }

    doSignup = async () => {
        const { fullName, gender, city, email, age, password, imagesUrls, userPrefs } = this.state.signupCred;
        if (!fullName || !gender || !city || !email || !password || !userPrefs) {
            return this.setState({ msg: 'All inputs are required!' });
        }

        const userCreds = { fullName, gender, city, age, email, password, imagesUrls, userPrefs };

        this.props.signup(userCreds);
        this.setState({ signupCred: { fullName: '', gender: '', city: '', age: '', email: '', password: '', imagesUrls: '', userPrefs: '' } });
        this.props.history.push('/encounter');
    }

    render() {
        const { msg } = this.state;
        return (
            <div className="signup-container">
                <h1>Sign Up</h1>
                <form onSubmit={this.doSignup} className="sign-up-form flex column align-center">
                    <TextField
                        id="standard-textarea"
                        label="Full Name"
                        type="text"
                        name="fullName"
                        value={this.state.signupCred.fullName}
                        multiline
                        onChange={this.signupHandleChange}
                    />
                     <TextField
                        id="standard-number"
                        label="Age"
                        type="number"
                        name="age"
                        value={this.state.signupCred.age}
                        onChange={this.signupHandleChange}
                    />
                    <InputLabel id="demo-simple-select-label-gender">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-gender"
                        id="demo-simple-select"
                        name="gender"
                        onChange={this.signupHandleChange}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                    <InputLabel id="demo-simple-select-label-city">City</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-city"
                        id="demo-simple-select"
                        name="city"
                        onChange={this.signupHandleChange}
                    >
                        <MenuItem value="Tel-Aviv">Tel-Aviv</MenuItem>
                        <MenuItem value="Jerusalem">Jerusalem</MenuItem>
                    </Select>
                    <TextField
                        id="standard-textarea"
                        label="Email"
                        name="email"
                        type="email"
                        value={this.state.signupCred.email}
                        multiline
                        onChange={this.signupHandleChange}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        value={this.state.signupCred.password}
                        onChange={this.signupHandleChange}
                        autoComplete="current-password"
                    />
                    <input accept="image/*" id="icon-button-file" type="file" name="imagesUrls" multiple onChange={this.onImgUpload} hidden />
                    <label htmlFor="icon-button-file" className="img-upload-lable" title="Upload your images">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <h2>Prefs:</h2>
                    <TextField
                        id="standard-number"
                        label="Min-Age"
                        type="number"
                        name="minAge"
                        value={this.state.signupCred.userPrefs.minAge}
                        onChange={this.signupPrefsHandleChange}
                    />
                    <TextField
                        id="standard-number"
                        label="Max-Age"
                        type="number"
                        name="maxAge"
                        value={this.state.signupCred.userPrefs.maxAge}
                        onChange={this.signupPrefsHandleChange}
                    />
                    <InputLabel id="demo-simple-select-label-gender">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-gender"
                        id="demo-simple-select"
                        name="gender"
                        onChange={this.signupPrefsHandleChange}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                    <InputLabel id="demo-simple-select-label-city">City</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-city"
                        id="demo-simple-select"
                        name="city"
                        onChange={this.signupPrefsHandleChange}
                    >
                        <MenuItem value="Tel-Aviv">Tel-Aviv</MenuItem>
                        <MenuItem value="Jerusalem">Jerusalem</MenuItem>
                    </Select>
                    {msg && msg}
                    <Button className = "sign-up-btn" variant="contained" onClick={this.doSignup}>Signup</Button>
                </form>
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
    signup
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
