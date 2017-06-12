import React, { Component } from 'react';
import { ActivityIndicator, View, Text, ListView } from 'react-native';
import Item from '../Common/item.js'

export default class StoriesView extends Component {

  getState(props){

    var isLoading = true;
    var stories;
    if(props.stories && props.stories.length >0 ){
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      isLoading = false;
      stories = ds.cloneWithRows(props.stories);
    }

    return {
      isLoading: isLoading,
      stories:stories
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
  }

  componentWillReceiveProps(nextProps){
    var state = this.getState(nextProps)
    this.setState(state)
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 10}}>
          <ActivityIndicator />
        </View>
      );
    }else{
      return (
        <View style={{flex: 1}}>
          <ListView
            dataSource={this.state.stories}
            renderRow={(rowData) => <Item  data={rowData} />}
          />
        </View>
      );
    }
  }
}
