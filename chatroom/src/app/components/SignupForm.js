import React from 'react';
import {Link} from 'react-router-dom';

const SignupForm = ({
    firstNameValue,firstNameUpdateHandler,
    lastNameValue, lastNameUpdateHandler,
    emailValue, emailUpdateHandler,
    usernameValue, usernameUpdateHandler,
    passwordValue, passwordUpdateHandler,
    confirmPasswordValue, confirmPasswordUpdateHandler,
    signupAction })=>{

    return (
        <form className="box" onSubmit={signupAction}>
            <h2 className="boxtitle">SIGNUP</h2>
            <input autoFocus type="text" className="form-control" placeholder="First Name"
                value={firstNameValue}
                onChange={firstNameUpdateHandler}/>
            <input type="text" className="form-control" placeholder="Last Name"
                value={lastNameValue}
                onChange={lastNameUpdateHandler}/>
            <input type="text" className="form-control" placeholder="email"
                value={emailValue}
                onChange={emailUpdateHandler}/>
            <input type="text" className="form-control" placeholder="username"
                value={usernameValue}
                onChange={usernameUpdateHandler}/>
            <input type="password" className="form-control" placeholder="password"
                value={passwordValue}
                onChange={passwordUpdateHandler}/>
            <input type="password" className="form-control" placeholder="confirm password"
                value={confirmPasswordValue}
                onChange={confirmPasswordUpdateHandler}/>
            <button type="submit" className="btn btn-default">Submit</button>
            <div className="link"><Link style={{color:'black'}} to='/login'>Login</Link></div>
        </form>
    );

}

export default SignupForm;
