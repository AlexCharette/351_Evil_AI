/* Location objects, collections locations and methods for
   manipulating them and enhancing them
*/

// Store the limit for the number of locations
const iNUM_LOCATIONS = 7;
// A location object has a name, colors according to its flag, and an airport code
var oLocation = function(spName, spMainColor, spSecondColor, spThirdColor = "",
                         sAirportCode) {
  this.sName = spName;
  this.sMainColor = spMainColor;
  this.sSecondColor = spSecondColor;
  this.sThirdColor = spThirdColor;
  // Create an id (for html purposes) by removing spaces in the name if there are any
  this.sId = (Statics.bHasSpaces(this.sName) ? this.sName.replace(' ', '') : this.sName); // Cheers, Pippin (I didn't do this to antagonize)
  this.sAirportCode = sAirportCode;

  // Returns the colors of the location in an organized array
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
    // If there is a third color and that color isn't white, use it
    // If not use the second color
    var sTrimColor = (this.sThirdColor && (this.sThirdColor != "#FFFFFF")) ? this.sThirdColor : this.sSecondColor;
    // Insert everything into an array
    var asColorArray = [sBackgroundColor, sTextColor, sTrimColor];
    return asColorArray;
  }
};

// Store all the locations that we can draw from
var aoPossibleLocations = [Reykjavik = new oLocation("Reykjavik", "#02529C", "#DC1E35", "#FFFFFF", "KEF"), London = new oLocation("London", "#CC0000", "#003399", "#FFFFFF", "LHR"),
                           Brasilia = new oLocation("Brasilia", "#00A859", "#FFCC29", "#3E4095", "BSB"), HongKong = new oLocation("Hong Kong", "#FF0000", "#FFFFFF", "", "HKG"),
                           Frankfurt = new oLocation("Frankfurt", "#000000", "#FF0000", "#FFCC00", "FRA"), Johannesburg = new oLocation("Johannesburg", "#007C59", "#E23D28", "#FCB514", "JNB"),
                           BuenosAires = new oLocation("Buenos Aires", "#75AADB", "#FCBF49", "#FFFFFF", "BUE"), Marseille = new oLocation("Marseille", "#0055A4", "#FFFFFF", "#EF4135", "MRS"),
                           NewYork = new oLocation("New York", "#B22234", "#FFFFFF", "#3C3B6E", "JFK"), Stockholm = new oLocation("Stockholm", "#FFCE00", "#00559B", "", "ARN")];
// Have an array for the ones we actually use
var aoSelectedLocations = [];

// Sorts through the locations and makes a smaller array from a random selection
function readyLocations() {
  // Copy the larger array
  Statics.transferArray(aoPossibleLocations, aoSelectedLocations);
  // Randomize the elements within
  aoSelectedLocations = Statics.aShuffleArray(aoSelectedLocations);
  // Cut it down to the desired length
  Statics.trimArray(aoSelectedLocations, iNUM_LOCATIONS);
}

// Calls the function that loads summaries for locations
function loadSummaries() {
  for (oCurrentLocation of aoSelectedLocations) {
    getSummary(oCurrentLocation);
  }
}

// Retrieves a summary from the file system for a given location
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
