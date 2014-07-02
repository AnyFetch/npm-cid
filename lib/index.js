'use strict';

module.exports = function(html, attachments) {
  attachments.forEach(function(attachment) {
    attachment.applied = false;

    var regexps = [
      (attachment.fileName) ? new RegExp('<img[^>]*cid:' + attachment.fileName.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") + '[@"\'][^>]*>', 'ig') : undefined,
      (attachment.contentId) ? new RegExp('<img[^>]*cid:' + attachment.contentId.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") + '[@"\'][^>]*>', 'ig') : undefined,
    ];

    var content = Buffer.isBuffer(attachment.content) ? attachment.content.toString('base64') : attachment.content;
    var extension = attachment.fileName.substr(attachment.fileName.lastIndexOf('.') + 1);
    if(extension === 'jpeg') {
      extension = 'jpg';
    }

    regexps.forEach(function(regexp) {
      if(regexp && regexp.test(html)) {
        attachment.applied = true;

        html = html.replace(regexp, '<img src="data:image/' + extension + ';base64,' + content + '" />');
      }
    });
  });

  return html.replace(/<img[^>]*cid:[^>]*>/ig, '');
};