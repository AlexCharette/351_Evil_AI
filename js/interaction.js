/* All functions and variables related to user interaction */

var Interaction = Interaction || {};

Interaction = {

  addHomeListeners: function() {
    $('.home-territory').click(function() {
      Web.switchPageTo(Web.oGetPageOwnerById(this));
    });
    if (Web.oLastVisitedPage) {
      $('.home-territory').mouseover(function() {
        var oOwningTerritory = Web.oGetPageOwnerById(this);
        var fRandomVal = Math.random(0, 1),
            fThreshold = 0.6;
        var sAttackedTerritory = oOwningTerritory.sId;
        if (fRandomVal > fThreshold) {
          Abilities.takeTerritory(sAttackedTerritory, Web.oLastVisitedPage.sName);
        }
      });
    }
  },

  addPageListeners: function() {
    $('#return').click(function() {
      Web.oLastVisitedPage = Web.oGetPageOwnerById('body');
      Web.switchPageTo("home");
    });
    $('#return').mouseover(function() {
      if (!Events.bCertaintyBoxExists)
        Events.activateCertaintyBox(Web.oGetPageOwnerById('body'));
    });
    $('#link-box').mouseover(function() {
      var iRandIndex = Math.round(Math.random(0, aoSelectedLocations.length - 1));
      var oPageOwner = Web.oGetPageOwnerByClass(this);
      if (!Events.bPopupExists) {
        if (iRandIndex == aoSelectedLocations.indexOf(oPageOwner)) {
          iRandIndex = Math.round(Math.random(0, aoSelectedLocations.length - 1));
        } else {
          Events.activatePopupFor(aoSelectedLocations[iRandIndex]);
        }
      }
    });
    $('.popup').click(function() {
      Web.switchPageTo(Web.oGetPageOwnerById(this));
    });
  }
}
