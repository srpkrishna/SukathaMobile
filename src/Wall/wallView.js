import React, { Component } from 'react';
import { ActivityIndicator, View, Text, ListView,TouchableHighlight,TouchableNativeFeedback,AppState} from 'react-native';
import Item from '../Common/item.js';
import ShortItem from '../Common/shortItem.js';
import Server from '../Utils/server';
import SendAnalytics from '../Utils/analytics';
import NetworkView from '../Common/networkView.js';
import Utils from '../Utils/utilityFunctions.js';
import Storage from '../Utils/storage.js';
import Colors from '../Utils/colors.js';
import AuthorBlock from '../Common/authorBlock.js';

export default class WallView extends Component{

  getKey(){
    return "wall"
  }

  getState(props){

    var isLoading = true;
    var isNetworkError = false;
    var isSearchNoMatchError = false;

    var items;
    if(props.items && props.items.length >0 ){
      var itemsList = Object.assign([], props.items);
      if(!props.isSearchEnabled){
        itemsList.push(-1)
      }

      if(!props.user || !props.user.isLoggedIn){
        itemsList.unshift("login")
      }

      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      isLoading = false;
      items = ds.cloneWithRows(itemsList);

      // this logic has to be changed when recommended includes author
      if(!props.isSearchEnabled){
        var key = this.getKey()
        Storage.getObject(key).then((obj) =>{
          if(obj){
            var objToStore = {}
            objToStore.lastts = props.lastTimeStamp
            var length = props.items.length - 1

            while(length > 0 ){
              var item = props.items[length]
              if('story' === item.type){
                break
              }
              length--;
            }
            objToStore.nextts = props.items[length].timestamp
            objToStore.updatedts = props.lastUpdatedAt
            Storage.mergeObject(key,objToStore)
          }
        })
      }

    }else if(props.isSearchEnabled){
      if(props.isSearchLoading){
        isLoading = true
      }else if(props.noResultsFound){
        isLoading = true
        isSearchNoMatchError = true
      }else{
        isLoading = false
      }
    }

    if(props.isNetworkError){
      isNetworkError = true;
    }

    return {
      isLoading: isLoading,
      items:items,
      isNetworkError:isNetworkError,
      isSearchNoMatchError:isSearchNoMatchError
    }
  }

  getWallItems(isReachedEnd, isNextSet, addMore){

    var key = this.getKey()
    var getItems = this.props.getItems
    var currentDate = new Date()

    Storage.getObject(key).then((obj) =>{
      if(obj && obj.score){
        if(isReachedEnd){
          var objToStore = {}
          objToStore.score = obj.score - 10
          if(objToStore.score < 60){
            objToStore.score = 80
          }
          objToStore.updatedts = currentDate.getTime()
          getItems(objToStore.score,null,addMore);
          Storage.addObject(key,objToStore)
        }else{
          var timestamp = obj.lastts;
          var shdFetchNextSet = isNextSet;

          if(!shdFetchNextSet && obj.updatedts){
            var diff = Math.abs(currentDate.getTime() - obj.updatedts) / (3600000*24);
            if(diff > 2){
              shdFetchNextSet = true
            }
          }

          if(shdFetchNextSet){
            timestamp = obj.nextts;
          }
          getItems(obj.score,timestamp,addMore);
        }
      }else{
        var objToStore = {}
        objToStore.score = 80
        objToStore.updatedts = currentDate.getTime()
        getItems(objToStore.score,null,addMore);
        Storage.addObject(key,objToStore)
      }
    })

  }

  constructor(props) {
    super(props);
    this.state = this.getState(props)
  }

  componentDidMount() {
    if(!this.state.items){
      this.getWallItems()
    }
    AppState.addEventListener('change', this.handleAppStateChange);
    SendAnalytics.sendPageView("Wall","/home/wall")

    // if(!this.props.user || !this.props.user.isLoggedIn){
    //   var key = this.getKey()
    //   var openViewer = this.openLogin()
    //   Storage.getObject(key).then((obj) =>{
    //     var objToStore = {}
    //     objToStore.noOfViews = 1
    //
    //     if(obj && obj.noOfViews ){
    //       if(obj.noOfViews == 4){
    //         obj.noOfViews = 1
    //         openViewer()
    //       }else{
    //         obj.noOfViews = obj.noOfViews + 1
    //       }
    //     }
    //     Storage.mergeObject(key,objToStore)
    //   });
    // }

  }

  isSocialUpdated(lhsStory){

    if(lhsStory && this.props.items){
      for (index in this.props.items){
        var rhsStory = this.props.items[index]
        if(lhsStory && rhsStory && lhsStory.author === rhsStory.author && lhsStory.timestamp === rhsStory.timestamp){
          var lhsSocial = JSON.stringify(lhsStory.social)
          var rhsSocial = JSON.stringify(rhsStory.social)

          if(lhsSocial !== rhsSocial){
            return true
          }
        }
      }
    }

    return false
  }
  componentWillReceiveProps(nextProps){

    if(nextProps.isReachedEnd){
      this.getWallItems(true)
      SendAnalytics.sendEvent('Wall','showUpdatedWallItems','');
      // if(this.listRef){
      //   this.listRef.scrollTo({x: 0, y: 0, animated: true})
      // }
      //return
    }

    var state = this.getState(nextProps)
    if(this.listRef && this.props.isSearchEnabled && !nextProps.isSearchEnabled){
      this.listRef.scrollTo({x: 0, y: 0, animated: true})
    }
    this.setState(state)

    if(this.isSocialUpdated(nextProps.selectedStory)){
      this.props.updateSocial(nextProps.selectedStory)
    }

    if(this.isSocialUpdated(nextProps.selectedSeries)){
      this.props.updateSocial(nextProps.selectedStory)
    }

  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active' && (this.props.lastUpdatedAt || this.props.isNetworkError)) {
      var currentDate = new Date()
      var diff = Math.abs(currentDate.getTime() - this.props.lastUpdatedAt) / (3600000);
      if(diff > 2 || this.props.isNetworkError){
        this.getWallItems();
        SendAnalytics.sendEvent('Wall','showNewWallItems','');
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

    if('login' === rowData){
      return(
        <ShortItem info={"Please login so that we can serve you with better stories. "} actionTitle={"Login here"}
          onPress={this.openLogin.bind(this)} />
      );
    }

    if('author' === rowData.type){
      return(
        <AuthorBlock author={rowData} key={rowID} openAuthor={this.openAuthor.bind(this,rowData)}/>
      );
    }

    return (
        <Item data={rowData} index={rowID} onPress={this.onPressRow.bind(this)} />
      );
  }

  openLogin(){
    this.props.openLogin()
  }

  openAuthor(author){
    this.props.openAuthor(author);
  }

  onPressRow(index){
    var rowData = this.state.items.getRowData(0,index);
    this.props.openViewer(rowData);
  }

  fetchMore(){
    if(this.props.isSearchEnabled){
      return
    }
    this.getWallItems(false,true,true);
    SendAnalytics.sendEvent('Wall','showMoreWallItems','');
  }

  onConnected(){
    this.getWallItems();
    SendAnalytics.sendEvent('Wall','connected','');
  }

  onScroll(){
    if(this.props.isSearchEnabled){
      this.props.onSearchListScroll()
    }
  }
  render() {
    if(!this.state.items){

      if(this.state.isNetworkError){
        return (
          <NetworkView onConnected={this.onConnected.bind(this)}/>
        );
      }else if(this.state.isSearchNoMatchError){
        return(<View style={{flex: 1, paddingTop:10}}>
          <Text style={{color:Colors.sPink,textAlign:'center'}}>{'No matching results found'}</Text>
        </View>);
      }else if(this.state.isLoading){
        return (
          <View style={{flex: 1, paddingTop:10}}>
            <ActivityIndicator />
          </View>
        );
      }else{
        return(<View style={{flex: 1, paddingTop:10}}>
        </View>);
      }

    }else{

      if(this.state.isNetworkError){
        Utils.showAlert('No Internet connection. Please check your internet connection.')
      }
      return (
        <View style={{flex: 1}}>
          <ListView
            dataSource={this.state.items}
            renderHeader = {() => <View style={{height:2}} />}
            renderFooter= {() => <View style={{height:10}} />}
            renderRow={this.renderRow.bind(this)}
            onEndReached={this.fetchMore.bind(this)}
            onEndReachedThreshold={150}
            initialListSize={2}
            ref={(ref) => { this.listRef = ref; }}
            onScroll={this.onScroll.bind(this)}
          />
        </View>
      );
    }
  }
}
