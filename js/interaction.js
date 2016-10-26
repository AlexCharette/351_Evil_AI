/* All functions and variables related to user interaction */

var Interaction = Interaction || {};

Interaction = {

  addListeners: function() {
    this.addClickListeners();
    this.addHoverListeners();
  },

  addClickListeners: function() {
    $('.home-territory, .popup').click(function() {
      Web.switchPageTo(Web.oGetPageOwnerById(this));
    });
  },

  addHoverListeners: function() {
    console.log("hovers activated");
    $('#link-box').mouseover(function() {
      var iRandIndex;
      var oPageOwner = Web.oGetPageOwnerByClass(this);
      if (iRandIndex == aoSelectedLocations.indexOf(oPageOwner)) {
        iRandIndex = Math.round(Math.random(0, aoSelectedLocations.length - 1));
        console.log("ERR_OWNER_AND_ATTACKER_ARE_SAME");
      } else {
        Events.activatePopupFor(aoSelectedLocations[iRandIndex]);
      }
    });
  }
}
