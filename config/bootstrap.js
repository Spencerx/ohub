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

      function createAdmin(callback) {
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

      function createUser(callback) {
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

      function createProject(user, callback) {
        Project.create({
          name: 'RuggedPOD',
          identifier: 'ruggedpod',
          owner: user.id
        }).exec(function(error, project) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted project :', project);
          callback(null, project);
        });
      }

      function createCadModel(project, callback) {
        CadModel.create({
          name: 'Ruggedpod Tank',
          owner: project.id
        }).exec(function(error, model) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted CAD model :', model);
          callback(null, model);
        });
      }

      function createCadModelRevision(model, callback) {
        CadModelRevision.create({
          name: 'v1.0',
          owner: model.id,
          projectId: model.owner
        }).exec(function(error, modelRevision) {
          if (error) {
            sails.log.error('Bootstrap | ', error);
            throw error;
          }
          sails.log.info('Bootstrap | Inserted CAD model revision :', modelRevision);
          callback(null);
        });
      }

      async.waterfall([
        createAdmin,
        createUser,
        createProject,
        createCadModel,
        createCadModelRevision
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
