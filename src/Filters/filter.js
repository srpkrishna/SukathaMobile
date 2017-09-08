import React, { PropTypes } from 'react';
import { Button, StyleSheet, View ,Text,ListView,TouchableOpacity,ActivityIndicator} from 'react-native';
import Colors from '../Utils/colors.js';
import NavButton from '../Common/navButton.js';
import Utils from '../Utils/utilityFunctions.js';
import SendAnalytics from '../Utils/analytics';

const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  row:{
    alignItems:'flex-start',
    justifyContent:'space-between',
    padding:10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.sGray,
    flexDirection:'row'
  },
  text: {
    fontFamily: 'Lato-Bold',
    color:Colors.black,
    padding:5,
    textAlign:'left',
    fontSize:15,
    paddingLeft:10,
  },
  tick: {
    fontFamily: 'Lato-Bold',
    color:Colors.sPink,
    padding:5,
    textAlign:'left',
    fontSize:18,
    paddingRight:10,
  }
});

class FilterScreen extends React.Component {

  static  navigationOptions = ({navigation}) => ({
     title: `Select genre`,
     header:undefined,
     headerLeft:<NavButton title={'Cancel'} page={'filter'} action={() => navigation.dispatch({type: 'back_screen'})}/>,
     headerStyle:{
       backgroundColor:Colors.headerBlue
     },
     headerTitleStyle :{textAlign: 'center',alignSelf:'center',fontFamily: 'Lato-Medium'},
     titleStyle:{fontFamily: 'NotoSansTelugu'},
     headerTintColor:'white'
   })


  getState(data){
    if(data){
      var rowData = Object.assign([], data);
      rowData.unshift('all');
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
          dataSource: ds.cloneWithRows(rowData),
      }
    }else{
      return {};
    }
  }
  constructor(props) {
    super(props);
    if(props.filters){
      this.state = this.getState(props.filters)
    }else{
      this.state = {}
    }
  }

  componentDidMount() {
    if(!this.state.dataSource){
      this.props.getFilters()
    }

    SendAnalytics.sendEvent('Common','filterLoaded','');
  }

  componentWillReceiveProps(nextProps){
    var state = this.getState(nextProps.filters)
    this.setState(state)
  }

  selectedFilter(genre){

    var filter = genre
    if(filter === 'all'){
      filter = null
    }
    this.props.getFilteredStories(filter);
    this.props.close()
    SendAnalytics.sendEvent('Common','filterSelected',genre);
  }

  renderRow(rowData, sectionID, rowID) {

    var filter = Utils.capitalizeFirstLetter(rowData)

    var tick = ""
    if(this.props.navigation.state.params === rowData){
        tick = "✔︎"
    }

    return (
        <TouchableOpacity style={styles.row}
          onPress={this.selectedFilter.bind(this,rowData)}>
          <Text style={styles.text}>{filter}</Text><Text style={styles.tick}>{tick}</Text>
        </TouchableOpacity>
      );
  }

  render(){
    if (!this.state.dataSource) {
      return (
        <View style={{flex: 1, paddingTop:10}}>
          <ActivityIndicator />
        </View>
      );
    }else{
      return (
        <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      );
    }
  }
}

export default FilterScreen;
