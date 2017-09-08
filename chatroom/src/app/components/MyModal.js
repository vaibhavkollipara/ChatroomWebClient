import React, { Component } from 'react';

export default class MyModal extends Component {

    static defaultProps = {
        hidden : true,
        title : null,
        contentView : null
    }

    render(){
        return (
                    <div className="mymodal ">
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
        );
    }

}
