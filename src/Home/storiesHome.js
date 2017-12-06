import React from 'react';
import CommonStyles from '../Utils/styles.js';
import { View,Image,Text,TouchableOpacity,Dimensions} from 'react-native';
import Controller from '../Stories/storiesController.js';
import Colors from '../Utils/colors.js';
import NavButton from '../Common/navButton.js';
import { NavigationActions } from 'react-navigation';
import FilterTitleController from '../Filters/filterTitleController.js'

class StoriesHome extends React.Component {
  static navigationOptions = ({navigation}) => ({
    tabBarLabel: 'Stories',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../Icons/stories.png')}
        style={[CommonStyles.icon, {tintColor: tintColor}]}
      />
    ),
    headerTitle:(<FilterTitleController />),
    headerStyle:{
      backgroundColor:Colors.headerBlue
    }
  })

  render() {
    return (
      <Controller />
    );
  }
}



export default StoriesHome;
