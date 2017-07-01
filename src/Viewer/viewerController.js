import React from 'react';
import SeriesViewer from '../Series/seriesViewer.js';
import StoriesViewer from '../Stories/storiesViewer.js';
import Colors from '../Utils/colors.js';



class Viewer extends React.Component {

  static  navigationOptions = ({navigation}) => ({
     title: `${navigation.state.params.displayName}`,
     headerStyle:{
       backgroundColor:Colors.sBlue
     },
     headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
     headerTintColor:'white'
   })

  render() {

    if(this.props.navigation.state.params.episodes){
      return (
        <SeriesViewer />
      );
    }else{
      return (
        <StoriesViewer />
      );
    }

  }
}


export default Viewer;
