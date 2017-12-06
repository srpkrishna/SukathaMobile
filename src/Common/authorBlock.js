'use strict';
import React from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';
import Colors from '../Utils/colors.js';

let styles = StyleSheet.create({
  container: {
    paddingHorizontal:10,
    paddingTop:5,
    paddingBottom:25,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    flex:1,
    backgroundColor:Colors.white,
    marginVertical:5
  },
  textContainer:{
    flex:1,
    flexDirection:'column',
    flexWrap:'wrap'
  },
  shortIntro:{
    textAlign: 'left',
    color:Colors.darkGray,
    fontSize:14,
    lineHeight:16,
    opacity:0.9,
    backgroundColor:'transparent',
    fontFamily:'Lato-Medium',
    padding:5
  },
  authorName:{
    textAlign: 'left',
    color:Colors.sSkyBlue,
    fontWeight:'bold',
    fontSize:17,
    backgroundColor:'transparent',
    fontFamily:'Lato-Medium',
    paddingLeft:5,
    paddingBottom:2
  },
  readMore:{
    textAlign: 'right',
    color:Colors.sSkyBlue,
    fontSize:25,
    backgroundColor:'transparent',
    padding:5
  },
  photo:{
    width:100,
    height:100,
    borderRadius:50,
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

    return(
      <TouchableOpacity onPress={this.onPressRow.bind(this)}>
        <View style={styles.container} >
          <Image style={styles.photo} source={{uri:imgSrc}} />
          <View style={styles.textContainer}>
            <Text style={styles.authorName}>{author.profile.fullName}</Text>
            <Text style={styles.shortIntro} numberOfLines={3}>{author.profile.intro}</Text>
          </View>
          <Text style={styles.readMore}>{">"}</Text>
        </View>

      </TouchableOpacity>
    )
  }

}
