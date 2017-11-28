import React from 'react';

const ExitChatroom = ({confirmAction}) => {

    return(
        <div className="ExitChatroom">
            <div className="info">Are you sure? You will not be able to view/send messages until a member add you.</div>
            <button className="btn btn-default" onClick={confirmAction}>confirm</button>
        </div>
    );
};

export default ExitChatroom;
