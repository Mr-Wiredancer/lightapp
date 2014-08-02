define(function(require, exports, module) {
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var GridLayout = require('famous/views/GridLayout');
  var Modifier = require('famous/core/Modifier');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var Transform = require('famous/core/Transform');
  var Surface = require('famous/core/Surface');

  module.exports = function(commandCenter, globals) {

    var COMMAND_CENTER = commandCenter;
    var GLOBALS = globals;
    var ICONS = [{
      name: 'home.png',
      label: '主页'
    },{
      name: 'user.png',
      label: '账户管理'
    },{
      name: 'course.png',
      label: '培训'
    },{
      name: 'mail.png',
      label: '联系我们'
    }];

    var container = new ContainerSurface({
      size: [undefined, 50],
      properties: {
        backgroundColor: '#AAAAAA'
      }
    });

    var gridLayout = new GridLayout({dimensions:[4, 1]});
    var surfaces = [];
    gridLayout.sequenceFrom(surfaces);

    ICONS.forEach(function(icon, index) {
      var c = new ContainerSurface();

      //image
      c.add(new Modifier({origin:[0.5, 0.5], align:[0.5, 0.4]})).add(new ImageSurface({
          size:[20, 20],
          // content: '/content/images'+icon.name
      }));

      //label
      c.add(new Modifier({transform: Transform.translate(0, 29, 0)})).add(new Surface({
          size: [undefined, 15],
          content: icon.label,
          properties: {
              color: 'red',
              textAlign: 'center',
              fontSize: '8px'
          }
      }));

      surfaces.push(c);
    });

    container.add(gridLayout);
    return container;
  };
});
