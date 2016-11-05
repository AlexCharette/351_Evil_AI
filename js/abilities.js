var Abilities = Abilities || {};

Abilities = {
  asCounterPhrases: ["Who cares about xyz, come to abc!", "Why bother with xyz, come to abc!", "abc is much better than xyz!"],

  usePopup: function(opLocation) {
    Web.buildPopup(opLocation);
    Web.stylePopup(opLocation);
    $('#' + opLocation.sId + '.popup').css("display", "block");
    $('#' + opLocation.sId + '.popup').click(function() {
      Web.switchPageTo(Web.oGetPageOwnerById(this));
    });
  },

  useMasterPopup: function(opLocation) {
    Web.buildMasterPopup(opLocation);
    Web.styleMasterPopup(opLocation);
  },

  useCertaintyBox: function(opLocation) {
    Web.buildCertaintyBox(opLocation);
    Web.styleCertaintyBox(opLocation);
  },

  takeTerritory: function(opTaken, opNew) {
    var sTakenText = $('#' + opTaken.sId + '.home-territory h3').text();
    var sNewText = opNew.sName;
    var iDifference, sBuffered;
    if (sNewText.length > sTakenText.length) {
      iDifference = sNewText.length - sTakenText.length;
      sBuffered = sTakenText;
      for (var i = 0; i < iDifference; i++) {
             sBuffered.concat(" ");
      }
    } else if (sNewText.length < sTakenText.length) {
      iDifference = sTakenText.length - sNewText.length;
      sBuffered = sNewText;
      for (var i = 0; i < iDifference; i++) {
             sBuffered.concat(" ");
      }
    }
    var sChangingText = sBuffered || sTakenText;
    for (var i = sNewText.length; i >= 0; i--) {
      var cCurrentOld = sChangingText[i],
          cCurrentNew = sNewText[i];
      setInterval(function() {
        sChangingText.replace(cCurrentOld, cCurrentNew);
        $('#' + opTaken.sId + '.home-territory h3').text(sChangingText);
      }, 250);
    }
    $('#' + opTaken.sId + '.home-territory img').attr("src", "./assets/img/thumbnails/" + opNew.sId + ".jpg");
  }
}
