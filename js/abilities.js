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
    if (spNew.length > spTaken.length) {
      var iDifference = spNew.length - spTaken.length;
      var sBuffered = spTaken;
      for (var i = 0; i < iDifference.length; i++) {
           sBuffered.concat(" ");
      }
    }
    var sOld = sBuffered || spTaken;
    if (sOld) console.log("OKAY WE GOT SOME OLD TEXT");
    for (var i = spNew.length; i > 0; i--) {
      console.log("I'm in the loop");
      var cCurrentOld = sOld[i],
          cCurrentNew = spNew[i];
      console.log("Old Char = " + cCurrentOld + " , New Char = " + cCurrentNew);
      setInterval(function() {
        sOld.replace(cCurrentOld, cCurrentNew);
      }, 250);
    }
  }
}
