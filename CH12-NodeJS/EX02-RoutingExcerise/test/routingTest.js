const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('Routing Test', () => {
   it('GET /', (done) => {
       request(app)
        .get('/')
        .end((err, res) => {
           assert('Hi there, welcome to my assignment!' === res.text);
           done();
        });
   });

   it('GET /speak/pig', (done) => {
       request(app)
        .get('/speak/pig')
        .end((err, res) => {
           assert(`The pig says 'Oink'` === res.text);
           done();
        });
   });

   it('GET /speak/cow', (done) => {
       request(app)
        .get('/speak/cow')
        .end((err, res) => {            
           assert(`The cow says 'Moo'` === res.text);
           done();
        });
   });

   it('GET /speak/dog', (done) => {
       request(app)
        .get('/speak/dog')
        .end((err, res) => {
           assert(`The dog says 'Woof Woof!'` === res.text);
           done();
        });
   });

   it('GET /repeat/:str/:times', (done) => {
       request(app)
        .get('/repeat/hi/3')
        .end((err, res) => {
           assert(` hi hi hi` === res.text);
           done();
        });
   });

   it('GET /XDDD', (done) => {
       request(app)
        .get('/XDDD')
        .end((err, res) => {
           assert('Sorry, page not found...What are you doing with your life?' === res.text);
           done();
        });
   });
});