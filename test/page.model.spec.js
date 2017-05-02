var chai = require('chai');
var expect = require('chai').expect;
var spies = require('chai-spies');
var should = chai.should();
var Page = require('../models').Page;


describe('Page model', function () {
  describe('Virtuals', function () {
    var page;
    beforeEach(function(){
      page = Page.build();
    });

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function(){
      page.urlTitle = 'some_title';
      console.log(page.urlTitle);
      expect(page.route).to.equal('/wiki/some_title');
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function(){
        page.content = '# Markdown';
        expect(page.renderedContent).to.equal('<h1 id="markdown">Markdown</h1>\n');
      });
    });
  });

  describe('Class methods', function () {

    before(function (done) {
      Page.create({
        title: 'foo',
        content: 'bar',
        tags: ['foo', 'bar']
      })
      .then(function() {
        done();
      })
      .catch(done);
    });

    afterEach(function(done){
      Page.destroy({
        where: {},
        truncate: true
      }).then(function(){
        done();
      }).catch(done);
    });

    describe('findByTag', function () {
      it('gets pages with the search tag', function(done) {
        Page.findByTag('foo')
        .then(function(pages){
          expect(pages).to.have.lengthOf(1);
          done();
        }).catch(done);
      });
      it('does not get pages without the search tag', function(done){
        Page.findByTag('hello')
        .then(function(pages){
          expect(pages).to.have.lengthOf(0);
          done();
        }).catch(done);
      });
    });
  });

  describe('Instance methods', function () {
    // var page1 = Page.create({
    //     title: 'One',
    //     content: 'bar',
    //     tags: ['foo', 'bar']
    //   });

    //   var page2 = Page.create({
    //     title: 'Two',
    //     content: 'lalala',
    //     tags: ['foo']
    //   });

    //   var page3 = Page.create({
    //     title: 'Three',
    //     content: 'hi',
    //     tags: ['hello', 'world']
    //   });


    //   before(function(){
    //     return Promise.all([page1, page2, page3]);
    //   });

    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});
