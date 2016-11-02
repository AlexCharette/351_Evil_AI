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

  useCertaintyBox: function(opLocation) {
    Web.buildCertaintyBox(opLocation);
    Web.styleCertaintyBox(opLocation);
  },

  takeTerritory: function(spTaken, spNew) {
    var spTakenText = spTaken.text();
    var iDifference, sBuffered;
    if (spNew.length > spTakenText.length) {
      iDifference = spNew.length - spTakenText.length;
      sBuffered = spTakenText;
      for (var i = 0; i < iDifference; i++) {
           sBuffered.concat(" ");
      }
    } else if (spNew.length < spTakenText.length) {
      iDifference = spTakenText.length - spTakenText.length;
      sBuffered = spNew;
      for (var i = 0; i < iDifference; i++) {
           sBuffered.concat(" ");
      }
    }
    var sChangingText = sBuffered || spTakenText;
    for (var i = spNew.length; i >= 0; i--) {
      var cCurrentOld = sChangingText[i],
          cCurrentNew = spNew[i];
      console.log("Old Char = " + cCurrentOld + " , New Char = " + cCurrentNew);
      setInterval(function() {
        sChangingText.replace(cCurrentOld, cCurrentNew);
        $(spTaken).text(sChangingText);
      }, 250);
      console.log("Replaced text: " + sChangingText);
    }
  }
}
