var chai = require('chai');
var expect = require('chai').expect;
var spies = require('chai-spies');
var should = chai.should();
var Page = require('../models').Page;


chai.use(require('chai-things'));

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

    var page1, page2, page3;
    before(function (done) {
      Page.create({
        title: 'one',
        content: '1',
        tags: ['foo', 'bar']
      }).then(function(createdPage){
        page1 = createdPage;
        Page.create({
          title: 'two',
          content: '2',
          tags: ['foo']
        }).then(function(createdPage){
          page2 = createdPage;
          Page.create({
          title: 'three',
          content: '3',
          tags: ['hello']
        }).then(function(createdPage){
          page3 = createdPage;
          done();
        }).catch(done);
        });
      });
    });


    describe('findSimilar', function () {
      it('never gets itself', function(done){
        page1.findSimilar().then(function(similarPages){
          expect(similarPages).to.have.lengthOf(1);
          done();
        }).catch(done);
      });
      it('gets other pages with any common tags', function(done){
        page1.findSimilar().then(function(similarPages){
          expect(similarPages).to.have.lengthOf(1);
          done();
        }).catch(done);
      });
      it('does not get other pages without any common tags', function(done){
        page3.findSimilar().then(function(similarPages){
          expect(similarPages).to.have.lengthOf(0);
          done();
        }).catch(done);
      });
    });
  });

  describe('Validations', function () {

    var page;
    beforeEach(function () {
      page = Page.build();
    });

    it('errors without title', function(done){
      page.validate()
      .then(function(err){
        expect(err).to.exist;
        expect(err.errors).to.exist;
        expect(err.errors[0].path).to.equal('title');
        done();
      });
    });
    it('errors without content', function(done){
      page.validate()
      .then(function(err){
        expect(err).to.exist;
        expect(err.errors).to.exist;
        expect(err.errors[2].path).to.equal('content');
        done();
      });
    });
    it('errors given an invalid status', function(done){
        page.status = 'open';
        expect(page.status).to.be.oneOf(['open', 'closed']);
        done();
    });
  });

  describe('Hooks', function () {
    var page;
    beforeEach(function (done) {
      page = Page.build({
        title: 'something',
        content: 'stuff'
      });
      done();
    });

    it('it sets urlTitle based on title before validating', function(done){
      page.validate().then(function(validated){
        //console.log(validated);
        //done();
      })
    });
  });

});
