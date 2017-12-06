import React from 'react';
import CommonStyles from '../Utils/styles.js';
import {Image} from 'react-native';
import Controller from '../Wall/wallController.js';
import SearchController from '../Wall/searchController.js';
import Colors from '../Utils/colors.js';

class WallHome extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Popular',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../Icons/wall.png')}
        style={[CommonStyles.icon, {tintColor: tintColor}]}
      />
    ),
    headerTitle:(<SearchController />),
    headerStyle:{
      backgroundColor:Colors.headerBlue
    },
  };

  render() {
    return (
      <Controller />
    );
  }
}


export default WallHome;
