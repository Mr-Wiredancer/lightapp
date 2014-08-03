define(function (require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ContainerSurface = require("famous/surfaces/ContainerSurface");
  var ScrollView = require('famous/views/Scrollview');

  var Utility = require('famous/utilities/Utility');

  var ListItemView = require('views/ListItemView');

  function VerticalScrollViewContainer() {
    View.apply(this, arguments);

    this.itemViews = [];

    _createContainer.call(this);
    _createContent.call(this);

    _handleEvents.call(this);
  }

  VerticalScrollViewContainer.prototype = Object.create(View.prototype);
  VerticalScrollViewContainer.prototype.constructor = VerticalScrollViewContainer;

  VerticalScrollViewContainer.DEFAULT_OPTIONS = {
    collection: [],
    classes: 'vertical-scroll-view-container',
    itemBackgroundColor: '#383a4c',
    width: undefined,
    height: undefined,
    lineHeight: 100,
    paginated: false,
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
      direction: Utility.Direction.Y,
      paginated: this.options.paginated,
      size: [this.options.width, this.options.height]
    });

    this.scrollView.sequenceFrom(this.itemViews);
    this.container.add(this.scrollView);
    this._add(this.container);
  }

  function _createContent() {

    for (var i = 0; i < this.options.collection.length; i++) {

      var itemOptions = {
        scrollView: this.scrollView,
        backgroundColor: this.options.itemBackgroundColor,
        model: this.options.collection[i]
      };

      var itemView = new ListItemView(itemOptions);
      itemView.pipe(this.scrollView);
      itemView.pipe(this._eventInput);

      this.itemViews.push(itemView);
    }
  }

  function _handleEvents() {
    this._eventInput.on('itemClicked', function(data) {
      this._eventOutput.emit('itemClicked', data);
    }.bind(this));
  }

  module.exports = VerticalScrollViewContainer;
});
