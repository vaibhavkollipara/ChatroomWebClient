import React, { Component } from 'react';

import HeaderButton from './HeaderButton';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Transition from './Transition';

export default class Header extends Component {

  static propTypes = {
    title : PropTypes.string.isRequired,
    settings : PropTypes.arrayOf(PropTypes.shape({
                  name: PropTypes.string,
                  action: PropTypes.func
                })),
    backFunction : PropTypes.func
  };

  static defaultProps = {
    title : "",
    settings : null,
    backFunction : null
  };

  displayTitle(){
    if(this.props.title.length<=15){
        return this.props.title.toUpperCase();
    }else{
        return `${this.props.title.substring(0,9)}...`.toUpperCase();
    }
  }

  titleSize(){
    if(this.props.backFunction){
        return {
            flex:5
        }
    }else{
        return {
            flex:5,
            marginLeft:30
        }
    }
  }

  largeScreenView(){
    return(
        <Transition className="largeView">
                <div className="header">
                              <div className="headerBackButton">
                                CHATROOM
                              </div>
                            <div className="headerTitle">
                                  {this.displayTitle()}
                            </div>
                            {this.props.settings &&
                                <div className="headerSettings">
                                    <HeaderButton settings={this.props.settings}/>
                                </div>
                            }
                        </div>
          </Transition>
        );
  }

  smallScreenView(){
        return (
            <div className="smallView">
                <div className="header">
                    {
                      this.props.backFunction &&
                      <div className="headerBackButton">
                      <a>
                        <ReactCSSTransitionGroup
                                transitionName="zoominout"
                                transitionAppear={true}
                                transitionAppearTimeout={1000}
                                transitionEnterTimeout={1000}
                                transitionLeaveTimeout={1000}>
                        <span style={{color:'white'}} onClick={this.props.backFunction.bind(this)} className="glyphicon glyphicon-arrow-left"></span>
                        </ReactCSSTransitionGroup>
                        </a>
                      </div>
                    }
                      <div className="headerTitle" style={this.titleSize()}>
                          <ReactCSSTransitionGroup
                                transitionName="zoominout"
                                transitionAppear={true}
                                transitionAppearTimeout={1000}
                                transitionEnterTimeout={1000}
                                transitionLeaveTimeout={1000}>
                                  <div key={0}>{this.displayTitle()}</div>
                                </ReactCSSTransitionGroup>
                      </div>
                    {this.props.settings &&
                        <div className="headerSettings">
                            <HeaderButton settings={this.props.settings}/>
                        </div>
                    }
                </div>
        </div>
      );
  }

  render() {
        return(
            <div className="Header">
                    {
                      this.props.backFunction &&
                      <span key={0} onClick={this.props.backFunction.bind(this)} className="glyphicon glyphicon-arrow-left backbutton"></span>
                    }
                    <div key={1} className="title">
                      {this.displayTitle()}
                    </div>
                    {
                      this.props.settings &&
                      <HeaderButton key={2} settings={this.props.settings}/>
                    }
            </div>
        );
  }
}
