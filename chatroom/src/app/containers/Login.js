import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import { Link } from 'react-router-dom'

import * as loginActions from '../actions/LoginActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';
import Header from '../components/Header';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Login extends Component {

    constructor(){
        super();
        this.state = {
            token  : null,
            error : null,
            loading : false,
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
            sessionStorage.setItem("token",nextProps.login.token);
            this.navigateToHome();
        }
    }

    updateWindowDimensions() {
      this.setState({ width: window.innerWidth});
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
        if(this.state.loading){
            return (
                <div className="largeView">
                    <Header title={""} />
                    <MyActivityIndicator message="Verifying Credentials" />
                </div>
            );
        }
        return (
            <div className="largeView">
                <Header title={""} />
                <ReactCSSTransitionGroup
                      transitionName="zoominout"
                      transitionAppear={true}
                      transitionAppearTimeout={1000}
                      transitionEnter={true}
                      transitionEnterTimeout={1000}
                      transitionLeave={true}
                      transitionLeaveTimeout={1000}>
                {
                    this.state.error &&
                    <div key={1}>
                        <ErrorMessage message={this.state.error} />
                    </div>
                }
                </ReactCSSTransitionGroup>
                    <div className="loginView">
                    <ReactCSSTransitionGroup
                      transitionName="zoominout"
                      transitionAppear={true}
                      transitionAppearTimeout={1000}
                      transitionEnter={false}
                      transitionLeave={false}>
                        <center key={2}><b><h2>Create Chatrooms..., Add Friends...., Chat.....</h2></b></center>
                        <form key={1} className="formContainer" onSubmit={this.loginClick.bind(this)}>
                            <div className="title">
                                Login
                            </div>
                           <div className="form-group">
                            <input autoFocus type="text" ref="username" className="form-control" placeholder="username" />
                          </div>
                          <div className="form-group">
                            <input type="password" ref="password" className="form-control" placeholder="password" />
                          </div>
                          <button type="submit" className="btn btn-default">Submit</button>
                          <div className="footer"><Link style={{color:'black'}} to='/signup'>Signup</Link></div>
                        </form>
                    </ReactCSSTransitionGroup>
                    </div>
                    <ReactCSSTransitionGroup
                      transitionName="zoominout"
                      transitionAppear={true}
                      transitionAppearTimeout={1000}
                      transitionEnter={true}
                      transitionEnterTimeout={1000}
                      transitionLeave={true}
                      transitionLeaveTimeout={1000}>
                    <div className="loginfooter">
                        <div className="footerBox">
                            DEVELOPER
                            <b>Vaibhav Kollipara</b>
                        </div>
                        <div className="footerBox">
                            CONTACT
                            <b>vkollip1@binghamton.edu</b>
                        </div>
                        <div className="footerBox">
                            API DOCUMENTATION
                            <b><a target="_blank" rel="noopener noreferrer" href="https://chatroomserver.herokuapp.com">ChatroomApi</a></b>
                        </div>
                    </div>
                    </ReactCSSTransitionGroup>
            </div>
        );
    }

    smallScreenView(){
        if(this.state.loading){
            return (
                <div className="smallView">
                    <Header title={"Chatroom"} />
                    <MyActivityIndicator message="Verifying Credentials" />
                </div>
            );
        }else{
            return (
                <div className="smallView">
                <Header title={"Chatroom"} />
                <ReactCSSTransitionGroup
                      transitionName="zoominout"
                      transitionAppear={true}
                      transitionAppearTimeout={1000}
                      transitionEnter={true}
                      transitionEnterTimeout={1000}
                      transitionLeave={true}
                      transitionLeaveTimeout={1000}>
                {
                    this.state.error &&
                    <div key={1}>
                        <ErrorMessage message={this.state.error} />
                    </div>
                }
                </ReactCSSTransitionGroup>
                    <div className="loginView">
                        <form className="formContainer" onSubmit={this.loginClick.bind(this)}>
                            <div className="title">
                                Login
                            </div>
                            <ReactCSSTransitionGroup
                          transitionName="zoominout"
                          transitionAppear={true}
                          transitionAppearTimeout={1000}
                          transitionEnter={false}
                          transitionLeave={false}>
                               <div key={1} className="form-group">
                                <input autoFocus type="text" ref="username" className="form-control" placeholder="username" />
                              </div>
                              <div key={2} className="form-group">
                                <input type="password" ref="password" className="form-control" placeholder="password" />
                              </div>
                              <button key={3} type="submit" className="btn btn-default">Submit</button>
                          </ReactCSSTransitionGroup>
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
                <div className="mainContent">
                  {this.state.width <1001 &&
                    this.smallScreenView()
                  }
                  {this.state.width >1000 &&
                    this.largeScreenView()
                  }
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
