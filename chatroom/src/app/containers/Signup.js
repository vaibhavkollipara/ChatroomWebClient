import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import * as signupActions from '../actions/SignupActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Transition from '../components/Transition';
import SignupForm from '../components/SignupForm';
import SignupSuccess from '../components/SignupSuccess';


class Signup extends Component {


  constructor(){
    super();
    this.state = {
        status : false,
        error : null,
        loading : false,
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        confirm_password: "",
        width: 0
    }
  }

  componentDidMount(){
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions() {
      this.setState({ width: window.innerWidth});
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

    firstNameUpdateHandler(e){
      this.setState({
        first_name: e.target.value
      });
    }

    lastNameUpdateHandler(e){
      this.setState({
        last_name: e.target.value
      });
    }

    emailUpdateHandler(e){
      this.setState({
        email: e.target.value
      });
    }

    usernameUpdateHandler(e){
      this.setState({
        username: e.target.value
      });
    }

    passwordUpdateHandler(e){
      this.setState({
        password: e.target.value
      });
    }

    confirmPasswordUpdateHandler(e){
      this.setState({
        confirm_password: e.target.value
      });
    }


    signup(e){
        e.preventDefault();

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
                first_name : this.state.first_name,
                last_name : this.state.last_name,
                email : this.state.email,
                username : this.state.username,
                password : this.state.password
            });
        }
    }

    didPasswordsMatch(){
        return this.state.password === this.state.confirm_password;
    }

    isFormIncomplete(){
        return this.state.first_name==="" || this.state.last_name==="" || this.state.username==="" ||this.state.email==="" || this.state.password==="" || this.state.confirm_password==="";
    }

    render() {

        return (
            <Transition classname="Signup">
              <Header title={"Chatroom"}/>
              {
                this.state.loading &&
                <div className="content">
                  <MyActivityIndicator message="Verifying Credentials" />
                </div>
              }
              {
                this.state.status &&
                <SignupSuccess />
              }
              {
                !this.state.loading && !this.state.status &&
                <Transition classname="content">
                      {
                          this.state.error &&
                          <ErrorMessage key={0} message={this.state.error} />
                      }
                    <SignupForm key={1}
                        firtNameValue={this.state.first_name}
                        firstNameUpdateHandler={this.firstNameUpdateHandler.bind(this)}
                        lastNameValue={this.state.last_name}
                        lastNameUpdateHandler={this.lastNameUpdateHandler.bind(this)}
                        emailValue={this.state.email}
                        emailUpdateHandler={this.emailUpdateHandler.bind(this)}
                        usernameValue={this.state.username}
                        usernameUpdateHandler={this.usernameUpdateHandler.bind(this)}
                        passwordValue={this.state.password}
                        passwordUpdateHandler={this.passwordUpdateHandler.bind(this)}
                        confirmPasswordValue={this.state.confirm_password}
                        confirmPasswordUpdateHandler={this.confirmPasswordUpdateHandler.bind(this)}
                        signupAction={this.signup.bind(this)} />
                  </Transition>
              }
              <Footer/>
            </Transition>
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
