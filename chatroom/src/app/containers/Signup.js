import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import * as signupActions from '../actions/SignupActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';
import Header from '../components/Header';
import {Link} from 'react-router-dom';


class Signup extends Component {


  constructor(){
    super();
    this.state = {
        status : false,
        error : null,
        loading : false,
    }
  }

    componentWillReceiveProps(nextProps) {
          if (nextProps.signup !== this.props.signup) {
            this.setState({
                status : nextProps.signup.status,
                error : nextProps.signup.error,
                loading : nextProps.signup.loading
            });
          }
    }

    signupClick(e){
        if(this.isFormIncomplete()){
            this.setState({
                error:{error:"All fields Required"}
            });
        }else if(!this.didPasswordsMatch()){
            this.setState({
                error:{error:"Passwords did not match"}
            });
        }else{
            this.props.register({
                first_name : this.refs.first_name.value,
                last_name : this.refs.last_name.value,
                email : this.refs.email.value,
                username : this.refs.username.value,
                password : this.refs.password.value
            });
        }

        e.preventDefault();
    }
    signupClickLarge(e){
        if(this.isFormIncompleteLarge()){
            this.setState({
                error:{error:"All fields Required"}
            });
        }else if(!this.didPasswordsMatchLarge()){
            this.setState({
                error:{error:"Passwords did not match"}
            });
        }else{
            this.props.register({
                first_name : this.refs.first_name_large.value,
                last_name : this.refs.last_name_large.value,
                email : this.refs.email_large.value,
                username : this.refs.username_large.value,
                password : this.refs.password_large.value
            });
        }

        e.preventDefault();
    }
    didPasswordsMatchLarge(){
        return this.refs.password_large.value === this.refs.confirm_password_large.value;
    }

    isFormIncompleteLarge(){
        return this.refs.first_name_large.value==="" || this.refs.last_name_large.value===null || this.refs.username_large.value===null ||this.refs.email_large.value==="" || this.refs.password_large.value==="" || this.refs.confirm_password_large.value==="";
    }

    didPasswordsMatch(){
        return this.refs.password.value === this.refs.confirm_password.value;
    }

    isFormIncomplete(){
        return this.refs.first_name.value==="" || this.refs.last_name.value===null || this.refs.username.value===null ||this.refs.email.value==="" || this.refs.password.value==="" || this.refs.confirm_password.value==="";
    }

    largeScreenView(){
        if(this.state.loading){
            return (
                <div className="largeView">
                    <Header title={""} />
                    <MyActivityIndicator message="Creating Account" />
                </div>
            );
        }else if(this.state.status){
            return(
                    <div className="largeView">
                    <Header title={""} />
                    <div className="signupView" >
                        <div className="successView ">
                                <div>
                                    <h1>Chatroom</h1>
                                </div>
                                <div>
                                    <h3>Signup Successful</h3>
                                </div>
                                <div>
                                    <Link style={{color:'black',fontWeight:'bold',textDecoration:'underline'}} to='/'><div>Login</div></Link>
                                </div>
                        </div>
                    </div>
                </div>
            );

        }
        return (
            <div className="largeView">
                    <Header title={""} />
                    {
                    this.state.error &&
                    <div>
                        <ErrorMessage message={this.state.error} />
                    </div>
                }
                    <div className="signupView " >
                        <form className="formContainer" onSubmit={this.signupClickLarge.bind(this)}>
                            <div className="title">
                                Signup
                            </div>
                          <div className="form-group">
                            <input autoFocus type="text" ref="first_name_large" className="form-control" placeholder="First Name" />
                          </div>
                          <div className="form-group">
                            <input type="text" ref="last_name_large" className="form-control" placeholder="Last Name" />
                          </div>
                          <div className="form-group">
                            <input type="text" ref="email_large" className="form-control" placeholder="email" />
                          </div>
                          <div className="form-group">
                            <input type="text" ref="username_large" className="form-control" placeholder="username" />
                          </div>
                          <div className="form-group">
                            <input type="password" ref="password_large" className="form-control" placeholder="password" />
                          </div>
                          <div className="form-group">
                            <input type="password" ref="confirm_password_large" className="form-control" placeholder="confirm password" />
                          </div>
                          <button type="submit" className="btn btn-default">Submit</button>
                          <div className="footer"><Link style={{color:'black'}} to='/'>Login</Link></div>
                        </form>
                    </div>
            </div>
        );
    }

    smallScreenView(){
        if(this.state.loading){
            return (
                <div className="smallView">
                    <MyActivityIndicator message="Creating Account" />
                </div>
            );
        }else if(this.state.status){
                return (
                <div className="smallView">
                    <div className="signupView" >
                        <div className="successView">
                                <div>
                                    <h1>Chatroom</h1>
                                </div>
                                <div>
                                    <h3>Signup Successful</h3>
                                </div>
                                <div>
                                    <Link style={{color:'black',fontWeight:'bold',textDecoration:'underline'}} to='/'><div>Login</div></Link>
                                </div>
                        </div>
                    </div>
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
                    <div className="signupView" >
                        <form className="formContainer" onSubmit={this.signupClick.bind(this)}>
                            <div className="title">
                                Signup
                            </div>
                          <div className="form-group">
                            <input autoFocus type="text" ref="first_name" className="form-control" placeholder="First Name" />
                          </div>
                          <div className="form-group">
                            <input type="text" ref="last_name" className="form-control" placeholder="Last Name" />
                          </div>
                          <div className="form-group">
                            <input type="text" ref="email" className="form-control" placeholder="email" />
                          </div>
                          <div className="form-group">
                            <input type="text" ref="username" className="form-control" placeholder="username" />
                          </div>
                          <div className="form-group">
                            <input type="password" ref="password" className="form-control" placeholder="password" />
                          </div>
                          <div className="form-group">
                            <input type="password" ref="confirm_password" className="form-control" placeholder="confirm password" />
                          </div>
                          <button type="submit" className="btn btn-default">Submit</button>
                          <div className="footer"><Link style={{color:'black'}} to='/'>Login</Link></div>
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
    signup : state.signup
  };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
                register : signupActions.register
            },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);
