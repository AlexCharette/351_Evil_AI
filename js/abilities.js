var Abilities = Abilities || {};

Abilities = {
  asCounterPhrases: ["Who cares about xyz, come to abc!", "Why bother with xyz, come to abc!", "abc is much better than xyz!"],

  usePopup: function(opLocation) {
    Web.buildPopup(opLocation);
    Web.stylePopup(opLocation);
    $('#' + opLocation.sId + '.popup').css("display", "block");
  },

  takeTerritory: function() {
    // some code
  }
}
