import React, { PropTypes } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import Colors from '../Utils/colors.js';
import AuthController from '../Auth/authController.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input:{
    height: 200,
    backgroundColor: Colors.white,
    borderWidth: 1,
    margin:10,
    padding:5
  }
});


class CommentScreen extends React.Component {

  static  navigationOptions = ({navigation}) => ({
     title: `Add Comment`,
     headerStyle:{
       backgroundColor:Colors.sBlue
     },
     headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
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

    this.state = { text: '' };
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
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <Button title={title} color={Colors.sPink} onPress={this.onPress.bind(this)}/>
        </View>);
    }else{
      return(<AuthController />);
    }
  }
}



export default CommentScreen;
