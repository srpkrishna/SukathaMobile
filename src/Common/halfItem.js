'use strict';
import React from 'react';
import {View,Text,Image,StyleSheet,Platform,TouchableOpacity} from 'react-native';
import Colors from '../Utils/colors.js';

let styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    flex:1,
    backgroundColor:Colors.white,
    // borderBottomWidth: 0.5,
    // borderColor: Colors.sGray,
    paddingBottom:10,
    margin:10,

  },
  textContainer:{
    flex:1,
    flexDirection:'column'
  },
  shortText:{
    textAlign: 'left',
    lineHeight: 22,
    color:Colors.darkGray,
    fontSize:15,
    backgroundColor:'transparent',
    fontFamily:'NotoSansTelugu',
    padding:5
  },
  title:{
    textAlign: 'left',
    color:Colors.sSkyBlue,
    fontWeight:'bold',
    fontSize:20,
    backgroundColor:'transparent',
    fontFamily:'NotoSansTelugu',
    paddingLeft:5
  },
  extraInfo:{
    textAlign: 'right',
    color:Colors.black,
    fontSize:14,
    opacity:0.8,
    backgroundColor:'transparent',
    fontFamily:'Lato-Light'
  },
  photo:{
    width:100,
    height:100,
    borderRadius:50,
    margin:5,
    marginLeft:0,
    borderWidth: 1,
    borderColor: Colors.darkGray,
  }
});

export default class Block extends React.Component {
  onPressRow(){
    this.props.onPress(this.props.item);
  }

  render(){
    var item = this.props.item;

    return(
      <TouchableOpacity onPress={this.onPressRow.bind(this)}>
      <View style={styles.container} >
        <Image style={styles.photo} source={{uri:item.imgSrc}} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.shortText} numberOfLines={2}>{item.shortText}</Text>
          <Text style={styles.extraInfo}>{item.metric}</Text>
        </View>
      </View>
      </TouchableOpacity>
    )
  }

}
