import React from 'react';
import Utils from '../Utils/utilityFunctions.js';
import { ActivityIndicator, View,ListView,Text,Button,StyleSheet} from 'react-native';
import Body from './body.js';
import Header from './header.js';
import EpisodeStrip from './episodeStrip.js';
import AuthorBlock from './authorBlock.js';
import Colors from '../Utils/colors.js';
import CommonStyles from '../Utils/styles.js';
import Comments from './comments.js';
import Share from '../Common/share.js';
import SocialBar from '../Common/socialBar.js';
import Storage from '../Utils/storage.js'
import SendAnalytics from '../Utils/analytics';

const styles = StyleSheet.create({
  titleStyle:{
    textAlign: 'center',
    color:Colors.sPink,
    fontSize:18,
    paddingTop:15,
    fontFamily:'NotoSansTelugu'
  }
})

var c = 0;
var t;
var isReadTimeOver;
var isReachedEnd;
var isEpisodeChanged;

class Viewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getState(props,false);
    c = 0;
    isReadTimeOver = false;
    isReachedEnd = false;
    isEpisodeChanged = false;
    var that = this;
    t = setTimeout(function(){ that.countTime() }, 1000*60);
  }

  componentWillUnmount(){
    c = 0;
    isReadTimeOver = false;
    isReachedEnd = false;
    isEpisodeChanged = false;
    clearTimeout(t);
    t = undefined;
  }
  componentDidMount(){
    var authorId,name,timestamp,episode;
    if(this.props.params.author){
      authorId = this.props.params.author;
      name = Utils.removeSpaceAndCapitals(this.props.params.name);
      timestamp = this.props.params.timestamp;

      episode = 1
      if(this.props.params.episodes)
        episode = this.props.params.episodes.length

      this.props.setStory(this.props.params,episode)
    }else{
      authorId = this.props.params.a;
      name = this.props.params.n;
      timestamp = this.props.params.t;
      episode = this.props.params.e;

      if(episode){
        episode = parseInt(episode)
      }else{
        epsiode = 1
      }

      if(authorId && name && timestamp){
        this.props.getStoryDetails(authorId,timestamp,episode)
      }else{
        return
      }

    }

    var that = this;

    if(!this.props.content){
      this.props.getStoryContent(authorId,name,episode)
    }

    if(!this.props.author){
      this.props.getAuthorDetails(authorId)
    }

    if(!this.props.comments){
      this.props.getComments(authorId,timestamp,episode)
    }
  }

  onEpisodeChange(episode){

      var that = this;

      if(this.listRef){
        this.listRef.scrollTo({x: 0, y: 0, animated: true})
      }

      setTimeout(function(){
        var authorId = that.props.story.author;
        var name = Utils.removeSpaceAndCapitals(that.props.story.name);
        var timestamp = that.props.story.timestamp;
        that.props.getStoryContent(authorId,name,episode)
        that.props.getComments(authorId,timestamp,episode)

        c = 0;
        isReadTimeOver = false;
        isReachedEnd = false;
        isEpisodeChanged = true;
        clearTimeout(t);
        t = setTimeout(function(){ that.countTime() }, 1000*60);
      },5);



  }

  onCommentBtnPress(replyTo,mention){

    var name = Utils.removeSpaceAndCapitals(this.props.story.name);
    var query = 't='+this.props.story.timestamp+'&a='+this.props.story.author+'&n='+name
    var data ={
      story:this.props.story,
      author:this.props.author,
      publishComment:this.props.publishComment,
    }

    if(this.props.episode){
      epsiode = this.props.episode
      query = query + '&e='+epsiode
      data.link = 'https://www.sukatha.com/seriesList/series?'+query;
      data.episode = this.props.episode
    }else{
      data.link = 'https://www.sukatha.com/stories/story?'+query;
    }

    if(replyTo && mention){
      data.replyTo = replyTo
      data.mention = mention
    }

    data.shouldShowLogin = true;
    if(this.props.user && this.props.user.isLoggedIn){
      data.shouldShowLogin = false;
    }

    data.isLoginOptional = false;

    this.props.openComment(data)
  }

  onShareBtnPress(){
    this.setState(prevState => ({
      ...prevState,
      shareVisible:true
    }));
  }

  onDismissShare(){
    this.setState(prevState => ({
      ...prevState,
      shareVisible:false
    }));
  }

  socialAction(action){

    if(!this.props.story){
        return;
    }

    var authorId = this.props.story.author;
    var timestamp = this.props.story.timestamp;
    var name = Utils.removeSpaceAndCapitals(this.props.story.name);

    var path = "/viewer/"+name
    if(this.props.episode){
      path = path + "/" + this.props.episode
    }

    switch (action) {
      case "shares":
        this.onShareBtnPress()
        break;
      case "likes":
        if(this.state.isLiked){return true}
        this.setState(prevState => ({
          ...prevState,
          isLiked:true
        }));
        break;
      case "comments":
        this.onCommentBtnPress()
        break;

      case "views":
        if(this.state.isViewed) return;
        this.setState(prevState => ({
          ...prevState,
          isViewed:true
        }));
        SendAnalytics.sendPageView(name,path)
        break;

      case "reads":
          if(this.state.isRead) break;
          this.setState(prevState => ({
            ...prevState,
            isRead:true
          }));
        break;

      default:
        return
    }

    this.props.updateSocial(action,authorId,timestamp,this.props.episode)

    var that = this
    var objToStore = {}
    objToStore[action] = "true"
    var key = authorId+timestamp

    var type = 'story'
    if(this.props.episode){
        key = key+this.props.episode;
        type = 'series'
    }

    SendAnalytics.sendEvent(type,action,name);
    SendAnalytics.sendEvent(name,action,'');

    Storage.getObject(key).then((obj) =>{
      if(obj){
          if(action === "views"){
            var isLiked = obj.likes ? true:false
            var isRead = obj.reads ? true:false
            that.setState(prevState => ({
              ...prevState,
              isLiked:isLiked,
              isRead:isRead
            }));
          }
          Storage.mergeObject(key,objToStore)
      }else{
          Storage.addObject(key,objToStore)
      }
    })


  }

  showMoreComments(){
    var comments = this.props.comments
    var comment = comments[comments.length-1]
    var type = 'story'
    if(this.props.episode){
      this.props.showMoreComments(this.props.story,this.props.episode,comment.timestamp)
      type = 'series'
    }else{
      this.props.showMoreComments(this.props.story,comment.timestamp)
    }
    var name = Utils.removeSpaceAndCapitals(this.props.story.name);
    SendAnalytics.sendEvent(type,'showMoreComments',name);
    SendAnalytics.sendEvent(name,'showMoreComments','');
  }

  onEndReached(){
    var content = this.props.content;
    var story = this.props.story;
    var author = this.props.author;
    var comments = this.props.comments;
    if( !content || !story || !author || !comments || isReachedEnd){
      return
    }

    isReachedEnd = true;
    if(isReadTimeOver && isReachedEnd){
      this.socialAction('reads')
    }
  }

  countTime(){

    if(isReadTimeOver){
      return
    }
    c = c + 1

    var name = "";
    var story = this.props.story;

    if(story){
      if( story.name && c > 0){
        name = Utils.removeSpaceAndCapitals(story.name);
        SendAnalytics.sendEvent('Story','reading',name,c);
        SendAnalytics.sendEvent(name,'reading','time',c);
      }
      var time = 10
      if(story.time){
        time = story.time
      }else if(story.episodeTimes && this.props.episode && story.episodeTimes.length >= Number(this.props.episode) ){
        var episode = Number(this.props.episode) - 1
        time = story.episodeTimes[episode]
      }

      if(c > time*0.75){
        isReadTimeOver = true;
        if(isReadTimeOver && isReachedEnd){
          this.socialAction('reads')
        }
        return
      }else{
        var that = this;
        clearTimeout(t)
        t = setTimeout(function(){ that.countTime() }, 1000*60);
      }
    }
  }

  componentWillReceiveProps(nextProps){
    var stateObj = this.getState(nextProps,true)
    this.setState(stateObj)
  }

  getState(props, isConstructor){

    var content = props.content;
    var story = props.story;
    var author = props.author;
    var comments = props.comments;

    if(isConstructor && content && story && author && comments){
      this.socialAction("views")
    }

    var tag = []
    if(story && author){
      tag.push(<Header story={story} />)

      if(this.props.episode){
        var strip = <EpisodeStrip key={0} episode={this.props.episode} totalEpisodes={story.episodes.length} onChange={this.onEpisodeChange.bind(this)}/>
        tag.push(strip)
        var episode = this.props.episode - 1
        var title = story.episodes[episode]
        var episodeTitle = <Text style={styles.titleStyle}>{title}</Text>
        tag.push(episodeTitle)
      }

      if(!content){
        tag.push(<View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>)

      }else{

        tag.push(<Body content={content} />)

        if(this.props.episode){
          var strip = <EpisodeStrip key={1} episode={this.props.episode} totalEpisodes={story.episodes.length} onChange={this.onEpisodeChange.bind(this)}/>
          tag.push(strip)
        }

        if(comments && comments.length > 0){
          tag.push(<View style={CommonStyles.sectionHeader}><Text style={CommonStyles.sectionTitle}>Comments</Text></View>);
          tag.push(<Comments comments={comments} showMoreComments={this.showMoreComments.bind(this)} shdShowMoreComments={props.shdShowMoreComments} onReply={this.onCommentBtnPress.bind(this)}/>)
        }
        tag.push(<View style={CommonStyles.sectionHeader}><Text style={CommonStyles.sectionTitle}>Author</Text></View>);
        tag.push(<AuthorBlock author={author} openAuthor={props.openAuthor}/>)

      }

      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      itemList = ds.cloneWithRows(tag);

      if(this.state && !isEpisodeChanged){
        return {list:itemList}
      }else{

        if(isEpisodeChanged){
          isEpisodeChanged = false;
        }
        return {list:itemList,shareVisible:false,isLiked:false,isViewed:false,isRead:false}
      }

    }

    return {shareVisible:false,isLiked:false,isViewed:false,isRead:false}
  }

  render() {

    if(this.state.list && this.props.story){
      var story = this.props.story;
      var title = story.displayName+ " | " + story.genre[0] + " | "+"SuKatha";
      var name = Utils.removeSpaceAndCapitals(story.name);
      var query = 't='+story.timestamp+'&a='+story.author+'&n='+name;

      var link = 'https://www.sukatha.com'
      if(this.props.episode){
        epsiode = this.props.episode
        query = query + '&e='+epsiode
        link = link+'/seriesList/series?'+query;
      }else{
        link = link+'/stories/story?'+query;
      }

      let shareOptions = {
        title: title,
        message: "I love this story. Read it.",
        url: link,
        subject: "Share Link" //  for email
      };

      var shareSheet = <Share options={shareOptions} isVisible={this.state.shareVisible} onDismiss={this.onDismissShare.bind(this)}/>

      return (
      <View style={{backgroundColor:Colors.white,flex:1,flexDirection:'column'}}>
        <SocialBar action={this.socialAction.bind(this)} isLiked={this.state.isLiked} />
        <ListView
          dataSource={this.state.list}
          renderFooter= {() => <View style={{height:60}} />}
          renderRow={(rowData) => rowData}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={800}
          ref={(ref) => { this.listRef = ref; }}
        />
        {shareSheet}
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
