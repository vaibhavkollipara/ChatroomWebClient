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
        backgroundColor: '#f9fafc',
        color:'red',
        textAlign:'center',
        borderRadius:10,
        padding:1
    },
    container:{
        marginTop:2
    }
}
