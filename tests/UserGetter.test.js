/**
 * Tests for the User endpoints of the API
 */

const request = require('supertest');
const app = require('../app.js');

/**
 * Get a token for a User
 */

describe('Get the token for a User', () => {

    it('Get the token for a User', function(done) {

        request(app)
            .get('/api/users/username@email.com')
            .set('Accept', 'application/json')
            .type('form')
            .send({
                password: 'userpassword123'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Success');
                expect(JSON.parse(res.text).Message.token).toBeDefined();

                if(err) return done(err);
                return done();

            });

    });

    it('Fail when no data is send', function(done) {

        request(app)
            .get('/api/users/username@email.com')
            .set('Accept', 'application/json')
            .type('form')
            .send({})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Error');
                expect(JSON.parse(res.text).Message).toEqual('Some needed data not received.');

                if(err) return done(err);
                return done();

            });

    });

    it('Fail when no valid email is given', function(done) {

        request(app)
            .get('/api/users/novalidemail')
            .set('Accept', 'application/json')
            .type('form')
            .send({
                password: 'userpassword123'
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Error');
                expect(JSON.parse(res.text).Message).toEqual('Email should be a valid email address.');

                if(err) return done(err);
                return done();

            });

    });

    it('Fail when try to get a token for a User that does not exists', function(done) {

        request(app)
            .get('/api/users/other@email.com')
            .set('Accept', 'application/json')
            .type('form')
            .send({
                password: 'userpassword123'
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Error');
                expect(JSON.parse(res.text).Message).toEqual('Any user exists with that email.');

                if(err) return done(err);
                return done();

            });

    });

    it('Fail when give a wrong password', function(done) {

        request(app)
            .get('/api/users/username@email.com')
            .set('Accept', 'application/json')
            .type('form')
            .send({
                password: 'wrongpassword123'
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Error');
                expect(JSON.parse(res.text).Message).toEqual('Wrong password.');

                if(err) return done(err);
                return done();

            });

    });

});
