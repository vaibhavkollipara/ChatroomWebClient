import {baseUrl} from './baseurl';

export function saveToken(token){
    return (dispatch,getState) => {
         dispatch({type: "SAVE_TOKEN",payload : token });
    }
}

export function logout(){
    return (dispatch,getState) => {
         dispatch({type: "LOGOUT",payload : null });
    }
}
