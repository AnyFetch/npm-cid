'use strict';

require('should');

var cid = require('../lib');

describe('Test CID', function() {
  var attachments = [
    {
      fileName: "test.png",
      content: "base64of1"
    },
    {
      fileName: "test2.png",
      content: "base64of2"
    },
    {
      fileName: "test3.png",
      contentId: "test",
      content: "base64of3"
    }
  ];
  
  it('test invalid CID', function(done) {
    cid("<img src=\"cid:test3\" />", attachments).should.eql("");
    done();
  });

  it('test valid CID with filename', function(done) {
    cid("<img src=\"cid:test2.png\" />", attachments).should.containDeep("base64of2");
    done();
  });

  it('test valid CID with content ID', function(done) {
    cid("<img src=\"cid:test\" />", attachments).should.containDeep("base64of3");
    done();
  });
});