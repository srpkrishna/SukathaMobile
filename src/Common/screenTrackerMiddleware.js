import { NavigationActions } from 'react-navigation';
import SendAnalytics from '../Utils/analytics.js';
import Utils from '../Utils/utilityFunctions.js';

const screenTracker = ({ getState }) => next => (action) => {
  if (
    action.type !== NavigationActions.NAVIGATE
    && action.type !== NavigationActions.BACK
  ) {
    return next(action);
  }

  const currentScreen = Utils.getCurrentRouteName(getState().nav);
  const result = next(action);
  const nextScreen = Utils.getCurrentRouteName(getState().nav);
  if (nextScreen !== currentScreen) {
    // the line below uses the Google Analytics tracker
    // change the tracker here to use other Mobile analytics SDK.
    SendAnalytics.sendPageView(nextScreen,'')
  }
  return result;
};

export default screenTracker;
