/* jshint strict: true */
(function($, window, undefined) {

'use strict';

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function durstenfeldShuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

$.extend({
  kohaFlipster: function(param) {
    if (param.css) {
        $('<link>', {
          rel: 'stylesheet',
          type: 'text/css',
          href: param.css
        }).appendTo('head');
    }
    var host = param.host || '';
    param.flipsters.forEach(function(flipster) {
      $.getJSON(flipster.bibs)
        .done(function(acqs) {
          if (param.shuffle) { durstenfeldShuffle(acqs); }
          var html = [
            "<div>\n<ul>\n",
            acqs.map(function(acq){
              return "<li>\n" +
                  "<a href=\"" + host +
                  "/cgi-bin/koha/opac-detail.pl?biblionumber=" + acq[0] + "\">\n" +
                  "<img src=\"" + acq[2] + "\" title=\"" + acq[1] +  "\"/>\n" +
                  "</a>\n</li>";
            }).join("\n"),
            "</ul>\n</div>" ].join("\n");
          flipster.flipster.fadeIn = 0;
          $(flipster.selector).html(html).flipster(flipster.flipster);
        })
      .fail(function(err){
        console.log("Error loading " + flipster.bibs);
        console.log(err);
      });
    });
  }
});

})(jQuery, window);
