'use strict';
import React from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import Colors from '../Utils/colors.js';

let styles = StyleSheet.create({

  container: {
    width:undefined,
    flexDirection:'column',
    flexWrap:'wrap',
    flex:1,
    backgroundColor:Colors.white,
    alignItems:'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    height:160,
    width:undefined,
    alignSelf: 'stretch',
    flex:1,
    marginBottom:50
  },
  photo:{
    width:100,
    height:100,
    borderRadius:50,
    borderWidth: 2,
    borderColor: Colors.white,
    alignItems:'center',
    top:100,
    position:'absolute'
  },
  textContainer:{
    flex:1,
    flexDirection:'column',
    flexWrap:'wrap',
    padding:10
  },
  intro:{
    textAlign: 'left',
    lineHeight: 25,
    color:Colors.darkGray,
    fontSize:15,
    paddingVertical:15,
    fontFamily:'Lato-Medium'
  },
  authorName:{
    textAlign: 'center',
    color:Colors.sSkyBlue,
    fontWeight:'bold',
    fontSize:17,
    fontFamily:'Lato-Medium'
  },
  qual:{
    textAlign: 'right',
    color:Colors.sBlue,
    fontSize:14,
    paddingVertical:2,
    fontFamily:'Lato-Medium'
  }
});

export default class Block extends React.Component {


  render(){
    var person = this.props.person;
    var intro = ""

    if(person.intro){
      intro = '      ' + person.intro
    }


    return(
      <View style={styles.container} >
        <Image style={styles.backgroundImage} source={require('../Icons/personBg.png')} />
        <Image style={styles.photo} source={{uri:person.imgSrc}} />
        <View style={styles.textContainer}>
          <Text style={styles.authorName}>{person.name}</Text>
          <Text style={styles.qual}>{person.qual}</Text>
          <Text style={styles.intro}>{intro}</Text>
        </View>
      </View>
    )
  }

}
