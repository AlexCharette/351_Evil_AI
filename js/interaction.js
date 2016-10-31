/* All functions and variables related to user interaction */

var Interaction = Interaction || {};

Interaction = {

  addListeners: function() {
    this.addClickListeners();
  },

  addClickListeners: function() {
    var oContext = this;
    $('.home-territory, .popup').click(function() {
      Web.switchPageTo(Web.oGetPageOwnerById(this));
      oContext.addHoverListeners();
    });
  },

  addHoverListeners: function() {
    console.log("hovers activated");
    $('#link-box').mouseover(function() {
      console.log("HOVERING");
      var iRandIndex = Math.round(Math.random(0, aoSelectedLocations.length - 1));
      var oPageOwner = Web.oGetPageOwnerByClass(this);
      if (iRandIndex == aoSelectedLocations.indexOf(oPageOwner)) {
        iRandIndex = Math.round(Math.random(0, aoSelectedLocations.length - 1));
      } else {
        Events.activatePopupFor(aoSelectedLocations[iRandIndex]);
      }
    });
  }
}
