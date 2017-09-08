import {StyleSheet} from 'react-native';
import Colors from './colors.js'

const Styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  sectionHeader:{
    flex: 1,
    height: 30,
    justifyContent:'center',
    backgroundColor:Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -1
    },
    shadowRadius: 1,
    shadowOpacity: 0.2,
    borderTopWidth: 5,
    borderColor: Colors.sGray,
    marginTop:20,
    paddingVertical:20
  },
  sectionTitle:{
    color:Colors.black,
    paddingLeft:5,
    opacity:0.8,
    fontFamily:'Lato-Medium',
    fontSize:18
  }
});

export default Styles;
