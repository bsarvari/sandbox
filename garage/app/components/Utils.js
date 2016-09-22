/**
 * An interface to a persistent store backed either by localStorage or cookies if the former one is not supported.
 * TODO cookie backed storage
 */
let store = {
  set(key, valueObj){
    localStorage.setItem(key, valueObj === undefined ? undefined: JSON.stringify(valueObj));
  },

  get(key){
    let itemStr = localStorage.getItem(key);
    if(itemStr){
      return JSON.parse(itemStr);
    }
  }
};

const Utils = {
  scrollToTop (){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },

  getStore(){
    return store;
  }
};

export default Utils;

