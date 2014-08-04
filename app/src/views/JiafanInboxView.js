define(function(require, exports, module) {
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var EventHandler = require('famous/core/EventHandler');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var Modifier = require('famous/core/Modifier');
  var Scrollview = require('famous/views/Scrollview');
  var SequentialLayout = require('famous/views/SequentialLayout');
  var Surface = require('famous/core/Surface');
  var Timer = require('famous/utilities/Timer');
  var Transform = require('famous/core/Transform');
  var Transitionable = require('famous/transitions/Transitionable');

  var HorizontalScrollViewContainer = require('views/HorizontalScrollViewContainer');
  var VerticalScrollViewContainer = require('views/VerticalScrollViewContainer');

  var ListData = require('views/ListData');

  var COMMAND_CENTER;
  var GLOBALS;
  var MY_CENTER = new EventHandler();

  var __LEAVE = -1;
  var __ENTER = 0;
  var __STATE = new Transitionable(__LEAVE);

  function createContent() {

    var container = new ContainerSurface({
      properties: {
        backgroundColor: 'black'
      }
    });

    var friendList = new VerticalScrollViewContainer({
      height: undefined,
      collection: ListData.inboxList,
    });

    container.add(friendList);

    return container;
  }

  function createHeader() {
    var header = new ContainerSurface();

    var backButton = new ImageSurface({
      size:[30, 30],
      content:'content/images/back.png'
    });

    backButton.on('click', function() {
      leave();
      Timer.after(function() {
        COMMAND_CENTER.emit('首页', {
          action: 'ENTER',
          isBack: true
        });
      }, 60);
    });

    MY_CENTER.on('HEADER', function(data) {
      if (data.action === 'ENTER'){
      }else if (data.action === 'LEAVE'){
      }
    });

    header.add(new Surface({
      content: '我的讯息',
      properties: {
        color: 'white',
        fontSize: '22px',
        textAlign: 'center',
        lineHeight: '60px',
        backgroundColor: GLOBALS.COLORS.DARK_BLUE,
        border: GLOBALS.CSS.BORDER
      }
    }));

    header.add(new Modifier({
        transform:Transform.translate(10, 15, 1)
    })).add(backButton);

//    var header = new HorizontalScrollViewContainer({
//      height: 300,
//    });

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
    COMMAND_CENTER.on('讯息', function(data) {
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
      headerSize: GLOBALS.HEIGHTS.HEADER,
      footerSize: GLOBALS.HEIGHTS.FOOTER,
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
