

// http://stackoverflow.com/questions/1589234/whats-the-cleanest-way-to-write-a-multiline-string-in-javascript

var Events = Events || {};

Events = {
  bHomeTerritoriesAssigned: false,
  bPageTerritoriesAssigned: false,

  Conquest: function(opAttacker, opDefender){
    oAttacker = opAttacker;
    oDefender = opDefender;
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
     var sHomeTerritory = this.sGetHomeTerritoryTag(opLocation);
     $('#row-' + ipRowNum).append(sHomeTerritory);
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
   },

   sGetHomeTerritoryTag: function(opLocation) {
     var sLocationName = opLocation.sId || opLocation.sName;
     return '<div class="' + sLocationName + ' home-territory"><img src="" alt =""><h3>' + opLocation.sName + '</h3></div>';
   },

   assignPageTerritories: function() {
     if (!this.bPageTerritoriesAssigned) {
       for (oCurrentLocation of aoSelectedLocations) {
         this.createPageTerritory(oCurrentLocation);
       }
     }
     this.bPageTerritoriesAssigned = true;
   },

   createPageTerritory: function(opLocation) {
     var sLocationName = opLocation.sId || opLocation.sName;
     var oLocationPage = Web.makeDocument(sLocationName, Statics.sGetMergedText(this.sGetTerritoryPageBase(opLocation), this.sGetTerritoryPageContent(opLocation)));
     sessionStorage.setItem(sLocationName + "-page", oLocationPage);
   },

   sGetTerritoryPageContent: function(opLocation) {
     var sHeroImage = '<img src="" alt="">';
     var sMainTitle = '<h1>Come to ' + opLocation.sName + '</h1>';
     var sSummary = '<main>' + msLocationSummaries.get(opLocation.sName) + '</main>';
   },

   sGetTerritoryPageBase: function(opLocation) {
     var sLocationName = opLocation.sId || opLocation.sName;
     return [""
              ,'<!DOCTYPE html> \n <html lang="en"> \n <head>'
              ,'<meta http-equiv="content-type" content="text/html; charset=utf-8">'
              ,'<title>' + opLocation.sName + '</title>'
              ,'<link rel="stylesheet" type="text/css" href="css/style.css"/>'
              ,'<script language="javascript" content="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>'
              ,'<script language="javascript" content="text/javascript" src="js/statics.js"></script>'
              ,'<script language="javascript" content="text/javascript" src="js/web.js"></script>'
              ,'<script language="javascript" content="text/javascript" src="js/location.js"></script>'
              ,'<script language="javascript" content="text/javascript" src="js/events.js"></script>'
              ,'<script language="javascript" content="text/javascript" src="js/main.js"></script>'
              ,'</head> \n <body id="' + sLocationName + '-home"> \n </body> \n </html>'
          ].join("\n");
   }
}
