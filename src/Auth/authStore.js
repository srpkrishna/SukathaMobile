import Constants from './authConstants.js'

const defaultState = { isLoggedIn: false };
const reducer = (state=defaultState, action) => {
  switch (action.type) {
    case Constants.Login_Success_Event:
      var newState = Object.assign({}, state);
      newState =  action.user;
      newState.isLoggedIn = true;
      return newState;
    case Constants.Logout_Success_Event:
      return { isLoggedIn: false };
    default:
      return state;
  }
}

export default reducer;
