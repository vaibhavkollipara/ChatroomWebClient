import React, { Component } from 'react';


import MyButton from './MyButton';
import ErrorMessage from './ErrorMessage';


export default class SendMessage extends Component{


    sendMessage(e){
        if(this.refs.newMessage.value!==""){
            this.props.sendMessage(this.refs.newMessage.value);
            this.refs.newMessage.value="";
        }
        e.preventDefault();
    }


    render(){
        return (
            <form className="sendMessageView" onSubmit={this.sendMessage.bind(this)}>
                    <div className="messageInput">
                            <input type="text" ref="newMessage" className="form-control" placeholder="type message..." />
                        </div>
                        <div className="sendButton">
                            <button type="submit" className="btn btn-default">Send</button>
                        </div>
                    </form>
        );
    }
}
