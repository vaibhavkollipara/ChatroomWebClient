import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import {Link} from 'react-router-dom';
import * as homeActions from '../actions/HomeActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';
import MyButton from '../components/MyButton';

import Header from '../components/Header';
import NewChatroomModal from '../components/NewChatroomModal';
import DeveloperModal from '../components/DeveloperModal';

import ChatroomLarge from './ChatroomLarge';

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
            developerModalHidden : true,
            activeChatroomSlug: null,
            activeCharoomName: null
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
                if(this.state.chatrooms.length >1){
                    this.setState({
                        chatroomsLoading:false
                    });
                }
            }
    }

    componentDidMount(){
        this.refreshHandler = setInterval(this.getChatrooms.bind(this),5000);

    }

    componentWillUnmount() {
        clearInterval(this.refreshHandler);
        this.setState({
            error : null
        });
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
            if(this.state.activeChatroomSlug===null && this.state.chatrooms.length>0){
                let chatroom = this.state.chatrooms[0];
                this.selectChatroom(chatroom.name,chatroom.slug);
            }
        }
    }



    settings(){
      return [
        {
            name : 'New Chatroom',
            action: this.toggleNewChatroomModal.bind(this)
        },
        {
            name : 'Developer Details',
            action : this.toggleDeveloperModal.bind(this)
        },
        {
            name : 'Logout',
            action : this.logout.bind(this)
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

    selectChatroom(chatroomName,chatroomSlug){
        this.setState({
            activeChatroomSlug : chatroomSlug,
            activeCharoomName : chatroomName
        });
        console.log(`selected : ${chatroomSlug}`);
    }

    isActiveChatroom(chatroomSlug){
        if(this.state.activeChatroomSlug===chatroomSlug)
            return "activeChatroomItem";
        return "chatroomItem";
    }

    renderChatroomItems(){
        return this.state.chatrooms.map((chatroom) =>{
                    return(
                                <Link key={chatroom.slug} style={{color:'black'}} to={`/${this.state.user.fullname}/${chatroom.name}/${chatroom.slug}`}>
                                    <div className="chatroomItem">{chatroom.name}</div>
                                </Link>
                        );
            });
    }
    renderChatroomItemsLarge(){
        return this.state.chatrooms.map((chatroom) =>{
                    return(
                                <div key={chatroom.slug} onClick={()=>{this.selectChatroom(chatroom.name,chatroom.slug);}} className={`${this.isActiveChatroom(chatroom.slug)}`}>{chatroom.name}</div>

                        );
            });
    }

    renderChatroomsLarge(){
        if(this.state.chatrooms.length==0){
            return (
                <div onClick={()=>{this.toggleNewChatroomModal();}} className="noChatroomsView">
                    <span className="noChatroomButton glyphicon glyphicon-plus-sign"></span>
                    <div className="noChatroomText">Create New Chatroom</div>
                </div>
            );
        }
        return (
            <div className="chatroomsContainer">
                {this.renderChatroomItemsLarge()}
            </div>
        );
    }

    renderChatrooms(){
        if(this.state.chatrooms.length==0){
            return (
                <div onClick={()=>{this.toggleNewChatroomModal();}} className="noChatroomsView">
                    <span className="noChatroomButton glyphicon glyphicon-plus-sign"></span>
                    <div className="noChatroomText">Create New Chatroom</div>
                </div>
            );
        }
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
        if(this.state.loading || this.state.chatroomsLoading){
            return(
                <div className="largeView">
                    {
                        this.state.user &&
                        <Header title={this.state.user.fullname} settings={this.settings()}/>
                    }
                    {
                        !this.state.user &&
                        <Header title={"Home"} settings={this.errorSettings()}/>
                    }
                    <MyActivityIndicator message={"Fetching Chatrooms..."} />
                </div>
                );
        }
        return (
            <div className="largeView">
                <Header title={"Chatroom"}/>
                <div className="largeViewContainer">
                    <div className="homeView">
                        {this.renderChatroomsLarge()}
                    </div>
                    <ChatroomLarge token={this.state.token}
                                chatroomName={this.state.activeCharoomName}
                                chatroomSlug={this.state.activeChatroomSlug}
                                fullname={this.state.user.fullname}
                                />
                </div>
            </div>
          );
    }

    smallScreenView(){
        if(this.state.loading || this.state.chatroomsLoading){
            return(
                <div className="smallView">
                    {
                        this.state.user &&
                        <Header title={this.state.user.fullname} settings={this.settings()}/>
                    }
                    {
                        !this.state.user &&
                        <Header title={"Home"} settings={this.errorSettings()}/>
                    }
                    <MyActivityIndicator message={"Fetching Chatrooms..."} />
                </div>
                );
        }
        return (
            <div className="smallView">
                {
                    this.state.user &&
                    <Header title={this.state.user.fullname} settings={this.settings()}/>
                }
                {
                    !this.state.user &&
                    <Header title={"Home"} settings={this.errorSettings()}/>
                }
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
