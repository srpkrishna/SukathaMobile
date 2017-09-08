import React, { PropTypes } from 'react';
import {StyleSheet ,Text,TouchableOpacity,Dimensions} from 'react-native';
import Colors from '../Utils/colors.js';
import Utils from '../Utils/utilityFunctions.js';

const styles = StyleSheet.create({

  container: {
    height:50,
    width:Dimensions.get('window').width,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  text:
  {
    color:Colors.white,
    fontFamily: 'Lato-Medium',
    fontSize:16,
    paddingLeft:4,
    paddingTop:4
  }
});

class FilterTitle extends React.Component {
  render(){
    var filter = this.props.filter ? this.props.filter : "all"
    var title = Utils.capitalizeFirstLetter(filter) + " ▼"
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.props.openFilters(filter)}><Text style={styles.text}>{title}</Text></TouchableOpacity>
    );
  }
}

export default FilterTitle;
