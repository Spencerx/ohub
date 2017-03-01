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
    path: '/api/v1/users?username=' + username,
    method: 'GET',
    success: function(data) {
        ractive.set('user', data);
        console.log(ractive.get());
    }
  });

});
