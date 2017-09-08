import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View,Image,ActivityIndicator,WebView } from 'react-native';
import CommonStyles from '../Utils/styles.js';
import AuthController from '../Auth/authController.js';
import ProfileScreen from './profileScreen.js'
import Colors from '../Utils/colors.js';
import SendAnalytics from '../Utils/analytics';

class Profile extends React.Component {

  static  navigationOptions = ({navigation}) => {

    return({
      tabBarLabel: 'Writers',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../Icons/person.png')}
          style={[CommonStyles.icon, {tintColor: tintColor}]}
        />
      ),
      headerRight:<AuthController />,
      headerLeft:<View />,
      title: 'Writers Page',
      headerStyle:{
        backgroundColor:Colors.headerBlue
      }
    }
  )
  };

  // headerStyle:{
  //   position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0
  // }
  getState(props){

    var screenType = 'loader';
    var data;

    if(props.isDataLoaded){
      if(props.isAuthor){
        screenType = 'profile'
        data = props
      }else{
        screenType = 'info'
      }
    }else if(props.isLoggedInCancelled || this.props.isDataLoaded ){
      //this.props.isDataLoaded  will be true once user has data and issued logout in profile screen;
      //remember this.props is old data
      screenType = 'info'
    }

    if(props.user.isLoggedIn && !props.isDataLoaded){
      props.getMyDetails(props.user);
    }else if(!props.user.isLoggedIn && props.isDataLoaded){
      props.clearProfile();
    }

    return {
      screenType:screenType,
      data:data
    }
  }

  constructor(props){
    super(props)
    this.state = this.getState(props)
  }

  componentWillReceiveProps(nextProps){
    var state = this.getState(nextProps)
    this.setState(state)
  }

  componentDidMount(){
    if(!this.props.user.isLoggedIn){
      this.props.openLogin()
    }
  }

  render(){

    switch (this.state.screenType) {
      case 'profile':
          SendAnalytics.sendEvent('writersInfo',this.state.screenType,'');
          return(<ProfileScreen data={this.state.data}/>);
      case 'info':
          SendAnalytics.sendEvent('writersInfo',this.state.screenType,'');
        return(<WebView
        source={{uri: 'https://www.sukatha.com/writersInfo?app=true'}}
      />);
      default:
        return (
          <View style={{flex: 1, paddingTop: 10}}>
            <ActivityIndicator />
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Profile;
