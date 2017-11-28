import React from 'react';

const ChatroomOptions = ({viewMembers,addMember,exitChatroom}) =>{
    return (
        <div className="ChatroomOptions">
            <span onClick={viewMembers} className="OptionButton glyphicon glyphicon-user"></span>
            <span onClick={addMember} className="OptionButton glyphicon glyphicon-plus"></span>
            <span onClick={exitChatroom} className="OptionButton glyphicon glyphicon-log-out"></span>
        </div>
    );
}


export default ChatroomOptions;
