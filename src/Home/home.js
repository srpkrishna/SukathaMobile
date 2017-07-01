import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StoriesHome from './storiesHome.js';
import SeriesHome from './seriesHome.js';
import ProfileHome from '../Profile/profileController.js';
import Viewer from '../Viewer/viewerController.js';
import Author from '../Author/authorController.js';
import Comment from '../Common/commentsController.js';

import { TabNavigator,StackNavigator,addNavigationHelpers } from "react-navigation";
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
  swipeEnabled:true,
  lazy: true,
  initialRouteName: 'Stories',
}

const MyTab = TabNavigator({
  Stories: {
    screen: StoriesHome,
  },
  Series: {
    screen: SeriesHome,
  },
  Profile:{
    screen: ProfileHome,
  }
},tabConfig);

const navigationOptions = {
  title: 'Home',
  headerStyle:{
    backgroundColor:Colors.sBlue
  },
  headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
  headerTintColor:'white'
};

MyTab.navigationOptions = navigationOptions;

export const Home = StackNavigator({
  Home: {
    screen: MyTab
  },
  Viewer:{
    screen:Viewer
  },
  Author:{
    screen:Author
  },
  Comment:{
    screen:Comment
  }
});



const AppWithNavigationState = ({ dispatch, nav }) => (
  <Home navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
