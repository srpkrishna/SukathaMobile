'use strict';

import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Colors from '../Utils/colors.js';
import SButton from '../Common/sButton.js';

let styles = StyleSheet.create({
  textContainer:{
    flex:1,
    flexDirection:'column',
    // borderBottomWidth: 0.5,
    margin:15,
    marginTop:5
    // borderColor: Colors.sGray
  },
  title:{
    textAlign: 'left',
    color:Colors.sSkyBlue,
    fontWeight:'bold',
    fontSize:15,
    backgroundColor:'transparent',
    flex:1,
    fontFamily:'Lato-Medium'
  },
  msg:{
    textAlign: 'left',
    color:Colors.darkGray,
    fontSize:14,
    backgroundColor:'transparent',
    flex:1,
    fontFamily:'Lato-Medium',
    paddingVertical:5
  },
  replyButton:{
    flex:1,
    alignItems:'flex-end',
    marginBottom:10,
  },
  replyText:{
    fontFamily:'Lato-Medium',
    color:Colors.black,
  },
  showMore:{
    marginTop:15,
    marginBottom:20,
    alignItems:'center'
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
        <Text style={styles.msg}>{comment.text}</Text>
        <View style={styles.replyButton}>
          <TouchableOpacity activeOpacity={0.5} onPress={this.onReplyPress.bind(this,comment.userEmail,comment.userName)}>
            <Text  style={styles.replyText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render(){

    var tag = []
    var comments = this.props.comments
    for (var index = 0; index < comments.length; index++) {
      tag.push(this.getCommentView(comments[index],index));
    }

    if(this.props.shdShowMoreComments){
      tag.push(<View style={styles.showMore} key={comments.length} ><SButton title={'More comments'} onPress={this.props.showMoreComments}/></View>);
    }

    return (
      <View style={{flex: 1, paddingTop: 10}}>
        {tag}
      </View>
    );
  }
}

export default Comments;
