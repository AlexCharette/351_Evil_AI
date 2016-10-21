

// http://stackoverflow.com/questions/1589234/whats-the-cleanest-way-to-write-a-multiline-string-in-javascript
// http://stackoverflow.com/questions/982717/how-do-i-get-the-entire-pages-html-with-jquery

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

   sGetHomeTerritoryTag: function(opLocation) {
     var sLocationName = opLocation.sId || opLocation.sName;
     var sPageName = sessionStorage.getItem(sLocationName + "-page");
     return [""
             ,'<div class="' + sLocationName + ' home-territory">'
             ,'<a href="' + sPageName + '">'
             ,'<img src="" alt ="">'
             ,'<h3>' + opLocation.sName + '</h3>'
             ,'</a>'
             ,'</div>'
           ].join("\n");
   },

   styleHomeTerritory: function(opLocation) {
     var sLocationName = opLocation.sId || opLocation.sName;
     var sBackgroundColor = opLocation.sMainColor;
     var sTextColor = function() {
       // Default to white text
       if (opLocation.sMainColor != "#FFFFFF") {
         return "#FFFFFF";
       } else {
         return opLocation.sThirdColor || opLocation.sSecondColor;
       }
     }
     var sTrimColor = ((opLocation.sThirdColor && (opLocation.sThirdColor != "#FFFFFF")) ? opLocation.sThirdColor : opLocation.sSecondColor);
     $('.' + sLocationName + ' h3').css("background-color", sBackgroundColor);
     $('.' + sLocationName).css("color", sTextColor);
     document.styleSheets[0].insertRule('#home-gallery .' + sLocationName + ' h3:after { display: block; content: ""; margin: 0 auto; height: 5px; width: 0px; -webkit-transition: width 0.25s ease; transition: width 0.25s ease; }', 0);
     document.styleSheets[0].insertRule('#home-gallery .' + sLocationName + ':hover h3:after { width: 100%; background-color: ' + sTrimColor + '; }', 1);
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
     var oLocationPage = Web.oGetNewDocument(opLocation.sName);
     this.createAndAddPageTerritoryBase(oLocationPage, opLocation);
     this.createAndAddPageTerritoryContent(oLocationPage, opLocation);
     var sPageLink = window.URL.createObjectURL(oLocationPage);
     sessionStorage.setItem(sLocationName + "-page", sPageLink);
   },

   createAndAddPageTerritoryContent: function(opDocument, opLocation) {
     $(opDocument + ' body').append('img');
     $(opDocument + ' body').append('<h1>Come to ' + opLocation.sName + '</h1>');
     $(opDocument + ' body').append('<main>' + msLocationSummaries.get(opLocation.sName) +'</main>');
   },

   createAndAddPageTerritoryBase: function(opDocument, opLocation) {
     $(":" + opDocument + ' head').html(document.html());
     $(":" + opDocument + ' title').html(opLocation.sName);
   }
}
