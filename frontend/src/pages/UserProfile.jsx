import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, login, loadUsers, loadUser, addReaction, updateLoggedInUser, addImgProfile } from '../store/actions/userActions.js';
import { About } from '../cmps/About'
import { PostList } from '../cmps/PostList'
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { userService } from '../services/userService.js';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


class UserProfile extends Component {

    state = {
        isMyProfile: '',
        isLike: '',
        showModal: false
    }


    componentDidMount() {
        this.getUser();
    }


    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.getUser();
        }
    }

    onAddphoto = async ({ target }) => {
        const files = Object.values(target.files);
        files.forEach(async (file) => {
            const img = await userService.uploadImg(file)
            this.props.addImgProfile(this.props.loggedInUser._id, img.url);
        });
    }

    getUser = () => {
        const { id } = this.props.match.params;
        if (id) {
            this.setState({ isMyProfile: false })
            this.props.loadUser(id)
        }
        else {
            this.setState({ isMyProfile: true });
        }
    }

    onShowModal = (action) => {
        this.setState({ showModal: action })
    }

    onReaction = (reaction) => {
        const { id } = this.props.match.params;
        const targetUserId = id;
        this.props.addReaction(this.props.loggedInUser._id, targetUserId, reaction)
        this.isLike(reaction)
    }


    isLike = (reaction) => {
        if (reaction !== 'like') this.props.history.push('/gallery');
    }

    render() {
        const { loggedInUser } = this.props
        const { isMyProfile } = this.state
        const user = isMyProfile ? loggedInUser : this.props.user;
        const gendersrc = (user.gender === 'male') ? '../assets/images/male.png' : "../assets/images/female.png"

        return (
            (!user) ? <div>Loding</div> :
                <section className="page flex justify-center align-center">
                    <section className="user-profile-page flex justify-center align-center">
                        <section className="user-profile flex align-center ">
                            <div className="main-section flex justify-center column">
                                <Carousel>
                                    {user.imagesUrls.map((img, idx) => {
                                        return (
                                            <img key={idx} src={img} alt="no-img" />
                                        )
                                    })}
                                </Carousel>
                                <div className="btn-section flex justify-center align-center">
                                    {!isMyProfile && <div className="btn-display flex  justify-around  align-center ">
                                        <img className="pass" src='../assets/images/new-x.png' alt="" onClick={() => this.onReaction('dislike')} />
                                        <img className="love" src='../assets/images/heart-circle-pinkier.png' alt="" onClick={() => this.onReaction('like')} />
                                    </div>}

                                </div>
                            </div>
                            <section className="details-area  flex  justify-start  column">

                                <div className="user-detils flex justify-start align-center ">
                                    <div>{user.fullName}</div>
                                    <img className=" gender" src={gendersrc} />
                                    <div>{user.age} from  {user.city}</div>
                                </div>
                                <div className="preferences">My Posts</div>
                                {(!user) ? <div>No posts to show  </div> : <PostList user={user} />}

                                <div className="preferences">Preferences</div>
                                <div className="about"><About user={user} /></div>
                                {isMyProfile && <div className="user-btns flex">
                                    <div className="edit-btn" title="Edit Profile">
                                        <img className="edit-profile" src='../assets/images/edit-profile-pinkish.png' alt="" onClick={() => this.props.history.push('/editprofile')} />
                                    </div>
                            
                            
                                    <div className="addPhoto-btn">
                                        <input accept="image/*" id="icon-button-file" type="file" name="profileImg" multiple onChange={this.onAddphoto} hidden />
                                        <label htmlFor="icon-button-file" className="img-upload-lable" title="Upload image">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera />
                                            </IconButton>
                                        </label>
                                    </div>
                            
                                </div>}
                            </section>
                        </section>
                    </section >
                </section>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        user: state.userStore.currUser,
        loggedInUser: state.userStore.loggedInUser
    };
};

const mapDispatchToProps = {
    loadUsers,
    loadUser,
    updateUser,
    login,
    addReaction,
    updateLoggedInUser,
    addImgProfile
};

export default UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfile);



