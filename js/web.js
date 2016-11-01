

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
    $('body').append('<header id="home-header"></header>');
    $('body').append('<main id="home-gallery"></main>');
    $('main').append('<div id="row-0" class="row"></div>');
    $('main').append('<div id="row-1" class="row"></div>');
    $('main').append('<div id="row-2" class="row"></div>');
  },

  buildHomeTerritory: function(ipRowNum, opLocation) {
    $('#row-' + ipRowNum).append('<div id="' + opLocation.sId + '" class="home-territory"></div>');
    $('#' + opLocation.sId + '.home-territory').append('<img src="./assets/img/thumbnails/' + opLocation.sId + '.jpg">');
    $('#' + opLocation.sId + '.home-territory').append('<h3>' + opLocation.sName + '</h3>');
  },

  buildPageTerritory: function(opLocation) {
    $('body').attr('id', opLocation.sId);
    $('body').attr('class', "page-territory");
    $('body').append('<header id="page-header"></header>');
    $('header').append('<h2 id="return">Home</h2>');
    $('header').append('<img src="./assets/img/full/' + opLocation.sId + '.jpg">');
    $('body').append('<h1>Come to ' + opLocation.sName + '!</h1>');
    $('body').append('<main id="page-content"></main>');
    $('main').append('<div id="summary-box"><p></p></div>');
    $('main').append('<div id="link-box" class="' + opLocation.sId + '"><a href="' + this.sGetFlightURL(opLocation) + '"><h4>What are you waiting for?</h4></a></div>');
    if (opLocation.sSummary) {
      $('#summary-box p').text(opLocation.sSummary);
    } else {
      $('#summary-box p').text("For whatever reason, we didn't set a summary. Tough shit.");
    }
  },

  buildPopup: function(opLocation) {
    var iRandIndex = Math.round(Math.random(0, Abilities.asCounterPhrases.length - 1));
    var oTargetLocation = this.oGetPageOwnerById('body');
    var sHeadingPhrase;
    sHeadingPhrase = Abilities.asCounterPhrases[iRandIndex].replace("xyz", oTargetLocation.sName);
    sHeadingPhrase = sHeadingPhrase.replace("abc", "<span>" + opLocation.sName + "</span>");
    $('body').append('<div id="' + opLocation.sId + '" class="popup"></div>');
    $('#' + opLocation.sId + '.popup').append('<h2>' + sHeadingPhrase + '</h2>');
    $('#' + opLocation.sId + '.popup').append('<h4>Head over now!</h4>');
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
                                       ].join(""), 2);
    $('#' + opLocation.sId + ' p').css("color", "#000");
  },

  stylePopup: function(opLocation) {
    $('#' + opLocation.sId + '.popup').css("background-color", opLocation.asGetLocationColorRoles()[0]);
    $('#' + opLocation.sId + '.popup').css("color", opLocation.asGetLocationColorRoles()[1]);
    document.styleSheets[0].insertRule([""
                                       ,'.popup {'
                                       ,'position: absolute; width: 40%; height: 30%;'
                                       ,'margin-top: 40%; margin-right: 40%; margin-left: 40%;'
                                       ,'text-align: center;'
                                       ,'border: 10px solid ' + opLocation.asGetLocationColorRoles()[2] + '; opacity: 0.8;'
                                       ,'-webkit-transition: opacity 0.25s ease; transition: opacity 0.25s ease; }'
                                       ].join(""), 3);
    document.styleSheets[0].insertRule('.popup:hover { opacity: 1; }', 1);
    document.styleSheets[0].insertRule([""
                                       ,'.popup #' + opLocation.sId + 'span:after {'
                                       ,'display: none; content: ""; margin: 0 auto; height: 5px; width: 0px;'
                                       ,'-webkit-transition: width 0.25s ease; transition: width 0.25s ease; }'
                                       ].join(""), 4);
    document.styleSheets[0].insertRule('.popup #' + opLocation.sId + ':hover span:after { width: 100%; background-color: ' + opLocation.asGetLocationColorRoles()[1] + '; }', 5);
  },

  destroyPage: function() {
    $('body').empty();
  },

  destroyPopups: function() {
    $('.popup').remove();
  },

  sGetFlightURL: function(opLocation) {
    var sFrom = "YUL", // TODO replace to make personalized
        sTo = opLocation.sAirportCode;
    return "https://www.google.ca/flights/?f=0#search;f=" + sFrom + ";t=" + sTo + ";";
  },

  switchPageTo: function(pPage) {
    this.destroyPage();
    Events.resetPopups();
    if (pPage != "home") {
      this.buildPageTerritory(pPage);
      this.stylePageTerritory(pPage);
    } else {
      this.returnToHome();
    }
  },

  returnToHome: function() {
    this.buildHomePage();
    Events.assignHomeTerritories();
    Interaction.addListeners();
  },

  oGetPageOwnerById: function(pElement) {
    var sOwnerName = $(pElement).attr('id');
    function bIsCorrectLocation(oCurrentLocation) { return oCurrentLocation.sId == sOwnerName; }
    return aoSelectedLocations.find(bIsCorrectLocation);
  },

  oGetPageOwnerByClass: function(pElement) {
    var sOwnerName = $(pElement).attr('class');
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
