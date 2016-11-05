/*
  In this site, territories for competing locations are constructed both on the home page and on individual pages --> not really pages, just restructurings of the current page
  The locations then, once they have gotten you to click on their page, try to keep you there by persuading you or by attempting to overrun other pages
  Each js file is divided according to the most logical relation betweens the functions within it, mostly encapsulated by namespaces.
  For example, interaction.js contains functions related to listening and mouse movements, while web.js contains most of the code relating to DOM manipulation and CSS
*/

$(document).ready(function() {
  // Prepare the locations
  readyLocations();
  // Set up the homepage
  Events.setupHome();
  // Load assets 
  loadSummaries();
});
