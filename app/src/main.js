/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');

    var db = new Firebase('https://resplendent-fire-9925.firebaseio.com/');

    db.set({test: 1}); // just test firebase

    // create the main context
    var mainContext = Engine.createContext();

    clouda.lightInit({
        ak:"Au9dGfqbsUwCgjeAQtzz9NrE",
        module:["media"]
    });

    var openCamera = function(){
        clouda.device.media.captureMedia({
                mediaType : 0,//IMAGE
                source : 0,//CAMERA
                onfail : function(err){
                        alert(JSON.stringify(err));
                },
                onsuccess : function(mediaFile){
                        //返回读取到的图片文件的本地全信息
                        alert(JSON.stringify(mediaFile));
                } 
        });
    };

    //将function 暴露给 DOM
    window.openCamera = openCamera;
});
