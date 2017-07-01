'use strict';

import React from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import Colors from '../Utils/colors.js';

const styles = StyleSheet.create({
  para:{
    textAlign: 'left',
    lineHeight: 28,
    color:Colors.sBlue,
    fontSize:16,
    paddingTop:15
  },
  paraHighlight:{
    textAlign: 'center',
    color:Colors.sPink
  },
  photo: {
    flex:1,
    height:250,
    marginTop:15,
    marginBottom:15,
  },
  container:{
    flexDirection:'column',
    flexWrap:'wrap',
    padding: 10,
    paddingBottom:30,
    backgroundColor:Colors.white,
    flex:1
  }
});

export default class Body extends React.Component {

  render(){
    const content = this.props.content
    let htmlContent = [];

    if(!content.code)
    {
      //const styles = content.styles;
      var i = 0;
      for (var paraObj of content.content){
        // let paraStyle = styles[paraObj.style];
        // if(!paraStyle){
        //   paraStyle = styles["default"];
        // }

        if(paraObj.imgsrc){
          // let imgStyle = styles[paraObj.imgstyle];
          // if(!imgStyle)
          //   imgStyle = styles["defaultImg"];
          htmlContent.push(<Image source={{uri:paraObj.imgsrc}} key={'img'+i} style={styles.photo} />)
        }

        if(paraObj.text){
          var text = '      ' + paraObj.text
          htmlContent.push(<Text style={styles.para} key={i}>{text}</Text>);
        }
        i++;
      }

      htmlContent.push(<Text style={[styles.para,styles.paraHighlight]} key={i}>{"'కిక్' ఇచ్చేవి చాలా ఉండొచ్చు. కాని అందులో ఆరోగ్యానికి హానికరం కానివి మాత్రం మీ కామెంట్స్, లైక్స్ మరియు షేర్స్!"}</Text>);
      return(
        <View style={styles.container}>
          {htmlContent}
        </View>
      )

    }else{
      return (
        <View style={{flex: 1, paddingTop: 10}}>
          <ActivityIndicator />
        </View>
      );
    }
  }

}
