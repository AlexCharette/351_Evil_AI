/*
  Utiliy based AI
  AI only want to become more prevalent, and can only take over another if their size is bigger, unless they form a coalition
  Have translation be an unlockable feature
*/
const iNUM_LOCATIONS = 10;
var asPossibleLocations = ["Reykjavik", "London", "Brazilia", "Shanghai", "Frankfurt", "Toronto", "Buenos Aires", "Marseille", "New York", "Stockholm"];
var asSelectedLocations = [iNUM_LOCATIONS];

function setLocations(pArray) {
  for (var i = 0; i < pArray.length; i++) {
    while (i <= asSelectedLocations.length)
      asSelectedLocations[i] = pArray[i];
  }
}

var oLocation = function(pName, pLanguage) {
  var sName = pName;
  var sLanguage = pLanguage;
  console.log("In " + sName + ", they speak " + sLanguage);
};

var Reykjavik = new oLocation("Reykjavik", "Icelandic");

var Relations = Relations || {};
Relations.Conquest = {
  sAttacker: "",
  sDefender: ""
}

Relations.Diplomacy = {

}
