import Server from './server';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

let tracker = new GoogleAnalyticsTracker('UA-96616230-1', { path: 1 });
const SA = {
  sendPageView:function(title,path,category){
    tracker.trackScreenViewWithCustomDimensionValues(title, { path: path });
  },
  setUserId:function(userId){
    tracker.setUser(userId);
  },
  sendEvent:function(eventId,eventType,eventFor,value){
    if(!eventId || !eventType){
      return
    }

    if(value){
      tracker.trackEvent(eventId, eventType, {label: eventFor, value: value});

    }else{
      tracker.trackEvent(eventId, eventType, {label: eventFor, value: 1});
    }
  }

}

export default SA
