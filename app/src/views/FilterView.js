define(function (require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var GridLayout = require("famous/views/GridLayout");
  var StateModifier = require('famous/modifiers/StateModifier');
  var ImageSurface = require('famous/surfaces/ImageSurface');

  var Timer = require('famous/utilities/Timer');
  var FitlerData = require('views/ListData');

  function FilterView() {
    View.apply(this, arguments);
    _createBackground.call(this);
//    _createSearchBar.call(this);
    _createStrips.call(this);
  }

  FilterView.prototype = Object.create(View.prototype);
  FilterView.prototype.constructor = FilterView;

  FilterView.DEFAULT_OPTIONS = {
    filterData: FitlerData.filterList,
    transition: {
      duration: 300,
      curve: 'easeInOut'
    }
  };

  function _createBackground() {
    this.filterSurface = new Surface({
      properties: {
//        marginTop: '44px',
        backgroundColor: '#383a4c',
      }

    });

    this._add(this.filterSurface);
  }

  function _createSearchBar() {
    this.searchBarSurface = new ImageSurface({
      size: [320, 60],
      content: 'img/searchbar.png',
      properties: {
        marginTop: '44px'
      }
    });

    var searchBarModifier = new StateModifier({
      origin: [0, 0]
    });

    this.add(searchBarModifier).add(this.searchBarSurface);
  }

  function _createStrips() {

    var grid = new GridLayout({
      size: [320, 400],
      dimensions: [3, 3]
    });

    var surfaces = [];
    grid.sequenceFrom(surfaces);

    var iconContents = this.options.filterData;
    this.rowModifiers = [];
    var contentCounter = 0;

    var surface, view, availability;
    var width = this.options.width;
    var height = this.options.height;

//    var scaledWidth = 50 * height / 320;
//    var scaledHeight = 60 * height / 320;

    var scaledWidth = 88;
    var scaledHeight = 128;

    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        this.rowModifiers[(row * 3) + col] = new StateModifier({
          size: [scaledWidth, scaledHeight],
          origin: [0.5, 0.5]
        });
        //create surface from iconContents
        availability = iconContents[contentCounter].available ? 'available' : 'unavailable';

        surface = new Surface({
          size: [undefined, undefined],
          classes: ['filterIcon'],
          content: '<img class="filterIconImg" width="' + scaledWidth + '" src="' + iconContents[contentCounter].imageUrl + '"/>' +
            '<div class="filterIconText ' + availability + '">' + iconContents[contentCounter].text + '</div>'
        });

        if ((row == 0) && (col == 0)) {
          var that = this;
          surface.on('click', function () {
            console.log(that);
            that.options.leave();
            Timer.after(function () {
              that.options.c.emit('邀请详情', {
                action: 'ENTER',
                isBack: true
              });
            }, 6);
          });
        }

        //push view (modifier + surface) onto surfaces
        view = new View();
        view._add(this.rowModifiers[(row * 3) + col]).add(surface);
        surfaces.push(view);

        contentCounter++;
      }
    }

    var gridModifier = new StateModifier({
      size: [320, 400],
      origin: [0.5, 0],
      transform: Transform.translate(0, 30, 0)
    });

    this._add(gridModifier).add(grid);
//    this._add(grid);

  }

  module.exports = FilterView;
});
