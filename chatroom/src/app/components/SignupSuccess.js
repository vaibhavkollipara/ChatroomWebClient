import React from 'react';
import {Link} from 'react-router-dom';
import Transition from './Transition';

const SignupSuccess = () =>{
    return(
        <Transition classname="content">
              <div className="box">
                <div className="boxtitle">Signup Success</div>
                <div className="link"><Link style={{color:'black'}} to='/login'>Login</Link></div>
              </div>
        </Transition>
    );
}

export default SignupSuccess;
