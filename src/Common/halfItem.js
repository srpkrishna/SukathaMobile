'use strict';
import React from 'react';
import {View,Text,Image,StyleSheet,Platform,TouchableHighlight,TouchableNativeFeedback} from 'react-native';
import Colors from '../Utils/colors.js';

let styles = StyleSheet.create({
  container: {
    height:130,
    width:undefined,
    padding:10,
    flexDirection:'row',
    flexWrap:'wrap',
    flex:1,
    backgroundColor:Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 0.2,
    borderWidth: 0.5,
    borderColor: Colors.sGray
  },
  textContainer:{
    flex:1,
    flexDirection:'column',
    flexWrap:'wrap'
  },
  shortContainer:{
    flex:3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    flexWrap: 'wrap'
  },
  shortText:{
    textAlign: 'left',
    lineHeight: 20,
    color:Colors.sBlue,
    fontSize:14,
    backgroundColor:'transparent',
  },
  title:{
    textAlign: 'center',
    color:Colors.sSkyBlue,
    fontWeight:'bold',
    fontSize:17,
    flex:1.2,
    backgroundColor:'transparent'
  },
  extraInfo:{
    textAlign: 'right',
    color:Colors.sBlue,
    fontSize:14,
    flex:1,
    opacity:0.8,
    backgroundColor:'transparent'
  },
  photo:{
    width:100,
    height:100,
    borderRadius:50,
    margin:5,
    marginLeft:0,
    borderWidth: 1,
    borderColor: Colors.white,
  }
});

export default class Block extends React.Component {
  onPressRow(){
    this.props.onPress(this.props.item);
  }

  render(){
    var item = this.props.item;

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }

    return(
      <TouchableElement onPress={this.onPressRow.bind(this)}>
      <View style={styles.container} >
        <Image style={styles.photo} source={{uri:item.imgSrc}} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.shortContainer}>
            <Text style={styles.shortText} numberOfLines={2}>{item.shortText}</Text>
          </View>
          <Text style={styles.extraInfo}>{item.metric}</Text>
        </View>
      </View>
      </TouchableElement>
    )
  }

}
