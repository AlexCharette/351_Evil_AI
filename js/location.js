/* Location objects, collections locations and methods for manipulating them and enhancing them */
// USE TUBULAR AS ULTIMATE POWER
const iNUM_LOCATIONS = 7;
var bLocationsReady = false;
var oLocation = function(spName, spLanguage,
                         spMainColor, spSecondColor, spThirdColor = undefined) {
  this.sName = spName;
  this.sLanguage = spLanguage;
  this.sMainColor = spMainColor;
  this.sSecondColor = spSecondColor;
  this.sThirdColor = spThirdColor;
  this.sId = (Statics.bHasSpaces(this.sName) ? Statics.sReplaceCharacters(this.sName, ' ', '-') : "");
  this.iPoints = 0;
  console.log("In " + this.sName + ", they speak " + this.sLanguage);
};

var aoPossibleLocations = [Reykjavik = new oLocation("Reykjavik", "Icelandic", "#02529C", "#DC1E35", "#FFFFFF"), London = new oLocation("London", "English", "#CC0000", "#003399", "#FFFFFF"),
                           Brasilia = new oLocation("Brasilia", "Portuguese", "#00A859", "#FFCC29", "#3E4095"), HongKong = new oLocation("Hong Kong", "Cantonese", "#FF0000", "#FFFFFF"),
                           Frankfurt = new oLocation("Frankfurt", "German", "#000000", "#FF0000", "#FFCC00"), Johannesburg = new oLocation("Johannesburg", "Afrikaans", "#007C59", "#E23D28", "#FCB514"),
                           BuenosAires = new oLocation("Buenos Aires", "Spanish", "#75AADB", "#FCBF49", "#FFFFFF"), Marseille = new oLocation("Marseille", "French", "#0055A4", "#FFFFFF", "#EF4135"),
                           NewYork = new oLocation("New York", "English", "#B22234", "#FFFFFF", "#3C3B6E"), Stockholm = new oLocation("Stockholm", "Swedish", "#FFCE00", "#00559B")];
var aoSelectedLocations = [];
var msLocationSummaries = new Map();

var Abilities = Abilities || {};

Abilities = {
  usePopup: function() {
    // some code
  },

  takeTerritory: function() {
    // some code
  }
}

function addLocationSummaries(aoLocations) {
  for (oCurrentLocation of aoLocations)
    oCurrentLocation.sSummary = msLocationSummaries(oCurrentLocation.sName);
}

function readyLocations() {
  if (!bLocationsReady) {
    Statics.transferArray(aoPossibleLocations, aoSelectedLocations);
    aoSelectedLocations = Statics.aShuffleArray(aoSelectedLocations); // TODO possibly not showing all locations
    Statics.trimArray(aoSelectedLocations, iNUM_LOCATIONS);
    Events.assignHomeTerritories();
    setLocationSummaries();
    Events.assignPageTerritories();
  }
  for (oCurrentLocation of aoSelectedLocations)
    calculateLocationPoints(oCurrentLocation);
  logPointTotals();
  bLocationsReady = true;
}

function calculateLocationPoints(opLocation) {
  var sLocationName = opLocation.sId || opLocation.sName;
  var aoTags = $('.' + sLocationName).children();
  if (!aoTags) {
    console.log("ERR_COULD_NOT_FIND_TAGS");
    return;
  }
  for (var i = 0; i < aoTags.length; i++) {
    var sTagName = aoTags[i].tagName.toLowerCase();
    switch(sTagName) {
      case "li":
        opLocation.iPoints += Web.moElementValues.get("li");
        console.log("LI_FOUND_IN: " + sLocationName);
      break;
      case "h3":
        opLocation.iPoints += Web.moElementValues.get("h3");
        console.log("H3_FOUND_IN: " + sLocationName);
      break;
      case "p":
        opLocation.iPoints += Web.moElementValues.get("p");
        console.log("P_FOUND_IN: " + sLocationName);
      break;
      case "img":
        opLocation.iPoints += Web.moElementValues.get("img");
        console.log("IMG_FOUND_IN: " + sLocationName);
      break;
      case "a":
        opLocation.iPoints += Web.moElementValues.get("a");
        console.log("A_FOUND_IN: " + sLocationName);
      break;
      default:
      console.log("ERR_INVALID_TAGNAME_IN: " + sLocationName);
    }
  }
}



function setLocationSummaries() {
  for (oCurrentLocation of aoSelectedLocations) {
    var sLocationName = oCurrentLocation.sId || oCurrentLocation.sName;
    $.ajax({url: "./assets/summaries/" + sLocationName + "-Summary.txt",
      success: function(result){
        msLocationSummaries.set(oCurrentLocation.sName, result);
      },
      error: function() {
        console.log("Summary not found for: " + oCurrentLocation.sName);
        msLocationSummaries.set("Summary not found for: " + oCurrentLocation.sName);
      }
    });
  }
}

function logPointTotals() {
  for (var i = 0; i < aoSelectedLocations.length; i++) {
    console.log("Points for " + aoSelectedLocations[i].sName + ": " + aoSelectedLocations[i].iPoints);
  }
}
