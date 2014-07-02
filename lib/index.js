'use strict';

var path = require('path');

module.exports = function(html, attachments) {
  attachments.forEach(function(attachment) {
    attachment.applied = false;

    var regexps = [
      (attachment.filename) ? new RegExp('<img[^>]*cid:' + attachment.filename.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") + '[@"\'][^>]*>', 'ig') : undefined,
      (attachment.contentId) ? new RegExp('<img[^>]*cid:' + attachment.contentId.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") + '[@"\'][^>]*>', 'ig') : undefined,
    ];

    var content = Buffer.isBuffer(attachment.content) ? attachment.content.toString('base64') : attachment.content;
    var extension = path.extname(attachment.filename).split('.')[0];

    regexps.forEach(function(regexp) {
      if(regexp && regexp.test(html)) {
        attachment.applied = true;

        html = html.replace(regexp, '<img src="data:image/' + extension + ';base64,' + content + '" />');
      }
    });
  });

  return html.replace(/<img[^>]*cid:[^>]*>/ig, '');
};