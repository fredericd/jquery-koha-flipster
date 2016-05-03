/* jshint strict: true */
(function($, window, undefined) {

'use strict';

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
