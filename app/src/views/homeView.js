define(function(require, exports, module) {
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var EventHandler = require('famous/core/EventHandler');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var Modifier = require('famous/core/Modifier');
  var Scrollview = require('famous/views/Scrollview');
  var SequentialLayout = require('famous/views/SequentialLayout');
  var FlexibleLayout = require('famous/views/FlexibleLayout');
  var GridLayout = require('famous/views/GridLayout');
  var Surface = require('famous/core/Surface');
  var Timer = require('famous/utilities/Timer');
  var Transform = require('famous/core/Transform');
  var Transitionable = require('famous/transitions/Transitionable');

  var COMMAND_CENTER;
  var GLOBALS;
  var MY_CENTER = new EventHandler();

  var __LEAVE = -1;
  var __ENTER = 0;
  var __STATE = new Transitionable(__ENTER);

  var LARGE_GAP = 3;

  function createContent() {
    var gridLayout = new GridLayout({dimensions:[2, 2]});
    var surfaces = [];
    gridLayout.sequenceFrom(surfaces);

    var DATA = [
      {
        content: '国际机票',
        imageName: 'brighty.png'
      },
      {
        content: '国际机票',
        imageName: 'blancky.png'
      },
      {
        content: '国际机票',
        imageName: 'moe.png'
      },
      {
        content: '国际机票',
        imageName: 'more.png'
      },
    ];

    DATA.forEach(function(data) {
      var image = new ImageSurface({
        content: 'content/images/' + data.imageName,
      });
      surfaces.push(image);

      image.on('click', function() {
        COMMAND_CENTER.emit('首页', {action: 'LEAVE'});

        Timer.after(function() {
          console.log(data.imageName);
          COMMAND_CENTER.emit(data.content, {action: ENTER});
        }, 60);
      });
    });

    return gridLayout;
  }

  function createCarousal() {
    var carousal = new ImageSurface({
      content: 'content/images/carousal.png'
    });

    var surface = new Surface({
      content: '顺记海鲜酒家全场八折!',
      properties: {
        color: 'white',
      }
    });

    var container = new ContainerSurface();

    container.add(new Modifier({ origin: [0.1, 0.8] })).add(surface);
    container.add(new Modifier({ origin: [0.5, 0.5], size: [window.innerWidth - 10, undefined] })).add(carousal);
    return container;
  }

  function createHeader() {
    var GAP = GLOBALS.GAP;
    var header = new FlexibleLayout({
      direction: 1,
      ratios: [true, 1, true]
    });

    var rows = [
      new Surface({size: [undefined, GAP*LARGE_GAP]}),
      createCarousal(),
      new Surface({size: [undefined, GAP*LARGE_GAP]})
    ];

    header.sequenceFrom(rows);

    return header;
  }

  function setupEventListerners(screen) {
    COMMAND_CENTER.on('首页', function(data) {
      if (data.action === 'ENTER') {
        COMMAND_CENTER.emit('SWITCH', {newScreen: screen});
        enter();
      }else if (data.action === 'LEAVE') leave();
    });
  }

  function leave() {
    MY_CENTER.emit('HEADER', {action: 'LEAVE'});
    MY_CENTER.emit('CONTENT', {action: 'LEAVE'});
    __STATE.set(__LEAVE, GLOBALS.OPTIONS.SPRING);
  }

  function enter(data) {
    MY_CENTER.emit('HEADER', data);
    MY_CENTER.emit('CONTENT', data);
    __STATE.set(__ENTER, GLOBALS.OPTIONS.SPRING);
  }

  function setupEventListerners(screen) {
    COMMAND_CENTER.on('首页', function(data) {
      if (data.action === 'ENTER'){
        COMMAND_CENTER.emit('SWITCH', {
          newScreen: screen
        });
        enter(data);
      }else if (data.action === 'LEAVE'){
        leave();
      }
    });
  }

  module.exports = function(c, g) {
    COMMAND_CENTER = c;
    GLOBALS = g;

    var layout = new HeaderFooterLayout({
      headerSize: GLOBALS.HEIGHTS.HEADER * 4.5,
      footerSize: GLOBALS.HEIGHTS.FOOTER
    });

    layout.content.add(new Modifier({
      transform: function() {
        return Transform.translate(window.innerWidth*__STATE.get(), 0, 0);
      }
    })).add(createContent());

    layout.header.add(new Modifier({
      transform: function() {
        return Transform.translate(window.innerHeight*__STATE.get(), 0, 0);
      }
    })).add(createHeader());

    setupEventListerners(layout);

    return layout;
  };
});

