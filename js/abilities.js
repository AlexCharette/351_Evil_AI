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

  takeTerritory: function(spTaken, spNew) {
    if (spNew.length > spTaken.length) {
      var iDifference = spNew.length - spTaken.length;
      for (var i = 0; i < iDifference.length; i++) {
        spTaken += " ";
      }
    }
    for (var i = spNew.length; i > 0; i--) {
      setInterval(this.swapChars, 250);
    }
  },

  swapChars: function(spText, cpReplace, cpNew) {
    spText.replace(cpReplace, cpNew);
  }
}
