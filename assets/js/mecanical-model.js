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

  // *******************************************************************************************

  function getOffsetLeft(element) {
    var offsetLeft = 0;
    do {
      if ( !isNaN( element.offsetLeft ) )
      {
          offsetLeft += element.offsetLeft;
      }
    } while( null !== ( element = element.offsetParent ) );
    return offsetLeft;
  }

  function getOffsetTop(element) {
    var offsetTop = 0;
    do {
      if ( !isNaN( element.offsetTop ) )
      {
          offsetTop += element.offsetTop;
      }
    } while( null !== ( element = element.offsetParent ) );
    return offsetTop;
  }

  function frustumCoord(view, event) {
    var el = event.currentTarget; // me.renderer.domElement;
    var dx = getOffsetLeft(el);
    var dy = getOffsetTop(el);

    var vector = new THREE.Vector3(
            ( ( event.clientX - dx ) / el.offsetWidth ) * 2 - 1,
          - ( ( event.clientY - dy ) / el.offsetHeight ) * 2 + 1,
        view.camera.near
    );
    console.log(" click at :" + event.clientX  + " " + event.clientY + " " , vector,  " dx= ",dx," dy=",dy);
    return vector;
  }

  function buildIntersectScene(view, event) {
    var vector = frustumCoord(view, event);
    view.projector.unprojectVector( vector, view.camera );
    view.ray.set( view.camera.position, vector.sub( view.camera.position ).normalize() );
    return view.ray.intersectObjects( [view.scene],true);
  }


  function findSelectedObject(pickedObject) {
    var parent = pickedObject.parent;
    while (parent && parent.properties && parent.properties.OCCType != "Solid") {
      parent = parent.parent;
    }
    return parent;
  }

  // *******************************************************************************************

  function showModel(json) {
      view.clearAll();
      view.updateShapeObject(json, function () {
          view.zoomAll();
      });
  }

  function load_cadfile(path) {
    http.call({
      path: path,
      method: 'GET',
      success: function(data) {
        console.log("model is loaded");
        model = data;
        $("#modelLoader").remove();
        showModel(model);
      }
    });
  }

  var container = $("#graphical_view")[0];
  var view;
  var model;

  var pathArray = http.parseLocation();
  var username = pathArray[0];
  var identfier = pathArray[1];

  http.call({
    path: '/api/v1/projects?username=' + username + '&identifier=' + identfier,
    method: 'GET',
    success: function(projects) {
      var project = projects[0];
      ractive.set('project', project);
    }
  });

  view = new GEOMVIEW(container);
  view.showGrid(false);

  view.manipulator.constructor.prototype.onClick = function ( event ) {

    console.log(" onClick ", event);

    var objects = [view.scene];

    if (event.button == 0) {

      var intersects = buildIntersectScene(view, event);
      var picked = null;
      if (intersects.length > 0) {
        picked = findSelectedObject(intersects[ 0 ].object);
      }

      if (picked && picked.properties) {
        ractive.set("selectedObject", picked.properties.OCCName);
        console.log(" clicked on " , picked.properties.OCCType, " name = ", picked.properties.OCCName);
      }
      else {
        ractive.set("selectedObject", null);
      }

      view.selectObject(picked);
      event.preventDefault();
    }

    view.controls.enabled = true;
  };

  if (pathArray[3] === 'blade') {
    ractive.set('cadmodel', {
      identifier: 'blade',
      name: 'Ruggedpod Blade',
      revision: 'v0.1',
      author: {
        firstname: 'John',
        lastname: 'Doe',
        username: 'johndoe'
      },
      comments: {
        "S5": [
          {
            author: "James Smith",
            comment: "Currently, screw threads are welded on the blade. Depending on the motherboard model it can be an issue when there's no hole on the board for some screw threads. It would be great to make it removable.",
            timestamp: "6 hour ago"
          },
          {
            author: "John Doe",
            comment: "Yes, that's right ! It is a known issue. We should do it for the next release.",
            timestamp: "1 hour ago"
          }
        ]
      }
    });
    load_cadfile("/tmp/blade.json");
  }
  else if (pathArray[3] === 'cage') {
    ractive.set('cadmodel', {
      identifier: 'cage',
      name: 'Ruggedpod Cage',
      revision: 'v0.2',
      author: {
        firstname: 'John',
        lastname: 'Doe',
        username: 'johndoe'
      }
    });
    load_cadfile("/tmp/cage.json");
  }
  else if (pathArray[3] === 'tank') {
    ractive.set('cadmodel', {
      identifier: 'tank',
      name: 'Ruggedpod Tank',
      revision: 'v1.3',
      author: {
        firstname: 'John',
        lastname: 'Doe',
        username: 'johndoe'
      }
    });
    load_cadfile("/tmp/tank.json");
  }

  ractive.on("zoom-reset", function() {
      view.zoomAll();
  });

  ractive.set("commentsEnabled", false);
  ractive.on("toggle-comments", function() {
    console.log("Event :: toggle-comments");
    ractive.toggle("commentsEnabled");
    console.log(ractive.get());
  });

});
