import React from 'react';
import { Router, Switch, Route } from 'react-router';
import history from './history';
import './styles/global.scss';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { About } from './pages/About';
import Gallery from './pages/Gallery';
import Encounter from './pages/Encounter';
import { Dashboard } from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import Navbar from './cmps/NavBar';
import Chat from './cmps/Chat';
import AddPost from './cmps/AddPost';
import EditProfile from './cmps/EditProfile';
import { Footer } from './cmps/Footer';



function App() {
  return (
    <div className="app">
      <Router history={history}>
        <Navbar history={history} />
        <section className='main-container'>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={SignUp} exact />
            <Route path="/encounter" component={Encounter} exact />
            <Route path="/gallery" component={Gallery} exact />
            <Route path="/admin/dash" component={Dashboard} exact />
            <Route path="/profile/:id?" component={UserProfile} exact />
            <Route path="/addpost" component={AddPost} exact />
            <Route path="/editprofile" component={EditProfile} exact />
          </Switch>
          <Chat />
        </section>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
