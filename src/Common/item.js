'use strict';

import React from 'react';
import {StyleSheet,Button,Image,View,Text,Platform ,TouchableHighlight,TouchableNativeFeedback} from 'react-native';
import Utils from '../Utils/utilityFunctions.js'
import Colors from '../Utils/colors.js';

const styles = StyleSheet.create({
  item:{
    height:350,
    backgroundColor:Colors.white,
    margin:5,
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: Colors.sGray,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 0.2
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    padding:10
  },
  textTitle: {
    fontSize: 16,
    flex: 1,
    textAlign: 'left',
    color:Colors.black,
    paddingTop:4
  },
  textShortText: {
    fontSize: 16,
    flex: 2,
    textAlign: 'left',
    color:Colors.black,
    paddingTop:4,
    opacity:0.6
  },
  textAuthor: {
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
    color:Colors.black,
    paddingTop:4
  },
  photo: {
    flex:2
  },
});

export default class Item extends React.Component {

  onPressRow(){
    this.props.onPress(this.props.index);
  }

  render(){

    const data =  this.props.data;
    const name = Utils.removeSpaceAndCapitals(data.name);
    const imgSrc = 'https://s3.ap-south-1.amazonaws.com/bsstory/'+data.author+'/'+name+'/cover.jpg';
    var mins = "mins"
    if(1 === data.time)
      mins  = "min"

    var metrics =data.time+mins

    if(data.genre && data.genre.length > 0){
      metrics = metrics+" . "+Utils.capitalizeFirstLetter(data.genre[0]);
      for(var i = 1 ; i < data.genre.length ; i++){
        metrics = metrics +"-"+Utils.capitalizeFirstLetter(data.genre[i])
      }
    }

    var views = "views"
    if(1 === data.social.views)
      views = "view"

    metrics = metrics +" . "+data.social.views+views

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }

    return (
          <TouchableElement onPress={this.onPressRow.bind(this)}>
            <View style={styles.item}>
              <Image style={styles.photo} source={{uri:imgSrc}} />
              <View style={styles.info}>
                <Text style={styles.textTitle}>{data.displayName}</Text>
                <Text style={styles.textShortText}>{data.shortText}</Text>
                <Text style={styles.textAuthor}>- {data.authorDisplayName}</Text>
              </View>
            </View>
          </TouchableElement>
    )

  }

}
