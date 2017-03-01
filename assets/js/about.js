require.config({
  paths: {
    Ractive: '../packages/ractive/ractive'
  }
});

require(['Ractive'],
        function(Ractive) {

  var ractive = new Ractive({
    el: "ractive-container",
    template: "#template",
  });

});
