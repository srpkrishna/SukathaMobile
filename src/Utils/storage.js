import {AsyncStorage} from 'react-native';

async function addObject(key,obj){
  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj));
  } catch (error) {

  }
}

async function mergeObject(key,obj){
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(obj));
  } catch (error) {

  }
}

async function getObject(key){
  try {
    const value = await AsyncStorage.getItem(key);
    if(value !== null){
      return JSON.parse(value)
    }
    return value
  } catch (error) {
    return null
  }
}

const Storage = {
  addObject:addObject,
  mergeObject:mergeObject,
  getObject:getObject
};

export default Storage
