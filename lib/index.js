'use strict';

var path = require('path');

module.exports = function(html, attachments) {
  attachments.forEach(function(attachment) {
    attachment.applied = false;

    var regexps = [
      (attachment.fileName) ? new RegExp('<img([^>]*)src="cid:' + attachment.fileName.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") + '[@"\'][^>]*>', 'ig') : undefined,
      (attachment.contentId) ? new RegExp('<img([^>]*)src="cid:' + attachment.contentId.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") + '[@"\'][^>]*>', 'ig') : undefined,
    ];

    var content = Buffer.isBuffer(attachment.content) ? attachment.content.toString('base64') : attachment.content;

    var extension = path.extname(attachment.fileName).replace('.', '');
    if(extension === 'jpeg') {
      extension = 'jpg';
    }

    regexps.forEach(function(regexp) {
      if(regexp && regexp.test(html)) {
        attachment.applied = true;

        html = html.replace(regexp, '<img$1src="data:image/' + extension + ';base64,' + content + '" />');
      }
    });
  });

  return html.replace(/<img[^>]*cid:[^>]*>/ig, '');
};