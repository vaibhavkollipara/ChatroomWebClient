import React, { Component } from 'react';
import Header from '../components/Header';

import MyModal from '../components/MyModal';
import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';
import ConfirmationModal from '../components/ConfirmationModal';


export default class Test extends Component {


    settings(){
        return [
            { name : 'Setting 1',
              action : () => {alert("Setting 1 Functionality...");}
            },
            { name : 'Setting 2',
              action : () => {alert("Setting 2 Functionality...");}
            },
            { name : 'Setting 3',
              action : () => {alert("Setting 3 Functionality...");}
            },
            { name : 'Setting 1',
              action : () => {alert("Setting 1 Functionality...");}
            },
            { name : 'Setting 2',
              action : () => {alert("Setting 2 Functionality...");}
            },
            { name : 'Setting 3',
              action : () => {alert("Setting 3 Functionality...");}
            },
            { name : 'Setting 1',
              action : () => {alert("Setting 1 Functionality...");}
            },
            { name : 'Setting 2',
              action : () => {alert("Setting 2 Functionality...");}
            },
            { name : 'Setting 3',
              action : () => {alert("Setting 3 Functionality...");}
            },
            { name : 'Setting 2',
              action : () => {alert("Setting 2 Functionality...");}
            },
            { name : 'Setting 3',
              action : () => {alert("Setting 3 Functionality...");}
            },
            { name : 'Setting 1',
              action : () => {alert("Setting 1 Functionality...");}
            },
            { name : 'Setting 2',
              action : () => {alert("Setting 2 Functionality...");}
            },
            { name : 'Setting 3',
              action : () => {alert("Setting 3 Functionality...");}
            }
        ]
    }

  largeScreenView(){
    return (
            <div className="largeView">
                <MyActivityIndicator message={"Under Construction"}/>
            </div>
          );
  }

  smallScreenView(){
    return (
            <div className="smallView">

            </div>
          );
  }

  render() {

    return (
      <div className="baseContainer">
        <Header title={"test"} settings={this.settings()} backFunction={() => {alert("Hi")}}/>
        {this.smallScreenView()}
        {this.largeScreenView()}
      </div>
    );
  }
}
