/**
 * Tests for the User endpoints of the API
 */

const request = require('supertest');
const app = require('../app.js');

/**
 * Get a token for a User
 */

describe('User creation test', () => {

    it('Create a new User', function(done) {

        request(app)
            .post('/api/users/username@email.com')
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
            .post('/api/users')
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

    it('Fail when no valid name is given', function(done) {

        request(app)
            .post('/api/users')
            .set('Accept', 'application/json')
            .type('form')
            .send({
                name: 'U',
                email: 'username@email.com',
                password: 'userpassword123'
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Error');
                expect(JSON.parse(res.text).Message).toEqual('Name should use 3 or more letters.');

                if(err) return done(err);
                return done();

            });

    });

    it('Fail when no valid email is given', function(done) {

        request(app)
            .post('/api/users')
            .set('Accept', 'application/json')
            .type('form')
            .send({
                name: 'Username',
                email: 'novalidemail',
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

    it('Fail when try to create a user with an email already in use', function(done) {

        request(app)
            .post('/api/users')
            .set('Accept', 'application/json')
            .type('form')
            .send({
                name: 'Username',
                email: 'username@email.com',
                password: 'userpassword123'
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Error');
                expect(JSON.parse(res.text).Message).toEqual('An user with that email already exists.');

                if(err) return done(err);
                return done();

            });

    });

});
