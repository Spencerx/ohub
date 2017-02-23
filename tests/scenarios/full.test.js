var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;

describe('Complete scenario', function() {

  var token;
  var user, project, cadmodel, cadmodelRevision;

  describe('Authenticate', function() {
    describe('With wrong login', function() {
      it('should raise a 401 error', function (done) {
        request(sails.hooks.http.app)
          .post('/api/v1/tokens')
          .send({
            username: 'wrong_login',
            password: 'password'
          })
          .expect(401)
          .end(done);
      });
    });
    describe('With wrong password', function() {
      it('should raise a 401 error', function (done) {
        request(sails.hooks.http.app)
          .post('/api/v1/tokens')
          .send({
            username: 'admin.ohub@opencompute.org',
            password: 'wrong_password'
          })
          .expect(401)
          .end(done);
      });
    });
    describe('With good credentials', function() {
      it('should return a token', function (done) {
        request(sails.hooks.http.app)
          .post('/api/v1/tokens')
          .send({
            username: 'admin.ohub@opencompute.org',
            password: 'password'
          })
          .expect(201)
          .expect(function(res) {
            token = res.body.token;
          })
          .end(done);
      });
    });
  });

  describe('Create a user', function() {
    it('should create a user', function (done) {
      request(sails.hooks.http.app)
        .post('/api/v1/users')
        .set('X-Auth-Token', token)
        .send({
          username: 'johnlenon',
          firstname: 'John',
          lastname: 'Lenon',
          email: 'john.lenon@opencompute.org',
          password: 'password'
        })
        .expect(201)
        .expect(function(res) {
          user = res.body;
        })
        .end(done);
    });
  });

  describe('Create a project', function() {
    it('should create a project', function (done) {
      request(sails.hooks.http.app)
        .post('/api/v1/projects')
        .set('X-Auth-Token', token)
        .send({
          name: 'Awesome Project',
          identifier: 'awesome',
          owner: user.id
        })
        .expect(201)
        .expect(function(res) {
          project = res.body;
        })
        .end(done);
    });
  });

  describe('Create a CAD model', function() {
    describe('with evrything ok', function() {
      it('should create a CAD model', function (done) {
        request(sails.hooks.http.app)
          .post('/api/v1/projects/' + project.id + '/cadmodels')
          .set('X-Auth-Token', token)
          .send({
            name: "Open Teleporter Cabin",
            description: "A teleportation cabin able to transport a human"
          })
          .expect(201)
          .expect(function(res) {
            cadmodel = res.body;
          })
          .end(done);
      });
    });

    // TODO Not yet implemented
    // describe('with a name that already exists within this project', function() {
    //   it('should fails with a 409 error', function (done) {
    //     request(sails.hooks.http.app)
    //       .post('/api/v1/projects/' + project.id + '/cadmodels')
    //       .send({
    //         name: "Open Teleporter Cabin",
    //         description: "A teleportation cabin able to transport a human"
    //       })
    //       .expect(409)
    //       .end(done);
    //   });
    // });
  });

  describe('Create a CAD model revision', function() {
    describe('with evrything ok', function() {
      it('should create a CAD model revision', function (done) {
        request(sails.hooks.http.app)
          .post('/api/v1/projects/' + project.id + '/cadmodels/' + cadmodel.id + '/revisions')
          .set('X-Auth-Token', token)
          .send({
            name: "v1.0",
            description: "First stable release",
            author: user.id
          })
          .expect(201)
          .expect(function(res) {
            cadmodelRevision = res.body;
          })
          .end(done);
      });
    });

    // TODO Not yet implemented
    // describe('with a name that already exists within this CAD model', function() {
    //   it('should fails with a 409 error', function (done) {
    //     request(sails.hooks.http.app)
    //       .post('/api/v1/projects/' + project.id + '/cadmodels/' + cadmodel.id + '/revisions')
    //       .send({
    //         name: "v1.0",
    //         description: "First stable release"
    //       })
    //       .expect(409)
    //       .end(done);
    //   });
    // });
  });

  describe('Update a CAD model revison', function() {
    describe('with the owner', function() {
      it('should update a CAD model revision', function (done) {
        request(sails.hooks.http.app)
          .put('/api/v1/projects/' + project.id + '/cadmodels/' + cadmodel.id + '/revisions/' + cadmodelRevision.id)
          .set('X-Auth-Token', token)
          .send({
            description: "First stable release",
            owner: cadmodel.id
          })
          .expect(200)
          .expect(function(res) {
            cadmodelRevision = res.body;
          })
          .end(done);
      });
    });

    describe('without the owner', function() {
      it('should update a CAD model revision', function (done) {
        request(sails.hooks.http.app)
          .put('/api/v1/projects/' + project.id + '/cadmodels/' + cadmodel.id + '/revisions/' + cadmodelRevision.id)
          .set('X-Auth-Token', token)
          .send({
            description: "First stable release"
          })
          .expect(200)
          .expect(function(res) {
            cadmodelRevision = res.body;
          })
          .end(done);
      });
    });

    describe('with a bad project ID', function() {
      it('should fails with a 404 error', function (done) {
        request(sails.hooks.http.app)
          .put('/api/v1/projects/0/cadmodels/' + cadmodel.id + '/revisions/' + cadmodelRevision.id)
          .set('X-Auth-Token', token)
          .send({
            description: "A teleportation cabin able to transport two humans"
          })
          .expect(404)
          .end(done);
      });
    });

    describe('with a bad CAD model ID', function() {
      it('should fails with a 404 error', function (done) {
        request(sails.hooks.http.app)
          .put('/api/v1/projects/' + project.id + '/cadmodels/0/revisions/' + cadmodelRevision.id)
          .set('X-Auth-Token', token)
          .send({
            description: "A teleportation cabin able to transport two humans"
          })
          .expect(404)
          .end(done);
      });
    });

    describe('with a bad CAD model revision ID', function() {
      it('should fails with a 404 error', function (done) {
        request(sails.hooks.http.app)
          .put('/api/v1/projects/' + project.id + '/cadmodels/' + cadmodel.id + '/revisions/0')
          .set('X-Auth-Token', token)
          .send({
            description: "A teleportation cabin able to transport two humans"
          })
          .expect(404)
          .end(done);
      });
    });

    describe('with a different owner', function() {
      it('should fails with a 400 error', function (done) {
        request(sails.hooks.http.app)
          .put('/api/v1/projects/' + project.id + '/cadmodels/' + cadmodel.id + '/revisions/' + cadmodelRevision.id)
          .set('X-Auth-Token', token)
          .send({
            owner: "another owner"
          })
          .expect(400)
          .end(done);
      });
    });
  });

  describe('Delete a CAD model revision', function() {
    it('should delete a CAD model revision', function (done) {
      request(sails.hooks.http.app)
        .delete('/api/v1/projects/' + project.id + '/cadmodels/' + cadmodel.id + '/revisions/' + cadmodelRevision.id)
        .set('X-Auth-Token', token)
        .expect(204)
        .end(done);
    });
  });

  describe('Update a CAD model', function() {
    describe('with the owner', function() {
      it('should update a CAD model', function (done) {
        request(sails.hooks.http.app)
          .put('/api/v1/projects/' + project.id + '/cadmodels/' + cadmodel.id)
          .set('X-Auth-Token', token)
          .send({
            description: "A teleportation cabin able to transport two humans",
            owner: project.id
          })
          .expect(200)
          .expect(function(res) {
            cadmodel = res.body;
          })
          .end(done);
      });
    });

    describe('without the owner', function() {
      it('should update a CAD model', function (done) {
        request(sails.hooks.http.app)
          .put('/api/v1/projects/' + project.id + '/cadmodels/' + cadmodel.id)
          .set('X-Auth-Token', token)
          .send({
            description: "A teleportation cabin able to transport two humans"
          })
          .expect(200)
          .expect(function(res) {
            cadmodel = res.body;
          })
          .end(done);
      });
    });

    describe('with a bad project ID', function() {
      it('should fails with a 404 error', function (done) {
        request(sails.hooks.http.app)
          .put('/api/v1/projects/0/cadmodels/' + cadmodel.id)
          .set('X-Auth-Token', token)
          .send({
            description: "A teleportation cabin able to transport two humans"
          })
          .expect(404)
          .end(done);
      });
    });

    describe('with a bad CAD model ID', function() {
      it('should fails with a 404 error', function (done) {
        request(sails.hooks.http.app)
          .put('/api/v1/projects/' + project.id + '/cadmodels/0')
          .set('X-Auth-Token', token)
          .send({
            description: "A teleportation cabin able to transport two humans"
          })
          .expect(404)
          .end(done);
      });
    });

    describe('with a different owner', function() {
      it('should fails with a 400 error', function (done) {
        request(sails.hooks.http.app)
          .put('/api/v1/projects/' + project.id + '/cadmodels/' + cadmodel.id)
          .set('X-Auth-Token', token)
          .send({
            owner: "another owner"
          })
          .expect(400)
          .end(done);
      });
    });
  });

  describe('Delete a CAD model', function() {
    it('should delete a CAD model', function (done) {
      request(sails.hooks.http.app)
        .delete('/api/v1/projects/' + project.id + '/cadmodels/' + cadmodel.id)
        .set('X-Auth-Token', token)
        .expect(204)
        .end(done);
    });
  });

});
