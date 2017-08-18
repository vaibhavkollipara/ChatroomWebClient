import React, { Component } from 'react';

import {Provider} from 'react-redux';

import store from '../store';

import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Test from './Test';
import Chatroom from './Chatroom';
import '../styles/Mystyles.css';

import { BrowserRouter, Route } from 'react-router-dom'

const AppNav = () =>{
      return(
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route path="/test/:id" component={Test}/>
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
