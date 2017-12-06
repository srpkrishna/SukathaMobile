import { AppNavigator } from './home.js';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import seriesReducer from '../Series/seriesStore.js';
import storiesReducer from '../Stories/storiesStore.js';
import authorReducer from '../Author/authorStore.js';
import profileReducer from '../Profile/profileStore.js';
import authReducer from '../Auth/authStore.js';
import wallReducer from '../Wall/wallStore.js';
import { NavigationActions } from 'react-navigation';
import ScreenTrackerMiddleware from '../Common/screenTrackerMiddleware.js';
// Start with two routes: The Main screen, with the Login screen on top.

const navReducer = (state, action) => {

  switch (action.type){
    case 'back_screen':
      var nextState =  AppNavigator.router.getStateForAction(NavigationActions.back(), state);
      nextState.isCancelled = true;
      nextState.afterLogin = undefined;
      return nextState

    case 'next_screen':
      if(state.afterLogin){

        var nextScreen = state.afterLogin;
        var backState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
        var nextState =  AppNavigator.router.getStateForAction(nextScreen, backState);
        nextState.afterLogin = undefined;
        nextState.isCancelled = undefined;
        return nextState

      }else{
        var nextState =  AppNavigator.router.getStateForAction(NavigationActions.back(), state);
        nextState.isCancelled = undefined;
        return nextState
      }
    default:

      if(action.params && action.params.shouldShowLogin){
        var route = NavigationActions.navigate({ routeName: 'Login',params:action.params.isLoginOptional});
        var nextState = AppNavigator.router.getStateForAction(route,state);
        action.params.shouldShowLogin = undefined;
        nextState.afterLogin = action;
        return nextState
      }

      const nextState = AppNavigator.router.getStateForAction(action, state);

      if(nextState && action.type === 'Navigation/BACK' && state.index === 1){
        nextState.afterLogin = undefined;
        nextState.isCancelled = true;
      }else if(nextState){
        nextState.afterLogin = undefined;
      }
      return nextState || state;
  }
  return state;

}


const AppReducer = combineReducers({
  nav:navReducer,
  authStore:authReducer,
  seriesStore:seriesReducer,
  storiesStore:storiesReducer,
  authorStore:authorReducer,
  profileStore:profileReducer,
  wallStore:wallReducer
});

const middlewares = [thunkMiddleware,ScreenTrackerMiddleware];// lets us dispatch() functions
if (__DEV__) {
  const loggerMiddleware = createLogger();// neat middleware that logs actions
  middlewares.push(loggerMiddleware);
}

const store = createStore(
  AppReducer,
  applyMiddleware(...middlewares)
)
export default store;
