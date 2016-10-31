var Abilities = Abilities || {};

Abilities = {
  asCounterPhrases: ["Who cares about xyz, come to abc!", "Why bother with xyz, come to abc!", "abc is much better than xyz!"],
  aiActivePopups: 0,

  usePopup: function(opLocation) {
    opLocation.bPopupActivated = true;
    Web.buildPopup(opLocation);
    Web.stylePopup(opLocation);
    $('#' + opLocation.sId + '.popup').css("display", "block");
  },

  takeTerritory: function() {
    // some code
  }
}
