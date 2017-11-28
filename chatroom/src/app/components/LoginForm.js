import React from 'react';
import { Link } from 'react-router-dom'

const LoginForm = ({usernameValue,usernameUpdateHandler,passwordValue,passwordUpdateHandler,loginAction}) =>{

        return(
            <form className="box" onSubmit={loginAction}>
              <h2 className="boxtitle">LOGIN</h2>
              <input autoFocus type="text" value={usernameValue} onChange={usernameUpdateHandler} className="form-control" placeholder="username" />
              <input type="password" value={passwordValue} onChange={passwordUpdateHandler} className="form-control" placeholder="password" />
              <button type="submit" className="btn btn-default">Submit</button>
              <div className="link"><Link style={{color:'black'}} to='/signup'>Signup</Link></div>
            </form>
        );
}

export default LoginForm;
