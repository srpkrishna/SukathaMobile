import React from 'react';
import Styles from './styles.js';
import { Image} from 'react-native';
import { Provider } from 'react-redux';
import Store from '../Stories/storiesStore.js';
import Controller from '../Stories/storiesController.js';

class StoriesHome extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Stories',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../Icons/chats-icon.png')}
        style={[Styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Provider store={Store} >
        <Controller />
      </Provider>
    );
  }
}



export default StoriesHome;
