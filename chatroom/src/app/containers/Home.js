import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import {Link} from 'react-router-dom';
import * as homeActions from '../actions/HomeActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';

import Header from '../components/Header';
import NewChatroomModal from '../components/NewChatroomModal';
import DeveloperModal from '../components/DeveloperModal';

import ChatroomLarge from './ChatroomLarge';

class Home extends Component {


    constructor(){
        super();
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
            activeCharoomName: null,
            refresh : true
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
        let chatrooms = sessionStorage.getItem("chatrooms")
        if(chatrooms!==null){
            chatrooms = JSON.parse(chatrooms);
            if(chatrooms.length>0){
                console.log("Cache Hit....");
                this.setState({
                    chatrooms,
                    refresh:true,
                    chatroomsLoading: false
                });
            }
        }

        this.refreshHandler = setInterval(this.getChatrooms.bind(this),1000 * 3 );
        this.refreshFlag = setInterval(this.resetRefreshFlag.bind(this),1000 * 30)

    }

    resetRefreshFlag(){
        this.setState({
            refresh : true
        })
    }

    componentWillUnmount() {
        clearInterval(this.refreshHandler);
        clearInterval(this.refreshFlag);
        this.setState({
            error : null
        });
        sessionStorage.setItem("chatrooms",JSON.stringify(this.state.chatrooms))
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.home !== this.props.home){
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
        sessionStorage.removeItem("chatrooms");
        this.props.logout();
        this.setState({
            chatrooms : []
        });
        this.navigateToLoginScreen();
    }

    getChatrooms(){
        if(this.state && this.state.token!==null && this.state.refresh){
                this.props.refreshChatroomsList(this.state.token);
                this.setState({
                    refresh : false
                });
                if(this.state.chatroomsLoading){
                    this.setState({
                        chatroomsLoading : false,
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
            this.setState({
                refresh : true
            });
        }
    }

    //..............................

    selectChatroom(chatroomName,chatroomSlug){
        this.setState({
            activeChatroomSlug : chatroomSlug,
            activeCharoomName : chatroomName
        });
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
        if(this.state.chatrooms.length===0){
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
        if(this.state.chatrooms.length===0){
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

    settingsLarge(){
        return [
            {
                name: "Developer Details",
                action : this.toggleDeveloperModal.bind(this)
            },
            {
                name : "Logout",
                action : this.logout.bind(this)
            }
        ];
    }

    largeScreenView(){
        if(this.state.loading || this.state.chatroomsLoading){
            return(
                <div className="largeView">
                    {
                        this.state.user &&
                        <Header title={this.state.user.fullname} settings={this.settingsLarge()}/>
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


                {
                    !this.state.developerModalHidden &&
                    <DeveloperModal toggleFunction={this.toggleDeveloperModal.bind(this)}/>
                }

                <div className="largeViewContainer">
                    {
                        this.state.user &&
                        <Header title={this.state.user.fullname} settings={this.settingsLarge()}/>
                    }
                    {
                        !this.state.user &&
                        <Header title={"Home"} settings={this.errorSettings()}/>
                    }
                    <div className="homeView ">
                    {
                        this.state.error &&
                        <ErrorMessage message={this.state.error}/>
                    }
                    {
                        !this.state.hidden &&
                        <NewChatroomModal toggleFunction={this.toggleNewChatroomModal.bind(this)} action={this.createChatroom.bind(this)}/>
                    }
                    <div className="homeoptions">
                        <span onClick={this.toggleNewChatroomModal.bind(this)} className="optionButton glyphicon glyphicon-plus-sign" ></span>
                    </div>
                        {this.renderChatroomsLarge()}
                    </div>
                    <ChatroomLarge token={this.state.token}
                                chatroomName={this.state.activeCharoomName}
                                chatroomSlug={this.state.activeChatroomSlug}
                                fullname={this.state.user.fullname}
                                refreshFlagFunction={this.resetRefreshFlag.bind(this)}
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
