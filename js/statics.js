var Statics = Statics || {};

Statics = {

  aShuffleArray: function(apArray) {
    var aLocalCopy = [];
    for (var i = 0; i < apArray.length; i++)
      aLocalCopy[i] = apArray[i];
    for (var i = 0; i < apArray.length; i++) {
      var iRandIndex = Math.round(Math.random(aLocalCopy.length));
      var iNewIndex = aLocalCopy[iRandIndex];
      aLocalCopy[iRandIndex] = aLocalCopy[i];
      aLocalCopy[i] = iNewIndex;
    }
    return aLocalCopy;
  },

  transferArray: function(apInArray, apOutArray) {
    for (var i = 0; i < apInArray.length; i++) {
        apOutArray[i] = apInArray[i];
      }
  },

  trimArray: function(apArray, ipDesiredLength) {
    apArray.splice(ipDesiredLength - 1, apArray.length - ipDesiredLength);
  },

  bHasSpaces: function(spText) {
    var bFoundSpace = false;
    for (var i = 0; i < spText.length; i++) {
      if (spText.charCodeAt(i) == '32')
        bFoundSpace = true;
    }
    return bFoundSpace;
  },

  sGetMergedText(spText1, spText2) {
    return spText1 + spText2;
  }
}
