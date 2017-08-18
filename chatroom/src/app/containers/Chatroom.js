import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import * as chatroomActions from '../actions/ChatroomActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';
import MyButton from '../components/MyButton';

import Header from '../components/Header';
import SendMessage from '../components/SendMessage';

import MyModal from '../components/MyModal';
import ConfirmationModal from '../components/ConfirmationModal';
import DeveloperModal from '../components/DeveloperModal';

class Chatroom extends Component {

  static navigationOptions = {
    title: 'Chatroom',
    header : null,
    chatroomSlug : null
  }

    constructor(){
        super();
        const ds = null;
        this.state = {
            token : null,
            messagesDataSource : ds,
            error : null,
            chatroomSlug : null,
            chatroomName : null,
            fullname : null,
            message : "",
            membersDataSource : ds,
            membersModalHidden : true,
            loading:true,
            exitConfirmationModalHidden : true,
            newMemberModalHidden : true,
            newMemberName : "",
            userSuggestionsDataSource : ds,
            addMemberError : null,
            developerModalHidden : true
        }
        this.refreshHandler = null;
    }

    componentWillMount(){
        localStorage.getItem("token").then((token) => {
            if(token===null || token === ""){
                this.navigateToLoginScreen()
            }else{
                this.setState({
                    token,
                });
            }
        }).catch(error => {console.log(error)});
    }

    componentDidMount(){
        this.setState({
              messagesDataSource : this.state.messagesDataSource.cloneWithRows(this.props.chatroom.messages),
              membersDataSource : this.state.membersDataSource.cloneWithRows(this.props.chatroom.members),
              chatroomSlug : this.props.navigation.state.params.chatroomSlug,
              chatroomName : this.props.navigation.state.params.chatroomName,
              fullname : this.props.navigation.state.params.fullname
            });
            this.refreshHandler = setInterval(this.getMessages.bind(this),5000);

    }

    componentWillUnmount() {
        clearInterval(this.refreshHandler);
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.chatroom != this.props.chatroom){
            this.setState({
                error : nextProps.chatroom.error,
                membersDataSource : this.state.membersDataSource.cloneWithRows(nextProps.chatroom.members),
                messagesDataSource : this.state.messagesDataSource.cloneWithRows(nextProps.chatroom.messages),
                members : nextProps.chatroom.members,
                userSuggestionsDataSource : this.state.userSuggestionsDataSource.cloneWithRows(nextProps.chatroom.userSuggestions),
                addMemberError : nextProps.chatroom.addMemberError
            });
        }
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

    }

    navigateToHomeScreen(){

    }

    logout(){
        localStorage.removeItem("token").then(() => {
            this.setState({
                token:null
            });
            this.navigateToLoginScreen();
        });
    }

    getMessages(){
        console.log("Get Messages......");
        if(this.state && this.state.token!==null && this.state.chatroomSlug!==null){
                this.props.loadMessages(this.state.token,this.state.chatroomSlug);
                if(this.state.loading){
                    this.setState({
                        loading:false
                    })
                }
            }
    }

    renderRow(message,sectionId, rowId, highlightId){
        return (
            <div>
                Message Item
            </div>
        );
    }

    onMessageChange(value){
        this.setState({
            message : value
        });
    }

    sendMessage(){
        if(this.state && this.state.message){
            this.props.sendMessage(this.state.token,this.state.chatroomSlug,this.state.message)
            this.setState({
                message : ""
            });
        }
    }

    //New Member............

    toggleNewMemberModal(){
        this.setState({
            newMemberModalHidden : !this.state.newMemberModalHidden
        });
    }

    onNewMemberNameChange(value){
        this.setState({
            newMemberName : value
        });
        if(value.length >4){
            this.props.getUserSuggestions(this.state.token,value);
        }
    }
    addMember(username){
        this.props.addMember(this.state.token,this.state.chatroomSlug,username);
        this.setState({
            newMemberName : ""
        });
    }

    renderUserSuggestionRow(user,sectionId, rowId, highlightId){
        return (
            <div>
                User Item
            </div>
        );
    }

    newMemberView(){
        return (
            <div>
                New Member View
            </div>
        );
    }

    //...................

    //View Members Functionality....................

    renderMemberRow(member,sectionId, rowId, highlightId){
        return (
            <div>
               Member Item
            </div>
        );
    }

    membersView(){
        return (
                <div>Members View</div>
            );
    }

    membersModalToggle(){
        this.setState({
            membersModalHidden : !this.state.membersModalHidden
        },() => {
            if(!this.state.membersModalHidden){
                if(this.state && this.state.token && this.state.chatroomSlug){
                    this.props.fetchMembers(this.state.token,this.state.chatroomSlug);
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
        this.props.exitChatroom(this.state.token,this.state.chatroomSlug);
        this.navigateToHomeScreen();
    }

    //.........................................

    //Developer Modal Functionality..............

    toggleDeveloperModal(){
        this.setState({
            developerModalHidden : !this.state.developerModalHidden
        });
    }
    //...................................
  render() {
    if(!this.state.token || this.state.loading){
        return (
            <div>
                Chatroom.. Fetching....
            </div>
        );
    }else{

        return (
            <div>
                Chatroom Fetched
            </div>
        );
    }
  }
}


function mapStateToProps(state){
  return {
    chatroom : state.chatroom
  };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
                loadMessages : chatroomActions.loadMessages,
                sendMessage : chatroomActions.sendMessage,
                fetchMembers : chatroomActions.fetchMembers,
                exitChatroom : chatroomActions.exitChatroom,
                getUserSuggestions : chatroomActions.getUserSuggestions,
                addMember : chatroomActions.addMember
            },dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Chatroom)
