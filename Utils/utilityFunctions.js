const Utils = {
  removeSpaceAndCapitals: function(text) {
    return text.replace(/\s+/g, '').toLowerCase()
  },
  capitalizeFirstLetter:function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

export default Utils;
