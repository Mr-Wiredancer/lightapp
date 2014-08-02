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

    var db = new Firebase('https://resplendent-fire-9925.firebaseio.com/');

    var GLOBALS = {
        DB: db, //firebase
        CLOUDA: window.clouda //cloudajs
    };

    var commandCenter = new EventHandler();

    var navBar = require('views/navBar')(commandCenter, GLOBALS);

    // create the main context
    var mainContext = Engine.createContext();

    var switcher = new RenderController({overlap:false});

    switcher.inOpacityFrom(function() {
      return 1;
    });
    switcher.outOpacityFrom(function() {
      return 0;
    });

    // mainContext.add(new Surface({
    //   size: [undefined, undefined],
    //   properties: {
    //     backgroundColor: '#FFFFFF'
    //   }
    // }));

    mainContext.add(switcher);

    commandCenter.on('SWITCH', function(data) {
      // switcher.sequenceFrom([data.newScreen]);
      switcher.show(data.newScreen);
    });

    mainContext.add(new Modifier({
        transfrom: Transform.translate(0, 0, 100),
        origin: [0, 1]
    })).add(navBar);
});
