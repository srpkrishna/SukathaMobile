import React, { Component } from 'react';
import { View, Text, NetInfo,ActivityIndicator} from 'react-native';
import SButton from '../Common/sButton.js';
import Colors from '../Utils/colors.js';

export default class NetworkView extends Component{

  constructor(props) {
    super(props)
    this.state = {isConnected:false}
    this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this)
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change',this.handleFirstConnectivityChange);
  }

  componentWillUnmount(){
    NetInfo.isConnected.removeEventListener('change',this.handleFirstConnectivityChange);
  }

  handleFirstConnectivityChange(isConnected){
    if(isConnected){
      this.props.onConnected()
      NetInfo.isConnected.removeEventListener('change',this.handleFirstConnectivityChange);
    }
  }

  onClick(){
    var that = this;
    this.setState(prevState => ({
      ...prevState,
      isConnected:true
    }));

    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected){
        that.props.onConnected()
      }else{
        that.setState(prevState => ({
          ...prevState,
          isConnected:false
        }));
        that.props.onConnected()
      }
    });
  }

  render(){

    if(this.state.isConnected){
      return (
        <View style={{flex: 1, paddingTop:10}}>
          <ActivityIndicator />
        </View>
      );
    }

    return(
      <View style={{flex: 1, padding:10,flexDirection: 'column',alignItems:'center'}}>
        <Text style={{paddingVertical:10,color:Colors.sPink}} >{'No Internet connection. Please check your connection.'}</Text>
        <SButton title={'Try Again'} onPress={this.onClick.bind(this)}/>
      </View>
    )

  }
}
