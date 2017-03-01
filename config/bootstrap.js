/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

    if(process.env.NODE_ENV !== 'production' && process.env.SAILS_MIGRATE === 'drop') {

      sails.log.debug('Bootstrap | starting the application in development mode with an empty database');
      sails.log.debug('Bootstrap | create sample data for development and testing pupose');

      function createAdminUser(callback) {
        User.create({
          username: 'admin',
          firstname: 'Admin',
          lastname: 'OHub',
          email: 'admin.ohub@opencompute.org',
          password: 'password',
        }).exec(function(error, user) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted user :', user);
          callback();
        });
      }

      function createRegularUser1(callback) {
        User.create({
          username: 'johndoe',
          firstname: 'John',
          lastname: 'Doe',
          email: 'johndoe@opencompute.org',
          password: 'password',
        }).exec(function(error, user) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted user :', user);
          callback(null, user);
        });
      }

      function createRegularUser2(user1, callback) {
        User.create({
          username: 'jamessmith',
          firstname: 'James',
          lastname: 'Smith',
          email: 'jamessmith@opencompute.org',
          password: 'password',
        }).exec(function(error, user2) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted user :', user2);
          callback(null, user1, user2);
        });
      }

      function createProject1(user1, user2, callback) {
        Project.create({
          name: 'Windmill Server',
          identifier: 'windmill',
          headline: 'OCP Server v2',
          description: '',
          owner: user1.id
        }).exec(function(error, project) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted project :', project);
          callback(null, user1, user2);
        });
      }

      function createProject2(user1, user2, callback) {
        Project.create({
          name: 'Barreleye Server',
          identifier: 'barreleye',
          headline: 'OpenPower server',
          description: '',
          owner: user2.id
        }).exec(function(error, project) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted project :', project);
          callback(null, user1, user2);
        });
      }

      function createProject3(user1, user2, callback) {
        Project.create({
          name: 'RuggedPOD',
          identifier: 'ruggedpod',
          headline: 'Get the cloud back outside',
          description: '<p>RuggedPOD is a microdatacenter project designed under the Open Compute Project license. The project aims to create the most energy efficient datacenter solution in the world, through a building block approach without the need of expensive upfront infrastructure.</p><p>The solution is designed to run outdoor, produced everywhere around the world through communities of hackers. It can be used for edge computing, datacenter, low cost Telecom solutions, SMB or corporate customers. Use cases are still under heavy investigation and raised by our daily expanding community as this breakthrough technology is able to get the cloud back outside !</p>',
          owner: user1.id
        }).exec(function(error, project) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted project :', project);
          callback(null, user1, user2, project);
        });
      }

      function createCadModel1(user1, user2, project, callback) {
        CadModel.create({
          name: 'Ruggedpod Tank',
          owner: project.id
        }).exec(function(error, model) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted CAD model :', model);
          callback(null, user1, user2, project, model);
        });
      }

      function createCadModelRevision1_1(user1, user2, project, model, callback) {
        CadModelRevision.create({
          name: 'v1.1',
          owner: model.id,
          projectId: model.owner,
          author: user1.id
        }).exec(function(error, modelRevision) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted CAD model revision :', modelRevision);
          callback(null, user1, user2, project, model);
        });
      }

      function createCadModelRevision1_2(user1, user2, project, model, callback) {
        CadModelRevision.create({
          name: 'v1.2',
          owner: model.id,
          projectId: model.owner,
          author: user2.id
        }).exec(function(error, modelRevision) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted CAD model revision :', modelRevision);
          callback(null, user1, user2, project, model);
        });
      }

      function createCadModelRevision1_3(user1, user2, project, model, callback) {
        CadModelRevision.create({
          name: 'v1.3',
          owner: model.id,
          projectId: model.owner,
          author: user1.id
        }).exec(function(error, modelRevision) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted CAD model revision :', modelRevision);
          callback(null, user1, user2, project);
        });
      }

      function createCadModel2(user1, user2, project, callback) {
        CadModel.create({
          name: 'Ruggedpod Cage',
          owner: project.id
        }).exec(function(error, model) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted CAD model :', model);
          callback(null, user1, user2, project, model);
        });
      }

      function createCadModelRevision2_1(user1, user2, project, model, callback) {
        CadModelRevision.create({
          name: 'v0.2',
          owner: model.id,
          projectId: model.owner,
          author: user1.id
        }).exec(function(error, modelRevision) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted CAD model revision :', modelRevision);
          callback(null, user1, user2, project);
        });
      }

      function createCadModel3(user1, user2, project, callback) {
        CadModel.create({
          name: 'Ruggedpod Blade',
          owner: project.id
        }).exec(function(error, model) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted CAD model :', model);
          callback(null);
        });
      }

      async.waterfall([
        createAdminUser,
        createRegularUser1,
        createRegularUser2,
        createProject1,
        createProject2,
        createProject3,
        createCadModel1,
        createCadModelRevision1_1,
        createCadModelRevision1_2,
        createCadModelRevision1_3,
        createCadModel2,
        createCadModelRevision2_1,
        createCadModel3
      ], function (err) {
        // It's very important to trigger this callback method when you are finished
        // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
        cb();
      });

      return;
    }

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

    cb();
  };
