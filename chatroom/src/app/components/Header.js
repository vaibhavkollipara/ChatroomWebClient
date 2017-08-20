import React, { Component } from 'react';

import HeaderButton from './HeaderButton';

export default class Header extends Component {

  static defaultProps = {
    title : "",
    settings : null,
    backFunction : null
  }

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
        <div className="largeView">
                <div className="header">
                              <div className="headerBackButton">
                                CHATROOM
                              </div>
                            <div className="headerTitle" style={this.titleSize()}>
                                {this.displayTitle()}
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

  smallScreenView(){
        return (
            <div className="smallView">
                <div className="header">
                    {
                      this.props.backFunction &&
                      <div className="headerBackButton">
                      <a>
                        <span style={{color:'white'}} onClick={this.props.backFunction.bind(this)} className="glyphicon glyphicon-arrow-left"></span>
                        </a>
                      </div>
                    }
                    <div className="headerTitle" style={this.titleSize()}>
                        {this.displayTitle()}
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
            <div>
                {this.smallScreenView()}
                {this.largeScreenView()}
            </div>
        );
  }
}
