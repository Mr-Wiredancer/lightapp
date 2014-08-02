define(function (require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ContainerSurface = require("famous/surfaces/ContainerSurface");
  var ScrollView = require('famous/views/Scrollview');

  var Utility = require('famous/utilities/Utility');

  function HorizontalScrollViewContainer() {
    View.apply(this, arguments);

    this.itemViews = [];

    _createContainer.call(this);
    _createContent.call(this);
  }

  HorizontalScrollViewContainer.prototype = Object.create(View.prototype);
  HorizontalScrollViewContainer.prototype.constructor = HorizontalScrollViewContainer;

  HorizontalScrollViewContainer.DEFAULT_OPTIONS = {
    classes: 'horizontal-scroll-view-container',
    width: undefined,
    height: undefined,
    lineWidth: undefined,
    paginated: true
  };

  function _createContainer() {
    this.container = new ContainerSurface({
      classes: [this.options.classes],
      size: [this.options.width, this.options.height],
      properties: {
        overflow: 'hidden'
      }
    });

    this.scrollView = new ScrollView({
      margin: 1000000,
      direction: Utility.Direction.X,
      paginated: this.options.paginated,
      size: [this.options.width, this.options.height]
    });

    this.scrollView.sequenceFrom(this.itemViews);
    this.container.add(this.scrollView);
    this._add(this.container);

  }

  function _createContent() {

    var imageWidth = window.innerWidth;
    var imageHeight = this.offsetHeight;

    for (var i = 0, temp; i < 40; i++) {
//      temp = new Surface({
//        content: "X : " + (i + 1),
//        size: [this.options.lineWidth, this.options.height],
//        properties: {
//          backgroundColor: "hsl(" + (i * 360 / 40) + ", 100%, 50%)",
//          lineHeight: this.options.height + "px",
//          textAlign: "center"
//        }
//      });


      temp = new ImageSurface({
        size: [imageWidth, imageHeight],
        content: 'content/images/c1.png'
      })

      temp.pipe(this.scrollView);
      this.itemViews.push(temp);
    }

  }

  module.exports = HorizontalScrollViewContainer;
});
