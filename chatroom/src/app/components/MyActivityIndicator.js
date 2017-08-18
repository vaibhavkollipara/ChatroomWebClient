import React, { Component } from 'react';

import spinner from '../assets/images/spinner-icon.png';

export default class MyActivityIndicator extends Component {
  render() {
    return (
            <div style={styles.activityIndicator}>
                <img src={spinner} alt="Loading..." className="spinner"/>
                <div>
                    {this.props.message}
                </div>

            </div>
        );
  }
}


const styles={
    activityIndicator :{
        textAlign: 'center',
        fontWeight: 'bold'
    }
}
