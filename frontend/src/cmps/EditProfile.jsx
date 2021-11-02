import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, updateLoggedInUser } from '../store/actions/userActions.js';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';


class EditProfile extends Component {

    state = {
        user: {
            _id: '',
            age: '',
            city: '',
            email: '',
            fullName: '',
            gender: '',
            imagesUrls: '',
            isAdmin: '',
            isBlock: '',
            joinedAt: '',
            password: '',
            posts: '',
            reactions: '',
            userPrefs: ''
        }
    }

    componentDidMount() {
        const user = this.props.loggedUser;
        this.setState({ user });
    }

    handleChange = (ev) => {

        let { name, value } = ev.target;
        value = ev.target.type === 'number' ? parseInt(value) : value;
        this.setState(prevState => {
            return {
                user: {
                    ...prevState.user,
                    [name]: value
                }
            }
        })
    }


    handleFormChange = (ev) => {

        let { name, value } = ev.target;
        value = ev.target.type === 'number' ? parseInt(value) : value;
        this.setState(prevState => {
            return {
                user: {
                    ...prevState.user,
                    userPrefs: {
                        ...prevState.user.userPrefs,
                        [name]: value
                    }
                }
            }
        })
    }


    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.updateUser(this.state.user);
        this.props.updateLoggedInUser(this.state.user);
        this.props.history.push('/profile');
    }


    render() {
        const { age, city, email, fullName, gender, password, userPrefs, _id } = this.state.user;

        return (

            <div className="edit-profile flex column">
                <h2> Edit your details</h2>
                {_id && <section className="edit-profile-form flex column align-center">
                    <TextField
                        id="standard-textarea"
                        label="Full Name"
                        type="text"
                        name="fullName"
                        value={fullName}
                        multiline
                        onChange={this.handleChange}
                    />
                    <InputLabel id="demo-simple-select-label-gender">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-gender"
                        id="demo-simple-select"
                        name="gender"
                        value={gender}
                        onChange={this.handleChange}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                    <TextField
                        id="standard-number"
                        label="Age"
                        type="number"
                        name="age"
                        value={age}
                        onChange={this.handleChange}
                    />
                    <InputLabel id="demo-simple-select-label-city">City</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-city"
                        id="demo-simple-select"
                        name="city"
                        value={city}
                        onChange={this.handleChange}
                    >
                        <MenuItem value="Tel-Aviv">Tel-Aviv</MenuItem>
                        <MenuItem value="Jerusalem">Jerusalem</MenuItem>
                    </Select>
                    <TextField
                        id="standard-textarea"
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        multiline
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="standard-textarea"
                        label="New-Password"
                        name="password"
                        type="password"
                        value={password}
                        multiline
                        onChange={this.handleChange}
                    />
                    {/* <label>
                        Posts:
                        {posts.map((post, idx) => {
                        return <TextField
                            key={idx}
                            id="outlined-multiline-static"
                            label="Post"
                            name="posts"
                            type="text"
                            value={post.txt}
                            multiline
                            onChange={this.handleChange}
                            variant="outlined"
                        /> */}
                    {/* // return <input type="text" key={idx} name="posts" value={post.txt} */}
                    {/* //     onChange={this.handleChange} placeholder={post.txt} /> */}
                    {/* // })} */}
                    {/* </label> */}
                    <h3 className="preference-header"> My Preference</h3>
                    <InputLabel id="demo-simple-select-label-city">City</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-city"
                        id="demo-simple-select"
                        name="city"
                        value={userPrefs.city}
                        onChange={this.handleFormChange}
                    >
                        <MenuItem value="Tel-Aviv">Tel-Aviv</MenuItem>
                        <MenuItem value="Jerusalem">Jerusalem</MenuItem>
                    </Select>
                    <InputLabel id="demo-simple-select-label-gender">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-gender"
                        id="demo-simple-select"
                        name="gender"
                        value={userPrefs.gender}
                        onChange={this.handleFormChange}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                     <TextField
                        id="standard-number"
                        label="Max-Age"
                        type="number"
                        name="maxAge"
                        value={userPrefs.maxAge}
                        onChange={this.handleFormChange}
                    />
                     <TextField
                        id="standard-number"
                        label="Min-Age"
                        type="number"
                        name="minAge"
                        value={userPrefs.minAge}
                        onChange={this.handleFormChange}
                    />
                    <Button variant="contained" onClick={this.handleSubmit}>
                        Save
                    </Button>
                </section>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.userStore.loggedInUser
    }
}

const mapDispatchToProps = {
    updateUser,
    updateLoggedInUser
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);



