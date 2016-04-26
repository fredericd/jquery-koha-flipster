/* jshint strict: true */
(function($, window, undefined) {

'use strict';

$.extend({
  kohaFlipster: function(param) {
    $('<link>', {
      rel: 'stylesheet',
      type: 'text/css',
      href: param.css
    }).appendTo('head');
    param.flipsters.forEach(function(flipster) {
      $.getJSON(flipster.bibs)
        .done(function(acqs) {
          var html = [
            "<div>\n<ul>\n",
            acqs.map(function(acq){
              return "<li>\n" +
                  "<a href=\"/cgi-bin/koha/opac-detail.pl?biblionumber=" + acq[0] + "\">" +
                  "<img src=\"" + acq[2] + "\" title=\"" + acq[1] +  "\"/>\n" +
                  "</a>\n</li>\n";
            }),
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
