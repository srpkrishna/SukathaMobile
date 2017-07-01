'use strict';
import React from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import Colors from '../Utils/colors.js';

let styles = StyleSheet.create({
  backgroundImage: {
    height:150,
    width:undefined,
    alignSelf: 'stretch',
    padding:10,
    flexDirection:'row',
    flexWrap:'wrap',
    flex:1
  },
  textContainer:{
    flex:1,
    flexDirection:'column',
    flexWrap:'wrap'
  },
  shortText:{
    textAlign: 'left',
    lineHeight: 22,
    color:Colors.white,
    fontSize:14,
    backgroundColor:'transparent'
  },
  shortContainer:{
    flex:3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    flexWrap: 'wrap'
  },
  authorText:{
    textAlign: 'right',
    lineHeight: 28,
    color:Colors.white,
    fontSize:16,
    flex:1,
    backgroundColor:'transparent'
  },
  photo:{
    width:100,
    height:100,
    borderRadius:50,
    margin:15,
    marginLeft:0,
    borderWidth: 1,
    borderColor: Colors.white,
  }
});

const Header = ({story})=>{
  var imgSrc = 'https://s3.ap-south-1.amazonaws.com/bsstory/'+story.author+'/profile.jpg';

  return(
    <Image style={styles.backgroundImage} source={require('../Icons/bg.png')} >
      <Image style={styles.photo} source={{uri:imgSrc}} />
      <View style={styles.textContainer}>
        <View style={styles.shortContainer}>
          <Text style={styles.shortText} numberOfLines={4}>{story.shortText}</Text>
        </View>
        <Text style={styles.authorText}>-{story.authorDisplayName}</Text>
      </View>
    </Image>
  )
}

export default Header;
