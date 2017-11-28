const defaultState = {
    token: null,
    user: null
}


export default (state=defaultState,action) => {

    switch(action.type){

        case "SAVE_TOKEN":
            return {...state, token:action.payload};

        case "SET_USER_DETAILS":
            return {...state, user: action.payload};

        case "LOGOUT":
            return {...state, token: null,user:null};

        default :
            return state
    }

}
