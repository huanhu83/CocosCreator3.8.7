System.register(['./gc-object-CbS29vYa.js', './index-oHSn7cpO.js', './_virtual_internal_constants-Cb-eEldT.js', './global-exports-C7R_I6Kn.js', './pipeline-state-manager-C5ShdTPh.js', './renderer-2n4MtCXy.js', './scene-B79xt5WD.js'], (function (exports) {
    'use strict';
    var _inheritsLoose, _createClass, ccclass, applyDecoratedInitializer, serializable, Layers, Renderer, getPhaseID;
    return {
        setters: [function (module) {
            _inheritsLoose = module._;
            _createClass = module.a;
        }, function (module) {
            ccclass = module.c;
            applyDecoratedInitializer = module.a;
            serializable = module.s;
        }, null, null, function (module) {
            Layers = module.L;
        }, function (module) {
            Renderer = module.R;
        }, function (module) {
            getPhaseID = module.g;
        }],
        execute: (function () {

            var _dec, _class, _class2, _initializer;
            getPhaseID('specular-pass');
            var ModelRenderer = exports("M", (_dec = ccclass('cc.ModelRenderer'), _dec(_class = (_class2 = function (_Renderer) {
              _inheritsLoose(ModelRenderer, _Renderer);
              function ModelRenderer() {
                var _this;
                _this = _Renderer.call(this) || this;
                _this._visFlags = _initializer && _initializer();
                _this._models = [];
                _this._priority = 0;
                return _this;
              }
              var _proto = ModelRenderer.prototype;
              _proto._collectModels =
              function _collectModels() {
                return this._models;
              };
              _proto.onEnable = function onEnable() {
                this._updatePriority();
              };
              _proto._attachToScene = function _attachToScene() {}
              ;
              _proto._detachFromScene =
              function _detachFromScene() {};
              _proto._onVisibilityChange = function _onVisibilityChange(val) {};
              _proto._updatePriority = function _updatePriority() {
                if (this._models.length > 0) {
                  for (var i = 0; i < this._models.length; i++) {
                    this._models[i].priority = this._priority;
                  }
                }
              };
              _createClass(ModelRenderer, [{
                key: "visibility",
                get:
                function get() {
                  return this._visFlags;
                },
                set: function set(val) {
                  this._visFlags = val;
                  this._onVisibilityChange(val);
                }
              }, {
                key: "priority",
                get:
                function get() {
                  return this._priority;
                },
                set: function set(val) {
                  if (val === this._priority) return;
                  this._priority = val;
                  this._updatePriority();
                }
              }]);
              return ModelRenderer;
            }(Renderer), (_initializer = applyDecoratedInitializer(_class2.prototype, "_visFlags", [serializable], function () {
              return Layers.Enum.NONE;
            })), _class2)) || _class));

        })
    };
}));
