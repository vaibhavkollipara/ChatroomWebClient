import React from 'react';


const TypeMessage = ({message,handleMessageText,sendmessagefunc}) =>{
    return (
        <form className="TypeMessage" onSubmit={sendmessagefunc}>
            <input type="text" placeholder="type message..." value={message} autoFocus onChange={handleMessageText} />
            <button type="submit" className="sendbutton">send</button>
        </form>
    );
}

export default TypeMessage;
