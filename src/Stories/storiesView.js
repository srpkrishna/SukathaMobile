import React, { Component } from 'react';
import { ActivityIndicator, View, Text, ListView,TouchableHighlight,TouchableNativeFeedback ,Platform} from 'react-native';
import Item from '../Common/item.js';
import Server from '../Utils/server';

export default class StoriesView extends Component{

  getState(data){

    var isLoading = true;
    var stories;
    if(data && data.length >0 ){
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      isLoading = false;
      stories = ds.cloneWithRows(data);
    }

    return {
      isLoading: isLoading,
      stories:stories
    }
  }
  constructor(props) {
    super(props);
    this.state = this.getState(props.stories)
  }

  componentDidMount() {
    if(!this.state.stories){
      this.props.getStories()
    }
  }

  componentWillReceiveProps(nextProps){
    var state = this.getState(nextProps.stories)
    this.setState(state)
  }

  renderRow(rowData, sectionID, rowID) {
    return (
        <Item data={rowData} index={rowID} onPress={this.onPressRow.bind(this)} />
      );
  }

  onPressRow(index){
    var rowData = this.state.stories.getRowData(0,index);
    this.props.openViewer(rowData);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop:10}}>
          <ActivityIndicator />
        </View>
      );
    }else{
      return (
        <View style={{flex: 1}}>
          <ListView
            dataSource={this.state.stories}
            renderHeader = {() => <View style={{height:2}} />}
            renderFooter= {() => <View style={{height:10}} />}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      );
    }
  }
}
