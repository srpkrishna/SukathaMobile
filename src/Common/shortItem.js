'use strict';

import React from 'react';
import {StyleSheet,Button,Image,View,Text,TouchableOpacity} from 'react-native';
import Utils from '../Utils/utilityFunctions.js';
import Colors from '../Utils/colors.js';

const styles = StyleSheet.create({
  item:{
    backgroundColor:Colors.white,
    padding:15,
    borderTopWidth: 0.5,
    borderBottomWidth:0.5,
    borderColor: Colors.sGray,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    marginBottom:10,
    elevation:2,
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap'
  },
  cancel:{
    fontSize:16,
    color:Colors.sPink,
    fontFamily: 'Lato-Regular'
  },
  textInfo: {
    fontSize:15,
    textAlign:'left',
    color:Colors.black,
    fontFamily: 'Lato-Bold'
  }

});

  export default class ShortItem extends React.Component {

    onPressAction(){
      this.props.onPress(this.props.index);
    }

    render(){
      return (
        <View style={styles.item}>
          <TouchableOpacity onPress={this.onPressAction.bind(this)}>
            <Text><Text style={styles.textInfo}>{this.props.info}</Text>
            <Text style={styles.cancel}>{this.props.actionTitle}</Text></Text>
            
          </TouchableOpacity>
        </View>
      );
    }
  }
