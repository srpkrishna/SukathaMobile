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
     title: 'Author',
     headerStyle:{
       backgroundColor:Colors.headerBlue
     },
     headerTitleStyle :{textAlign: 'center',alignSelf:'center',fontFamily: 'Lato-Medium'},
     titleStyle:{fontFamily: 'Lato-Medium'},
     headerBackTitleStyle:{fontFamily:'NotoSansTelugu'},
     headerTintColor:'white',
     headerRight:<View />,
   })

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    var authorId;

    if(this.props.author){
      authorId = this.props.author.penName;

    }else if(this.props.params && this.props.params.authorId){
      authorId = this.props.params.authorId;
      this.props.getAuthorDetails(authorId)
    }else{
      return
    }

    if(!this.props.stories && authorId){
      this.props.getAuthorStories(authorId)
    }

    if(!this.props.seriesList && authorId){
      this.props.getAuthorSeries(authorId)
    }

    SendAnalytics.sendPageView(authorId,"/author/"+authorId)

  }

  getItem(data){
    const name = Utils.removeSpaceAndCapitals(data.name);
    const imgSrc = 'https://s3.ap-south-1.amazonaws.com/bsstory/'+data.author+'/'+name+'/cover.jpg';

    var metrics = ""

    if(data.time){
      var mins = "mins"
      if(1 === data.time)
        mins  = "min"

      metrics = data.time+mins+" . "
    }


    if(data.genre && data.genre.length > 0){
      metrics = metrics+Utils.capitalizeFirstLetter(data.genre[0]);
      for(var i = 1 ; i < data.genre.length ; i++){
        metrics = metrics +"-"+Utils.capitalizeFirstLetter(data.genre[i])
      }
    }

    var views = "views"
    if(1 === data.social.views)
      views = "view"

    metrics = metrics +" . "+data.social.views+views

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
      data = this.props.stories[item.index];
    }else{
      data = this.props.seriesList[item.index];
    }

    this.props.openViewer(data,this.props.author,item.isStory)
  }

  render() {
    var stories = this.props.stories;
    var seriesList = this.props.seriesList;
    var author = this.props.author;

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
        tag.push(<View style={CommonStyles.sectionHeader}><Text style={CommonStyles.sectionTitle}>Series:</Text></View>);

        for (var index = 0; index < seriesList.length; index++) {
          var series = seriesList[index];
          var item = this.getItem(series);
          item.isStory = false;
          item.index = index++;
          tag.push(<Item item={item} author={author}  onPress={this.onPressItem.bind(this)}/>);
        }
      }

      if(stories && stories.length > 0){

        tag.push(<View style={CommonStyles.sectionHeader}><Text style={CommonStyles.sectionTitle}>Stories:</Text></View>);

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
