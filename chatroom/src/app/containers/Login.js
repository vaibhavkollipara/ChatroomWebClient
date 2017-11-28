import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';


import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom';

import * as loginActions from '../actions/LoginActions';
import * as userActions from '../actions/UserActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import Transition from '../components/Transition';
import LoginForm from '../components/LoginForm';

const portalContainer = document.getElementById('modal-root');

class Login extends Component {

    constructor(){
        super();
        this.state = {
            token  : null,
            error : null,
            loading : false,
            username: "",
            password: "",
            width : 0
        };
    }

    navigateToHome(){
        this.props.history.push('/');
    }

    componentDidMount(){
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    componentWillMount(){
        let token = sessionStorage.getItem("token");
        if(token!==null && token!==""){
            this.navigateToHome();
        }
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    componentWillReceiveProps(nextProps) {
          if (nextProps.login !== this.props.login) {
            this.setState({
                token : nextProps.login.token,
                error : nextProps.login.error,
                loading : nextProps.login.loading
            });
          }
          if(nextProps.login.token!==null){
            this.props.saveToken(nextProps.login.token);
            // sessionStorage.setItem("token",nextProps.login.token);
            this.navigateToHome();
        }
    }

    updateWindowDimensions() {
      this.setState({ width: window.innerWidth});
    }

    usernameUpdateHandler(e){
      this.setState({
        username : e.target.value
      });
    }

    passwordUpdateHandler(e){
      this.setState({
        password: e.target.value
      });
    }

    login(e){

        e.preventDefault();
        if(this.state.username==="" || this.state.password===""){
            this.setState({
                error : {error : "All fields required"}
            });
        }else{
            this.props.authenticate({
                username:this.state.username,
                password: this.state.password
            });
        }
    }

  render() {
        return (
           <Transition classname="Login">
             <Header title={"Chatroom"} />
              {
                this.state.loading &&
                <div className="content">
                  <MyActivityIndicator message="Verifying Credentials" />
                </div>
              }
              {
                !this.state.loading &&
                <Transition classname="content">
                      {
                          this.state.error &&
                          <ErrorMessage key={0} message={this.state.error} />
                      }
                    <LoginForm key={1}
                        usernameValue={this.state.username}
                        usernameUpdateHandler={this.usernameUpdateHandler.bind(this)}
                        passwordValue={this.state.password}
                        passwordUpdateHandler={this.passwordUpdateHandler.bind(this)}
                        loginAction={this.login.bind(this)}/>
                </Transition>
              }
              <Footer/>
           </Transition>
        );
  }
}

function mapStateToProps(state){
  return {
    login : state.login
  };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
                authenticate : loginActions.authenticate,
                saveToken : userActions.saveToken
            },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
