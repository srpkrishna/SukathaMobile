'use strict';
import React from 'react';
import {View,Text,StyleSheet,TouchableHighlight} from 'react-native';
import Colors from '../Utils/colors.js';


const styles = StyleSheet.create({
  textPress: {
    fontFamily: 'Lato-Medium',
    textAlign: 'center',
    color: Colors.sBlue,
    fontSize:12
  },
  text: {
    fontFamily: 'Lato-Medium',
    textAlign: 'center',
    color: Colors.white,
    fontSize:12
  },
  buttonPress: {
    borderColor: Colors.sBlue,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical:5,
    paddingHorizontal:10
  },
  button: {
    borderColor:  Colors.sBlue,
    backgroundColor:  Colors.sBlue,
    borderWidth: 1,
    borderRadius:15,
    paddingVertical:5,
    paddingHorizontal:10
  },
});

export default class SButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = { pressStatus: false };
  }
  _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }

  render(){
    return(
      <TouchableHighlight
        activeOpacity={1}
        style={ this.state.pressStatus ? styles.buttonPress : styles.button }
        onHideUnderlay={this._onHideUnderlay.bind(this)}
        onShowUnderlay={this._onShowUnderlay.bind(this)} onPress={()=>this.props.onPress()}>
        <Text style={ this.state.pressStatus ? styles.textPress : styles.text }>{this.props.title}</Text>
      </TouchableHighlight>
    );
  }
}
