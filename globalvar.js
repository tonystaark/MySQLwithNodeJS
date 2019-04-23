//STORING GLOBAL VARIABLES

module.exports = {
  isEmptyObject : function (obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
    }
    return true;
  }
}
