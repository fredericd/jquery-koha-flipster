jQuery.koha.flipster
========================

Koha Flipster is a jQuery plugin build upon
[jQuery.Flipster](https://github.com/drien/jquery-flipster). It
animates one or several __flipsters__ of books's cover.

How to?
-------

Install jQuery.koha.flipster on your Koha server. Just copy files
`jquery.koha.flipster.js` and `jquery.koha.flipster.css`, or their minified
equivalents (-min files). You may choose to integrate the css file directly
into yours.

Create at least one list of Koha biblio records with their biblionumber,
title, and cover URL, as JSON file. This looks like this:

```json
[
   [
      "309075",
      "Le piano d'argent",
      "https://images-na.ssl-images-amazon.com/images/I/51WJGZJYloL._SL300_.jpg"
   ],
   [
      "309203",
      "Вам и не снилось",
      "https://images-na.ssl-images-amazon.com/images/I/51RN2V4PZhL._SL300_.jpg"
   ],
   [
      "309076",
      "Mes plus belles berceuses jazz",
      "https://images-na.ssl-images-amazon.com/images/I/51aMTZwrxVL._SL300_.jpg"
   ]
]
```

This list could be generated automatically using [koha-coce-url](https://metacpan.org/pod/koha-coce-url), a Perl script available in [Koha::Contrib::Tamil](https://github.com/fredericd/Koha-Contrib-Tamil).

Put one or several div on your OPAC identified by unique IDs. For example a
div for new acquisitions in `OpacMainUserBlock` system preference:

```html
<div id="#newacqs"></div>
```

Add some code in `OPACUserJS` system preference in order to populate flipsters
with JSON data. For example, to add two flipsters on Koha OPAC home page:

```javascript
if ( $('body').attr('id') == 'opac-main' ) {
  $.getScript("/jquery.koha.flipster-min.js")
    .done(function(){
      $.kohaFlipster({
        css: '/jquery.koha.flipster-min.css',
        shuffle: true,
        flipsters: [
          {
            bibs: '/newacqs.json',
            selector: '#newacqs',
            flipster: { style:'wheel' }
          },
          {
            bibs: '/expobibs.json',
            selector: '#expobibs',
            flipster: { style:'carousel', spacing:-.3 }
          }
        ]
      });
    });
}
```

As you can see on the above example, `kohaFlipster` function accepts several
parameters.

- `css`: The URL to the Koha flipster CSS file. Alternatively, you can omit
  this parameter. In this case, you have to cut-and-paste the provied CSS file
  into yours.
- `flipster`: An array of flipster to display. Each entry in this array has
  three parameters:
  - `bibs`: URL of the JSON file containing biblio records, described above.
  - `selector`: A jQuery selector to the div to be replaced by the flipster.
  - `flipster`: The jQuery Flipster parameters.
- `shuffle`: Covers have to be shuffled?
- `host`: The Koha OPAC Server host name. Optional. It may be necessary when
  the flipster is integrated outside the Koha OPAC, for example in a CMS page.

License
-------

The MIT License (MIT)

Copyright (c) 2018 Frédéric Demians

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

