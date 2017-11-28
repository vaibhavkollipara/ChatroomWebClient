import React, { Component } from 'react';
import Transition from './Transition';

import PropTypes from 'prop-types';

export default class Modal extends Component {

  static propTypes = {
    toggleFunction : PropTypes.func.isRequired,
    title : PropTypes.string.isRequired
  };

    render(){
        return(
            <Transition classname="Modal">
                  <div key={0} className="content">
                      <div className="title">{this.props.title}</div>
                      {this.props.children}
                  </div>
                  <div key={1} className="footer">
                      <div className="close_button" onClick={this.props.toggleFunction.bind(this)}>
                        <span className="glyphicon glyphicon-remove"></span>
                      </div>
                  </div>
            </Transition>
        );
    }

}
