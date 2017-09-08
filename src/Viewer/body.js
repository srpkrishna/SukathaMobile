'use strict';

import React from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import Colors from '../Utils/colors.js';

const styles = StyleSheet.create({
  para:{
    textAlign: 'left',
    lineHeight: 30,
    color:Colors.sBlue,
    fontSize:18,
    paddingTop:15,
    fontFamily:'NotoSansTelugu'
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
    paddingTop:0,
    paddingBottom:30,
    backgroundColor:Colors.white,
    flex:1
  }
});

export default class Body extends React.Component {

  getStyle(obj){
    var serverStyle = {}
    if(obj.color){
      serverStyle.color = obj.color
    }

    if(obj.textAlign){
      serverStyle.textAlign = obj.textAlign
    }

    if(obj.fontWeight){
      serverStyle.fontWeight = obj.fontWeight
    }

    if(obj.fontVariant){
      serverStyle.fontVariant = obj.fontVariant
    }

    if(obj.fontStyle){
      serverStyle.fontStyle = obj.fontStyle
    }
    return serverStyle;
  }
  render(){
    const content = this.props.content
    let htmlContent = [];

    if(!content.code)
    {
      const contentStyles = content.styles;
      var i = 0;
      for (var paraObj of content.content){
        let paraStyle = contentStyles[paraObj.style];


        if(paraObj.imgsrc){
          // let imgStyle = styles[paraObj.imgstyle];
          // if(!imgStyle)
          //   imgStyle = styles["defaultImg"];
          htmlContent.push(<Image source={{uri:paraObj.imgsrc}} key={'img'+i} style={styles.photo} />)
        }

        if(paraObj.text){
          var text = '      ' + paraObj.text

          var textStyles = [styles.para]
          if(paraStyle){
            textStyles.push(this.getStyle(paraStyle))

            if(paraStyle && (paraStyle.textAlign || paraStyle.textIndent)){
              text = paraObj.text
            }
          }
          htmlContent.push(<Text style={textStyles} key={i}>{text}</Text>);
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
