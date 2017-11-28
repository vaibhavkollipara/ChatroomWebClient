import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';
import { createPortal } from 'react-dom';

import {Link} from 'react-router-dom';
import * as homeActions from '../actions/HomeActions';
import * as userActions from '../actions/UserActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';

import Header from '../components/Header';
import DeveloperDetails from '../components/DeveloperDetails';
import Modal from '../components/Modal';
import CreateChatroomSuggestion from '../components/CreateChatroomSuggestion';
import ChatroomsList from '../components/ChatroomsList';
import NewChatroom from '../components/NewChatroom';
import Transition from '../components/Transition';

import Chatroom from './Chatroom';

const portalContainer = document.getElementById('modal-root');

class Home extends Component {


    constructor(){
        super();
        this.state = {
            loading: false,
            chatrooms : [],
            error : "",
            hidden : true,
            newChatroomName : "",
            chatroomsLoading:true,
            developerModalHidden : true,
            activeChatroomSlug: "",
            activeCharoomName: null,
            refresh : true,
            width : 0
        }
        this.refreshHandler = null;
    }

    componentWillMount(){
        // let token = sessionStorage.getItem("token");

        //     if(token===null || token === ""){
        //         this.navigateToLoginScreen()
        //     }else{
        //         this.props.setToken(token);
        //         this.props.fetchUserDetails(token);
        //     }
        if(this.props.user.token===null){
            this.navigateToLoginScreen();
        }else{
            this.props.fetchUserDetails(this.props.user.token);
        }
    }

    componentDidMount(){
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions.bind(this));
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

    componentWillUnmount() {
        clearInterval(this.refreshHandler);
        clearInterval(this.refreshFlag);
        this.setState({
            error : null
        });
        // sessionStorage.setItem("chatrooms",JSON.stringify(this.state.chatrooms))
        window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.home !== this.props.home){
            this.setState({
                token : nextProps.user.token,
                loading : nextProps.home.loading,
                user : nextProps.user.user,
                error : nextProps.home.error,
                chatrooms : nextProps.home.chatrooms
            });
        }
    }

    updateWindowDimensions() {
      this.setState({ width: window.innerWidth});
    }

    resetRefreshFlag(){
        this.setState({
            refresh : true
        })
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
      ];
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
        // sessionStorage.removeItem("token");
        sessionStorage.removeItem("chatrooms");
        this.props.logout();
        this.setState({
            chatrooms : []
        });
        this.selectChatroom("","");
        this.navigateToLoginScreen();
    }

    getChatrooms(){
        if(this.state && this.state.token!==null && this.state.refresh){
                this.props.refreshChatroomsList(this.props.user.token);
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

    createChatroom(e){
        if(this.state.newChatroomName){
            this.props.createChatroom(this.props.user.token,this.state.newChatroomName);
            this.setState({
                refresh : true,
                newChatroomName: ""
            });
        }
        this.toggleNewChatroomModal();
        e.preventDefault();
    }

    newChatroomNameChangeHandler(e){
        this.setState({
            newChatroomName: e.target.value
        });

    }

    //..............................

    selectChatroom(chatroomName,chatroomSlug){
        this.setState({
            activeChatroomSlug : chatroomSlug
        });
        this.props.selectChatroom(chatroomName,chatroomSlug);
    }

    isActiveChatroom(chatroomSlug){
        if(this.state.activeChatroomSlug===chatroomSlug)
            return "activeChatroomItem";
        return "chatroomItem";
    }

    displayErrorMessage(){
        if(this.state.error){
              return( <ErrorMessage message={this.state.error} /> );
            };
    }

    toggleDeveloperModal(){
        this.setState({
            developerModalHidden : !this.state.developerModalHidden
        });
    }

  render() {
    return (
        [
            <Transition classname="Home">
                {
                    this.props.user.user &&
                    <Header key={0} title={this.props.user.user.fullname} settings={this.settings()}/>
                }
                {
                    !this.props.user.user &&
                    <Header key={1} title={"Home"} settings={this.errorSettings()}/>
                }
                {
                    this.state.loading &&
                    <MyActivityIndicator key={2} message={"Fetching Chatrooms"} />
                }
                {
                    this.state.error &&
                    <ErrorMessage key={3} message={this.state.error} />
                }
                {
                    !this.state.loading && !this.state.chatroomsLoading && this.state.chatrooms.length ===0 &&
                    <CreateChatroomSuggestion key={4}
                        createAction={this.toggleNewChatroomModal.bind(this)}/>
                }
                {
                    this.state.width > 620 && this.props.user.user &&
                    <Chatroom key={5} />
                }
                {
                    this.state.user && !this.state.loading && !this.state.chatroomsLoading && this.state.chatrooms.length > 0 &&
                    <ChatroomsList key={6}
                        chatrooms={this.state.chatrooms}
                        activeChatroomSlug={this.state.activeChatroomSlug}
                        selectChatroom={this.selectChatroom.bind(this)}
                        screenWidth={this.state.width}/>
                }
          </Transition>,

        !this.state.hidden &&
        createPortal(<Modal title={"NEW CHATROOM"} toggleFunction={this.toggleNewChatroomModal.bind(this)}>
              <NewChatroom
                    textHandler={this.newChatroomNameChangeHandler.bind(this)}
                    nameValue={this.state.newChatroomName}
                    createAction={this.createChatroom.bind(this)}/>
            </Modal>, portalContainer),

        !this.state.developerModalHidden &&
        createPortal(<Modal title={"DEVELOPER DETAILS"} toggleFunction={this.toggleDeveloperModal.bind(this)}>
              <DeveloperDetails />
            </Modal>, portalContainer)
      ]
    );
  }
}


function mapStateToProps(state){
  return {
    home : state.home,
    user: state.user
  };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
                fetchUserDetails : homeActions.fetchUserDetails,
                setToken : homeActions.setToken,
                refreshChatroomsList : homeActions.refreshChatroomsList,
                createChatroom: homeActions.createChatroom,
                selectChatroom: homeActions.selectChatroom,
                logout : userActions.logout
            },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
