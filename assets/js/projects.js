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

  http.call({
      path: '/api/v1/projects',
      method: 'GET',
      success: function(data) {
          ractive.set('projects', data);
      }
  });

});
