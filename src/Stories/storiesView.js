import React, { Component } from 'react';
import { ActivityIndicator, View, Text, ListView,TouchableHighlight,TouchableNativeFeedback,AppState} from 'react-native';
import Item from '../Common/item.js';
import Server from '../Utils/server';
import SendAnalytics from '../Utils/analytics';
import NetworkView from '../Common/networkView.js';
import Utils from '../Utils/utilityFunctions.js';

export default class StoriesView extends Component{

  getState(props){

    var isLoading = true;
    var isNetworkError = false;
    var stories;
    if(props.stories && props.stories.length >0 ){
      var storiesList = Object.assign([], props.stories);
      if(!props.reachedEnd){
        storiesList.push(-1)
      }
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      isLoading = false;
      stories = ds.cloneWithRows(storiesList);
    }

    if(props.isNetworkError){
      isNetworkError = true;
    }

    return {
      isLoading: isLoading,
      stories:stories,
      isNetworkError:isNetworkError
    }
  }
  constructor(props) {
    super(props);
    this.state = this.getState(props)
  }

  componentDidMount() {
    if(!this.state.stories){
      this.props.getStories()
    }
    AppState.addEventListener('change', this.handleAppStateChange);
    SendAnalytics.sendPageView("Stories","/home/stories")

  }

  componentWillReceiveProps(nextProps){
    var state = this.getState(nextProps)

    if(this.listRef && this.props.filter !== nextProps.filter){
      this.listRef.scrollTo({x: 0, y: 0, animated: true})
    }
    this.setState(state)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active' && (this.props.lastUpdatedAt || this.props.isNetworkError)) {
      var currentDate = new Date()
      var diff = Math.abs(currentDate.getTime() - this.props.lastUpdatedAt) / 3600000;
      if(diff > 2 || this.props.isNetworkError){
        this.props.getStories();
      }
    }
  }

  renderRow(rowData, sectionID, rowID) {
    if(rowData === -1){
      return(
        <View style={{flex: 1, paddingTop:10}}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
        <Item data={rowData} index={rowID} onPress={this.onPressRow.bind(this)} />
      );
  }

  onPressRow(index){
    var rowData = this.state.stories.getRowData(0,index);
    this.props.openViewer(rowData);
  }

  fetchMore(){
    this.props.showMoreStories();
    SendAnalytics.sendEvent('Stories','showMoreStories','');
  }

  onConnected(){
    this.props.getStories();
    SendAnalytics.sendEvent('Stories','connected','');
  }

  render() {
    if (this.state.isLoading) {

      if(this.state.isNetworkError){
        return (
          <NetworkView onConnected={this.onConnected.bind(this)}/>
        );
      }
      return (
        <View style={{flex: 1, paddingTop:10}}>
          <ActivityIndicator />
        </View>
      );
    }else{

      if(this.state.isNetworkError){
        Utils.showAlert('No Internet connection. Please check your internet connection.')
      }
      return (
        <View style={{flex: 1}}>
          <ListView
            dataSource={this.state.stories}
            renderHeader = {() => <View style={{height:2}} />}
            renderFooter= {() => <View style={{height:10}} />}
            renderRow={this.renderRow.bind(this)}
            onEndReached={this.fetchMore.bind(this)}
            onEndReachedThreshold={150}
            initialListSize={2}
            ref={(ref) => { this.listRef = ref; }}
          />
        </View>
      );
    }
  }
}
