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
      $('#return').click(function() {
        Web.switchPageTo("home");
      });
      oContext.addHoverListeners();
    });
  },

  addHoverListeners: function() {
    $('#link-box').mouseover(function() {
      var iRandIndex = Math.round(Math.random(0, aoSelectedLocations.length - 1));
      var oPageOwner = Web.oGetPageOwnerByClass(this);
      if (Events.bPopupExists == false) {
        if (iRandIndex == aoSelectedLocations.indexOf(oPageOwner)) {
          iRandIndex = Math.round(Math.random(0, aoSelectedLocations.length - 1));
        } else {
          Events.activatePopupFor(aoSelectedLocations[iRandIndex]);
        }
      }
    });
  }
}
