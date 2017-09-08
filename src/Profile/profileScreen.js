import React from 'react';
import { ActivityIndicator, View,ListView,Text } from 'react-native';
import Person from '../Common/person.js'
import Item from '../Common/halfItem.js'
import Colors from '../Utils/colors.js';
import Utils from '../Utils/utilityFunctions.js'
import CommonStyles from '../Utils/styles.js';
import SendAnalytics from '../Utils/analytics';

class Viewer extends React.Component {

  static  navigationOptions = ({navigation}) => ({
     title: `${navigation.state.params.penName}`,
     headerStyle:{
       backgroundColor:Colors.headerBlue
     },
     headerTitleStyle :{textAlign: 'center',alignSelf:'center',fontFamily: 'Lato-Medium'},
     titleStyle:{fontFamily: 'Lato-Medium'},
     headerTintColor:'white'
   })

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    SendAnalytics.sendPageView("profileHome","/home/profile")
  }

  getItem(data){
    const name = Utils.removeSpaceAndCapitals(data.name);
    const imgSrc = 'https://s3.ap-south-1.amazonaws.com/bsstory/'+data.author+'/'+name+'/cover.jpg';

    var metrics = ""

    if(data.social.reads > 1){
        metrics = data.social.reads+" reads"
    }else if(data.social.likes > 0){
        metrics = data.social.reads+" read"
    }

    if(data.social.likes > 1){
        metrics = metrics+"  "+data.social.likes+" likes"
    }else if(data.social.likes > 0){
        metrics = metrics+"  "+data.social.likes+" like"
    }

    if(data.social.shares > 1){
        metrics = metrics+"  "+data.social.shares+" shares"
    }else if(data.social.likes > 0){
        metrics = metrics+"  "+data.social.shares+" share"
    }

    // if(data.social.views > 1){
    //     metrics = metrics+"  "+data.social.views+"views"
    // }else if(data.social.views > 0){
    //     metrics = metrics+"  "+data.social.views+"view"
    // }

    var item ={
      title:data.displayName,
      shortText:data.shortText,
      imgSrc:imgSrc,
      metric:metrics
    }
    return item;
  }

  onPressItem(item){

    var data;
    if(item.isStory){
      data = this.props.data.stories[item.index];
    }else{
      data = this.props.data.seriesList[item.index];
    }

    this.props.data.openViewer(data,this.props.data.author,item.isStory)
  }

  render() {
    var stories = this.props.data.stories;
    var seriesList = this.props.data.seriesList;
    var author = this.props.data.author;

    var tag = []
    if(author){
      var imgSrc = "https://s3.ap-south-1.amazonaws.com/bsstory/"+author.penName+"/profile.jpg"
      var person = {
        name:author.profile.fullName,
        qual:author.profile.qual,
        intro:author.profile.intro,
        imgSrc:imgSrc
      }

      tag.push(<Person person={person} />)

      if(seriesList && seriesList.length > 0){
        tag.push(<View style={CommonStyles.sectionHeader}><Text style={CommonStyles.sectionTitle}>My Series:</Text></View>);

        for (var index = 0; index < seriesList.length; index++) {
          var series = seriesList[index];
          var item = this.getItem(series);
          item.isStory = false;
          item.index = index++;
          tag.push(<Item item={item} author={author}  onPress={this.onPressItem.bind(this)}/>);
        }
      }

      if(stories && stories.length > 0){

        tag.push(<View style={CommonStyles.sectionHeader}><Text style={CommonStyles.sectionTitle}>My Stories:</Text></View>);

        for (var index = 0; index < stories.length; index++) {
          var story = stories[index];
          var item = this.getItem(story);
          item.isStory = true;
          item.index = index;
          tag.push(<Item item={item} author={author}  onPress={this.onPressItem.bind(this)}/>);
        }
      }



      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      itemList = ds.cloneWithRows(tag);

      return (
        <View style={{backgroundColor:Colors.white}}>
          <ListView
            dataSource={itemList}
            renderFooter= {() => <View style={{height:10}} />}
            renderRow={(rowData) => rowData}
          />
        </View>
      );
    }else{
      return (
        <View style={{flex: 1, paddingTop: 10}}>
          <ActivityIndicator />
        </View>
      );
    }


  }
}


export default Viewer;
