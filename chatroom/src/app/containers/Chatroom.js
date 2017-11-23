import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import * as chatroomActions from '../actions/ChatroomActions';

import ErrorMessage from '../components/ErrorMessage';

import Header from '../components/Header';
import SendMessage from '../components/SendMessage';

import MyModal from '../components/MyModal';
import ConfirmationModal from '../components/ConfirmationModal';
import DeveloperModal from '../components/DeveloperModal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Chatroom extends Component {


    constructor(props){
        super(props);
        this.state = {
            token : null,
            messages : [],
            error : null,
            chatroomSlug : null,
            chatroomName : null,
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
            fullname : null,
            width: 0
        }
        this.refreshHandler = null;
    }

    componentWillMount(){
        let token = sessionStorage.getItem("token");
        if(token===null || token === ""){
            this.navigateToLoginScreen()
        }else{
            this.setState({
                token,
                chatroomName : this.props.match.params.chatroomName,
                chatroomSlug : this.props.match.params.chatroomSlug,
                fullname : this.props.match.params.fullname
            });
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
        let i=1;
        return this.state.messages.map(message => {
                return(
                    <div key={i++} style={this.getMessageAlignment(message.sender)}
                            className="messageItem">
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
                                <input type="text" onChange={this.onNewMemberNameChange.bind(this)} ref="newMemberName" className="form-control" placeholder="search by name or email" />
                              </div>
                        </form>
                        {this.renderUserSuggestions()}
                    </div>
        );
    }

    //...................

    //View Members Functionality....................

    renderMemberItems(){
            let i = 1
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
        this.navigateToHomeScreen();
    }

    //.........................................

    //Developer Modal Functionality..............

    toggleDeveloperModal(){
        this.setState({
            developerModalHidden : !this.state.developerModalHidden
        });
    }

    smallScreenView(){
        return(
            <div className="smallView">

                {
                    !this.state.chatroomName &&  this.props.history &&
                    <Header title={"Home"} backFunction={this.props.history.goBack.bind(this)} settings={this.errorSettings()}/>
                }
                <ReactCSSTransitionGroup
                      transitionName="zoominout"
                      transitionEnter={true}
                      transitionEnterTimeout={1000}
                      transitionLeave={true}
                      transitionLeaveTimeout={1000}>
                {
                    !this.state.developerModalHidden &&
                    <DeveloperModal toggleFunction={this.toggleDeveloperModal.bind(this)}/>
                }
                {
                    !this.state.exitConfirmationModalHidden &&
                    <ConfirmationModal message="Are you sure? You will not be able to view/send messages until a member add you." title="Exit Chatroom" confirmAction={this.exitChatroom.bind(this)} toggleFunction={this.exitConfirmationModalToggle.bind(this)} />
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
                </ReactCSSTransitionGroup>
                <div className="chatroomView">
                        {this.renderMessages()}
                        <SendMessage sendMessage={this.sendMessage.bind(this)}/>
                </div>
            </div>
        );
    }

  render() {
        return(
            <div className="baseContainer">
                {
                    this.state.chatroomName && this.props.history &&
                    <Header title={this.state.chatroomName} backFunction={this.props.history.goBack.bind(this)} settings={this.settings()}/>
                }
                <div className="mainContent">
                  {this.state.width <1001 &&
                    this.smallScreenView()
                  }
                  {this.state.width >1000 &&
                    this.navigateToHomeScreen()
                  }
                </div>
          </div>
        );
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
