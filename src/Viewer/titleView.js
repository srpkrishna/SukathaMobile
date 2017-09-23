'use strict';
import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Colors from '../Utils/colors.js';

let styles = StyleSheet.create({
  headerTitle:{
    textAlign: 'center',
    alignSelf:'center',
    fontFamily:'NotoSansTelugu',
    fontSize:22,
    color:Colors.white,
    marginVertical:2
  }
})
const TitleView = ({story,series,title,isSeries})=>{

  var displayTitle = title;

  if(!displayTitle){
    if(story && !isSeries){
      displayTitle = story.displayName
    }else if(series){
      displayTitle = series.displayName
    }else{
      displayTitle = ""
    }
  }
  return(<Text style={styles.headerTitle}>{displayTitle}</Text>)
}

export default TitleView;
