import React, { Component } from 'react';

import MyModal from './MyModal';

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
                <button onClick={this.toggleSettings.bind(this)} type="button" className="btn btn-default btn-md">
                      <div style={{fontWeight:'bold'}}>settings</div>
                </button>
                {
                    !this.state.hidden &&
                    <MyModal
                    title={"Settings"}
                    contentView={this.settingsView()}
                    toggleFunction={this.toggleSettings.bind(this)}
                />
                }
            </div>
    );
  }
}

const styles={
    settingsContainer:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        textAlign:'center'
    },
    settingItem :{
        backgroundColor:'white',
        flex:1,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        textAlign:'center',
        padding:10,
        margin:5,
        border:"2px solid black",
        borderRadius: 10,
        fontWeight:'bold'
    }
}
