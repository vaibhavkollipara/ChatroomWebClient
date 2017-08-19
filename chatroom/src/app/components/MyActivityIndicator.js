import React, { Component } from 'react';

import spinner from '../assets/images/spinner-icon.png';

export default class MyActivityIndicator extends Component {
  render() {
    return (
            <div className="activityIndicator">
                <img src={spinner} alt="Loading..." className="spinner"/>
                <div>
                    {this.props.message}
                </div>

            </div>
        );
  }
}
