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

  var LARGE_GAP = 4;

  function createContent() {
    var cont = new ContainerSurface();

    var gridLayout = new GridLayout({dimensions:[2, 2]});
    var surfaces = [];
    gridLayout.sequenceFrom(surfaces);

    var DATA = [
      {
        content: 'message',
        imageName: 'brighty.png'
      },
      {
        content: 'message',
        imageName: 'blancky.png'
      },
      {
        content: 'message',
        imageName: 'moe.png'
      },
      {
        content: 'more',
        imageName: 'more.png'
      },
    ];

    DATA.forEach(function(data) {
      var container = new ContainerSurface();
      if (data.content === 'more') {
        var image = new ImageSurface({
          size: [window.innerWidth / 4, window.innerWidth / 4],
          content: 'content/images/' + data.imageName,
        });
        container.add(new Modifier({ origin: [.4, .4] })).add(image);
      } else {
        var image = new ImageSurface({
          size: [window.innerWidth / 2.2, window.innerHeight / 4.5],
          content: 'content/images/' + data.imageName,
        });
        container.add(image);
        container.add(new Modifier({ origin: [0, 0.5] })).add(new Surface({
          size: [100, 30],
          content: '<p class="invite">今天晚上</p><p class="invite">小明</p><p class="invite">希望征集饭友分享</p><p class="invite">潮州菜</p>',
          properties: {
            color: 'white'
          }
        }));
      }
      surfaces.push(container);

      container.on('click', function() {
        COMMAND_CENTER.emit('首页', {action: 'LEAVE'});

        Timer.after(function() {
          console.log(data.imageName);
          //COMMAND_CENTER.emit(data.content, {action: ENTER});
        }, 60);
      });
    });

    cont.add(new Modifier({ transform: Transform.translate(7.5, 0, 0), origin: [.5, .5] })).add(gridLayout);

    return cont;
  }

  function createCarousal() {
    var carousal = new ImageSurface({
      content: 'content/images/carousal.png'
    });

    var surface = new Surface({
      content: '顺记海鲜酒家全场八折!',
      properties: {
      lineHeight: '40px',
        backgroundColor: 'black',
        color: 'white',
        textIndent: '1em'
      }
    });

    var container = new ContainerSurface();

    container.add(new Modifier({ origin: [0.5, 1], size: [window.innerWidth - 15, 40], opacity: 0.7 })).add(surface);
    container.add(new Modifier({ origin: [0.5, 0.5], size: [window.innerWidth - 15, undefined] })).add(carousal);
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
      headerSize: window.innerHeight / 2.5,
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

