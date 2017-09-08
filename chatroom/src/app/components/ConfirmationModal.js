import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class ConfirmationModal extends Component {

    contentView(){
       return ( <div style={styles.contentView}>
                    {this.props.message}
                </div>
        )
    }

    render(){
        return (
            <ReactCSSTransitionGroup
                      transitionName="zoominout"
                      transitionAppear={true}
                      transitionAppearTimeout={1000}
                      transitionEnter={true}
                      transitionEnterTimeout={1000}
                      transitionLeave={true}
                      transitionLeaveTimeout={1000}>
            <div key={1} className="mymodal ">
                    <div className="modalTitle">
                        {this.props.title}
                    </div>
                    <div className="confirmationModalContent">
                       {this.contentView()}
                    </div>
                    <div className="confirmationModalFooter">
                        <div onClick={this.props.toggleFunction.bind(this)} className="confirmationModalButton">
                            Cancle
                        </div>
                        <div onClick={this.props.confirmAction.bind(this)} className="confirmationModalButton">
                            Confirm
                        </div>
                    </div>

                </div>
            </ReactCSSTransitionGroup>
        );
    }

}

const styles= {
    contentView : {
        fontWeight:'bold',
        padding:10,
        textAlign:'center'
    }
}
