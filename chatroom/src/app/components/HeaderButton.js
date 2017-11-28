import React, { Component } from 'react';

import Modal from './Modal';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const portalContainer = document.getElementById('modal-root');

export default class HeaderButton extends Component {

  static propTypes={
    settings : PropTypes.arrayOf(PropTypes.shape({
                  name: PropTypes.string,
                  action: PropTypes.func
                })).isRequired
  };

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
                <span onClick={this.toggleSettings.bind(this)} className="glyphicon glyphicon-cog mybutton"></span>
              {
                !this.state.hidden &&
                  createPortal(<Modal title={"Settings"} toggleFunction={this.toggleSettings.bind(this)}>
                      {this.settingsView()}
                    </Modal>, portalContainer)
                }
            </div>
    );
  }
}
