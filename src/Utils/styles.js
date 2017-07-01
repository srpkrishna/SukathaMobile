import {StyleSheet} from 'react-native';
import Colors from './colors.js'

const Styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  sectionHeader:{
    flex: 1,
    height: 35,
    justifyContent:'center',
    backgroundColor:Colors.sGray,
  },
  sectionTitle:{
    color:Colors.black,
    paddingLeft:5
  }
});

export default Styles;
