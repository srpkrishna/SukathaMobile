import React from 'react';
import StoriesHome from './storiesHome.js';
import SeriesHome from './seriesHome.js';
import Viewer from '../Common/Viewer.js'
import { TabNavigator,StackNavigator,TabBarBottom } from "react-navigation";
import Colors from '../Utils/colors.js';
import {Platform} from 'react-native';

const tabConfig = {
  tabBarOptions: {
    activeTintColor: Colors.sPink,
    inactiveTintColor:'gray',
    upperCaseLabel:false,
    indicatorStyle:{backgroundColor:Colors.sPink},
    style:{
      backgroundColor:'white'
    }
  },
  animationEnabled: true,
  lazyLoad: true
}

const MyTab = TabNavigator({
  Stories: {
    screen: StoriesHome,
  },
  Series: {
    screen: SeriesHome,
  },
},tabConfig);

const marginHeaderTop = (Platform.OS === 'ios') ? 0 : 20

MyTab.navigationOptions = {
  title: 'Home',
  headerStyle:{
    backgroundColor:Colors.sBlue
  },
  headerTitleStyle :{textAlign: 'center',alignSelf:'center',marginTop:marginHeaderTop},
  headerTintColor:'white'
};

const Home = StackNavigator({
  Home: { screen: MyTab },
  Viewer:{
    screen:Viewer,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.name}'s Profile'`,
    })
  }
});

export default Home;
