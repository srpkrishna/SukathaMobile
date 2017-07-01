import { connect } from 'react-redux'
import Login from './login.js';
import  Actions from './authActions.js';
import { NavigationActions } from 'react-navigation';


const mapStateToProps = (state) => {
  return {
    user:state.authStore,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser:() => {
      const obj = Actions.fetchUser();
      dispatch(obj);
    },
    setGUser:(data) =>{
      const obj = Actions.setGoogleUser(data);
      dispatch(obj);
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)


export default Container
