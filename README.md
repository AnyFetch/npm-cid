# CID Replace
> Visit http://anyfetch.com for details about AnyFetch.

Replace CID img balise in HTML mail with corresponding attachment

You can test it : `npm test`.

# Usage

You must have a string which is your HTML code and an array of attachments with differents properties :
    - fileName : the file name
    - contentId : the content ID (optionnal)
    - content : the content in base 64 (node buffer or string)

The module function returns the new HTML without useless CID img. Now, attachments have a property 'applied' which is true when there was a CID img which match with this attachment.

```js
var cid = require('npm-cid');

var attachments = [
  {
    fileName: "test.jpg",
    contentId: "test",
    content: "base64contentofimg"
  }
];

console.log(cid('<img src="cid:test@evfeuv">', attachments));
```

Support: `support@anyfetch.com`.