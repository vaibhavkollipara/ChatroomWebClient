import React from 'react';
import ErrorMessage from './ErrorMessage';
import Transition from './Transition';

const Messages = ({messages,userfullname,error}) =>{

    const getMessageItemClass = (sender) =>{

        if(userfullname===sender){
            return "myMessageItem";
        }else{
            return "messageItem";
        }
    }

    const renderMessages = () => {
        return messages.map(message => {
                return(
                    <div key={message.timestamp} className={getMessageItemClass(message.sender)}>
                            <div className="sender">{message.sender}</div>
                            <div className="messageText">{message.message}</div>
                    </div>
                );
        });
    }

    return(
        <Transition classname="Messages">
            {
                error &&
                <ErrorMessage message={error} />
            }
            {renderMessages()}
        </Transition>
    );
};

export default Messages;
