import React, { Component } from 'react';


export default class ConfirmationModal extends Component {

    contentView(){
       return ( <div style={styles.contentView}>
                    {this.props.message}
                </div>
        )
    }

    render(){
        return (
            <div className="mymodal">
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
