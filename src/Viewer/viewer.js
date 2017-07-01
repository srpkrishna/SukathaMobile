import React from 'react';
import Utils from '../Utils/utilityFunctions.js';
import { ActivityIndicator, View,ListView,Text,Button} from 'react-native';
import Body from './body.js';
import Header from './header.js';
import AuthorBlock from './authorBlock.js';
import Colors from '../Utils/colors.js';
import CommonStyles from '../Utils/styles.js';
import Comments from './comments.js'
import Share from '../Common/share.js'

class Viewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shareVisible: false
    }
  }

  componentDidMount(){
    var authorId,name,timestamp,episode;

    if(this.props.story){
      authorId = this.props.story.author;
      name = Utils.removeSpaceAndCapitals(this.props.story.name);
      timestamp = this.props.story.timestamp;

      if(this.props.story.episodes)
        episode = this.props.story.episodes.length
    }else{
      //this.props.getStoryDetails()
      return
    }

    if(!this.props.content){
      this.props.getStoryContent(authorId,name,episode)
    }

    if(!this.props.author){
      this.props.getAuthorDetails(authorId)
    }

    if(!this.props.comments){
      this.props.getComments(authorId,timestamp)
    }
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
      data.episode = episode
    }else{
      data.link = 'https://www.sukatha.com/stories/story?'+query;
    }

    if(replyTo && mention){
      data.replyTo = replyTo
      data.mention = mention
    }

    this.props.openComment(data)
  }

  onShareBtnPress(){
    this.setState({shareVisible:true});
  }

  onDismissShare(){
    this.setState({shareVisible:false});
  }

  render() {
    var content = this.props.content;
    var story = this.props.story;
    var author = this.props.author;
    var authorLink = this.props.authorLink;
    var updateSocial = this.props.updateSocial;
    var publishComment = this.props.publishComment;
    var comments = this.props.comments;
    var shareSheet;

    var tag = []
    if(content && story && author){
      tag.push(<Header story={story} />)
      // if(story.episodes && story.episodes.length >= Number(this.props.episode)){
      //   var episode = Number(this.props.episode) - 1
      //   var title = story.episodes[episode]
      //   tag.push(<div key={1} className="episodeTitle">{title}</div> )
      // }
      tag.push(<Button title="Comment" color={Colors.sPink} onPress={this.onCommentBtnPress.bind(this)}/>)
      tag.push(<Button title="Share" color={Colors.sPink} onPress={this.onShareBtnPress.bind(this)}/>)

      tag.push(<Body content={content} />)
      tag.push(<View style={CommonStyles.sectionHeader}><Text style={CommonStyles.sectionTitle}>Author:</Text></View>);
      tag.push(<AuthorBlock author={author} openAuthor={this.props.openAuthor}/>)
      // if(story.episodes){
      //   tag.splice(1,0,<EpisodeStrip key={3} series={story} episode={this.props.episode} author={this.props.author} />)
      //   tag.push(<EpisodeStrip key={4} series={story} episode={this.props.episode} author={this.props.author} />)
      // }
      // tag.push(<Footer story={story} authorLink={authorLink}  updateSocial={updateSocial} publishComment={publishComment} key={5}/>)
      //
      if(comments && comments.length > 0){
        tag.push(<View style={CommonStyles.sectionHeader}><Text style={CommonStyles.sectionTitle}>Comments:</Text></View>);
        tag.push(<Comments comments={comments} showMoreComments={this.props.showMoreComments} onReply={this.onCommentBtnPress.bind(this)}/>)
      }

      if(this.state.shareVisible){
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
          message: "I loved it. Read it.",
          url: link,
          subject: "Share Link" //  for email
        };

        shareSheet = <Share options={shareOptions} onDismiss={this.onDismissShare.bind(this)}/>
      }

      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      itemList = ds.cloneWithRows(tag);

      if(shareSheet){
        return (
          <View style={{backgroundColor:Colors.white}}>
            <ListView
              dataSource={itemList}
              renderFooter= {() => <View style={{height:10}} />}
              renderRow={(rowData) => rowData}
            />
            {shareSheet}
          </View>
        );
      }else{
        return (
          <View style={{backgroundColor:Colors.white}}>
            <ListView
              dataSource={itemList}
              renderFooter= {() => <View style={{height:10}} />}
              renderRow={(rowData) => rowData}
            />
          </View>
        );
      }

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
