import React from 'react';
import CommonStyles from '../Utils/styles.js';
import {Image} from 'react-native';
import Controller from '../Series/seriesController.js';

class SeriesHome extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Series',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../Icons/notif-icon.png')}
        style={[CommonStyles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      //<Provider store={Store} >
        <Controller />
      //</Provider>
    );
  }
}


export default SeriesHome;