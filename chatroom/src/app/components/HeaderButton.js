import React, { Component } from 'react';

import MyModal from './MyModal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
export default class HeaderButton extends Component {

constructor(){
        super();
        this.state = {
            hidden : true
        };
  }

  componentDidMount(){

  }

  renderSettings(setting){
    let i=1;
    return  this.props.settings.map((setting) =>
                <div className="settingItem" onClick={() => {
                        this.toggleSettings();
                        setting.action();
                    }} key={i++}>
                    {setting.name}
                </div>
        );
  }

    toggleSettings(){
        this.setState({
            hidden : !this.state.hidden
        });
    }

    settingsView(){
        return (
            <div className="settingsContainer">
                {this.renderSettings()}
            </div>
        );
    }

  render() {
    return (
            <div className="HeaderButton">
                <ReactCSSTransitionGroup
                      transitionName="zoominout"
                      transitionAppear={true}
                      transitionAppearTimeout={1000}
                      transitionEnterTimeout={1000}
                      transitionLeaveTimeout={1000}>
                <button key={1} onClick={this.toggleSettings.bind(this)} type="button" className="btn btn-default btn-md">
                      <div style={{fontWeight:'bold'}}>settings</div>
                </button>
                {
                    !this.state.hidden &&
                    <MyModal
                    key={2}
                    title={"Settings"}
                    contentView={this.settingsView()}
                    toggleFunction={this.toggleSettings.bind(this)}
                />
                }

              </ReactCSSTransitionGroup>
            </div>
    );
  }
}
