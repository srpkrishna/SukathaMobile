import { connect } from 'react-redux'
import AuthButton from './authButton.js';
import  Actions from './authActions.js';
import { NavigationActions } from 'react-navigation';


const mapStateToProps = (state) => {
  return {
    user:state.authStore,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout:(user) => {
      const obj = Actions.logout(user);
      dispatch(obj);
    },
    openLogin(){
      dispatch(NavigationActions.navigate({ routeName: 'Login'}));
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButton)


export default Container
