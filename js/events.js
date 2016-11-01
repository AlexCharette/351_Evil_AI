

// http://stackoverflow.com/questions/1589234/whats-the-cleanest-way-to-write-a-multiline-string-in-javascript
// http://stackoverflow.com/questions/982717/how-do-i-get-the-entire-pages-html-with-jquery

var Events = Events || {};

Events = {
  bPopupExists: false,

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

    resetPopups: function() {
      Web.destroyPopups();
      this.bPopupExists = false;
    }
}
