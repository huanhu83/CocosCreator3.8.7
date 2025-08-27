System.register(['./_virtual_internal_constants-Cb-eEldT.js', './index-oHSn7cpO.js', './scene-B79xt5WD.js', './node-event-BDQEXkZZ.js', './global-exports-C7R_I6Kn.js', './gc-object-CbS29vYa.js'], (function (exports) {
    'use strict';
    var editorExtrasTag, Node, Component, cclegacy, CCObjectFlags, isCCObject, getError, value, isCCClassOrFastDefined, ValueType;
    return {
        setters: [null, function (module) {
            editorExtrasTag = module.e;
        }, function (module) {
            Node = module.N;
        }, function (module) {
            Component = module.C;
        }, function (module) {
            cclegacy = module.c;
        }, function (module) {
            CCObjectFlags = module.d;
            isCCObject = module.i;
            getError = module.g;
            value = module.v;
            isCCClassOrFastDefined = module.e;
            ValueType = module.V;
        }],
        execute: (function () {

            exports("i", instantiate);

            var Destroyed = CCObjectFlags.Destroyed;
            var PersistentMask = CCObjectFlags.PersistentMask;
            var objsToClearTmpVar = [];

            function hasImplementedInstantiate(original) {
              return typeof original._instantiate === 'function';
            }
            function isMountedChild(node) {
              var editorExtras = node[editorExtrasTag];
              if (typeof editorExtras === 'object') {
                return !!editorExtras.mountedRoot;
              }
              return false;
            }

            function instantiate(original, internalForce) {
              var clone;
              if (isCCObject(original)) {
                if (hasImplementedInstantiate(original)) {
                  cclegacy.game._isCloning = true;
                  clone = original._instantiate(null, true);
                  cclegacy.game._isCloning = false;
                  return clone;
                } else if (original instanceof cclegacy.Asset) {
                  throw new TypeError(getError(6903));
                }
              }
              cclegacy.game._isCloning = true;
              clone = doInstantiate(original);
              cclegacy.game._isCloning = false;
              return clone;
            }
            function doInstantiate(obj, parent) {
              var clone;
              if (obj._iN$t) {
                clone = obj._iN$t;
              } else if (obj.constructor) {
                var Klass = obj.constructor;
                clone = new Klass();
              } else {
                clone = Object.create(null);
              }
              enumerateObject(obj, clone, parent);
              for (var i = 0, len = objsToClearTmpVar.length; i < len; ++i) {
                objsToClearTmpVar[i]._iN$t = null;
              }
              objsToClearTmpVar.length = 0;
              return clone;
            }
            function enumerateCCClass(klass, obj, clone, parent) {
              var props = klass.__values__;
              for (var p = 0; p < props.length; p++) {
                var key = props[p];
                var value = obj[key];
                if (typeof value === 'object' && value) {
                  var initValue = clone[key];
                  if (initValue instanceof ValueType && initValue.constructor === value.constructor) {
                    initValue.set(value);
                  } else {
                    clone[key] = value._iN$t || instantiateObj(value, parent);
                  }
                } else {
                  clone[key] = value;
                }
              }
            }
            function enumerateObject(obj, clone, parent) {
              value(obj, '_iN$t', clone, true);
              objsToClearTmpVar.push(obj);
              var klass = obj.constructor;
              if (isCCClassOrFastDefined(klass)) {
                enumerateCCClass(klass, obj, clone, parent);
              } else {
                for (var key in obj) {
                  if (!obj.hasOwnProperty(key) || key.charCodeAt(0) === 95 && key.charCodeAt(1) === 95 && key !== '__type__' && key !== '__prefab') {
                    continue;
                  }
                  var value$1 = obj[key];
                  if (typeof value$1 === 'object' && value$1) {
                    if (value$1 === clone) {
                      continue;
                    }

                    clone[key] = value$1._iN$t || instantiateObj(value$1, parent);
                  } else {
                    clone[key] = value$1;
                  }
                }
              }
              if (isCCObject(obj)) {
                clone._objFlags &= PersistentMask;
              }
            }
            function instantiateObj(obj, parent) {
              if (obj instanceof ValueType) {
                return obj.clone();
              }
              if (obj instanceof cclegacy.Asset) {
                return obj;
              }
              var clone;
              if (ArrayBuffer.isView(obj)) {
                var len = obj.length;
                clone = new obj.constructor(len);
                obj._iN$t = clone;
                objsToClearTmpVar.push(obj);
                for (var i = 0; i < len; ++i) {
                  clone[i] = obj[i];
                }
                return clone;
              }
              if (Array.isArray(obj)) {
                var _len = obj.length;
                clone = new Array(_len);
                obj._iN$t = clone;
                objsToClearTmpVar.push(obj);
                for (var _i2 = 0; _i2 < _len; ++_i2) {
                  var value = obj[_i2];
                  if (typeof value === 'object' && value) {
                    clone[_i2] = value._iN$t || instantiateObj(value, parent);
                  } else {
                    clone[_i2] = value;
                  }
                }
                return clone;
              } else if (obj._objFlags & Destroyed) {
                return null;
              }
              var ctor = obj.constructor;
              if (isCCClassOrFastDefined(ctor)) {
                if (parent) {
                  if (parent instanceof Component) {
                    if (obj instanceof Node || obj instanceof Component) {
                      return obj;
                    }
                  } else if (parent instanceof Node) {
                    if (obj instanceof Node) {
                      if (!obj.isChildOf(parent) && !isMountedChild(obj)) {
                        return obj;
                      }
                    } else if (obj instanceof Component) {
                      if (obj.node && !obj.node.isChildOf(parent)) {
                        return obj;
                      }
                    }
                  }
                }
                clone = new ctor();
              } else if (ctor === Object) {
                clone = {};
              } else if (!ctor) {
                clone = Object.create(null);
              } else {
                return obj;
              }
              enumerateObject(obj, clone, parent);
              return clone;
            }
            instantiate._clone = doInstantiate;
            cclegacy.instantiate = instantiate;

        })
    };
}));
