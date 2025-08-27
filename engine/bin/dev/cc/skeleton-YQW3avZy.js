System.register(['./gc-object-CbS29vYa.js', './index-oHSn7cpO.js', './_virtual_internal_constants-Cb-eEldT.js', './global-exports-C7R_I6Kn.js', './node-event-BDQEXkZZ.js', './buffer-barrier-BmKiPanc.js'], (function (exports) {
    'use strict';
    var _inheritsLoose, _createClass, CCString, ccclass, type, applyDecoratedInitializer, Mat4, serializable, cclegacy, Asset, murmurhash2_32_gc;
    return {
        setters: [function (module) {
            _inheritsLoose = module._;
            _createClass = module.a;
            CCString = module.f;
        }, function (module) {
            ccclass = module.c;
            type = module.t;
            applyDecoratedInitializer = module.a;
            Mat4 = module.M;
            serializable = module.s;
        }, null, function (module) {
            cclegacy = module.c;
        }, function (module) {
            Asset = module.A;
        }, function (module) {
            murmurhash2_32_gc = module.m;
        }],
        execute: (function () {

            var _dec, _dec2, _dec3, _class, _class2, _initializer, _initializer2, _initializer3;
            var Skeleton = exports("S", (_dec = ccclass('cc.Skeleton'), _dec2 = type([CCString]), _dec3 = type([Mat4]), _dec(_class = (_class2 = function (_Asset) {
              _inheritsLoose(Skeleton, _Asset);
              function Skeleton(name) {
                var _this;
                _this = _Asset.call(this, name) || this;
                _this._joints = _initializer && _initializer();
                _this._bindposes = _initializer2 && _initializer2();
                _this._hash = _initializer3 && _initializer3();
                _this._invBindposes = null;
                return _this;
              }
              var _proto = Skeleton.prototype;
              _proto.destroy = function destroy() {
                var _cclegacy$director$ro, _cclegacy$director$ro2;
                (_cclegacy$director$ro = cclegacy.director.root) == null ? void 0 : (_cclegacy$director$ro2 = _cclegacy$director$ro.dataPoolManager) == null ? void 0 : _cclegacy$director$ro2.releaseSkeleton(this);
                return _Asset.prototype.destroy.call(this);
              }
              ;
              _proto.validate =
              function validate() {
                return this.joints.length > 0 && this.bindposes.length > 0;
              };
              _createClass(Skeleton, [{
                key: "joints",
                get:
                function get() {
                  return this._joints;
                },
                set: function set(value) {
                  this._joints = value;
                }
              }, {
                key: "bindposes",
                get:
                function get() {
                  return this._bindposes;
                },
                set: function set(value) {
                  this._bindposes = value;
                }
              }, {
                key: "inverseBindposes",
                get:
                function get() {
                  if (!this._invBindposes) {
                    this._invBindposes = [];
                    for (var i = 0; i < this._bindposes.length; i++) {
                      var inv = new Mat4();
                      Mat4.invert(inv, this._bindposes[i]);
                      this._invBindposes.push(inv);
                    }
                  }
                  return this._invBindposes;
                }
              }, {
                key: "hash",
                get:
                function get() {
                  if (!this._hash) {
                    var str = '';
                    for (var i = 0; i < this._bindposes.length; i++) {
                      var ibm = this._bindposes[i];
                      str += ibm.m00.toPrecision(2) + " " + ibm.m01.toPrecision(2) + " " + ibm.m02.toPrecision(2) + " " + ibm.m03.toPrecision(2) + " " + ibm.m04.toPrecision(2) + " " + ibm.m05.toPrecision(2) + " " + ibm.m06.toPrecision(2) + " " + ibm.m07.toPrecision(2) + " " + ibm.m08.toPrecision(2) + " " + ibm.m09.toPrecision(2) + " " + ibm.m10.toPrecision(2) + " " + ibm.m11.toPrecision(2) + " " + ibm.m12.toPrecision(2) + " " + ibm.m13.toPrecision(2) + " " + ibm.m14.toPrecision(2) + " " + ibm.m15.toPrecision(2) + "\n";
                    }
                    this._hash = murmurhash2_32_gc(str, 666);
                  }
                  return this._hash;
                }
              }]);
              return Skeleton;
            }(Asset), (_initializer = applyDecoratedInitializer(_class2.prototype, "_joints", [_dec2], function () {
              return [];
            }), _initializer2 = applyDecoratedInitializer(_class2.prototype, "_bindposes", [_dec3], function () {
              return [];
            }), _initializer3 = applyDecoratedInitializer(_class2.prototype, "_hash", [serializable], function () {
              return 0;
            })), _class2)) || _class));
            cclegacy.Skeleton = Skeleton;

        })
    };
}));
