import React from 'react';
import Transition from './Transition';
import {Link} from 'react-router-dom';

const ChatroomsList = ({chatrooms,activeChatroomSlug,selectChatroom, screenWidth})=>{

    const getChatroomClass = (slug) =>{
        if(activeChatroomSlug===slug)
            return "activeChatroomItem";
        return "chatroomItem";
    }

    const renderChatroomItems = ()=>{
        if(screenWidth < 621){
            return chatrooms.map((chatroom) => {
                return (
                    <Link key={chatroom.slug} to={`/chatroom`}>
                        <div onClick={()=>{selectChatroom(chatroom.name,chatroom.slug)}} className={getChatroomClass(chatroom.slug)}>{chatroom.name}</div>
                    </Link>
                );
            });
        }else{
            return chatrooms.map((chatroom) => {
                return (
                        <div key={chatroom.slug} onClick={()=>{selectChatroom(chatroom.name,chatroom.slug)}} className={getChatroomClass(chatroom.slug)}>{chatroom.name}</div>
                );
            });
        }
    }

    return(
        <Transition classname="chatroomsContainer">
            {renderChatroomItems()}
        </Transition>
    );
}

export default ChatroomsList;
