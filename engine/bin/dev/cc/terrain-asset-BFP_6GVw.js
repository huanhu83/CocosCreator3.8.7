System.register(['./gc-object-CbS29vYa.js', './index-oHSn7cpO.js', './_virtual_internal_constants-Cb-eEldT.js', './global-exports-C7R_I6Kn.js', './debug-view-CfU41ypM.js', './node-event-BDQEXkZZ.js', './scene-B79xt5WD.js'], (function (exports) {
    'use strict';
    var _inheritsLoose, _createClass, ccclass, applyDecoratedInitializer, serializable, Asset;
    return {
        setters: [function (module) {
            _inheritsLoose = module._;
            _createClass = module.a;
        }, function (module) {
            ccclass = module.c;
            applyDecoratedInitializer = module.a;
            serializable = module.s;
        }, null, null, null, function (module) {
            Asset = module.A;
        }, null],
        execute: (function () {

            var _dec, _class2, _class3, _initializer, _initializer2, _initializer3, _initializer4, _initializer5, _initializer6, _dec2, _class5, _dec3, _class7, _class8, _initializer7;
            var TERRAIN_MAX_LEVELS = exports("l", 4);
            var TERRAIN_MAX_BLEND_LAYERS = exports("g", 4);
            var TERRAIN_MAX_LAYER_COUNT = exports("i", 256);
            var TERRAIN_BLOCK_TILE_COMPLEXITY = exports("b", 32);
            var TERRAIN_BLOCK_VERTEX_COMPLEXITY = exports("a", 33);
            var TERRAIN_BLOCK_VERTEX_SIZE = exports("T", 8);
            var TERRAIN_HEIGHT_BASE = exports("e", 32768);
            var TERRAIN_HEIGHT_FACTORY = exports("f", 1.0 / 128.0);
            var TERRAIN_HEIGHT_FACTORY_V7 = exports("m", 1.0 / 512.0);
            var TERRAIN_HEIGHT_FMIN = exports("k", -TERRAIN_HEIGHT_BASE * TERRAIN_HEIGHT_FACTORY);
            var TERRAIN_HEIGHT_FMAX = exports("j", (65535 - TERRAIN_HEIGHT_BASE) * TERRAIN_HEIGHT_FACTORY);
            var TERRAIN_NORTH_INDEX = exports("n", 0);
            var TERRAIN_SOUTH_INDEX = exports("o", 1);
            var TERRAIN_WEST_INDEX = exports("p", 2);
            var TERRAIN_EAST_INDEX = exports("q", 3);
            var TERRAIN_DATA_VERSION = exports("r", 0x01010001);
            var TERRAIN_DATA_VERSION2 = exports("s", 0x01010002);
            var TERRAIN_DATA_VERSION3 = exports("t", 0x01010003);
            var TERRAIN_DATA_VERSION4 = exports("u", 0x01010004);
            var TERRAIN_DATA_VERSION5 = exports("h", 0x01010005);
            var TERRAIN_DATA_VERSION6 = exports("v", 0x01010006);
            var TERRAIN_DATA_VERSION7 = exports("w", 0x01010007);
            var TERRAIN_DATA_VERSION8 = exports("x", 0x01010008);
            var TERRAIN_DATA_VERSION_DEFAULT = exports("y", 0x01010111);
            var TerrainBuffer = function () {
              function TerrainBuffer() {
                this.length = 0;
                this.buffer = new Uint8Array(2048);
                this._buffView = new DataView(this.buffer.buffer);
                this._seekPos = 0;
              }
              var _proto = TerrainBuffer.prototype;
              _proto.reserve = function reserve(size) {
                if (this.buffer.byteLength > size) {
                  return;
                }
                var capacity = this.buffer.byteLength;
                while (capacity < size) {
                  capacity += capacity;
                }
                var temp = new Uint8Array(capacity);
                for (var i = 0; i < this.length; ++i) {
                  temp[i] = this.buffer[i];
                }
                this.buffer = temp;
                this._buffView = new DataView(this.buffer.buffer);
              };
              _proto.assign = function assign(buff) {
                this.buffer = buff;
                this.length = buff.length;
                this._seekPos = buff.byteOffset;
                this._buffView = new DataView(buff.buffer);
              };
              _proto.writeInt8 = function writeInt8(value) {
                this.reserve(this.length + 1);
                this._buffView.setInt8(this.length, value);
                this.length += 1;
              };
              _proto.writeInt16 = function writeInt16(value) {
                this.reserve(this.length + 2);
                this._buffView.setInt16(this.length, value, true);
                this.length += 2;
              };
              _proto.writeInt32 = function writeInt32(value) {
                this.reserve(this.length + 4);
                this._buffView.setInt32(this.length, value, true);
                this.length += 4;
              };
              _proto.writeIntArray = function writeIntArray(value) {
                this.reserve(this.length + 4 * value.length);
                for (var i = 0; i < value.length; ++i) {
                  this._buffView.setInt32(this.length + i * 4, value[i], true);
                }
                this.length += 4 * value.length;
              };
              _proto.writeFloat = function writeFloat(value) {
                this.reserve(this.length + 4);
                this._buffView.setFloat32(this.length, value, true);
                this.length += 4;
              };
              _proto.writeFloatArray = function writeFloatArray(value) {
                this.reserve(this.length + 4 * value.length);
                for (var i = 0; i < value.length; ++i) {
                  this._buffView.setFloat32(this.length + i * 4, value[i], true);
                }
                this.length += 4 * value.length;
              };
              _proto.writeDouble = function writeDouble(value) {
                this.reserve(this.length + 8);
                this._buffView.setFloat64(this.length, value, true);
                this.length += 8;
              };
              _proto.writeDoubleArray = function writeDoubleArray(value) {
                this.reserve(this.length + 8 * value.length);
                for (var i = 0; i < value.length; ++i) {
                  this._buffView.setFloat64(this.length + i * 8, value[i], true);
                }
                this.length += 8 * value.length;
              };
              _proto.writeString = function writeString(value) {
                this.reserve(this.length + value.length + 4);
                this._buffView.setInt32(this.length, value.length, true);
                for (var i = 0; i < value.length; ++i) {
                  this._buffView.setInt8(this.length + 4 + i, value.charCodeAt(i));
                }
                this.length += value.length + 4;
              };
              _proto.readInt8 = function readInt8() {
                var value = this._buffView.getInt8(this._seekPos);
                this._seekPos += 1;
                return value;
              };
              _proto.readInt16 = function readInt16() {
                var value = this._buffView.getInt16(this._seekPos, true);
                this._seekPos += 2;
                return value;
              };
              _proto.readInt = function readInt() {
                var value = this._buffView.getInt32(this._seekPos, true);
                this._seekPos += 4;
                return value;
              };
              _proto.readIntArray = function readIntArray(value) {
                for (var i = 0; i < value.length; ++i) {
                  value[i] = this._buffView.getInt32(this._seekPos + i * 4, true);
                }
                this._seekPos += 4 * value.length;
                return value;
              };
              _proto.readFloat = function readFloat() {
                var value = this._buffView.getFloat32(this._seekPos, true);
                this._seekPos += 4;
                return value;
              };
              _proto.readFloatArray = function readFloatArray(value) {
                for (var i = 0; i < value.length; ++i) {
                  value[i] = this._buffView.getFloat32(this._seekPos + i * 4, true);
                }
                this._seekPos += 4 * value.length;
                return value;
              };
              _proto.readDouble = function readDouble() {
                var value = this._buffView.getFloat64(this._seekPos, true);
                this._seekPos += 8;
                return value;
              };
              _proto.readDoubleArray = function readDoubleArray(value) {
                for (var i = 0; i < value.length; ++i) {
                  value[i] = this._buffView.getFloat64(this._seekPos + i * 4, true);
                }
                this._seekPos += 8 * value.length;
                return value;
              };
              _proto.readString = function readString() {
                var length = this.readInt();
                var value = '';
                for (var i = 0; i < length; ++i) {
                  value += String.fromCharCode(this.readInt8());
                }
                return value;
              };
              return TerrainBuffer;
            }();
            var TerrainLayerInfo = exports("d", (_dec = ccclass('cc.TerrainLayerInfo'), _dec(_class2 = (_class3 = function TerrainLayerInfo() {
              this.slot = _initializer && _initializer();
              this.tileSize = _initializer2 && _initializer2();
              this.detailMap = _initializer3 && _initializer3();
              this.normalMap = _initializer4 && _initializer4();
              this.roughness = _initializer5 && _initializer5();
              this.metallic = _initializer6 && _initializer6();
            }, (_initializer = applyDecoratedInitializer(_class3.prototype, "slot", [serializable], function () {
              return 0;
            }), _initializer2 = applyDecoratedInitializer(_class3.prototype, "tileSize", [serializable], function () {
              return 1;
            }), _initializer3 = applyDecoratedInitializer(_class3.prototype, "detailMap", [serializable], function () {
              return null;
            }), _initializer4 = applyDecoratedInitializer(_class3.prototype, "normalMap", [serializable], function () {
              return null;
            }), _initializer5 = applyDecoratedInitializer(_class3.prototype, "roughness", [serializable], function () {
              return 1;
            }), _initializer6 = applyDecoratedInitializer(_class3.prototype, "metallic", [serializable], function () {
              return 0;
            })), _class3)) || _class2));
            var TerrainLayerBinaryInfo = exports("z", (_dec2 = ccclass('cc.TerrainLayerBinaryInfo'), _dec2(_class5 = function TerrainLayerBinaryInfo() {
              this.slot = 0;
              this.tileSize = 1;
              this.roughness = 1;
              this.metallic = 0;
              this.detailMapId = '';
              this.normalMapId = '';
            }) || _class5));
            var TerrainAsset = exports("c", (_dec3 = ccclass('cc.TerrainAsset'), _dec3(_class7 = (_class8 = function (_Asset) {
              _inheritsLoose(TerrainAsset, _Asset);
              function TerrainAsset() {
                var _this;
                _this = _Asset.call(this) || this;
                _this._version = 0;
                _this._data = null;
                _this._tileSize = 1;
                _this._blockCount = [1, 1];
                _this._weightMapSize = 128;
                _this._lightMapSize = 128;
                _this._heights = new Uint16Array();
                _this._normals = new Float32Array();
                _this._weights = new Uint8Array();
                _this._layerBuffer = [-1, -1, -1, -1];
                _this._layerBinaryInfos = [];
                _this._layerInfos = _initializer7 && _initializer7();
                return _this;
              }
              var _proto2 = TerrainAsset.prototype;
              _proto2.getLayer =
              function getLayer(xBlock, yBlock, layerId) {
                var blockId = yBlock * this.blockCount[0] + xBlock;
                var index = blockId * 4 + layerId;
                if (xBlock < this.blockCount[0] && yBlock < this.blockCount[1] && index < this._layerBuffer.length) {
                  return this._layerBuffer[index];
                }
                return -1;
              };
              _proto2.getHeight = function getHeight(i, j) {
                var vertexCountX = this._blockCount[0] * TERRAIN_BLOCK_TILE_COMPLEXITY + 1;
                return (this._heights[j * vertexCountX + i] - TERRAIN_HEIGHT_BASE) * TERRAIN_HEIGHT_FACTORY;
              };
              _proto2.getVertexCountI = function getVertexCountI() {
                if (this._blockCount.length < 1) return 0;
                return this._blockCount[0] * TERRAIN_BLOCK_TILE_COMPLEXITY + 1;
              };
              _proto2.getVertexCountJ = function getVertexCountJ() {
                if (this._blockCount.length < 2) return 0;
                return this._blockCount[1] * TERRAIN_BLOCK_TILE_COMPLEXITY + 1;
              }
              ;
              _proto2._setNativeData =
              function _setNativeData(_nativeData) {
                this._data = _nativeData;
              }
              ;
              _proto2._loadNativeData =
              function _loadNativeData(_nativeData) {
                if (!_nativeData || _nativeData.length === 0) {
                  return false;
                }
                var stream = new TerrainBuffer();
                stream.assign(_nativeData);
                this._version = stream.readInt();
                if (this._version === TERRAIN_DATA_VERSION_DEFAULT) {
                  return true;
                }
                if (this._version !== TERRAIN_DATA_VERSION && this._version !== TERRAIN_DATA_VERSION2 && this._version !== TERRAIN_DATA_VERSION3 && this._version !== TERRAIN_DATA_VERSION4 && this._version !== TERRAIN_DATA_VERSION5 && this._version !== TERRAIN_DATA_VERSION6 && this._version !== TERRAIN_DATA_VERSION7 && this._version !== TERRAIN_DATA_VERSION8) {
                  return false;
                }
                if (this._version >= TERRAIN_DATA_VERSION7) {
                  this.tileSize = stream.readDouble();
                } else {
                  this.tileSize = stream.readFloat();
                }
                this.tileSize = Math.floor(this.tileSize * 100) / 100.0;
                stream.readIntArray(this._blockCount);
                this.weightMapSize = stream.readInt16();
                this.lightMapSize = stream.readInt16();
                var heightBufferSize = stream.readInt();
                this.heights = new Uint16Array(heightBufferSize);
                for (var i = 0; i < this.heights.length; ++i) {
                  this.heights[i] = stream.readInt16();
                }
                if (this._version < TERRAIN_DATA_VERSION8) {
                  for (var _i2 = 0; _i2 < this.heights.length; ++_i2) {
                    var h = (this._heights[_i2] - TERRAIN_HEIGHT_BASE) * TERRAIN_HEIGHT_FACTORY_V7;
                    var ch = TERRAIN_HEIGHT_BASE + h / TERRAIN_HEIGHT_FACTORY;
                    this.heights[_i2] = ch;
                  }
                }
                if (this._version >= TERRAIN_DATA_VERSION6) {
                  var normalBufferSize = stream.readInt();
                  this.normals = new Float32Array(normalBufferSize);
                  for (var _i4 = 0; _i4 < this.normals.length; ++_i4) {
                    this.normals[_i4] = stream.readFloat();
                  }
                }
                var WeightBufferSize = stream.readInt();
                this.weights = new Uint8Array(WeightBufferSize);
                for (var _i6 = 0; _i6 < this.weights.length; ++_i6) {
                  this.weights[_i6] = stream.readInt8();
                }
                if (this._version >= TERRAIN_DATA_VERSION2) {
                  var layerBufferSize = stream.readInt();
                  this.layerBuffer = new Array(layerBufferSize);
                  for (var _i8 = 0; _i8 < this.layerBuffer.length; ++_i8) {
                    this.layerBuffer[_i8] = stream.readInt16();
                  }
                }
                if (this._version >= TERRAIN_DATA_VERSION3) {
                  var layerInfoSize = stream.readInt();
                  this._layerBinaryInfos = new Array(layerInfoSize);
                  for (var _i10 = 0; _i10 < this._layerBinaryInfos.length; ++_i10) {
                    this._layerBinaryInfos[_i10] = new TerrainLayerBinaryInfo();
                    this._layerBinaryInfos[_i10].slot = stream.readInt();
                    if (this._version >= TERRAIN_DATA_VERSION7) {
                      this._layerBinaryInfos[_i10].tileSize = stream.readDouble();
                    } else {
                      this._layerBinaryInfos[_i10].tileSize = stream.readFloat();
                    }
                    this._layerBinaryInfos[_i10].detailMapId = stream.readString();
                    if (this._version >= TERRAIN_DATA_VERSION4) {
                      this._layerBinaryInfos[_i10].normalMapId = stream.readString();
                      if (this._version >= TERRAIN_DATA_VERSION7) {
                        this._layerBinaryInfos[_i10].roughness = stream.readDouble();
                        this._layerBinaryInfos[_i10].metallic = stream.readDouble();
                      } else {
                        this._layerBinaryInfos[_i10].roughness = stream.readFloat();
                        this._layerBinaryInfos[_i10].metallic = stream.readFloat();
                      }
                    }
                  }
                }
                return true;
              }
              ;
              _proto2._exportNativeData =
              function _exportNativeData() {
                var stream = new TerrainBuffer();
                stream.writeInt32(TERRAIN_DATA_VERSION8);
                stream.writeDouble(this.tileSize);
                stream.writeIntArray(this._blockCount);
                stream.writeInt16(this.weightMapSize);
                stream.writeInt16(this.lightMapSize);
                stream.writeInt32(this.heights.length);
                for (var i = 0; i < this.heights.length; ++i) {
                  stream.writeInt16(this.heights[i]);
                }
                stream.writeInt32(this.normals.length);
                for (var _i12 = 0; _i12 < this.normals.length; ++_i12) {
                  stream.writeFloat(this.normals[_i12]);
                }
                stream.writeInt32(this.weights.length);
                for (var _i14 = 0; _i14 < this.weights.length; ++_i14) {
                  stream.writeInt8(this.weights[_i14]);
                }
                stream.writeInt32(this.layerBuffer.length);
                for (var _i16 = 0; _i16 < this.layerBuffer.length; ++_i16) {
                  stream.writeInt16(this.layerBuffer[_i16]);
                }
                var layerBinaryInfos = [];
                layerBinaryInfos.length = this.layerInfos.length;
                for (var _i18 = 0; _i18 < layerBinaryInfos.length; ++_i18) {
                  var layer = this.layerInfos[_i18];
                  var binaryLayer = new TerrainLayerBinaryInfo();
                  binaryLayer.slot = _i18;
                  binaryLayer.tileSize = layer.tileSize;
                  binaryLayer.detailMapId = layer.detailMap ? layer.detailMap._uuid : '';
                  binaryLayer.normalMapId = layer.normalMap ? layer.normalMap._uuid : '';
                  binaryLayer.metallic = layer.metallic;
                  binaryLayer.roughness = layer.roughness;
                  layerBinaryInfos[_i18] = binaryLayer;
                }
                stream.writeInt32(layerBinaryInfos.length);
                for (var _i20 = 0; _i20 < layerBinaryInfos.length; ++_i20) {
                  stream.writeInt32(layerBinaryInfos[_i20].slot);
                  stream.writeDouble(layerBinaryInfos[_i20].tileSize);
                  stream.writeString(layerBinaryInfos[_i20].detailMapId);
                  stream.writeString(layerBinaryInfos[_i20].normalMapId);
                  stream.writeDouble(layerBinaryInfos[_i20].roughness);
                  stream.writeDouble(layerBinaryInfos[_i20].metallic);
                }
                return stream.buffer;
              }
              ;
              _proto2._exportDefaultNativeData =
              function _exportDefaultNativeData() {
                var stream = new TerrainBuffer();
                stream.writeInt32(TERRAIN_DATA_VERSION_DEFAULT);
                return stream.buffer;
              };
              _createClass(TerrainAsset, [{
                key: "_nativeAsset",
                get:
                function get() {
                  return this._data.buffer;
                },
                set: function set(value) {
                  if (this._data && this._data.byteLength === value.byteLength) {
                    this._data.set(new Uint8Array(value));
                  } else {
                    this._data = new Uint8Array(value);
                  }
                  this._loadNativeData(this._data);
                }
              }, {
                key: "version",
                get:
                function get() {
                  return this._version;
                }
              }, {
                key: "tileSize",
                get: function get() {
                  return this._tileSize;
                }
                ,
                set:
                function set(value) {
                  this._tileSize = value;
                }
              }, {
                key: "blockCount",
                get: function get() {
                  return this._blockCount;
                }
                ,
                set:
                function set(value) {
                  this._blockCount = value;
                }
              }, {
                key: "lightMapSize",
                get: function get() {
                  return this._lightMapSize;
                }
                ,
                set:
                function set(value) {
                  this._lightMapSize = value;
                }
              }, {
                key: "weightMapSize",
                get: function get() {
                  return this._weightMapSize;
                }
                ,
                set:
                function set(value) {
                  this._weightMapSize = value;
                }
              }, {
                key: "heights",
                get: function get() {
                  return this._heights;
                }
                ,
                set:
                function set(value) {
                  this._heights = value;
                }
              }, {
                key: "normals",
                get: function get() {
                  return this._normals;
                }
                ,
                set:
                function set(value) {
                  this._normals = value;
                }
              }, {
                key: "weights",
                get: function get() {
                  return this._weights;
                }
                ,
                set:
                function set(value) {
                  this._weights = value;
                }
              }, {
                key: "layerBuffer",
                get: function get() {
                  return this._layerBuffer;
                }
                ,
                set:
                function set(value) {
                  this._layerBuffer = value;
                }
              }, {
                key: "layerInfos",
                get: function get() {
                  return this._layerInfos;
                },
                set:
                function set(value) {
                  this._layerInfos = value;
                }
              }, {
                key: "layerBinaryInfos",
                get: function get() {
                  return this._layerBinaryInfos;
                }
              }]);
              return TerrainAsset;
            }(Asset), (_initializer7 = applyDecoratedInitializer(_class8.prototype, "_layerInfos", [serializable], function () {
              return [];
            })), _class8)) || _class7));

        })
    };
}));
