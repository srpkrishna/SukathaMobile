'use strict';
import React from 'react';
import {Text,StyleSheet,TouchableOpacity,View,Image} from 'react-native';
import Colors from '../Utils/colors.js';
import CommonStyles from '../Utils/styles.js';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    padding:10,
    paddingHorizontal:20,
    borderTopWidth: 1.5,
    borderTopColor: Colors.sGray,
    position: 'absolute',
    left:0,
    right:0,
    bottom:0,
    backgroundColor:Colors.white,
    zIndex:100
  },
  buttonContainer:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    fontFamily: 'Lato-Medium',
    color:Colors.darkGray,
    padding:5,
    textAlign:'left',
  },
  barIcon:{
    tintColor: Colors.darkGray,
    width: 24,
    height: 24
  }
});

export default class SocialBar extends React.Component {

  constructor(props) {
    super(props);
  }

  likeButton(){
    this.props.action("likes");
  }

  shareButton(){
    this.props.action("shares");
  }

  commentButton(){
    this.props.action("comments");
  }

  render(){

    var likeIconStyle = this.props.isLiked ? [styles.barIcon,{tintColor:Colors.sSkyBlue}] : styles.barIcon
    var likeTextStyle = this.props.isLiked ? [styles.text,{color:Colors.sSkyBlue}] : styles.text

    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={this.likeButton.bind(this)} style={styles.buttonContainer}>
          <Image source={require('../Icons/like.png')} style={likeIconStyle}/>
          <Text style={likeTextStyle}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.commentButton.bind(this)} style={styles.buttonContainer}>
          <Image source={require('../Icons/comment.png')} style={styles.barIcon}/>
          <Text style={styles.text}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.shareButton.bind(this)} style={styles.buttonContainer}>
          <Image source={require('../Icons/share.png')} style={styles.barIcon}/>
          <Text style={styles.text}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
