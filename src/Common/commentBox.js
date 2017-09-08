import React, { PropTypes } from 'react';
import { Button, StyleSheet, TextInput, View ,Text,Dimensions} from 'react-native';
import Colors from '../Utils/colors.js';
import AuthController from '../Auth/authController.js';
import SButton from '../Common/sButton.js';
import NavButton from '../Common/navButton.js';
import SendAnalytics from '../Utils/analytics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  input:{
    height: 180,
    width:Dimensions.get('window').width-40,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderColor: Colors.sGray,
    margin:10,
    padding:5,
    fontSize:16
  },
  publishView:{
    flex:1,
    alignItems:'center',
  },
});


class CommentScreen extends React.Component {

  static  navigationOptions = ({navigation}) => ({
     title: `Add Comment`,
     header:undefined,
     headerLeft:<NavButton title={'Cancel'} page={'login'} action={() => navigation.dispatch({type: 'back_screen'})}/>,
     headerStyle:{
       backgroundColor:Colors.headerBlue
     },
     headerTitleStyle :{textAlign: 'center',alignSelf:'center',fontFamily: 'Lato-Medium'},
     titleStyle:{fontFamily: 'NotoSansTelugu'},
     headerTintColor:'white'
   })

  constructor(props){
    super(props);
    var text = '';

    if(this.props.user.isLoggedIn){
      var data = props.navigation.state.params
      if(data.mention){
        text =  "@"+data.mention + "  -"
      }
    }

    this.state = { text: text };
    SendAnalytics.sendEvent('Common','commentLoaded',this.props.user.email);
  }

  onPress(){

    if(!this.state.text){
      return
    }
    var data = this.props.navigation.state.params
    var user = this.props.user
    var comment = {
      text:this.state.text,
      userEmail:user.email,
      userName:user.name,
      link:data.link
    }

    if(data.replyTo){
      comment.replyTo = data.replyTo
      comment.replyToName = data.mention
    }
    SendAnalytics.sendEvent('Common','commentPosted',this.props.user.email);
    this.props.publishComment(comment,data.story,data.author,data.episode)
  }

  render(){

    if(this.props.user.isLoggedIn){

      var title = 'Publish';
      var data = this.props.navigation.state.params;
      if(data.mention){
        title = 'Reply';
      }
      return(
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            multiline = {true}
            numberOfLines = {4}
            autoFocus = {true}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <View style={styles.publishView}>
            <SButton title={title} onPress={this.onPress.bind(this)}/>
          </View>
        </View>);
    }else{
      return(<AuthController />);
    }
  }
}



export default CommentScreen;
