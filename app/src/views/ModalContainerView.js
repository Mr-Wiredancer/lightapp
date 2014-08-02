define(function (require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  var ImageSurface = require('famous/surfaces/ImageSurface');
  var ContainerSurface = require("famous/surfaces/ContainerSurface");

  function ModalContainerView() {
    View.apply(this, arguments);

    _createLayout.call(this);
    _createContainer.call(this);
    _insertView.call(this);
    _createExitSurface.call(this);
    _handleEvents.call(this);
  }

  ModalContainerView.prototype = Object.create(View.prototype);
  ModalContainerView.prototype.constructor = ModalContainerView;

  ModalContainerView.DEFAULT_OPTIONS = {
    view: null,
    size: [undefined, undefined],
  };

  function _createLayout() {

    this.rootModifier = new StateModifier({

    });

    this.mainNode = this._add(this.rootModifier);

  }

  function _createContainer() {

    this.container = new ContainerSurface({
      size: [this.options.width, this.options.height],
      properties: {
        backgroundColor: this.options.backgroundColor,
      }
    });

    this.mainNode.add(this.container)
  }

  function _insertView() {
    if (this.options.view) {
      var contentModifier = new StateModifier({
        transform: Transform.translate(0, 0, 0.1),
      })
      this.container.add(contentModifier).add(this.options.view);
    }
  }

  function _createExitSurface() {

    this.exitModifier = new StateModifier({
      origin: [1, 0],
      transform: Transform.translate(0, 0, 0.2),
    });

//    this.exitSurface = new Surface({
//      size: [50, 50],
//      properties: {
//        backgroundColor: 'red',
//      },
//    })

    this.exitSurface = new ImageSurface({
      size: [16, 16],
      content: 'content/images/cross.png',
    });

    this.container.add(this.exitModifier).add(this.exitSurface);
  }

  function _handleEvents() {
    this.exitSurface.on('click', function (data) {
      console.log('exit clicked.');
      this._eventOutput.emit('closeModal', data);
    }.bind(this));
  }

  module.exports = ModalContainerView;

});
