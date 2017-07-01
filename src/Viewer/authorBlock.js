'use strict';
import React from 'react';
import {View,Text,Image,StyleSheet,Platform,TouchableHighlight,TouchableNativeFeedback} from 'react-native';
import Colors from '../Utils/colors.js';

let styles = StyleSheet.create({
  container: {
    height:160,
    width:undefined,
    padding:10,
    flexDirection:'row',
    flexWrap:'wrap',
    flex:1,
    backgroundColor:Colors.white,
    // marginTop:15,
    // marginHorizontal:6,
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
  shortIntro:{
    textAlign: 'left',
    lineHeight: 20,
    color:Colors.sBlue,
    fontSize:14,
    opacity:0.9,
    backgroundColor:'transparent',
  },
  authorName:{
    textAlign: 'center',
    color:Colors.sSkyBlue,
    fontWeight:'bold',
    fontSize:17,
    flex:1.2,
    backgroundColor:'transparent'
  },
  readMore:{
    textAlign: 'right',
    color:Colors.sPink,
    fontSize:14,
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

export default class Block extends React.Component {
  onPressRow(){
    this.props.openAuthor(this.props.author);
  }

  render(){
    var author = this.props.author;
    var imgSrc = 'https://s3.ap-south-1.amazonaws.com/bsstory/'+author.penName+'/profile.jpg';

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }

    return(
      <TouchableElement onPress={this.onPressRow.bind(this)}>
      <View style={styles.container} >
        <Image style={styles.photo} source={{uri:imgSrc}} />
        <View style={styles.textContainer}>
          <Text style={styles.authorName}>{author.profile.fullName}</Text>
          <View style={styles.shortContainer}>
            <Text style={styles.shortIntro} numberOfLines={3}>{author.profile.intro}</Text>
          </View>
          <Text style={styles.readMore}>{"His stories >"}</Text>
        </View>
      </View>
      </TouchableElement>
    )
  }

}
