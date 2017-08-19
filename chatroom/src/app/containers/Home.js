import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import * as homeActions from '../actions/HomeActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';
import MyButton from '../components/MyButton';

import Header from '../components/Header';
import NewChatroomModal from '../components/NewChatroomModal';
import DeveloperModal from '../components/DeveloperModal';

class Home extends Component {


    constructor(){
        super();
        const ds = null
        this.state = {
            token : null,
            loading: false,
            user: null,
            chatrooms : [],
            error : null,
            hidden : true,
            newChatroomName : "",
            chatroomsLoading:true,
            developerModalHidden : true
        }
        this.refreshHandler = null;
    }

    componentWillMount(){
        let token = sessionStorage.getItem("token");

            if(token===null || token === ""){
                this.navigateToLoginScreen()
            }else{
                this.props.setToken(token);
                this.props.fetchUserDetails(token);
            }
    }

    componentDidMount(){
        this.refreshHandler = setInterval(this.getChatrooms.bind(this),5000);

    }

    componentWillUnmount() {
        clearInterval(this.refreshHandler);
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.home != this.props.home){
            this.setState({
                token : nextProps.home.token,
                loading : nextProps.home.loading,
                user : nextProps.home.user,
                error : nextProps.home.error,
                chatrooms : nextProps.home.chatrooms
            });
        }
    }



    settings(){
      return [
        {
            name : 'New Chatroom',
            action: this.toggleNewChatroomModal.bind(this)
        },
        {
            name : 'Logout',
            action : this.logout.bind(this)
        },
        {
            name : 'Developer Details',
            action : this.toggleDeveloperModal.bind(this)
        }
      ]
    }

      errorSettings(){
        return    [{
                name : 'Re Login',
                action : this.logout.bind(this)
            }]
      }

    navigateToLoginScreen(){
        this.props.history.push('/login');
    }

    logout(){
        sessionStorage.removeItem("token");
        this.props.logout();
        this.navigateToLoginScreen();
    }

    getChatrooms(){
        if(this.state && this.state.token!==null){
                this.props.refreshChatroomsList(this.state.token);
                if(this.state.chatroomsLoading){
                    this.setState({
                        chatroomsLoading : false
                    });
                }
            }
    }

    //New Chatroom Functionality...............

    toggleNewChatroomModal(){
        this.setState({
            hidden : !this.state.hidden
        });
    }

    createChatroom(newChatroomName){
        if(newChatroomName){
            this.props.createChatroom(this.state.token,newChatroomName);
        }
    }

    //..............................

    renderChatroomItems(){
        return this.state.chatrooms.map((chatroom) => <div key={chatroom.slug} className="chatroomItem">{chatroom.name}</div>);
    }

    renderChatrooms(){
        return (
            <div className="chatroomsContainer">
                {this.renderChatroomItems()}
            </div>
        );
    }

    toggleDeveloperModal(){
        this.setState({
            developerModalHidden : !this.state.developerModalHidden
        });
    }

    largeScreenView(){
        return (
            <div className="largeView">
                <MyActivityIndicator message={"Under Construction"}/>
            </div>
          );
    }

    smallScreenView(){
        if(this.state.loading || this.state.chatroomsLoading){
            return(
                <div className="smallView">
                    <MyActivityIndicator message={"Fetching Chatrooms..."} />
                </div>
                );
        }
        return (
            <div className="smallView">
                {
                    this.state.error &&
                    <div>
                        <ErrorMessage message={this.state.error} />
                    </div>
                }
                {
                    !this.state.developerModalHidden &&
                    <DeveloperModal toggleFunction={this.toggleDeveloperModal.bind(this)}/>
                }
                {
                    !this.state.hidden &&
                    <NewChatroomModal toggleFunction={this.toggleNewChatroomModal.bind(this)} action={this.createChatroom.bind(this)}/>
                }
                <div className="homeView">
                    {this.renderChatrooms()}
                </div>
            </div>
          );
    }

  render() {
    return (
        <div className="baseContainer">
            {
                this.state.user &&
                <Header title={this.state.user.fullname} settings={this.settings()}/>
            }
            {
                !this.state.user &&
                <Header title={"Home"} settings={this.errorSettings()}/>
            }
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
    home : state.home
  };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
                fetchUserDetails : homeActions.fetchUserDetails,
                setToken : homeActions.setToken,
                refreshChatroomsList : homeActions.refreshChatroomsList,
                createChatroom: homeActions.createChatroom,
                logout : homeActions.logout
            },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
