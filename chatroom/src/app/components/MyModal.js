import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class MyModal extends Component {

    static defaultProps = {
        hidden : true,
        title : null,
        contentView : null
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
                        <div className="modalContent">
                           {this.props.contentView}
                        </div>
                        <div className="modalFooter">
                            <div onClick={this.props.toggleFunction.bind(this)} className="footerButton">X</div>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
        );
    }

}
