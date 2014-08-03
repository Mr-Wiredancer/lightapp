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
  var InputSurface = require('famous/surfaces/InputSurface');
  var View = require('famous/core/View');

  var COMMAND_CENTER;
  var GLOBALS;
  var MY_CENTER = new EventHandler();

  var __LEAVE = -1;
  var __ENTER = 0;
  var __STATE = new Transitionable(__LEAVE);

  var result = {};

  function createContent() {
    var view = new View();
    var layout = new SequentialLayout();

    var foodInput = new InputSurface({
      size: [undefined, 30],
      type: 'text',
      placeholder: '想吃点什么',
      value: '',
      name: 'food',
      properties: {
        color: GLOBALS.COLORS.DARK_BLUE,
        border: 'none',
        borderBottom: '1px solid ' + GLOBALS.COLORS.DARK_BLUE
      }
    });

    var foodLabel = new Surface({
      content: '请输入想吃的东西',
      size: [undefined, 60],
      properties: {
        color: 'white',
        lineHeight: '20px'
      }
    });

    var dateInput = new InputSurface({
      size: [undefined, 30],
      type: 'text',
      placeholder: '什么时候呢',
      value: '',
      name: 'date',
      properties: {
        color: GLOBALS.COLORS.DARK_BLUE,
        border: 'none',
        borderBottom: '1px solid ' + GLOBALS.COLORS.DARK_BLUE
      }
    });

    var dateLabel = new Surface({
      content: '请输入日期',
      size: [undefined, 60],
      properties: {
        color: 'white',
        lineHeight: '20px'
      }
    });

    var noticeInput = new InputSurface({
      size: [undefined, 100],
      type: 'text',
      placeholder: '有什么需要注意的事情吗',
      value: '',
      name: 'date',
      properties: {
        color: GLOBALS.COLORS.DARK_BLUE,
        border: 'none',
        borderBottom: '1px solid ' + GLOBALS.COLORS.DARK_BLUE
      }
    });

    var noticeLabel = new Surface({
      content: '备注',
      size: [undefined, 30],
      properties: {
        color: 'white',
        lineHeight: '20px'
      }
    });

    var button = new Surface({
      content: '确定',
      size: [undefined, 50],
      properties: {
        color: 'white',
        textAlign: 'center',
        lineHeight: '50px',
        border: GLOBALS.CSS.BORDER,
      }
    });

    layout.sequenceFrom([foodInput, foodLabel, dateInput, dateLabel, noticeInput, noticeLabel, button]);

    view.add(new Modifier({
      origin: [0.5, 0],
      size: [window.innerWidth - GLOBALS.GAP * 10, undefined],
      transform: Transform.translate(0, 20, 0)
    })).add(layout);


    button.on('click', function() {
      result.food = foodInput.getValue();
      result.date = dateInput.getValue();
      result.notice = noticeInput.getValue();
      console.log(result);
    });

    return view;
  }

  function createHeader() {
    var header = new ContainerSurface();

    var backButton = new ImageSurface({
      size:[30, 30],
      content:'/content/images/back.png'
    });

    backButton.on('click', function() {
      leave();
      Timer.after(function() {
        COMMAND_CENTER.emit('我的饭团', {
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
      content: '邀请详情',
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
    COMMAND_CENTER.on('邀请详情', function(data) {
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

