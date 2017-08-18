import React, { Component } from 'react';

export default class ErrorMessage extends Component {

    getErrorContent(errors){
        if(Array.isArray(errors)){
            let i=1;
            return errors.map((error)=>
                <div key={i++} >
                    {error}
                </div>);
        }else{
            return (<div>
                        {errors}
                    </div>
                );
        }
    }

    getErrorMessages(){
        console.log(this.props.message);
        let i=1;
        return Object.entries(this.props.message).map(([key, value]) =>
                                                <div key={i++} style={styles.errorbox}>
                                                    <strong>{this.getErrorContent(value)}</strong>
                                                </div>
                                );
    }

  render() {

    return (
        <div style={styles.container}>
                {this.getErrorMessages()}
        </div>
    );
  }
}


const styles={
    errorbox:{
        backgroundColor: 'white',
        color:'red',
        textAlign:'center'
    },
    container:{
        padding:10,
        margin:10
    }
}
