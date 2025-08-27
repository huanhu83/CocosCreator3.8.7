System.register(['./sorting-layers-Bt6H5Neq.js', './gc-object-CbS29vYa.js', './index-oHSn7cpO.js', './_virtual_internal_constants-Cb-eEldT.js', './global-exports-C7R_I6Kn.js', './node-event-BDQEXkZZ.js', './director-CFEaPqP_.js', './debug-view-CfU41ypM.js', './device-manager-gD_whA7Q.js', './buffer-barrier-BmKiPanc.js', './pipeline-state-manager-C5ShdTPh.js', './scene-B79xt5WD.js', './touch-iR3Bpatu.js', './prefab-CvAWu2P7.js', './deprecated-DMYVurVK.js', './deprecated-B0llPila.js'], (function (exports) {
    'use strict';
    var SortingLayers, _inheritsLoose, warnID, _createClass, _applyDecoratedDescriptor, ccclass, type, disallowMultiple, applyDecoratedInitializer, clamp, serializable, Component;
    return {
        setters: [function (module) {
            SortingLayers = module.S;
            exports("SortingLayers", module.S);
        }, function (module) {
            _inheritsLoose = module._;
            warnID = module.w;
            _createClass = module.a;
            _applyDecoratedDescriptor = module.b;
        }, function (module) {
            ccclass = module.c;
            type = module.t;
            disallowMultiple = module.d;
            applyDecoratedInitializer = module.a;
            clamp = module.b;
            serializable = module.s;
        }, null, null, function (module) {
            Component = module.C;
        }, null, null, null, null, null, null, null, null, null, null],
        execute: (function () {

            var _dec, _dec2, _class, _class2, _initializer, _initializer2;
            var MAX_INT16 = (1 << 15) - 1;
            var MIN_INT16 = -1 << 15;
            var Sorting = exports("Sorting", (_dec = ccclass('cc.Sorting'), _dec2 = type(SortingLayers.Enum), _dec(_class = disallowMultiple(_class = (_class2 = function (_Component) {
              _inheritsLoose(Sorting, _Component);
              function Sorting() {
                var _this;
                _this = _Component.call(this) || this;
                _this._sortingLayer = _initializer && _initializer();
                _this._sortingOrder = _initializer2 && _initializer2();
                _this._modelRenderer = null;
                return _this;
              }
              var _proto = Sorting.prototype;
              _proto.__preload = function __preload() {
                this._modelRenderer = this.getComponent('cc.ModelRenderer');
                if (!this._modelRenderer) {
                  warnID(16301, this.node.name);
                }
                this._updateSortingPriority();
              };
              _proto._updateSortingPriority = function _updateSortingPriority() {
                var sortingLayerValue = SortingLayers.getLayerIndex(this._sortingLayer);
                var sortingPriority = SortingLayers.getSortingPriority(sortingLayerValue, this._sortingOrder);
                if (this._modelRenderer && this._modelRenderer.isValid) {
                  this._modelRenderer.priority = sortingPriority;
                }
              };
              _createClass(Sorting, [{
                key: "sortingLayer",
                get:
                function get() {
                  return this._sortingLayer;
                },
                set: function set(val) {
                  if (val === this._sortingLayer || !SortingLayers.isLayerValid(val)) return;
                  this._sortingLayer = val;
                  this._updateSortingPriority();
                }
              }, {
                key: "sortingOrder",
                get:
                function get() {
                  return this._sortingOrder;
                },
                set: function set(val) {
                  if (val === this._sortingOrder) return;
                  this._sortingOrder = clamp(val, MIN_INT16, MAX_INT16);
                  this._updateSortingPriority();
                }
              }]);
              return Sorting;
            }(Component), (_applyDecoratedDescriptor(_class2.prototype, "sortingLayer", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "sortingLayer"), _class2.prototype), _initializer = applyDecoratedInitializer(_class2.prototype, "_sortingLayer", [serializable], function () {
              return SortingLayers.Enum["default"];
            }), _initializer2 = applyDecoratedInitializer(_class2.prototype, "_sortingOrder", [serializable], function () {
              return 0;
            })), _class2)) || _class) || _class));

        })
    };
}));
