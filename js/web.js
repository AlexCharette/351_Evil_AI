

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

var Web = Web || {};

Web = {
  //bCanStore: this.bStorageAvailable('sessionStorage'),
  moElementValues: new Map(),

  setElementValues: function() {
    var iLiValue = 2, iH3Value = 3, iPValue = 1,
        iImgValue = 5, iAValue = 4;
    this.moElementValues.set("li", iLiValue);
    this.moElementValues.set("h3", iH3Value);
    this.moElementValues.set("p", iPValue);
    this.moElementValues.set("img", iImgValue);
    this.moElementValues.set("a", iAValue);
  },

  // Function taken from Mozilla MDN docs
  bStorageAvailable: function(pType) {
  	try {
  		var oStorage = window[pType],
  			x = '__storage_test__';
  		storage.setItem(x, x);
  		storage.removeItem(x);
  		return true;
  	}
  	catch(e) {
  		return false;
  	}
  },

  makeDocument: function(spName, spContents = undefined) {
    var oDocument = document.implementation.createHTMLDocument(spName);
    try {
      oDocument.write(spContents);
    } catch(e) {
      console.log("ERR_COULD_NOT_WRITE_CONTENTS_TO_" + oDocument);
    }
  }
}
