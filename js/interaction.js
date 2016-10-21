/* All functions and variables related to user interaction */

var Interaction = Interaction || {};

Interaction = {
  listenForClicks: function() {
    $('.home-territory').click(function() {
      this.navigateTo(this.attr('id'));
    });
  },

  navigateTo: function(spLocationName) {
    sessionStorage.get(spLocationName + "-page");
  }
}
