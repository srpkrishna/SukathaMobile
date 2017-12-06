import React, { PropTypes } from 'react';
import {StyleSheet, TextInput, View ,Text,Dimensions,TouchableOpacity} from 'react-native';
import Colors from '../Utils/colors.js';
import AuthController from '../Auth/authController.js';
import SendAnalytics from '../Utils/analytics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf:'center'
  },
  input:{
    height: 30,
    width:Dimensions.get('window').width-100,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderRadius:5,
    borderColor: Colors.sGray,
    margin:10,
    padding:5,
    fontSize:16
  },
  placeholder:{
    height: 30,
    width:Dimensions.get('window').width-150,
    backgroundColor: Colors.transWhite,
    borderWidth: 0.5,
    borderRadius:15,
    borderColor: Colors.transWhite,
    margin:10,
    padding:5,
    fontSize:14
  },
  cancel:{
    fontSize:16,
    color:Colors.headerPink
  }
});

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text:""}
  }

  onCancel(){
    this.props.searchCancel();
    this.setState({text:"",isActive:false});
    if(this.listRef){
      this.listRef.blur();
    }
    SendAnalytics.sendEvent('Search','searchEnded','');
  }

  onChange(text){
    this.setState({text:text});
    this.props.searchItems(text.toLowerCase());
    SendAnalytics.sendEvent('Search','searchText',text);
  }

  onSearchFocus(){

    if(!this.state.isActive){
      this.props.searchBegin();
      this.setState({isActive:true});
      SendAnalytics.sendPageView("Search","/home/search")
      SendAnalytics.sendEvent('Search','searchBegin','');
    }

  }

  componentWillReceiveProps(props){
    if(!this.props.searchListScrolled && props.searchListScrolled && this.listRef){
      this.listRef.blur();
    }
  }

  componentWillUnmount(){
    if(this.state.isActive){
      this.onCancel()
    }
  }

  render() {

    if(this.state.isActive){
      return(
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onFocus = {this.onSearchFocus.bind(this)}
            onChangeText={(text) => this.onChange(text)}
            value={this.state.text}
            ref={(ref) => { this.listRef = ref; }}
            underlineColorAndroid='rgba(0,0,0,0)'
          />
          <TouchableOpacity onPress={this.onCancel.bind(this)}>
            <Text style={styles.cancel}>{"Cancel"}</Text>
          </TouchableOpacity>
        </View>);
    }else{
      return(
        <View style={styles.container}>
          <TextInput
            style={styles.placeholder}
            onFocus = {this.onSearchFocus.bind(this)}
            autoFocus = {false}
            onChangeText={(text) => this.onChange(text)}
            value={this.state.text}
            placeholder={"  🔍 Search "}
            placeholderTextColor={Colors.transBlack}
            underlineColorAndroid='rgba(0,0,0,0)'
          />
        </View>);
    }

  }
}

export default SearchView;
