import React from 'react';
import CommonStyles from '../Utils/styles.js';
import { Image} from 'react-native';
import Controller from '../Stories/storiesController.js';

class StoriesHome extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Stories',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../Icons/chats-icon.png')}
        style={[CommonStyles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Controller />
    );
  }
}



export default StoriesHome;
