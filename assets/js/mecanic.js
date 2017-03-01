require.config({
  paths: {
    Ractive: '../packages/ractive/ractive'
  }
});

require(['Ractive', 'utils/http'], function(Ractive, http) {

  var ractive = new Ractive({
    el: "ractive-container",
    template: "#template",
  });

  var pathArray = http.parseLocation();
  var username = pathArray[0];
  var identfier = pathArray[1];

  http.call({
    path: '/api/v1/projects?username=' + username + '&identifier=' + identfier,
    method: 'GET',
    success: function(projects) {
      var project = projects[0];
      http.call({
        path: '/api/v1/projects/' + project.id + '/cadmodels',
        method: 'GET',
        success: function(models) {
          project.cadmodels = models
          ractive.set('project', project);
          console.log(ractive.get());
        }
      });
    }
  });

});
