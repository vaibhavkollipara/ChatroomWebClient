import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';
import { createPortal } from 'react-dom';

import * as chatroomActions from '../actions/ChatroomActions';
import * as userActions from '../actions/UserActions';
import Header from '../components/Header';
import TypeMessage from '../components/TypeMessage';

import Modal from '../components/Modal';
import DeveloperDetails from '../components/DeveloperDetails';
import ExitChatroom from '../components/ExitChatroom';
import NewMember from '../components/NewMember';
import Members from '../components/Members';
import Messages from '../components/Messages';
import Transition from '../components/Transition';
import MyActivityIndicator from '../components/MyActivityIndicator';
import ChatroomOptions from '../components/ChatroomOptions';

const portalContainer = document.getElementById('modal-root');

class Chatroom extends Component {


    constructor(props){
        super(props);
        this.state = {
            messages : [],
            error : null,
            newMessage : "",
            members :[],
            membersModalHidden : true,
            loading:true,
            exitConfirmationModalHidden : true,
            newMemberModalHidden : true,
            newMemberName : "",
            userSuggestions : [],
            addMemberError : null,
            developerModalHidden : true,
            width: 0
        }
        this.refreshHandler = null;
    }

    componentWillMount(){

        if(this.props.user.token===null){
            this.navigateToLoginScreen();
        }else{
            this.getMessages();
        }
    }

    componentDidMount(){
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions.bind(this));
        this.refreshHandler = setInterval(this.getMessages.bind(this),5000);
    }

    componentWillUnmount() {
        clearInterval(this.refreshHandler);
        this.setState({
            error : null,
            addMemberError : null,
            messages: [],
            members: [],
            userSuggestions: []
        });
        window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.chatroom !== this.props.chatroom){
            this.setState({
                error : nextProps.chatroom.error,
                members : nextProps.chatroom.members,
                messages : nextProps.chatroom.messages,
                userSuggestions : nextProps.chatroom.userSuggestions,
                addMemberError : nextProps.chatroom.addMemberError
            });
            if(this.props.chatroom.chatroomSlug!==nextProps.chatroom.chatroomSlug){
                this.setState({
                    loading : true,
                    messages: []
                });
            }
        }
    }

    updateWindowDimensions() {
      this.setState({ width: window.innerWidth});
    }



    settings(){
      return [
        {
            name: 'View Members',
            action : this.membersModalToggle.bind(this)
        },
        {
            name: 'Add New Member',
            action : this.toggleNewMemberModal.bind(this)
        },
        {
            name : 'Exit From Chatroom',
            action : this.exitConfirmationModalToggle.bind(this)
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
        return [{
                    name : 'Re Login',
                    action : this.logout.bind(this)
                }]
      }

    navigateToLoginScreen(){
        this.props.history.replace('/login');
    }

    navigateToHomeScreen(){
        this.props.history.replace('/');
    }

    logout(){
        // sessionStorage.removeItem("token");
        //     this.setState({
        //         token:null
        //     });
        //     this.navigateToLoginScreen();
        this.props.logout();
        this.navigateToLoginScreen();
    }

    getMessages(){
        if(this.props.user.token && this.props.chatroom.chatroomSlug){
                this.props.loadMessages(this.props.user.token,this.props.chatroom.chatroomSlug);
                if(this.state.loading){
                    this.setState({
                        loading:false
                    })
                }
            }
    }

    handleNewMessageChange(e){
        this.setState({
            newMessage : e.target.value
        });
    }

    sendMessage(e){
        if(this.state.newMessage!==""){
            this.props.sendMessage(this.props.user.token,this.props.chatroom.chatroomSlug,this.state.newMessage);
            this.setState({
                newMessage: ""
            });
        }
        e.preventDefault();
    }

    //New Member............

    newMemberSearchTextHandler(e){
        let value = e.target.value
        this.setState({
            newMemberName : value
        });
        if(value.length >4){
            this.props.getUserSuggestions(this.props.user.token,value);
        }
    }

    toggleNewMemberModal(){
        this.setState({
            newMemberModalHidden : !this.state.newMemberModalHidden
        });
    }
    addMember(username){
        this.props.addMember(this.props.user.token,this.props.chatroom.chatroomSlug,username);
        this.setState({
            newMemberName : ""
        });
    }

    //...................

    //View Members Functionality....................

    membersModalToggle(){
        this.setState({
            membersModalHidden : !this.state.membersModalHidden
        },() => {
            if(!this.state.membersModalHidden){
                if(this.props.user.token && this.props.chatroom.chatroomSlug){
                    this.props.fetchMembers(this.props.user.token,this.props.chatroom.chatroomSlug);
                }
            }
        });
    }

    //.......................................

    //Exit Chatroom Functionality.................
    exitConfirmationModalToggle(){
        this.setState({
            exitConfirmationModalHidden : !this.state.exitConfirmationModalHidden
        });
    }

    exitChatroom(){
        this.props.exitChatroom(this.props.user.token,this.props.chatroom.chatroomSlug);
        this.navigateToHomeScreen();
    }

    //.........................................

    //Developer Modal Functionality..............

    toggleDeveloperModal(){
        this.setState({
            developerModalHidden : !this.state.developerModalHidden
        });
    }

  render() {
        if(this.state.width > 620 && this.props.location && this.props.location.pathname==="/chatroom"){
            this.props.history.goBack();
        }
        return(
            [
                <Transition classname="Chatroom">
                    {
                        this.props.chatroom.chatroomName && this.props.history && this.state.width < 621 &&
                        <Header key={0}
                            title={this.props.chatroom.chatroomName}
                            backFunction={this.props.history.goBack.bind(this)}
                            settings={this.settings()}/>
                    }
                    {
                        this.state.width > 620 && this.props.chatroom.chatroomSlug!=="" &&
                        <ChatroomOptions key={1}
                            viewMembers={this.membersModalToggle.bind(this)}
                            addMember={this.toggleNewMemberModal.bind(this)}
                            exitChatroom={this.exitConfirmationModalToggle.bind(this)}/>
                    }
                    {
                        this.props.chatroom.chatroomSlug==="" &&
                        <MyActivityIndicator key={2} message={"Waiting for chatroom selection."}/>
                    }
                    {
                        this.state.loading && this.props.chatroom.chatroomSlug !== "" &&
                        <MyActivityIndicator key={3} message={"Fetching Messages"}/>
                    }
                    {
                        <Messages key={4}
                            messages={this.state.messages}
                            error={this.state.error}
                            userfullname={this.props.user.user.fullname}/>
                    }{
                        this.props.chatroom.chatroomSlug !== "" &&
                        <TypeMessage key={5}
                            message={this.state.newMessage}
                            handleMessageText={this.handleNewMessageChange.bind(this)}
                            sendmessagefunc={this.sendMessage.bind(this)}/>
                    }
                </Transition>,

            !this.state.developerModalHidden &&
                    createPortal(<Modal title={"DEVELOPER DETAILS"} toggleFunction={this.toggleDeveloperModal.bind(this)}>
                          <DeveloperDetails />
                        </Modal>, portalContainer),

            !this.state.exitConfirmationModalHidden &&
                    createPortal(<Modal title={"Exit Chatroom"} toggleFunction={this.exitConfirmationModalToggle.bind(this)}>
                          <ExitChatroom confirmAction={this.exitChatroom.bind(this)}/>
                        </Modal>, portalContainer),

            !this.state.newMemberModalHidden &&
                    createPortal(<Modal title={"Add New Member"} toggleFunction={this.toggleNewMemberModal.bind(this)}>
                          <NewMember
                            userSuggestions={this.state.userSuggestions}
                            addAction={this.addMember.bind(this)}
                            error={this.state.addMemberError}
                            nameChangeHandler={this.newMemberSearchTextHandler.bind(this)}/>
                        </Modal>, portalContainer),

            !this.state.membersModalHidden &&
                    createPortal(<Modal title={"Members"} toggleFunction={this.membersModalToggle.bind(this)}>
                          <Members members={this.state.members}/>
                        </Modal>, portalContainer)

            ]
        );
  }
}


function mapStateToProps(state){
  return {
    chatroom : state.chatroom,
    user: state.user
  };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
                loadMessages : chatroomActions.loadMessages,
                sendMessage : chatroomActions.sendMessage,
                fetchMembers : chatroomActions.fetchMembers,
                exitChatroom : chatroomActions.exitChatroom,
                getUserSuggestions : chatroomActions.getUserSuggestions,
                addMember : chatroomActions.addMember,
                logout : userActions.logout
            },dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Chatroom)
