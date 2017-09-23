'use strict';

import React from 'react';
import {StyleSheet,Button,Image,View,Text,TouchableOpacity} from 'react-native';
import Utils from '../Utils/utilityFunctions.js';
import Colors from '../Utils/colors.js';

const styles = StyleSheet.create({
  item:{
    backgroundColor:Colors.white,
    padding:15,
    borderTopWidth: 0.5,
    borderBottomWidth:0.5,
    borderColor: Colors.sGray,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    marginBottom:10,
    elevation:2
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'flex-start',
  },
  authPhoto:{
    width:50,
    height:50,
    borderRadius:25
  },
  textAuthor: {
    fontSize:15,
    textAlign:'left',
    color:Colors.black,
    fontFamily: 'Lato-Bold'
  },
  topInfo: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'flex-start',
    justifyContent: 'center',
    paddingHorizontal:5
  },
  textShortText: {
    fontSize: 16,
    textAlign: 'left',
    color:Colors.darkGray,
    fontFamily:'NotoSansTelugu',
    fontWeight:"100",
    marginTop:15,
    marginBottom:10
  },
  storyContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.sGray,
    shadowColor: Colors.black,
    backgroundColor:Colors.white,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation:2
  },
  photo: {
    flex:1,
    height:200,
    width:undefined,
    alignSelf: 'stretch'
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'flex-start',
    justifyContent: 'flex-start',
    paddingVertical:10,
    paddingHorizontal:5,
    alignSelf: 'stretch',
    borderTopWidth: 0.5,
    borderColor: Colors.sGray,
    width:undefined
  },
  textTitle: {
    textAlign: 'left',
    color:Colors.black,
    fontFamily:'NotoSansTelugu',
    fontSize: 18,
    fontWeight:'bold',
  },
  storyInfo:{
    fontSize:14,
    flex: 1,
    textAlign:'left',
    color:Colors.black,
    fontFamily: 'Lato-Light',
  },
  metricRow:{
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingVertical:10,
  },
  metric:{
    fontSize:14,
    textAlign:'left',
    color:Colors.darkGray,
    fontFamily: 'Lato-Regular',
  }
});

export default class Item extends React.Component {

  onPressRow(){
    this.props.onPress(this.props.index);
  }

  render(){

    const data =  this.props.data;
    const name = Utils.removeSpaceAndCapitals(data.name);
    const imgSrc = 'https://s3.ap-south-1.amazonaws.com/bsstory/'+data.author+'/'+name+'/cover.jpg';
    const authImage = 'https://s3.ap-south-1.amazonaws.com/bsstory/'+data.author+'/profile.jpg'

    var storyInfo = ""

    if(data.time){
      var mins = " mins"
      if(1 === data.time)
        mins  = " min"

      storyInfo = data.time+mins+" "
    }

    if(data.genre && data.genre.length > 0){
      storyInfo = storyInfo+Utils.capitalizeFirstLetter(data.genre[0]);
      for(var i = 1 ; i < data.genre.length ; i++){
        storyInfo = storyInfo +", "+Utils.capitalizeFirstLetter(data.genre[i])
      }
    }

    var viewsMetric = ""
    var views = " views"
    if(1 === data.social.views)
      views = " view"

    viewsMetric = data.social.views+views

    var rightMetric = ""
    if(data.social.likes > 1){
        rightMetric = data.social.likes+" likes"
    }else if(data.social.likes > 0){
        rightMetric = data.social.likes+" like"
    }


    if(data.social.shares > 1){
      rightMetric = rightMetric + "  "+data.social.shares+" shares"
    }else if(data.social.shares > 0){
      rightMetric = rightMetric + "  "+data.social.shares+" share"
    }

    return (

            <View style={styles.item}>
              <View style={styles.row}>
                <Image style={styles.authPhoto} source={{uri:authImage}} />
                <View style={styles.topInfo}>
                  <Text style={styles.textAuthor}>{data.authorDisplayName}</Text>
                </View>
              </View>
              <Text style={styles.textShortText}>{data.shortText}.</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={this.onPressRow.bind(this)}>
                <View style={styles.storyContainer}>
                  <Image style={styles.photo} source={{uri:imgSrc}} />
                  <View style={styles.info}>

                    <Text style={styles.textTitle}>{data.displayName}</Text>
                    <Text style={styles.storyInfo}>{storyInfo}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.metricRow}>
               <Text style={styles.metric}>{viewsMetric}</Text>
               <Text style={styles.metric}>{rightMetric}</Text>
              </View>
            </View>

    )

  }

}
