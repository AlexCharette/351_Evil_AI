
/* Handles the abilities of the Locations,
   and dictates what they can and can't do
*/

var Abilities = {
  // Phrases to be used in the popups
  asCounterPhrases: ["Who cares about xyz, come to abc!", "Why bother with xyz, come to abc!", "abc is much better than xyz!"],

  // Constructs and styles a popup for a given location,
  // and adds a click listener to work as a link
  usePopup: function(opLocation) {
    Web.buildPopup(opLocation);
    Web.stylePopup(opLocation);
    $('#' + opLocation.sId + '.popup').css("display", "block");
    $('#' + opLocation.sId + '.popup').click(function() {
      Web.switchPageTo(Web.oGetPageOwnerById(this));
    });
  },

  // Constructs and styles a master popup for a given location
  useMasterPopup: function(opLocation) {
    Web.buildMasterPopup(opLocation);
    Web.styleMasterPopup(opLocation);
  },

  // Constructs and styles a certainty box for a given location
  useCertaintyBox: function(opLocation) {
    Web.buildCertaintyBox(opLocation);
    Web.styleCertaintyBox(opLocation);
  },

  // Allows a location to steal home territory from another,
  // replacing text and the image
  takeTerritory: function(opTaken, opNew) {
    // The text to be replaced is the original location's h3 content
    var sTakenText = $('#' + opTaken.sId + '.home-territory h3').text();
    // The new text is the attacking location's name
    var sNewText = opNew.sName;
    // Necessary if our strings are not of equal length
    var iDifference, sBuffered;
    // If the new text is longer,
    if (sNewText.length > sTakenText.length) {
      // Set the appropriate difference
      iDifference = sNewText.length - sTakenText.length;
      // Buffer the old text with spaces
      sBuffered = sTakenText;
      for (var i = 0; i < iDifference; i++) {
             sBuffered.concat(" ");
      }
    // Otherwise, do the opposite and buffer the new text
    } else if (sNewText.length < sTakenText.length) {
      iDifference = sTakenText.length - sNewText.length;
      sBuffered = sNewText;
      for (var i = 0; i < iDifference; i++) {
             sBuffered.concat(" ");
      }
    }
    // If we had to buffer, use that as the text to change
    // Otherwise keep the old one
    var sChangingText = sBuffered || sTakenText;
    // Go through the text in reverse
    for (var i = sNewText.length; i >= 0; i--) {
      // Store the current character for each string
      var cCurrentOld = sChangingText[i],
          cCurrentNew = sNewText[i];
      // Every 0.25 seconds, swap the characters and change the text
      setInterval(function() {
        sChangingText.replace(cCurrentOld, cCurrentNew);
        $('#' + opTaken.sId + '.home-territory h3').text(sChangingText);
      }, 250);
    }
    // Change the image to the attacking location's image
    $('#' + opTaken.sId + '.home-territory img').attr("src", "./assets/img/thumbnails/" + opNew.sId + ".jpg");
  }
}
