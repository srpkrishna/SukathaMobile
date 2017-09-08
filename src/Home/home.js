import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StoriesHome from './storiesHome.js';
import SeriesHome from './seriesHome.js';
import ProfileHome from '../Profile/profileController.js';
import Viewer from '../Viewer/viewerController.js';
import Author from '../Author/authorController.js';
import Comment from '../Common/commentsController.js';
import Filter from '../Filters/filterController.js';
import Login from '../Auth/loginController.js';
import { NavigationActions } from 'react-navigation';
import { TabNavigator,StackNavigator,addNavigationHelpers,TabBarBottom} from "react-navigation";
import Colors from '../Utils/colors.js';
import {Platform,BackHandler} from 'react-native';

const tabConfig = {
  tabBarOptions: {
    activeTintColor: Colors.sPink,
    inactiveTintColor:Colors.darkGray,
    upperCaseLabel:false,
    indicatorStyle:{backgroundColor:Colors.sPink},
    style:{
      backgroundColor:'white',
      borderTopWidth: 1.5,
      borderTopColor: Colors.sGray
    },
    labelStyle:{
      fontFamily: 'Lato-Medium'
    }
  },
  animationEnabled: true,
  swipeEnabled:true,
  lazy: true,
  initialRouteName: 'Stories',
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom'
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
  headerTitleStyle :{textAlign: 'center',alignSelf:'center',fontFamily: 'Lato-Medium'},
  titleStyle:{fontFamily: 'Lato-Medium'},
  headerTintColor:'white'
};

MyTab.navigationOptions = navigationOptions;

const Stack = StackNavigator({
  Home: {
    screen: MyTab
  },
  Viewer:{
    screen:Viewer
  },
  Author:{
    screen:Author
  }
});

export const AppNavigator = StackNavigator({
  Stack:{
    screen:Stack
  },
  Comment:{
    screen:Comment
  },
  Login:{
    screen:Login
  },
  Filter:{
    screen:Filter
  }
},
{
    navigationOptions: {
      header: null,
    },
    mode:'modal'
});



// const AppWithNavigationState = ({ dispatch, nav }) => (
//   <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
// );

class AppWithNavigationState extends React.Component {
  componentDidMount() {
    if(Platform.OS === 'android'){
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
  }
  componentWillUnmount() {
    if(Platform.OS === 'android'){
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (( nav.routes && nav.routes.length > 0 && nav.routes[0].index > 0) || (nav.index !== 0)) {
      dispatch(NavigationActions.back());
      return true;
    }

    return false;
  };
  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({ dispatch, state: nav })}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
