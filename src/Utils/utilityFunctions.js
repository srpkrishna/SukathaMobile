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
  }
}



export default Utils;
