import {ToastAndroid,AlertIOS,Platform} from 'react-native';

const Utils = {
  removeSpaceAndCapitals: function(text) {
    return text.replace(/\s+/g, '').toLowerCase()
  },
  capitalizeFirstLetter:function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
  },
  showAlert:function(msg){
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else if (Platform.OS === "ios") {
      AlertIOS.alert(msg);
    }
  },
  getParameterByName(name, url){
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  getAllQueryParams(url){
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        queryArray  = url.split("?")

    urlParams = {};
    if(queryArray.length == 2){
      var query = queryArray[1]
      while (match = search.exec(query))
         urlParams[decode(match[1])] = decode(match[2]);
    }
    return urlParams
  },
  getCurrentRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return this.getCurrentRouteName(route);
    }
    return route.routeName;
  }
}



export default Utils;
