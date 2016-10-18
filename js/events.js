
var Events = Events || {};

Events = {
  bHomeTerritoriesAssigned: false,

  Conquest: function(opAttacker, opDefender){
    oAttacker = opAttacker;
    oDefender = opDefender;
  },

  Diplomacy: function(opInitiator, opResponder){
    oInitiator = opInitiator;
    oResponder = opResponder;
  },

  assignHomeTerritories: function() {
      if (!this.bHomeTerritoriesAssigned) {
        var iRowToFill, iLimitPerRow;
        iRowToFill = 0;
        iLimitPerRow = 4;
        for (var i = 0; i < aoSelectedLocations.length; i++) {
          this.createHomeTerritory(iRowToFill, aoSelectedLocations[i]);
          if (i == iLimitPerRow - 1) iRowToFill++;
        }
      }
      this.bHomeTerritoriesAssigned = true;
    },

   createHomeTerritory: function(ipRowNum, opLocation) {
     var sLocationName = opLocation.sId || opLocation.sName;
     var homeTerritory = '<div class="' + sLocationName + ' home-territory"><img><h3>' + opLocation.sName + '</h3></div>';
     $('#row-' + ipRowNum).append(homeTerritory);
     this.styleHomeTerritory(opLocation);
   },

   styleHomeTerritory: function(opLocation) {
     var sLocationName;
     var sBackgroundColor, sTextColor, sTrimColor;
     sLocationName = opLocation.sId || opLocation.sName;
     sBackgroundColor = opLocation.sMainColor;
     sTextColor = function() {
       // Default to white text
       if (opLocation.sMainColor != "#FFFFFF") {
         return "#FFFFFF";
       } else {
         return opLocation.sThirdColor || opLocation.sSecondColor;
       }
     }
     sTrimColor = ((opLocation.sThirdColor && (opLocation.sThirdColor != "#FFFFFF")) ? opLocation.sThirdColor : opLocation.sSecondColor);
     $('.' + sLocationName + ' h3').css("background-color", sBackgroundColor);
     $('.' + sLocationName).css("color", sTextColor);
     document.styleSheets[0].insertRule('#home-gallery .' + sLocationName + ' h3:after { display: block; content: ""; margin: 0 auto; height: 5px; width: 0px; -webkit-transition: width 0.25s ease; transition: width 0.25s ease; }', 0);
     document.styleSheets[0].insertRule('#home-gallery .' + sLocationName + ':hover h3:after { width: 100%; background-color: ' + sTrimColor + '; }', 1);
   }
}
