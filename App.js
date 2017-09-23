import React from 'react';
import AppWithNavigationState from './src/Home/home.js';
import { StatusBar, View, Platform ,Linking} from 'react-native';
import Colors from './src/Utils/colors.js';
import { Provider } from 'react-redux';
import Store from './src/Home/homeStore.js';
import AuthActions from './src/Auth/authActions.js';
import { NavigationActions } from 'react-navigation';
import Utils from './src/Utils/utilityFunctions.js';
import PushNotification from 'react-native-push-notification';
import  StoriesActions from './src/Stories/storiesActions.js';
import  SeriesActions from './src/Series/seriesActions.js';
import SendAnalytics from './src/Utils/analytics.js';
import SplashScreen from 'react-native-splash-screen'

export default class App extends React.Component {

  constructor(){
    super();
    var obj = AuthActions.fetchUser();
    Store.dispatch(obj)
    this.handleUrl = this.handleUrl.bind(this);
    this.handleOpenURL = this.handleOpenURL.bind(this);
  }

  componentWillMount(){
        var that = this
        PushNotification.configure({
            onNotification: (notification) => {
                PushNotification.setApplicationIconBadgeNumber(0);
                if(notification.userInteraction === true){
                  if(Platform.OS === 'ios' && notification.data.url){
                    that.handleUrl(notification.data.url,'notificationIOS')
                  }else if(notification.url){
                    that.handleUrl(notification.url,'notification')
                  }
                }

            }
        })
    }

  componentDidMount() {
    PushNotification.setApplicationIconBadgeNumber(0);
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then((url) => {
      if (url) {
        var that = this
        setTimeout(function() {
          that.handleUrl(url,'weblink')
        },1);
      }
    }).catch(err => console.error('An error occurred', err));
    SplashScreen.hide();
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL(event) {
    this.handleUrl(event.url,'weblink');
  }

  handleUrl(url,eventType){
    SendAnalytics.sendEvent(eventType,url,'');
    var data = Utils.getAllQueryParams(url)
    if(url.indexOf('/stories') !== -1){

        if(url.indexOf('/stories/story') !== -1){
          Store.dispatch(StoriesActions.clearSelectedState({}));
          const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: 'Home'}),
              NavigationActions.navigate({ routeName: 'Viewer', params: data})
            ]
          })
          Store.dispatch(NavigationActions.navigate(resetAction));
        }else{
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Home'})
            ]
          })
          Store.dispatch(NavigationActions.navigate(resetAction));
        }

    }else if(url.indexOf('/seriesList') !== -1){

      if(url.indexOf('/seriesList/series') !== -1){
        data.isSeries = true;
        Store.dispatch(SeriesActions.clearSelectedState({}));
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Home'}),
            NavigationActions.navigate({ routeName: 'Viewer', params: data})
          ]
        })
        Store.dispatch(NavigationActions.navigate(NavigationActions.navigate({ routeName: 'Viewer', params: data})));
      }else{
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home'})
          ]
        })
        Store.dispatch(NavigationActions.navigate(resetAction));
        Store.dispatch(NavigationActions.navigate({ routeName: 'Series', params: data}));
      }
    }else if(url.indexOf('/author') !== -1){
        var res = url.split('/author/');

        if(res.length === 2 ){
          data.authorId = res[1]
          Store.dispatch(NavigationActions.navigate({ routeName: 'Author', params: data}));
        }

    }else if(url.indexOf('sukatha.com') === -1){
      Linking.openURL(url);
    }
  }

  render() {

    if(Platform.OS === 'ios'){
      StatusBar.setBarStyle("light-content");
      return (
         <Provider store={Store} >
           <AppWithNavigationState />
         </Provider>
      );
    }else{
      return (
         <View style={{flex:1}}>
         <StatusBar
              translucent={true}
              barStyle="light-content"
              backgroundColor={Colors.sBlue}
            />
            <View style={{height:20,backgroundColor:Colors.sBlue}} />
            <Provider store={Store} >
              <AppWithNavigationState />
            </Provider>
         </View>
      );
    }

  }
}
