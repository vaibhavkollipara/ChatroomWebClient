import React, { Component } from 'react';

import spinner from '../assets/images/spinner-icon.png';

const MyActivityIndicator = ({message}) => {
    return(
        <div className="MyActivityIndicator">
                <img src={`/${spinner}`} alt="Loading..." className="spinner"/>
                <div>
                    {message}
                </div>

            </div>
    );
}

export default MyActivityIndicator;
