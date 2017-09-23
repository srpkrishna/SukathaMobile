import React from 'react';
import SeriesViewer from '../Series/seriesViewer.js';
import StoriesViewer from '../Stories/storiesViewer.js';
import Colors from '../Utils/colors.js';
import Utils from '../Utils/utilityFunctions.js';
import {View} from 'react-native';
import Title from './titleController.js';

class Viewer extends React.Component {

  static  navigationOptions = ({navigation}) => {

    var headerTitle;

    if(navigation.state.params.displayName){
      headerTitle = navigation.state.params.displayName
    }

    return({
     headerTitle: <Title title={headerTitle} isSeries={navigation.state.params.isSeries}/>,
     headerStyle:{
       backgroundColor:Colors.headerBlue
     },
     headerTitleStyle :{textAlign: 'center',alignSelf:'center',fontFamily:'NotoSansTelugu',fontSize:22},
     headerRight:<View/>,
     titleStyle:{fontFamily: 'Lato-Medium'},
     headerTintColor:'white'
    })
   }

  render() {

    if(this.props.navigation.state.params.episodes || this.props.navigation.state.params.isSeries){
      return (
        <SeriesViewer params={this.props.navigation.state.params}/>
      );
    }else{
      return (
        <StoriesViewer params={this.props.navigation.state.params}/>
      );
    }

  }
}


export default Viewer;
