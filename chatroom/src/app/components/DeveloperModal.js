import React, { Component } from 'react';

import MyModal from './MyModal';
import MyButton from './MyButton';
import ErrorMessage from './ErrorMessage';
import MyActivityIndicator from './MyActivityIndicator';
import {baseUrl} from '../actions/baseurl';


export default class NewChatroomModal extends Component {


  DeveloperDetailsView(){
            return (
                    <div className="developerView">
                        <div style={{padding:10}}>
                            <h2>Vaibhav Kollipara</h2>
                            <div>vkollip1@binghamton.edu</div>
                            <div>660-528-5433</div>
                        </div>
                    </div>
                );
    }

  render() {
    return (
        <MyModal
            title={"Developer Details"}
            toggleFunction={this.props.toggleFunction.bind(this)}
            contentView={this.DeveloperDetailsView()}
        />
    );
  }
}
