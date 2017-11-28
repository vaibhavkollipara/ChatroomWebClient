import { combineReducers } from 'redux';
import loginReducer from './LoginReducer';
import signupReducer from './SignupReducer';
import homeReducer from './HomeReducer';
import chatroomReducer from './ChatroomReducer';
import userReducer from './UserReducer';

export default combineReducers({
    login : loginReducer,
    signup : signupReducer,
    user: userReducer,
    home : homeReducer,
    chatroom : chatroomReducer
});
