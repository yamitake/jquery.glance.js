/**
 jquery.glance.js ver1.0

 The MIT License

 Copyright (c) since 2012 Grow! inc. jun takeno
 http://about.me/yamitake
 http://twitter.com/yamitake

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
 */
(function($) {
  $.fn.glance = function(options) {
    /**
     * default Options
     */
    var defaults = {
      texts : [[" |ω・`)ﾁﾗｯ", 500], ["┃ω・)ｼﾞｰ", 1000], ["|)彡ｻｯ", 10000], ["", 500], ""],
      waitTime : 1500,
      delay : 10000,
      loop : 1000
    };

    var opts = $.extend(defaults, options);

    return this.each(function() {
      var elem = $(this);
      var originalText = elem.text();
      var index = 0;
      glance(elem, originalText, index, opts);
    });
  };

  function glance(elem, originalText, index, opts) {
    var waitTime = opts.waitTime;
    var text = opts.texts[index];
    if (opts.texts[index] instanceof Array) {
      waitTime = text[1];
      text = text[0];
    }
    if (index == 0) {
      waitTime = opts.delay;
    }

    index++;

    setTimeout(function() {
      elem.text(text + originalText);

      if (isFinished(index, opts)) {
        elem.text(originalText);

        if (--opts.loop > 0) {
          index = 0;
          setTimeout(function() {
            glance(elem, originalText, index, opts);
          }, opts.delay);
        }
      } else {
        glance(elem, originalText, index, opts);
      }
    }, waitTime);
  };

  function isFinished(index, opts) {
    return (index >= opts.texts.length);
  }
})(jQuery);
