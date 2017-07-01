import { Home } from './home.js';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import seriesReducer from '../Series/seriesStore.js';
import storiesReducer from '../Stories/storiesStore.js';
import authorReducer from '../Author/authorStore.js';
import profileReducer from '../Profile/profileStore.js';
import authReducer from '../Auth/authStore.js';


// Start with two routes: The Main screen, with the Login screen on top.

const navReducer = (state, action) => {
  const nextState = Home.router.getStateForAction(action, state);
  return nextState || state;
}


const AppReducer = combineReducers({
  nav:navReducer,
  authStore:authReducer,
  seriesStore:seriesReducer,
  storiesStore:storiesReducer,
  authorStore:authorReducer,
  profileStore:profileReducer
});

const middlewares = [thunkMiddleware];// lets us dispatch() functions
const loggerMiddleware = createLogger();// neat middleware that logs actions
middlewares.push(loggerMiddleware);

const store = createStore(
  AppReducer,
  applyMiddleware(...middlewares)
)
export default store;
