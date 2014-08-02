/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var SpringTransition = require('famous/transitions/SpringTransition');
    var Transitionable = require('famous/transitions/Transitionable');
    var Timer = require('famous/utilities/Timer');
    var GridLayout = require('famous/views/GridLayout');
    var EventHandler = require('famous/core/EventHandler');
    var RenderController = require('famous/views/RenderController');
    var Surface = require('famous/core/Surface');

    //var db = new Firebase('https://resplendent-fire-9925.firebaseio.com/');
    Transitionable.registerMethod('spring', SpringTransition);

    var GLOBALS = {
      GAP: 2,

      COLORS: {
        CORNSILK: '#FFF8DC',
        DARK_BLUE: '#383a4c',
        LIGHT_BLUE: '#93B1E5',
        LIGHT_GRAY: 'rgb(244, 244, 244)'
      },

      HEIGHTS: {
        NAV_BAR: 44,
        HEADER: 60,
        FOOTER: 50
      },

      OPTIONS: {
        SPRING: {
          method: 'spring',
          dampingRatio: 0.7,
          period: 150
        }
      },

      //DB: db, //firebase
      //CLOUDA: window.clouda //cloudajs
    };

    var commandCenter = new EventHandler();
    commandCenter.emit('首页', {action: 'ENTER'});

    var navBar = require('views/navBar')(commandCenter, GLOBALS);
    var homeView = require('views/homeView')(commandCenter, GLOBALS);
    var jiafanhomeView = require('views/JiafanhomeView')(commandCenter, GLOBALS);
    var JiaFanHistoryView = require('views/JiaFanHistoryView')(commandCenter, GLOBALS);

    // create the main context
    var mainContext = Engine.createContext();

    var switcher = new RenderController({overlap:false});

    switcher.inOpacityFrom(function() {
      return 1;
    });
    switcher.outOpacityFrom(function() {
      return 0;
    });

    mainContext.add(new Modifier({ transform: Transform.translate(0,0,-1) })).add(new Surface({
       size: [undefined, undefined],
       properties: {
         backgroundColor: '#383a4c'
       }
     }));

    mainContext.add(switcher);

    commandCenter.on('SWITCH', function(data) {
      // switcher.sequenceFrom([data.newScreen]);
      switcher.show(data.newScreen);
    });

    mainContext.add(homeView);

    mainContext.add(new Modifier({
        transfrom: Transform.translate(0, 0, 100),
        origin: [0, 1]
    })).add(navBar);

    commandCenter.on('NAV', function(data) {
      if (data.index === data.currentIndex) {
        return;
      }else if (data.index===0) {
        commandCenter.emit('首页', {action: 'ENTER'});
      }else if (data.index===1) {
        commandCenter.emit('首页', {action: 'LEAVE'});
        commandCenter.emit('我的饭团', {action: 'ENTER'});
      }else if (data.index===2) {
        commandCenter.emit('首页', {action: 'LEAVE'});
        commandCenter.emit('我的饭史', {action: 'ENTER'});
      }else if (data.index===3) {
        commandCenter.emit('首页', {action: 'LEAVE'});
        commandCenter.emit('CONTACTUS', {action: 'ENTER'});
      }
    });

});
