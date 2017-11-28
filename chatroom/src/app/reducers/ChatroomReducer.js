const defaultState = {
    chatroomName: "",
    chatroomSlug: "",
    messages : [],
    error : null,
    members : [],
    userSuggestions : [],
    addMemberError : null
}


export default (state=defaultState,action) => {
        switch(action.type){
            case "MESSAGES_FETCHED" :
                return {...state, error : null, messages : action.payload};
            case "MESSAGES_FETCH_FAILED" :
                return {...state, error: action.payload };
            case "MEMBERS_FETCHED" :
                return {...state,error:null, members : action.payload};
            case "USER_SUGGESTIONS_FETCHED":
                return {...state,userSuggestions : action.payload}
            case "SET_ADD_MEMBER_ERROR":
                return {...state, addMemberError : action.payload}
            case "ADD_MEMBER_SUCCESS":
                return {...state, addMemberError : null,userSuggestions:[]}
            case "SET_CHATROOM_ERROR" :
                return {...state, error:action.payload}
            case "SET_CHATROOM_DETAILS":
                return {...state, chatroomName: action.payload.chatroomName,chatroomSlug: action.payload.chatroomSlug}
            default:
                return state;
        }
}
