import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import * as chatroomActions from '../actions/ChatroomActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';

import Header from '../components/Header';
import SendMessage from '../components/SendMessage';

import MyModal from '../components/MyModal';
import ConfirmationModal from '../components/ConfirmationModal';
import DeveloperModal from '../components/DeveloperModal';

class ChatroomLarge extends Component {


    constructor(props){
        super(props);
        this.state = {
            token : null,
            messages : [],
            error : null,
            chatroomSlug : this.props.chatroomSlug,
            chatroomName : this.props.chatroomName,
            message : "",
            members :[],
            membersModalHidden : true,
            loading:true,
            exitConfirmationModalHidden : true,
            newMemberModalHidden : true,
            newMemberName : "",
            userSuggestions : [],
            addMemberError : null,
            developerModalHidden : true,
            fullname : this.props.fullname
        }
        this.refreshHandler = null;
    }

    componentWillMount(){
            this.setState({
                token : this.props.token,
                chatroomName : this.props.chatroomName,
                chatroomSlug : this.props.chatroomSlug,
            });
    }

    componentDidMount(){
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
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            token : nextProps.token,
            chatroomName: nextProps.chatroomName,
            chatroomSlug : nextProps.chatroomSlug,
            fullname : nextProps.fullname,
        });
        if(this.props.chatroomSlug!==nextProps.chatroomSlug){
            this.getMessages();
        }
        if(nextProps.chatroom !== this.props.chatroom){
            this.setState({
                error : nextProps.chatroom.error,
                members : nextProps.chatroom.members,
                messages : nextProps.chatroom.messages,
                userSuggestions : nextProps.chatroom.userSuggestions,
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
        this.props.history.replace('/login');
    }

    navigateToHomeScreen(){
        this.props.history.replace('/');
    }

    logout(){
        sessionStorage.removeItem("token");
            this.setState({
                token:null
            });
            this.navigateToLoginScreen();
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

    getMessageAlignment(sender){
        if(this.state.fullname===sender){
            return {alignSelf:'flex-end'}
        }else{
            return {alignSelf:'flex-start'}
        }
    }

    renderMessageItems(){
        let i= 1;
        return this.state.messages.map(message => {
                return(
                    <div key={i++}  style={this.getMessageAlignment(message.sender)}
                            className="messageItem ">
                            <div><b>{message.sender}</b></div>
                            <div className="messageText">{message.message}</div>
                    </div>
                );
        });
    }
    renderMessages(){
        return (
            <div className="messagesContainer">
                {this.renderMessageItems()}
            </div>
        );
    }

    sendMessage(message){
        this.props.sendMessage(this.state.token,this.state.chatroomSlug,message);
    }

    //New Member............

    onNewMemberNameChange(e){
        let value = this.refs.newMemberName.value
        this.setState({
            newMemberName : value
        });
        if(value.length >4){
            this.props.getUserSuggestions(this.state.token,value);
        }
    }

    toggleNewMemberModal(){
        this.setState({
            newMemberModalHidden : !this.state.newMemberModalHidden
        });
    }
    addMember(username){
        this.props.addMember(this.state.token,this.state.chatroomSlug,username);
        this.setState({
            newMemberName : ""
        });
        this.refs.newMemberName.value="";
    }

    renderUserSuggestionItems(){
        return this.state.userSuggestions.map(user => {
            return (
                    <div onClick={() => {this.addMember(user.username);}} className="userSuggestionItem">
                            <div>{user.fullname}</div>
                            <div>{user.email}</div>
                    </div>
            );
        });
    }

    renderUserSuggestions(){
        return (
            <div className="userSuggesionsContainer">
                {this.renderUserSuggestionItems()}
            </div>
        );
    }

    newMemberView(){
        return (
                    <div className="newMemberView">
                        {
                            this.state.addMemberError &&
                            <ErrorMessage message={this.state.addMemberError}/>
                        }
                        <form className="newMemberForm" onSubmit={()=>{}}>
                               <div className="form-group">
                                <input type="text" onChange={this.onNewMemberNameChange.bind(this)} ref="newMemberName" className="form-control" placeholder="new member name" />
                              </div>
                        </form>
                        {this.renderUserSuggestions()}
                    </div>
        );
    }

    //...................

    //View Members Functionality....................

    renderMemberItems(){
        let i=0;
            return this.state.members.map(member => {
                    return(
                            <div key={i++} className="memberItem">
                                <div>{member.name}</div>
                                <div>{member.email}</div>
                            </div>
                    );
            });
    }

    membersView(){
        return (
                <div className="membersView">
                    {this.renderMemberItems()}
                </div>
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
        this.exitConfirmationModalToggle();
        this.navigateToHomeScreen();
    }
    exitChatroomLarge(){
        this.props.exitChatroom(this.state.token,this.state.chatroomSlug);
        this.exitConfirmationModalToggle();
        this.setState({
            chatroomSlug : null
        });
    }

    //.........................................

    //Developer Modal Functionality..............

    toggleDeveloperModal(){
        this.setState({
            developerModalHidden : !this.state.developerModalHidden
        });
    }
    //...................................
    largeScreenView(){
        if(this.state.chatroomSlug===null || this.state.token===null){
            return(
                <div className="chatroomView">
                    <MyActivityIndicator message={"Waiting for chatroom selection"} />
                </div>
            );
        }
        return(
            <div className="chatroomView ">
                {
                    !this.state.developerModalHidden &&
                    <DeveloperModal toggleFunction={this.toggleDeveloperModal.bind(this)}/>
                }
                {
                    !this.state.chatroomName &&  this.props.history &&
                    <Header title={"Home"} backFunction={this.props.history.goBack.bind(this)} settings={this.errorSettings()}/>
                }
                {
                    !this.state.exitConfirmationModalHidden &&
                    <ConfirmationModal message="Are you sure? You will not be able to view/send messages until a member add you." title="Exit Chatroom" confirmAction={this.exitChatroomLarge.bind(this)} toggleFunction={this.exitConfirmationModalToggle.bind(this)} />
                }
                {
                    !this.state.membersModalHidden &&
                    <MyModal
                        title="Members"
                        contentView={this.membersView()}
                        toggleFunction={this.membersModalToggle.bind(this)}
                    />
                }
                {
                    !this.state.newMemberModalHidden &&
                    <MyModal
                        title="Add Member"
                        contentView={this.newMemberView()}
                        toggleFunction={this.toggleNewMemberModal.bind(this)}
                     />
                }
                {
                    this.state.error &&
                    <ErrorMessage message={this.state.error} />
                }
                <div className="chatroomView">
                        <div className="chatroomoptions">
                            <span onClick={this.membersModalToggle.bind(this)} className="optionButton glyphicon glyphicon-user" ></span>
                            <span onClick={this.toggleNewMemberModal.bind(this)} className="optionButton glyphicon glyphicon-plus" ></span>
                            <span onClick={this.exitConfirmationModalToggle.bind(this)} className="optionButton glyphicon glyphicon-log-out" ></span>
                        </div>
                        {this.renderMessages()}
                        <SendMessage sendMessage={this.sendMessage.bind(this)}/>
                </div>
            </div>
        );
    }

  render() {
        return this.largeScreenView();
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


export default connect(mapStateToProps,mapDispatchToProps)(ChatroomLarge)
