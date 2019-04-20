import React, { Component } from 'react';
import { TextField } from 'react-native-materialui-textfield';

export class TextInp extends Component{

    state = {
        phone: '',
        call: 'helloraj'
      };
    
      render() {
        let { phone } = this.state;
        return (
          <TextField
            label={this.props.label}
            textColor ={this.props.textColor}
            baseColor ={this.props.baseColor}
            tintColor={this.props.baseColor}
            inputContainerStyle ={this.props.inputContainerStyle}
            onChangeText={ (phone) => this.setState({ phone }) }
          />
        );
      }


}