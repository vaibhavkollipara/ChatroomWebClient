import React from 'react';
import PropTypes from 'prop-types';
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


Messages.propTypes = {
    messages : PropTypes.arrayOf(PropTypes.shape(
            "message": PropTypes.string,
            "sender": PropTypes.string,
            "timestamp": PropTypes.any
    )),
    error: PropTypes.string,
    userfullname: PropTypes.string
};

export default Messages;
