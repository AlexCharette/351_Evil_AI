
/* Handles all sorts of context independent functions
*/

var Statics = {

  // Shuffles and returns an array
  aShuffleArray: function(apArray) {
    var aLocalCopy = [];
    for (var i = 0; i < apArray.length; i++)
      aLocalCopy[i] = apArray[i];
      // Go through the array
    for (var i = 0; i < apArray.length; i++) {
      var iRandIndex = Math.round(Math.random(aLocalCopy.length));
      var iNewIndex = aLocalCopy[iRandIndex];
      // Swap a random element to the current index
      aLocalCopy[iRandIndex] = aLocalCopy[i];
      // Change the element at the current index
      aLocalCopy[i] = iNewIndex;
    }
    return aLocalCopy;
  },

  // Transfers the contents of one array to another
  // ... maybe this could have been done with an equal sign
  transferArray: function(apInArray, apOutArray) {
    for (var i = 0; i < apInArray.length; i++) {
        apOutArray[i] = apInArray[i];
      }
  },

  // Cuts an array to a desired size
  trimArray: function(apArray, ipDesiredLength) {
    apArray.splice(ipDesiredLength - 1, apArray.length - ipDesiredLength);
  },

  // Returns true if spaces are found in a string
  bHasSpaces: function(spText) {
    var bFoundSpace = false;
    for (var i = 0; i < spText.length; i++) {
      if (spText.charCodeAt(i) == '32')
        bFoundSpace = true;
    }
    return bFoundSpace;
  },

  // Combines and returns two strings together
  sGetMergedText(spText1, spText2) {
    return spText1 + spText2;
  }
}
