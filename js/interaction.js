/* All functions and variables related to user interaction */

var Interaction = Interaction || {};

Interaction = {
  listenForClicks: function() {
    $('.home-territory').click(function() {
      this.navigateTo(this.attr('id'));
    });
  },

  navigateTofunction: function(spLocationName) {
    var dDocument = Web.makeDocument(sessionStorage.get(spLocationName + '-page'));
    var eFrame = document.getElementById("page-frame");

    // Copy the new HTML document into the frame
    var dDestination = eFrame.contentDocument;
    var nSource = dDocument.documentElement;
    var nNew = dDestination.importNode(nSource, true);

    dDestination.replaceChild(nNew, dDestination.documentElement);
  }
}
