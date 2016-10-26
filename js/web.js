

var Web = Web || {};

Web = {
  moElementValues: new Map(),

  setElementValues: function() {
    var iLiValue = 2, iH1Value = 4, iH3Value = 3, iPValue = 1,
        iImgValue = 5, iAValue = 3;
    this.moElementValues.set("li", iLiValue);
    this.moElementValues.set("h1", iH1Value);
    this.moElementValues.set("h3", iH3Value);
    this.moElementValues.set("p", iPValue);
    this.moElementValues.set("img", iImgValue);
    this.moElementValues.set("a", iAValue);
  },

  buildHomePage: function() {
    $('body').attr('id', "home");
    $('header').attr('id', "home-header");
    $('main').attr('id', "home-gallery");
    $('main').append('<div id="row-0" class="row"></div>');
    $('main').append('<div id="row-1" class="row"></div>');
    $('main').append('<div id="row-2" class="row"></div>');
  },

  buildHomeTerritory: function(ipRowNum, opLocation) {
    $('#row-' + ipRowNum).append('<div id="' + opLocation.sId + '" class="home-territory"></div>');
    $('#' + opLocation.sId + '.home-territory').append('<img src="" alt ="">');
    $('#' + opLocation.sId + '.home-territory').append('<h3>' + opLocation.sName + '</h3>');
  },

  buildPageTerritory: function(opLocation) {
    $('body').attr('id', opLocation.sId);
    $('body').attr('class', "page-territory");
    $('header').attr('id', "page-header");
    $('header').prepend('<img src="./assets/img/full/' + opLocation.sId + '.jpg">');
    $('h1').text('Come to ' + opLocation.sName + '!');
    $('main').attr('id', "page-content");
    $('main').append('<div id="summary-box"><p></p></div>');
    $('main').append('<div id="link-box" class="' + opLocation.sId + '"><a href="' + this.sGetFlightURL(opLocation) + '"><h4>What are you waiting for?</h4></a></div>');
    $('.row').remove();
    if (!opLocation.sSummary) { return; }
    $('#summary-box p').text(opLocation.sSummary);
    console.log(opLocation.sSummary);
  },

  buildPopup: function(opLocation) {
    var iRandIndex = Math.round(Math.random(0, Abilities.asCounterPhrases.length - 1));
    var oTargetLocation = this.oGetPageOwnerById('body');
    console.log(oTargetLocation);
    var sHeadingPhrase;
    sHeadingPhrase = Abilities.asCounterPhrases[iRandIndex].replace("xyz", oTargetLocation.sName);
    sHeadingPhrase = sHeadingPhrase.replace("abc", opLocation.sName);
    $('body').append('<div id="' + opLocation.sId + '" class="popup"></div>');
    $('#' + opLocation.sId + '.popup').append('<h2>' + sHeadingPhrase + '</h2>');
    $('.popup').append('<h4>Head over now!</h4>');
    console.log("Popup built");
  },

  styleHomeTerritory: function(opLocation) {
    $('#' + opLocation.sId + ' h3').css("background-color", opLocation.asGetLocationColorRoles()[0]);
    $('#' + opLocation.sId).css("color", opLocation.asGetLocationColorRoles()[1]);
    document.styleSheets[0].insertRule([""
                                       ,'#home-gallery #' + opLocation.sId + ' h3:after {'
                                       ,'display: block; content: ""; margin: 0 auto; height: 5px; width: 0px;'
                                       ,'-webkit-transition: width 0.25s ease; transition: width 0.25s ease; }'
                                       ].join(""), 0);
    document.styleSheets[0].insertRule([""
                                       ,'#home-gallery #' + opLocation.sId + ':hover h3:after {'
                                       ,'width: 100%; background-color: ' + opLocation.asGetLocationColorRoles()[2] + '; }'
                                       ].join(""), 1);
  },

  stylePageTerritory: function(opLocation) {
    document.styleSheets[0].insertRule([""
                                       ,'#' + opLocation.sId + 'h1 {'
                                       ,'display: inline-block; width: auto;'
                                       ,'background-color: ' + opLocation.asGetLocationColorRoles()[0] + '}'
                                       ].join(""), 0);
    $('#' + opLocation.sId + ' p').css("color", "#000");
  },

  stylePopup: function(opLocation) {
    $('.popup').css("background-color", opLocation.asGetLocationColorRoles()[0]);
    $('#' + opLocation.sId).css("color", opLocation.asGetLocationColorRoles()[1]);
    document.styleSheets[0].insertRule([""
                                       ,'.popup {'
                                       ,'position: relative; width: 40%; height: 30%;'
                                       ,'margin: auto;'
                                       ,'text-align: center;'
                                       ,'border: 5px solid ' + opLocation.asGetLocationColorRoles()[2] + '; opacity: 0.8;'
                                       ,'-webkit-transition: opacity 0.25s ease; transition: opacity 0.25s ease; }'
                                       ].join(""), 0);
    document.styleSheets[0].insertRule('.popup:hover { opacity: 1; }', 1);
    document.styleSheets[0].insertRule([""
                                       ,'.popup #' + opLocation.sId + 'h4:after {'
                                       ,'display: none; content: ""; margin: 0 auto; height: 5px; width: 0px;'
                                       ,'-webkit-transition: width 0.25s ease; transition: width 0.25s ease; }'
                                       ].join(""), 2);
    document.styleSheets[0].insertRule('.popup #' + opLocation.sId + ':hover h4:after { width: 100%; background-color: ' + opLocation.asGetLocationColorRoles()[1] + '; }', 3);
    console.log("Popup styled");
  },

  sGetFlightURL: function(opLocation) {
    var sFrom = "YUL", // TODO replace to make personalized
        sTo = opLocation.sAirportCode;
    return "https://www.google.ca/flights/?f=0#search;f=" + sFrom + ";t=" + sTo + ";";
  },

  switchPageTo: function(pPage) {
    if (pPage != "home") {
      if (!bAssetsLoaded) { return; }
      this.buildPageTerritory(pPage);
      this.stylePageTerritory(pPage);
    } else {
      this.buildHomePage();
      Events.assignHomeTerritories();
    }
  },

  oGetPageOwnerById: function(pElement) {
    var sOwnerName = $(pElement).attr('id');
    function bIsCorrectLocation(oCurrentLocation) { return oCurrentLocation.sId == sOwnerName; }
    return aoSelectedLocations.find(bIsCorrectLocation);
  },

  oGetPageOwnerByClass: function(pElement) {
    var sOwnerName = $(pElement).attr('class');
    console.log(sOwnerName);
    function bIsCorrectLocation(oCurrentLocation) { return oCurrentLocation.sId == sOwnerName; }
    return aoSelectedLocations.find(bIsCorrectLocation);
  },

  calculateLocationPoints: function(opLocation) {
    var aoTags = $('#' +  opLocation.sId).children();
    if (!aoTags) {
      console.log("ERR_COULD_NOT_FIND_TAGS");
      return;
    }
    for (var i = 0; i < aoTags.length; i++) {
      var sTagName = aoTags[i].tagName.toLowerCase();
      switch(sTagName) {
        case "li":
          opLocation.iPoints += this.moElementValues.get(sTagName);
          console.log("LI_FOUND_IN: " +  opLocation.sId);
        break;
        case "h1":
          opLocation.iPoints += this.moElementValues.get(sTagName);
          console.log("H1_FOUND_IN: " +  opLocation.sId);
        break;
        case "h3":
          opLocation.iPoints += this.moElementValues.get(sTagName);
          console.log("H3_FOUND_IN: " +  opLocation.sId);
        break;
        case "p":
          opLocation.iPoints += this.moElementValues.get(sTagName);
          console.log("P_FOUND_IN: " +  opLocation.sId);
        break;
        case "img":
          opLocation.iPoints += this.moElementValues.get(sTagName);
          console.log("IMG_FOUND_IN: " +  opLocation.sId);
        break;
        case "a":
          opLocation.iPoints += this.moElementValues.get(sTagName);
          console.log("A_FOUND_IN: " +  opLocation.sId);
        break;
        default:
          console.log("ERR_INVALID_TAGNAME_IN: " +  opLocation.sId);
      }
    }
  }
}
