import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ErrorMessage = ({message}) => {

    const getErrorContent = (errors) => {
        if(Array.isArray(errors)){
            let i=1;
            return errors.map((error)=>
                <div key={i++} >
                    {error}
                </div>);
        }else{
            return (<div>
                        {errors}
                    </div>
                );
        }
    };

    const getErrorMessages = () => {
        let i=1;
        return Object.entries(message).map(([key, value]) =>
                                                <div key={i++}>
                                                    <strong>{getErrorContent(value)}</strong>
                                                </div>
                                );
    };

  return (
            <div className="ErrorMessage">
                {getErrorMessages()}
            </div>
    );
}

export default ErrorMessage;
