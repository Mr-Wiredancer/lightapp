define(function (require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  function ListItemView() {
    View.apply(this, arguments);

    _createMainNode.call(this);
    _createBackground.call(this);

    _handleEvents.call(this);
  }

  ListItemView.prototype = Object.create(View.prototype);
  ListItemView.prototype.constructor = ListItemView;

  ListItemView.DEFAULT_OPTIONS = {
    size: [undefined, 100],
    class: 'list-item',
    backgroundColor: 'blue',
    scrollView: null,
    model: {}
  };

  ListItemView.prototype.setContent = function () {
    this.backgroundSurface.setContent(template.call(this));
  };

  function _createMainNode() {
    this.rootModifier = new StateModifier({

    });
    this.mainNode = this._add(this.rootModifier);
  }

  var _createBackground = function () {
    var className = this.options.class + '-container';
    this.backgroundSurface = new Surface({
      classes: [className],
      size: this.options.size,
      properties: {
        backgroundColor: this.options.backgroundColor
      },
      content: template.call(this),
    });

    if (this.options.scrollView) {
      this.backgroundSurface.pipe(this.options.scrollView);
    }
    this.mainNode.add(this.backgroundSurface);
  };

  var _handleEvents = function () {
    this.backgroundSurface.on('click', function() {
      this._eventOutput.emit('itemClicked', this.options.model);
    }.bind(this));
  }

  var template = function () {
    var read = this.options.model.read ? "read" : "unread";
    //var due = this.model.get('due') ? "due" : "";
    return "<div class='" + this.options.class + "'>" +
      "<div class='message-item-background-head-" + read + "'/>" +
//      "<div class='" + this.options.class + " title'>" + this.options.model.title + "</div>" +
      "<div class='title'>" + this.options.model.title + "</div>" +
      "<div class='time'>" + this.options.model.time + "</div>" +
      "<div class='description'>" + this.options.model.description + "</div>" +
      "<div class='" + this.options.class + "-icon' style='background-image:url(" + this.options.model.iconUrl + ");'/>" +
      "</div>";
  };

  module.exports = ListItemView;
});
