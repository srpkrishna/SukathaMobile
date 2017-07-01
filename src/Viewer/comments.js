'use strict';

import React from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
import Colors from '../Utils/colors.js';

let styles = StyleSheet.create({
  textContainer:{
    flex:1,
    flexDirection:'column',
    flexWrap:'wrap',
    borderBottomWidth: 0.5,
    padding:10,
    borderColor: Colors.sGray
  },
  title:{
    textAlign: 'left',
    color:Colors.sSkyBlue,
    fontWeight:'bold',
    fontSize:17,
    backgroundColor:'transparent',
    flex:1
  },
  shortText:{
    textAlign: 'left',
    lineHeight: 20,
    color:Colors.sBlue,
    fontSize:14,
    backgroundColor:'transparent',
    flex:1
  }
});

class Comments extends React.Component {

  constructor(){
    super();
    this.getCommentView = this.getCommentView.bind(this);
  }

  onReplyPress(userEmail,userName){
    this.props.onReply(userEmail,userName)
  }

  getCommentView(comment,index){
    var userName = comment.userName;
    if(!userName){
      userName = "anonymous"
    }
    userName = userName+":"

    return(
      <View style={styles.textContainer} key={index}>
        <Text style={styles.title}>{userName}</Text>
        <Text style={styles.shortText}>{comment.text}</Text>
        <Button title="Reply" color={Colors.sPink} onPress={this.onReplyPress.bind(this,comment.userEmail,comment.userName)}/>
      </View>
    );
  }

  render(){

    var tag = []
    var comments = this.props.comments
    for (var index = 0; index < comments.length; index++) {
      tag.push(this.getCommentView(comments[index],index));
    }
    // var comments = this.props.comments.map(function(comment,i) {
    //   that.getCommentView(comment)
    // });

    return (
      <View style={{flex: 1, paddingTop: 10}}>
        {tag}
      </View>
    );
  }
}

export default Comments;
