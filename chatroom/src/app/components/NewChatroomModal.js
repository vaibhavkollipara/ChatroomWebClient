import React, { Component } from 'react';


import MyModal from './MyModal';

export default class NewChatroomModal extends Component {


    clicked(e){
        this.props.action(this.refs.chatroomName.value);
        this.props.toggleFunction();
        e.preventDefault();
    }

  newChatroomView(){
            return (
                    <div className="newChatroomView">
                            <form className="modalformContainer" onSubmit={this.clicked.bind(this)}>
                               <div className="form-group">
                                <input autoFocus type="text" ref="chatroomName" className="form-control" placeholder="new chatroom name" />
                              </div>
                              <button type="submit" className="btn btn-default">Create</button>
                        </form>
                    </div>
                );
    }

  render() {
    return (
        <MyModal
            title={"New Chatroom"}
            toggleFunction={this.props.toggleFunction.bind(this)}
            contentView={this.newChatroomView()}
        />
    );
  }
}
