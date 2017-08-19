import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import { Link } from 'react-router-dom'

import * as loginActions from '../actions/LoginActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';
import Header from '../components/Header';

class Login extends Component {

    constructor(){
        super();
        this.state = {
            token  : null,
            error : null,
            loading : false
        };
    }

    navigateToHome(){
        this.props.history.push('/');
    }

    componentWillMount(){
        let token = sessionStorage.getItem("token");
        if(token!==null && token!==""){
            this.navigateToHome();
        }
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
            sessionStorage.setItem("token",nextProps.login.token);
            this.navigateToHome();
        }
    }

    loginClick(e){
        if(this.refs.username.value==="" || this.refs.password.value===""){
            this.setState({
                error : {error : "All fields required"}
            });
        }else{
            this.props.authenticate({
                username:this.refs.username.value,
                password: this.refs.password.value
            });
        }
        e.preventDefault();
    }

    largeScreenView(){
        return (
            <div className="largeView">
                    <MyActivityIndicator message="Under Construction" />
            </div>
        );
    }

    smallScreenView(){
        if(this.state.loading){
            return (
                <div className="smallView">
                    <MyActivityIndicator message="Verifying Credentials" />
                </div>
            );
        }else{
            return (
                <div className="smallView">
                {
                    this.state.error &&
                    <div>
                        <ErrorMessage message={this.state.error} />
                    </div>
                }
                    <div className="loginView">
                        <form className="formContainer" onSubmit={this.loginClick.bind(this)}>
                            <div className="title">
                                Login
                            </div>
                           <div className="form-group">
                            <input type="text" ref="username" className="form-control" placeholder="username" />
                          </div>
                          <div className="form-group">
                            <input type="password" ref="password" className="form-control" placeholder="password" />
                          </div>
                          <button type="submit" className="btn btn-default">Submit</button>
                          <div className="footer"><Link style={{color:'black'}} to='/signup'>Signup</Link></div>
                        </form>
                    </div>
                </div>
            );
        }
    }

  render() {
        return (
            <div className="baseContainer">
                <Header title={"Chatroom"} />
                <div className="mainContent">
                    {this.smallScreenView()}
                    {this.largeScreenView()}
                </div>
          </div>
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
                authenticate : loginActions.authenticate
            },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
