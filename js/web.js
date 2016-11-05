/* Handles most web related functionality. Mostly involves building and destroying page structures
   as well as adding CSS rules to style dynamically created elements using JS variables.
*/

var Web = Web || {};

Web = {
  oLastVisitedPage: undefined,
  iStyleSheetRuleIndex: 0,

  buildHomePage: function() {
    $('body').attr('id', "home");
    $('#wrapper').append('<header id="home-header"></header>');
    $('header').append('<h1>You can go anywhere you like!</h1>');
    $('#wrapper').append('<main id="home-gallery"></main>');
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
    $('#wrapper').append('<header id="page-header"></header>');
    $('header').append('<h2 id="return">Home</h2>');
    $('header').append('<div id="img-box"><img src="./assets/img/full/' + opLocation.sId + '.jpg"></div>');
    $('#wrapper').append('<h1>Come to ' + opLocation.sName + '!</h1>');
    $('#wrapper').append('<main id="page-content"></main>');
    $('main').append('<div id="summary-box"><p></p></div>');
    $('main').append('<div id="link-box" class="' + opLocation.sId + '"><a href="' + this.sGetFlightURL(opLocation) + '"><h4>What are you waiting for?</h4></a></div>');
    if (opLocation.sSummary) {
      $('#summary-box p').text(opLocation.sSummary);
    } else {
      $('#summary-box p').text("No summary found.");
    }
  },

  buildPopup: function(opLocation) {
    var iRandIndex = Math.round(Math.random(0, Abilities.asCounterPhrases.length - 1));
    if ($('body').attr("id") != "home") {
      var oTargetLocation = this.oGetPageOwnerById('body');
      // The heading phrase is used in popups to adress the user, but draws on multiple
      // possible phrases for greater variety
      var sHeadingPhrase;
      // Placeholder words are replaced by the necessary names
      sHeadingPhrase = Abilities.asCounterPhrases[iRandIndex].replace("xyz", oTargetLocation.sName);
      sHeadingPhrase = sHeadingPhrase.replace("abc", "<span>" + opLocation.sName + "</span>");
    }
    $('#wrapper').append('<div id="' + opLocation.sId + '" class="popup"></div>');
    $('#' + opLocation.sId + '.popup').append('<h2>' + sHeadingPhrase + '</h2>');
    $('#' + opLocation.sId + '.popup').append('<h4>Head over now!</h4>');
  },

  buildMasterPopup: function(opLocation) {
    this.buildPopup(opLocation);
    var sHeadingPhrase = "Remember, just because you CAN go anywhere, doesn't mean you SHOULD!";
    var sSubHeadingPhrase = "So come on over to xyz!";
    sSubHeadingPhrase = sSubHeadingPhrase.replace("xyz", opLocation.sName);
    $('#' + opLocation.sId + '.popup').addClass("master-popup");
    $('#' + opLocation.sId + '.master-popup h2').text(sHeadingPhrase);
    $('#' + opLocation.sId + '.master-popup h4').replaceWith("<h3></h3>");
    $('#' + opLocation.sId + '.master-popup h3').wrap('<a href="' + this.sGetFlightURL(opLocation) + '"></a>');
    $('#' + opLocation.sId + '.master-popup h3').text(sSubHeadingPhrase);
  },

  styleMasterPopup: function(opLocation) {
    this.stylePopup(opLocation);
    var iWidth = 800,
        iHeight = iWidth / 4;
    document.styleSheets[0].insertRule([""
                                       ,'.master-popup {'
                                       ,'width:' + iWidth + 'px !important; height: ' + iHeight + 'px !important; }'
                                      ].join(""), this.iStyleSheetRuleIndex);
    this.iStyleSheetRuleIndex++;
  },

  buildCertaintyBox: function(opLocation) {
    var sHeadingPhrase = "Are you sure you want to leave? <br> You can get your ticket right now!";
    $('#wrapper').append('<div id="' + opLocation.sId + '" class="certainty-box"></div>');
    $('#' + opLocation.sId + '.certainty-box').append('<h3>' + sHeadingPhrase + '</h3>');
  },

  styleHomeTerritory: function(opLocation) {
    $('#' + opLocation.sId + ' h3').css("background-color", opLocation.asGetLocationColorRoles()[0]);
    $('#' + opLocation.sId).css("color", opLocation.asGetLocationColorRoles()[1]);
    document.styleSheets[0].insertRule([""
                                       ,'#home-gallery #' + opLocation.sId + ' h3:after {'
                                       ,'display: block; content: ""; margin: 0 auto; height: 5px; width: 0px;'
                                       ,'-webkit-transition: width 0.25s ease; transition: width 0.25s ease; }'
                                     ].join(""), this.iStyleSheetRuleIndex);
    // Everytime a new rule is entered, the index of the rule is bumped, just to be safe
    this.iStyleSheetRuleIndex++;
    document.styleSheets[0].insertRule([""
                                       ,'#home-gallery #' + opLocation.sId + ':hover h3:after {'
                                       ,'width: 100%; background-color: ' + opLocation.asGetLocationColorRoles()[2] + '; }'
                                     ].join(""), this.iStyleSheetRuleIndex);
    this.iStyleSheetRuleIndex++;
  },

  stylePageTerritory: function(opLocation) {
    $('#' + opLocation.sId + ' h1').css({"background-color": opLocation.asGetLocationColorRoles()[0],
                                         "color": "#fff",
                                         "width": "17%",
                                         "display": "inline-block"
                                        });
    $('#summary-box p').css({"border-color": opLocation.asGetLocationColorRoles()[2],
                              "border-width": "5px",
                              "padding": "5%",
                              "border-style": "solid"
                           });
    document.styleSheets[0].insertRule([""
                                       ,'#return { '
                                       ,'width: 10%;'
                                       ,'margin-left: auto; margin-right: auto; W}'
                                     ].join(""), this.iStyleSheetRuleIndex);
    this.iStyleSheetRuleIndex++;
    document.styleSheets[0].insertRule([""
                                       ,'#img-box {'
                                       ,'display: inline-block;'
                                       ,'position: relative; width: 70%;'
                                       ,'margin-top: 2%; margin-left: auto; margin-right: auto;'
                                       ,'overflow: hidden; }'
                                     ].join(""), this.iStyleSheetRuleIndex);
    this.iStyleSheetRuleIndex++;
    document.styleSheets[0].insertRule([""
                                       ,'#img-box img {'
                                       ,'position: relative;'
                                       ,'margin-left: auto; margin-right: auto;'
                                       ,'top: -40%; }'
                                     ].join(""), this.iStyleSheetRuleIndex);
   this.iStyleSheetRuleIndex++;
   document.styleSheets[0].insertRule([""
                                      ,'#summary-box {'
                                      ,'display: block; width: 50%; height: 50%; margin: 0 auto;'
                                      ,'color: #000; }'
                                    ].join(""), this.iStyleSheetRuleIndex);
   this.iStyleSheetRuleIndex++;
   document.styleSheets[0].insertRule([""
                                      ,'#link-box h4 {'
                                      ,'position: relative; width: 10%; height: 5%;'
                                      ,'margin-left: auto; margin-right: auto; }'
                                    ].join(""), this.iStyleSheetRuleIndex);
    this.iStyleSheetRuleIndex++;
  },

  stylePopup: function(opLocation) {
    var iWidth = 600,
        iHeight = iWidth / 4;
    $('#' + opLocation.sId + '.popup').css("background-color", opLocation.asGetLocationColorRoles()[0]);
    $('#' + opLocation.sId + '.popup').css("color", opLocation.asGetLocationColorRoles()[1]);
    $('#' + opLocation.sId + '.popup').css({"border-color": opLocation.asGetLocationColorRoles()[2],
                                            "border-width": "10px",
                                            "border-style": "solid"
                                          });
    document.styleSheets[0].insertRule([""
                                       ,'.popup {'
                                       ,'position: fixed; width: ' +  iWidth + 'px; height: ' + iHeight + 'px;'
                                       ,'top: 50%; left: 50%; margin-top: -' + iHeight / 2 + 'px; margin-left: -' + iWidth / 2 + 'px;'
                                       ,'text-align: center;'
                                       ,'opacity: 0.8;'
                                       ,'-webkit-transition: opacity 0.25s ease; transition: opacity 0.25s ease; }'
                                     ].join(""), this.iStyleSheetRuleIndex);
    this.iStyleSheetRuleIndex++;
    document.styleSheets[0].insertRule('.popup:hover { opacity: 1; }', this.iStyleSheetRuleIndex);
    this.iStyleSheetRuleIndex++;
    document.styleSheets[0].insertRule([""
                                       ,'.popup #' + opLocation.sId + 'span:after {'
                                       ,'display: block; content: ""; margin: 0 auto; height: 5px; width: 0px;'
                                       ,'-webkit-transition: width 0.25s ease; transition: width 0.25s ease; }'
                                     ].join(""), this.iStyleSheetRuleIndex);
    this.iStyleSheetRuleIndex++;
    document.styleSheets[0].insertRule('.popup #' + opLocation.sId + ':hover span:after { width: 100%; background-color: ' + opLocation.asGetLocationColorRoles()[2] + '; }'
                                       , this.iStyleSheetRuleIndex);
    this.iStyleSheetRuleIndex++;
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
                                     ].join(""), this.iStyleSheetRuleIndex);
    this.iStyleSheetRuleIndex++;
    document.styleSheets[0].insertRule('.certainty-box:hover { opacity: 1; }', this.iStyleSheetRuleIndex);
    this.iStyleSheetRuleIndex++;
  },

  destroyPage: function() {
    $('#wrapper').empty();
  },

  destroyPopups: function() {
    $('.popup').remove();
  },

  destroyCertaintyBoxes: function() {
    $('.certainty-box').remove();
  },

  // Ensures that there are no remnants from the previous page structure
  // upon loading a new one
  resetPage: function() {
    this.destroyPage();
    Events.resetPopups();
    Events.resetCertaintyBoxes();
  },

  // Returns a URL to get a list of flights to the given destination
  sGetFlightURL: function(opLocation) {
    var sFrom = "YUL", // TODO replace to make personalized
        sTo = opLocation.sAirportCode;
    return "https://www.google.ca/flights/?f=0#search;f=" + sFrom + ";t=" + sTo + ";";
  },

  // Changes the page structure between the home page and a location's page
  switchPageTo: function(pPage) {
    this.resetPage();
    if (pPage != "home") {
      Events.setupPage(pPage);
    } else {
      Events.setupHome();
    }
  },

  // Returns the owner of the page based on the ID of a given element
  oGetPageOwnerById: function(pElement) {
    var sOwnerName = $(pElement).attr('id');
    // Iterate through the list of locations to find one with the right ID
    function bIsCorrectLocation(oCurrentLocation) { return oCurrentLocation.sId == sOwnerName; }
    return aoSelectedLocations.find(bIsCorrectLocation);
  },

  // Returns the owner of the page based on the class of a given element
  oGetPageOwnerByClass: function(pElement) {
    var sOwnerName = $(pElement).attr('class');
    // Iterate through the list of locations to find one with the right ID
    function bIsCorrectLocation(oCurrentLocation) { return oCurrentLocation.sId == sOwnerName; }
    return aoSelectedLocations.find(bIsCorrectLocation);
  }
}
