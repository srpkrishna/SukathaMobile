import React, { Component } from 'react';
import { ActivityIndicator, View, Text, ListView } from 'react-native';
import Item from '../Common/item.js'

export default class SeriesView extends Component {

  getState(props){

    var isLoading = true;
    var seriesList;
    if(props.seriesList && props.seriesList.length >0 ){
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      isLoading = false;
      seriesList = ds.cloneWithRows(props.seriesList);
    }

    return {
      isLoading: isLoading,
      seriesList:seriesList
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
  }

  componentWillReceiveProps(nextProps){
    var state = this.getState(nextProps)
    this.setState(state)
  }

  renderRow(rowData, sectionID, rowID) {
    return (
        <Item data={rowData} index={rowID} onPress={this.onPressRow.bind(this)} />
      );
  }

  onPressRow(index){
    var rowData = this.state.seriesList.getRowData(0,index);
    this.props.openViewer(rowData);
  }

  render() {
    if (!this.state.seriesList) {
      return (
        <View style={{flex: 1, paddingTop: 10}}>
          <ActivityIndicator />
        </View>
      );
    }else{
      return (
        <View style={{flex: 1}}>
          <ListView
            dataSource={this.state.seriesList}
            renderHeader = {() => <View style={{height:2}} />}
            renderFooter= {() => <View style={{height:10}} />}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      );
    }
  }
}
