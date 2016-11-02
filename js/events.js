

// http://stackoverflow.com/questions/1589234/whats-the-cleanest-way-to-write-a-multiline-string-in-javascript
// http://stackoverflow.com/questions/982717/how-do-i-get-the-entire-pages-html-with-jquery

var Events = Events || {};

Events = {
  bPopupExists: false,
  bCertaintyBoxExists: false,

  setupPage: function(pPage) {
    Web.buildPageTerritory(pPage);
    Web.stylePageTerritory(pPage);
    Interaction.addPageListeners();
  },

  setupHome: function() {
    Web.buildHomePage();
    this.assignHomeTerritories();
    Interaction.addHomeListeners();
  },

  assignHomeTerritories: function() {
      var iRowToFill = 0,
          iLimitPerRow = 4;
      for (var i = 0; i < aoSelectedLocations.length; i++) {
        Web.buildHomeTerritory(iRowToFill, aoSelectedLocations[i]);
        Web.styleHomeTerritory(aoSelectedLocations[i]);
        if (i == iLimitPerRow - 1) iRowToFill++;
      }
    },

    activatePopupFor: function(opLocation) {
      if ($('body').attr('class') == "page-territory") {
        Abilities.usePopup(opLocation);
        this.bPopupExists = true;
      }
    },

    activateCertaintyBox: function(opLocation) {
      if ($('body').attr('class') == "page-territory") {
        Abilities.useCertaintyBox(opLocation);
        this.bCertaintyBoxExists = true;
      }
    },

    resetPopups: function() {
      Web.destroyPopups();
      this.bPopupExists = false;
    },

    resetCertaintyBoxes: function() {
      Web.destroyCertaintyBoxes();
      this.bCertaintyBoxExists = false;
    }
}
