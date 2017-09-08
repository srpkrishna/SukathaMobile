'use strict';
import React from 'react';
import {View,Text,StyleSheet,TouchableHighlight,FlatList,Dimensions} from 'react-native';
import Colors from '../Utils/colors.js';

const ITEM_DIM = 45
const styles = StyleSheet.create({
  episode: {
    color: Colors.sBlue,
    width: 65
  },
  textPress: {
    color: Colors.white
  },
  text: {
    fontFamily: 'Lato-Medium',
    textAlign: 'center',
    color: Colors.sBlue,
    fontSize:18
  },
  buttonPress: {
    backgroundColor:  Colors.sBlue,
  },
  button: {
    borderColor:  Colors.sBlue,
    backgroundColor:  Colors.white,
    borderWidth: 1,
    borderRadius:2,
    alignItems:'center',
    justifyContent:'center',
    margin:5,
    width:(ITEM_DIM-10),
    height:(ITEM_DIM-10)
  },
  titleContainer:{
    alignItems:'center',
    justifyContent:'center',
    margin:5,
  },
  container:{
    flex: 1,
    flexDirection: 'row',
    justifyContent:'flex-start',
    paddingVertical: 10,
    paddingLeft:5,
    flexWrap: 'wrap'
  }
});

export default class EpisodeStrip extends React.Component {

  constructor(props) {
    super(props);
  }

  onPress(index){
    this.props.onChange(index)
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.episode &&  this.props.episode !== nextProps.episode){
      this.scrollToIndex(nextProps.episode)
    }
  }
  scrollToIndex(episode){

    if(!episode || !this.flatListRef){
      return
    }

    var screenFit = (Dimensions.get('window').width - 70)/ITEM_DIM
    var totalFitNum = parseInt(screenFit)

    if(this.props.totalEpisodes < (episode + totalFitNum)){
      this.flatListRef.scrollToEnd({animated: true});
      return
    }
    var index = episode-1
    this.flatListRef.scrollToIndex({index:index,animated: true})
  }

  getEpisodeButtons(index,isHighLight){
    return(
      <TouchableHighlight
        activeOpacity={1}
        key={index}
        style={ isHighLight ? [styles.button , styles.buttonPress] : styles.button}
        onPress={this.onPress.bind(this,index)}>
        <Text style={ isHighLight ? [styles.text , styles.textPress] : styles.text}>{index}</Text>
      </TouchableHighlight>
    );
  }

  renderRow(episode) {
    return this.getEpisodeButtons(episode.item,(episode.item === this.props.episode));
  }

  keyExtractor(item, index){
    return index
  }

  getItemLayout(data, index){
    return ({length:(Dimensions.get('window').width - 70), offset: ITEM_DIM * index, index})
  }

  render(){
    var tag = []
    var episodes = this.props.totalEpisodes
    for (var index = 0; index < episodes; index++) {
      var episodeIndex = index+1
      tag.push(episodeIndex);
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer} ><Text style={styles.episode} >Episodes:</Text></View>
        <FlatList
          horizontal={true}
          data={tag}
          removeClippedSubviews={false}
          initialNumToRender={episodes}
          keyExtractor={this.keyExtractor.bind(this)}
          renderItem={this.renderRow.bind(this)}
          getItemLayout={this.getItemLayout.bind(this)}
          onLayout={() => this.scrollToIndex(this.props.episode)}
          ref={(ref) => { this.flatListRef = ref; }}
        />
      </View>
    );
  }
}
