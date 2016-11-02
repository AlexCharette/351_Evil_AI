/* Location objects, collections locations and methods for manipulating them and enhancing them */
// USE TUBULAR AS ULTIMATE POWER

//http://stackoverflow.com/questions/2687679/jquery-ajax-inside-a-loop-problem

const iNUM_LOCATIONS = 7;
var bLocationsReady = false;
var oLocation = function(spName, spLanguage,
                         spMainColor, spSecondColor, spThirdColor = "", sAirportCode) {
  this.sName = spName;
  this.sLanguage = spLanguage;
  this.sMainColor = spMainColor;
  this.sSecondColor = spSecondColor;
  this.sThirdColor = spThirdColor;
  this.sId = (Statics.bHasSpaces(this.sName) ? this.sName.replace(' ', '') : this.sName);
  this.sAirportCode = sAirportCode;

  this.asGetLocationColorRoles = function() {
    var sBackgroundColor = this.sMainColor;
    var sTextColor = function() {
      // Default to white text
      if (this.sMainColor != "#FFFFFF") {
        return "#FFFFFF";
      } else {
        return this.sThirdColor || this.sSecondColor;
      }
    }
    var sTrimColor = (this.sThirdColor && (this.sThirdColor != "#FFFFFF")) ? this.sThirdColor : this.sSecondColor;
    var asColorArray = [sBackgroundColor, sTextColor, sTrimColor];
    return asColorArray;
  }
};

var aoPossibleLocations = [Reykjavik = new oLocation("Reykjavik", "Icelandic", "#02529C", "#DC1E35", "#FFFFFF", "KEF"), London = new oLocation("London", "English", "#CC0000", "#003399", "#FFFFFF", "LHR"),
                           Brasilia = new oLocation("Brasilia", "Portuguese", "#00A859", "#FFCC29", "#3E4095", "BSB"), HongKong = new oLocation("Hong Kong", "Cantonese", "#FF0000", "#FFFFFF", "", "HKG"),
                           Frankfurt = new oLocation("Frankfurt", "German", "#000000", "#FF0000", "#FFCC00", "FRA"), Johannesburg = new oLocation("Johannesburg", "Afrikaans", "#007C59", "#E23D28", "#FCB514", "JNB"),
                           BuenosAires = new oLocation("Buenos Aires", "Spanish", "#75AADB", "#FCBF49", "#FFFFFF", "BUE"), Marseille = new oLocation("Marseille", "French", "#0055A4", "#FFFFFF", "#EF4135", "MRS"),
                           NewYork = new oLocation("New York", "English", "#B22234", "#FFFFFF", "#3C3B6E", "JFK"), Stockholm = new oLocation("Stockholm", "Swedish", "#FFCE00", "#00559B", "", "ARN")];
var aoSelectedLocations = [];

function readyLocations() {
  if (bLocationsReady) { return; }
  Statics.transferArray(aoPossibleLocations, aoSelectedLocations);
  aoSelectedLocations = Statics.aShuffleArray(aoSelectedLocations); // TODO possibly not showing all locations
  Statics.trimArray(aoSelectedLocations, iNUM_LOCATIONS);
  Events.assignHomeTerritories();
  bLocationsReady = true;
}

function loadSummaries() {
  for (oCurrentLocation of aoSelectedLocations) {
    getSummary(oCurrentLocation);
  }
}

function getSummary(opLocation) {
  $.ajax({url: "./assets/summaries/" + opLocation.sId + "-Summary.txt",
    success: function(result) {
      opLocation.sSummary = result;
    },
    error: function() {
      opLocation.sSummary = "Summary not found for: " + opLocation.sId;
    }
  });
}
