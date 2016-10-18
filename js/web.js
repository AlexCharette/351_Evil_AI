var Web = Web || {};

Web = {

  oElementValue: function(spType, ipValue) {
    this.sType = spType;
    this.iValue = ipValue;
  },

  aoElementValues: [],
  moElementValues: new Map(),

  setElementValues: function() {
    var iLiValue = 2, iH3Value = 3, iPValue = 1,
        iImgValue = 5, iAValue = 4;
    this.moElementValues.set("li", iLiValue);
    this.moElementValues.set("h3", iH3Value);
    this.moElementValues.set("p", iPValue);
    this.moElementValues.set("img", iImgValue);
    this.moElementValues.set("a", iAValue);
  }
}
