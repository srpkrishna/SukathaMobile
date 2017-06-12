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

  render() {
    if (!this.state.seriesList) {
      return (
        <View style={{flex: 1, paddingTop: 10}}>
          <ActivityIndicator />
        </View>
      );
    }else{
      return (
        <View style={{flex: 1,paddingBottom:10}}>
          <ListView
            dataSource={this.state.seriesList}
            renderRow={(rowData) => <Item  data={rowData} />}
          />
        </View>
      );
    }
  }
}
