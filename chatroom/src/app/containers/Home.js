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

  static navigationOptions = {
    title: 'Home',
    header : null
  }

    constructor(){
        super();
        const ds = null
        this.state = {
            token : null,
            loading: false,
            user: null,
            chatroomsDataSource : ds,
            error : null,
            hidden : true,
            newChatroomName : "",
            chatroomsLoading:true,
            developerModalHidden : true
        }
        this.refreshHandler = null;
    }

    componentWillMount(){
        localStorage.getItem("token").then((token) => {
            if(token===null || token === ""){
                this.navigateToLoginScreen()
            }else{
                this.props.setToken(token);
                this.props.fetchUserDetails(token);
            }
        }).catch(error => {console.log(error)});
    }

    componentDidMount(){
        this.setState({
              chatroomsDataSource : this.state.chatroomsDataSource.cloneWithRows(this.props.home.chatrooms)
            });
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
                chatroomsDataSource : this.state.chatroomsDataSource.cloneWithRows(nextProps.home.chatrooms)
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

    }

    logout(){
        localStorage.removeItem("token").then(() => {
            this.props.logout();
            this.navigateToLoginScreen();
        });
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
    onNewChatroomNameChange(value){
        this.setState({
            newChatroomName : value
        });
    }

    toggleNewChatroomModal(){
        this.setState({
            hidden : !this.state.hidden
        });
    }

    createChatroom(){
        if(this.state.newChatroomName){
            this.props.createChatroom(this.state.token,this.state.newChatroomName);
            this.setState({
                newChatroomName : ""
            });
        }
    }

    //..............................

    renderRow(chatroom,sectionId, rowId, highlightId){
        return (
            <div>
                Chatroom Item
            </div>
        );
    }

    toggleDeveloperModal(){
        this.setState({
            developerModalHidden : !this.state.developerModalHidden
        });
    }

  render() {
    if(this.state.loading || this.state.chatroomsLoading){
        return (
            <div>
                Home.. Fetching....
            </div>
        );
    }else{

        return (
            <div>
                Home..
            </div>
        );
    }
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
