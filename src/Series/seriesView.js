import React, { Component } from 'react';
import { ActivityIndicator, View, Text, ListView ,AppState} from 'react-native';
import Item from '../Common/item.js';
import SendAnalytics from '../Utils/analytics';
import NetworkView from '../Common/networkView.js';
import Utils from '../Utils/utilityFunctions.js';

export default class SeriesView extends Component {

  getState(props){

    var isLoading = true;
    var isNetworkError = false;
    var seriesList;
    if(props.seriesList && props.seriesList.length >0 ){
      var data = Object.assign([], props.seriesList);
      if(!props.reachedEnd){
        data.push(-1)
      }
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      isLoading = false;
      seriesList = ds.cloneWithRows(data);
    }

    if(props.isNetworkError){
      isNetworkError = true;
    }

    return {
      isLoading: isLoading,
      seriesList:seriesList,
      isNetworkError:isNetworkError
    }
  }
  constructor(props) {
    super(props);
    this.state = this.getState(props)
  }

  componentDidMount() {
    if(!this.state.seriesList){
      this.props.getSeriesList()
    }
    AppState.addEventListener('change', this.handleAppStateChange);
    SendAnalytics.sendPageView("Series","/home/series")
  }

  componentWillReceiveProps(nextProps){
    var state = this.getState(nextProps)
    this.setState(state)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active' && (this.props.lastUpdatedAt|| this.props.isNetworkError)) {
      var currentDate = new Date()
      var diff = Math.abs(currentDate.getTime() - this.props.lastUpdatedAt) / 3600000;
      if(diff > 2 || this.props.isNetworkError){
        this.props.getSeriesList();
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
    var rowData = this.state.seriesList.getRowData(0,index);
    this.props.openViewer(rowData);
  }

  fetchMore(){
    this.props.showMoreSeries();
    SendAnalytics.sendEvent('Series','showMoreSeries','');
  }

  onConnected(){
    this.props.getSeriesList();
    SendAnalytics.sendEvent('Series','connected','');
  }

  render() {
    if (!this.state.seriesList) {
      if(this.state.isNetworkError){
        return (
          <NetworkView onConnected={this.onConnected.bind(this)}/>
        );
      }

      return (
        <View style={{flex: 1, paddingTop: 10}}>
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
            dataSource={this.state.seriesList}
            renderHeader = {() => <View style={{height:2}} />}
            renderFooter= {() => <View style={{height:10}} />}
            renderRow={this.renderRow.bind(this)}
            onEndReached={this.fetchMore.bind(this)}
            onEndReachedThreshold={150}
            initialListSize={2}
          />
        </View>

      );
    }
  }
}
