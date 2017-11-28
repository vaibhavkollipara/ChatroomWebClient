import React, { Component } from 'react';

import {Provider} from 'react-redux';

import store from './store';

import Login from './containers/Login';
import Signup from './containers/Signup';
import Home from './containers/Home';
import Chatroom from './containers/Chatroom';
import './styles/mystyles.scss';

import { BrowserRouter, Route } from 'react-router-dom'

const AppNav = () =>{
      return(
        <BrowserRouter>
            <div className="App">
                <Route exact path="/" component={Home}/>
                <Route exact path="/chatroom" component={Chatroom}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/login" component={Login} />
            </div>
        </BrowserRouter>
      );
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNav />
      </Provider>
    );
  }
}
