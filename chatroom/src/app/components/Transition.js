import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Transition extends Component{

    static defaultProps= {
        appear: true,
        enter: true,
        leave: true,
        classname: "Transition"
    }

    render(){
        return(
            <ReactCSSTransitionGroup
                      component="div"
                      className={this.props.classname}
                      transitionName="zoominout"
                      transitionAppear={this.props.appear}
                      transitionAppearTimeout={1000}
                      transitionEnter={this.props.enter}
                      transitionEnterTimeout={1000}
                      transitionLeave={this.props.leave}
                      transitionLeaveTimeout={1000}>
                    {this.props.children}
            </ReactCSSTransitionGroup>
        );
    }

}
