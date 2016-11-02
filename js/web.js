

var Web = Web || {};

Web = {
  oLastVisitedPage: undefined,

  buildHomePage: function() {
    $('body').attr('id', "home");
    $('body').append('<header id="home-header"></header>');
    $('header').append('<h1>Go anywhere you like!</h1>');
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
    $('header').append('<div id="img-box"><img src="./assets/img/full/' + opLocation.sId + '.jpg"></div>');
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

  buildCertaintyBox: function(opLocation) {
    var sHeadingPhrase = "Are you sure you want to leave? <br> You can get your ticket right now!";
    $('body').append('<div id="' + opLocation.sId + '" class="certainty-box"></div>');
    $('#' + opLocation.sId + '.certainty-box').append('<h3>' + sHeadingPhrase + '</h3>');
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
                                       ,'#return { '
                                       ,'width: 10%;'
                                       ,'margin-left: auto; margin-right: auto;}'
                                     ].join(""), 2);
    document.styleSheets[0].insertRule([""
                                       ,'#' + opLocation.sId + 'h1 {'
                                       ,'display: inline-block; width: auto;'
                                       ,'background-color: ' + opLocation.asGetLocationColorRoles()[0] + '; }'
                                     ].join(""), 3);
    document.styleSheets[0].insertRule([""
                                       ,'#img-box {'
                                       ,'display: inline-block;'
                                       ,'position: relative; width: 70%;'
                                       ,'margin-top: 2%; margin-left: auto; margin-right: auto;'
                                       ,'overflow: hidden; }'
                                     ].join(""), 4);
    document.styleSheets[0].insertRule([""
                                       ,'#img-box img {'
                                       ,'position: relative;'
                                       ,'margin-left: auto; margin-right: auto;'
                                       ,'top: -40%; }'
                                     ].join(""), 5);
   document.styleSheets[0].insertRule([""
                                      ,'#link-box h4 {'
                                      ,'position: relative; width: 10%; height: 5%;'
                                      ,'margin-left: auto; margin-right: auto; }'
                                    ].join(""), 6);
    $('#' + opLocation.sId + ' p').css("color", "#000");
  },

  stylePopup: function(opLocation) {
    var iWidth = 600,
        iHeight = iWidth / 3;
    $('#' + opLocation.sId + '.popup').css("background-color", opLocation.asGetLocationColorRoles()[0]);
    $('#' + opLocation.sId + '.popup').css("color", opLocation.asGetLocationColorRoles()[1]);
    $('#' + opLocation.sId + '.popup').css("border", " 10px solid " + opLocation.asGetLocationColorRoles()[2]);
    document.styleSheets[0].insertRule([""
                                       ,'.popup {'
                                       ,'position: fixed; width: ' +  iWidth + 'px; height: ' + iHeight + 'px;'
                                       ,'top: 50%; left: 50%; margin-top: -' + iHeight / 2 + 'px; margin-left: -' + iWidth / 2 + 'px;'
                                       ,'text-align: center;'
                                       ,'opacity: 0.8;'
                                       ,'-webkit-transition: opacity 0.25s ease; transition: opacity 0.25s ease; }'
                                     ].join(""), 7);
    document.styleSheets[0].insertRule('.popup:hover { opacity: 1; }', 1);
    document.styleSheets[0].insertRule([""
                                       ,'.popup #' + opLocation.sId + 'span:after {'
                                       ,'display: block; content: ""; margin: 0 auto; height: 5px; width: 0px;'
                                       ,'-webkit-transition: width 0.25s ease; transition: width 0.25s ease; }'
                                     ].join(""), 8);
    document.styleSheets[0].insertRule('.popup #' + opLocation.sId + ':hover span:after { width: 100%; background-color: ' + opLocation.asGetLocationColorRoles()[2] + '; }', 9);
  },

  styleCertaintyBox: function(opLocation) {
    var iWidth = 350,
        iHeight = iWidth / 3;
    $('#' + opLocation.sId + '.certainty-box').css("background-color", opLocation.asGetLocationColorRoles()[0]);
    $('#' + opLocation.sId + '.certainty-box').css("color", opLocation.asGetLocationColorRoles()[1]);
    $('#' + opLocation.sId + '.certainty-box').css("border", " 10px solid " + opLocation.asGetLocationColorRoles()[2]);
    document.styleSheets[0].insertRule([""
                                       ,'.certainty-box {'
                                       ,'position: fixed; width: ' +  iWidth + 'px; height: ' + iHeight + 'px;'
                                       ,'top: 15%; left: 50%; margin-top: -' + iHeight / 2 + 'px; margin-left: -' + iWidth / 2 + 'px;'
                                       ,'text-align: center;'
                                       ,'opacity: 0.8;'
                                       ,'-webkit-transition: opacity 0.25s ease; transition: opacity 0.25s ease; }'
                                     ].join(""), 10);
    document.styleSheets[0].insertRule('.certainty-box:hover { opacity: 1; }', 11);
  },

  destroyPage: function() {
    $('body').empty();
  },

  destroyPopups: function() {
    $('.popup').remove();
  },

  destroyCertaintyBoxes: function() {
    $('.certainty-box').remove();
  },

  sGetFlightURL: function(opLocation) {
    var sFrom = "YUL", // TODO replace to make personalized
        sTo = opLocation.sAirportCode;
    return "https://www.google.ca/flights/?f=0#search;f=" + sFrom + ";t=" + sTo + ";";
  },

  switchPageTo: function(pPage) {
    this.destroyPage();
    Events.resetPopups();
    Events.resetCertaintyBoxes();
    if (pPage != "home") {
      Events.setupPage(pPage);
    } else {
      Events.setupHome();
    }
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
  }
}
