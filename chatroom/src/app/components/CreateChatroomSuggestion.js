import React from 'react';

const CreateChatoomSuggestion = ({createAction}) =>{

    return (
        <div onClick={createAction} className="chatroomsContainer">
            <span className="noChatroomButton glyphicon glyphicon-plus-sign"></span>
            <div className="noChatroomText">Create New Chatroom</div>
        </div>
    );
}

export default CreateChatoomSuggestion;
