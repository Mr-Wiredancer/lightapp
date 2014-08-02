define(function(require, exports, module) {
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var GridLayout = require('famous/views/GridLayout');
  var Modifier = require('famous/core/Modifier');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var Transform = require('famous/core/Transform');
  var Surface = require('famous/core/Surface');

  module.exports = function(commandCenter, globals) {
    var __currentIndex = null;

    var COMMAND_CENTER = commandCenter;
    var GLOBALS = globals;
    var ICONS = [{
      name: 'home.png',
      label: '我的主页'
    },{
      name: 'user.png',
      label: '我的饭团'
    },{
      name: 'course.png',
      label: '我的饭史'
    },{
      name: 'mail.png',
      label: '我的资料'
    }];

    var container = new ContainerSurface({
      size: [undefined, 50],
      properties: {
        border: '1px white solid',
        backgroundColor: '#383a4c'
      }
    });

    var gridLayout = new GridLayout({dimensions:[4, 1]});
    var surfaces = [];
    gridLayout.sequenceFrom(surfaces);

    ICONS.forEach(function(icon, index) {

      var c = new ContainerSurface();

      c.on('click', function() {
        COMMAND_CENTER.emit('NAV', {
          index: index,
          currentIndex: __currentIndex
        });

        if (index === __currentIndex) return;

        if (__currentIndex!==null){
          var old = surfaces[__currentIndex];
          old.addClass('background-dark-blue');
          old.removeClass('background-light-blue');
        }

        c.removeClass('background-dark-blue');
        c.addClass('background-light-blue');
        __currentIndex = index;
        window.console.log(__currentIndex);
      });

      //image
      c.add(new Modifier({origin:[0.5, 0.5], align:[0.5, 0.4]})).add(new ImageSurface({
          size:[20, 20],
          content: '/content/images/'+icon.name
      }));

      //label
      c.add(new Modifier({transform: Transform.translate(0, 29, 0)})).add(new Surface({
          size: [undefined, 15],
          content: icon.label,
          properties: {
              color: 'white',
              textAlign: 'center',
              fontSize: '8px'
          }
      }));

      surfaces.push(c);
    });

    COMMAND_CENTER.on('首页', function(data) {
      if (data.action==='ENTER'){
        if (__currentIndex === 0) return;
        if (__currentIndex!==null) {
          surfaces[__currentIndex].addClass('background-dark-blue');
          surfaces[__currentIndex].removeClass('background-light-blue');
        }
        surfaces[0].removeClass('background-dark-blue');
        surfaces[0].addClass('background-light-blue');
        __currentIndex = 0;
      }else if (data.action === 'LEAVE'){
        if (__currentIndex === 0){
          __currentIndex = null;
          surfaces[0].removeClass('background-light-blue');
          surfaces[0].addClass('background-dark-blue');
        }
      }
      window.console.log(__currentIndex);
    });

    container.add(gridLayout);
    return container;
  };
});
