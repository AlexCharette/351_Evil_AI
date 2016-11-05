
/* Handles all functions and variables related
   to user interaction
*/


var Interaction = {
  // Adds listeners to elements on the home page
  addHomeListeners: function() {
    // If a home territory is clicked,
    $('.home-territory').click(function() {
      // If another page has been visited and the master popup has not appeared,
      if (Web.oLastVisitedPage && !Events.bMasterPopupExists) {
        // Let it be
        Events.activateMasterPopupFor(Web.oLastVisitedPage);
        // Otherwise change the page to that of the selected location
      } else {
        Web.switchPageTo(Web.oGetPageOwnerById(this));
      }
    });
    // If a home territory is hovered over,
    $('.home-territory').mouseover(function() {
      // Store the location that owns it
      var oOwningLocation = Web.oGetPageOwnerById(this);
      // If a random value passes its threshold,
      var fRandomVal = Math.random(0, 1),
          fThreshold = 0.6;
      if (fRandomVal > fThreshold && Web.oLastVisitedPage) {
        // Allow the last visited page to claim that home territory
        Abilities.takeTerritory(oOwningLocation, Web.oLastVisitedPage);
      }
    });
  },

  // Adds listeners to element on a location page
  addPageListeners: function() {
    // When the button to return home is clicked,
    $('#return').click(function() {
      // Store the current page as the one last visited
      Web.oLastVisitedPage = Web.oGetPageOwnerById('body');
      // Go home
      Web.switchPageTo("home");
    });
    // When the return button is hovered over,
    $('#return').mouseover(function() {
      // If there isn't a certainty box, call one
      if (!Events.bCertaintyBoxExists)
        Events.activateCertaintyBox(Web.oGetPageOwnerById('body'));
    });
    // When the button to book a flight is hovered over,
    $('#link-box').mouseover(function() {
      // Allow a random location to use a popup
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
    // When a popup is clicked, navigate to the owner's page
    $('.popup').click(function() {
      Web.switchPageTo(Web.oGetPageOwnerById(this));
    });
  }
}
