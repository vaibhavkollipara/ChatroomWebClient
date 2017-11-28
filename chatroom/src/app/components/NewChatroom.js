import React from 'react';

const NewChatroom = ({textHandler,nameValue,createAction}) =>{

    return(
         <form className="newChatroomView" onSubmit={createAction}>
                <input autoFocus type="text" value={nameValue} onChange={textHandler} className="form-control" placeholder="new chatroom name" />
                <button type="submit" className="btn btn-default">Create</button>
            </form>
    );
}

export default NewChatroom;
