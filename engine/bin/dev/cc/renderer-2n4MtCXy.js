System.register(['./gc-object-CbS29vYa.js', './index-oHSn7cpO.js', './_virtual_internal_constants-Cb-eEldT.js', './scene-B79xt5WD.js', './prefab-CvAWu2P7.js', './pipeline-state-manager-C5ShdTPh.js', './node-event-BDQEXkZZ.js'], (function (exports) {
    'use strict';
    var _inheritsLoose, errorID, warnID, _createClass, _applyDecoratedDescriptor, applyDecoratedInitializer, ccclass$1, disallowMultiple$1, type$1, MaterialInstance, Material, Component;
    return {
        setters: [function (module) {
            _inheritsLoose = module._;
            errorID = module.h;
            warnID = module.w;
            _createClass = module.a;
            _applyDecoratedDescriptor = module.b;
        }, function (module) {
            applyDecoratedInitializer = module.a;
            ccclass$1 = module.c;
            disallowMultiple$1 = module.d;
            type$1 = module.t;
        }, null, function (module) {
            MaterialInstance = module.M;
            Material = module.b;
        }, null, null, function (module) {
            Component = module.C;
        }],
        execute: (function () {

            var _dec, _dec2, _dec3, _class, _class2, _initializer;
            var _matInsInfo = {
              parent: null,
              owner: null,
              subModelIdx: 0
            };
            var ccclass = ccclass$1,
              disallowMultiple = disallowMultiple$1,
              type = type$1;
            var Renderer = exports("R", (_dec = ccclass('cc.Renderer'), _dec2 = type(Material), _dec3 = type([Material]), _dec(_class = disallowMultiple(_class = (_class2 = function (_Component) {
              _inheritsLoose(Renderer, _Component);
              function Renderer() {
                var _this;
                _this = _Component.call(this) || this;
                _this._materials = _initializer && _initializer();
                _this._materialInstances = [];
                return _this;
              }
              var _proto = Renderer.prototype;
              _proto.getMaterial =
              function getMaterial(idx) {
                return this.getSharedMaterial(idx);
              }
              ;
              _proto.setMaterial =
              function setMaterial(material, index) {
                this.setSharedMaterial(material, index);
              }
              ;
              _proto.getSharedMaterial =
              function getSharedMaterial(idx) {
                if (idx < 0 || idx >= this._materials.length) {
                  return null;
                }
                return this._materials[idx];
              }
              ;
              _proto.setSharedMaterial =
              function setSharedMaterial(material, index, forceUpdate) {
                if (forceUpdate === void 0) {
                  forceUpdate = false;
                }
                if (material && material instanceof MaterialInstance) {
                  errorID(12012);
                }
                if (!forceUpdate && this._materials[index] === material) return;
                this._materials[index] = material;
                var inst = this._materialInstances[index];
                if (inst) {
                  inst.destroy();
                  this._materialInstances[index] = null;
                }
                this._onMaterialModified(index, this._materials[index]);
              }
              ;
              _proto.getMaterialInstance =
              function getMaterialInstance(idx) {
                var mat = this._materials[idx];
                if (!mat) {
                  return null;
                }
                if (!this._materialInstances[idx]) {
                  _matInsInfo.parent = this._materials[idx];
                  _matInsInfo.owner = this;
                  _matInsInfo.subModelIdx = idx;
                  var instantiated = new MaterialInstance(_matInsInfo);
                  _matInsInfo.parent = null;
                  _matInsInfo.owner = null;
                  _matInsInfo.subModelIdx = 0;
                  this.setMaterialInstance(instantiated, idx);
                }
                return this._materialInstances[idx];
              }
              ;
              _proto.setMaterialInstance =
              function setMaterialInstance(matInst, index) {
                if (typeof matInst === 'number') {
                  warnID(12007);
                  var temp = matInst;
                  matInst = index;
                  index = temp;
                }
                var curInst = this._materialInstances[index];
                if (matInst && matInst.parent) {
                  if (matInst !== curInst) {
                    this._materialInstances[index] = matInst;
                    this._onMaterialModified(index, matInst);
                  }
                  return;
                }
                if (matInst !== this._materials[index] || curInst) {
                  this.setSharedMaterial(matInst, index);
                }
              }
              ;
              _proto.getRenderMaterial =
              function getRenderMaterial(index) {
                return this._materialInstances[index] || this._materials[index];
              };
              _proto._onMaterialModified = function _onMaterialModified(index, material) {
              }
              ;
              _proto._onRebuildPSO =
              function _onRebuildPSO(index, material) {
              };
              _proto._clearMaterials = function _clearMaterials() {
              };
              _createClass(Renderer, [{
                key: "sharedMaterial",
                get:
                function get() {
                  return this.getSharedMaterial(0);
                }
              }, {
                key: "sharedMaterials",
                get:
                function get() {
                  return this._materials;
                },
                set: function set(val) {
                  for (var i = 0; i < val.length; i++) {
                    if (val[i] !== this._materials[i]) {
                      this.setSharedMaterial(val[i], i);
                    }
                  }
                  if (val.length < this._materials.length) {
                    for (var _i2 = val.length; _i2 < this._materials.length; _i2++) {
                      this.setSharedMaterial(null, _i2);
                    }
                    this._materials.splice(val.length);
                  }
                }
              }, {
                key: "material",
                get:
                function get() {
                  return this.getMaterialInstance(0);
                },
                set: function set(val) {
                  if (this._materials.length === 1 && !this._materialInstances[0] && this._materials[0] === val) {
                    return;
                  }
                  this.setMaterialInstance(val, 0);
                }
              }, {
                key: "materials",
                get:
                function get() {
                  for (var i = 0; i < this._materials.length; i++) {
                    this._materialInstances[i] = this.getMaterialInstance(i);
                  }
                  return this._materialInstances;
                },
                set: function set(val) {
                  var newLength = val.length;
                  var oldLength = this._materials.length;
                  for (var i = newLength; i < oldLength; i++) {
                    this.setMaterialInstance(null, i);
                  }
                  this._materials.length = newLength;
                  this._materialInstances.length = newLength;
                  for (var _i4 = 0; _i4 < newLength; _i4++) {
                    if (this._materialInstances[_i4] != val[_i4]) {
                      this.setMaterialInstance(val[_i4], _i4);
                    }
                  }
                }
              }]);
              return Renderer;
            }(Component), (_applyDecoratedDescriptor(_class2.prototype, "sharedMaterials", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterials"), _class2.prototype), _initializer = applyDecoratedInitializer(_class2.prototype, "_materials", [_dec3], function () {
              return [];
            })), _class2)) || _class) || _class));

        })
    };
}));
