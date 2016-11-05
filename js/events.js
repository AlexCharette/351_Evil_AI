
/* Handles all things deemed to be high level events, in order to better separate the roles
   of namespace objects
*/

var Events = {
  // Keep track of whether or not these already exist,
  // we don't want doubles
  bPopupExists: false,
  bMasterPopupExists: false,
  bCertaintyBoxExists: false,

  // Constructs and styles a territory page,
  // and includes the appropriate listeners
  setupPage: function(pPage) {
    Web.buildPageTerritory(pPage);
    Web.stylePageTerritory(pPage);
    Interaction.addPageListeners();
  },

  // Constructs and styles the home page,
  // and includes the appropriate listeners
  setupHome: function() {
    Web.buildHomePage();
    this.assignHomeTerritories();
    Interaction.addHomeListeners();
  },

  // Places and constructs all home territory sections on the home page
  assignHomeTerritories: function() {
    // Fill the rows located on the home page
    var iRowToFill = 0,
        iLimitPerRow = 4;
    for (var i = 0; i < aoSelectedLocations.length; i++) {
      Web.buildHomeTerritory(iRowToFill, aoSelectedLocations[i]);
      Web.styleHomeTerritory(aoSelectedLocations[i]);
      if (i == iLimitPerRow - 1) iRowToFill++;
    }
  },

  // Instructs the Abilities namespace to use a popup for
  // a given location
  activatePopupFor: function(opLocation) {
    // Only do this if we're not on the home page
    if ($('body').attr('class') == "page-territory") {
      Abilities.usePopup(opLocation);
      this.bPopupExists = true;
    }
  },

  // Instructs the Abilities namespace to use a master popup for
  // a given location
  activateMasterPopupFor: function(opLocation) {
    Abilities.useMasterPopup(opLocation);
    this.bMasterPopupExists = true;
  },

  // Instructs the Abilities namespace to use a certainty box for
  // a given location
  activateCertaintyBox: function(opLocation) {
    // Only do this if we're not on the home page
    if ($('body').attr('class') == "page-territory") {
      Abilities.useCertaintyBox(opLocation);
      this.bCertaintyBoxExists = true;
    }
  },

  // Removes all popups and sets the proper flags
  resetPopups: function() {
    Web.destroyPopups();
    this.bPopupExists = false;
    this.bMasterPopupExists = false;
  },

  // Removes all certainty boxes and sets the proper flags
  resetCertaintyBoxes: function() {
    Web.destroyCertaintyBoxes();
    this.bCertaintyBoxExists = false;
  }
}
