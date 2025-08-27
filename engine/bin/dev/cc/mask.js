System.register(['./gc-object-CbS29vYa.js', './index-oHSn7cpO.js', './_virtual_internal_constants-Cb-eEldT.js', './global-exports-C7R_I6Kn.js', './graphics-BCyLukuH.js', './ui-renderer-CrISADqA.js', './scene-B79xt5WD.js', './sprite-CxiN4zvk.js', './prefab-CvAWu2P7.js', './pipeline-state-manager-C5ShdTPh.js', './node-event-BDQEXkZZ.js', './deprecated-DMYVurVK.js', './device-manager-gD_whA7Q.js', './buffer-barrier-BmKiPanc.js', './debug-view-CfU41ypM.js', './director-CFEaPqP_.js', './deprecated-CIxijlmD.js', './deprecated-B0llPila.js', './renderer-2n4MtCXy.js', './sorting-layers-Bt6H5Neq.js', './touch-iR3Bpatu.js', './sprite-frame-HkOXrlXI.js', './create-mesh-C6uBXS6f.js', './mesh-KkRb0lsQ.js', './wasm-web-Dlyu7UW0.js', './zlib.min-CSSqgreA.js'], (function (exports) {
    'use strict';
    var ccenum, _inheritsLoose, warnID, _createClass, _applyDecoratedDescriptor, errorID, Mat4, Vec2, ccclass, type, Color, Vec3, applyDecoratedInitializer, executionOrder, clamp, serializable, cclegacy, Graphics, Stage, NodeEventProcessor, Sprite, NodeEventType, Component;
    return {
        setters: [function (module) {
            ccenum = module.r;
            _inheritsLoose = module._;
            warnID = module.w;
            _createClass = module.a;
            _applyDecoratedDescriptor = module.b;
            errorID = module.h;
        }, function (module) {
            Mat4 = module.M;
            Vec2 = module.V;
            ccclass = module.c;
            type = module.t;
            Color = module.C;
            Vec3 = module.f;
            applyDecoratedInitializer = module.a;
            executionOrder = module.j;
            clamp = module.b;
            serializable = module.s;
        }, null, function (module) {
            cclegacy = module.c;
        }, function (module) {
            Graphics = module.G;
        }, function (module) {
            Stage = module.S;
        }, function (module) {
            NodeEventProcessor = module.aH;
        }, function (module) {
            Sprite = module.S;
        }, null, null, function (module) {
            NodeEventType = module.N;
            Component = module.C;
        }, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        execute: (function () {

            var _dec, _dec2, _dec3, _class, _class2, _initializer, _initializer2, _initializer3, _initializer4, _class3;
            var _worldMatrix = new Mat4();
            var _vec2_temp = new Vec2();
            var _mat4_temp = new Mat4();
            var _circlePoints = [];
            function _calculateCircle(center, radius, segments) {
              _circlePoints.length = 0;
              var anglePerStep = Math.PI * 2 / segments;
              for (var step = 0; step < segments; ++step) {
                _circlePoints.push(new Vec3(radius.x * Math.cos(anglePerStep * step) + center.x, radius.y * Math.sin(anglePerStep * step) + center.y, 0));
              }
              return _circlePoints;
            }
            var MaskType; exports("MaskType", MaskType);
            (function (MaskType) {
              MaskType[MaskType["GRAPHICS_RECT"] = 0] = "GRAPHICS_RECT";
              MaskType[MaskType["GRAPHICS_ELLIPSE"] = 1] = "GRAPHICS_ELLIPSE";
              MaskType[MaskType["GRAPHICS_STENCIL"] = 2] = "GRAPHICS_STENCIL";
              MaskType[MaskType["SPRITE_STENCIL"] = 3] = "SPRITE_STENCIL";
            })(MaskType || (exports("MaskType", MaskType = {})));
            ccenum(MaskType);
            var SEGMENTS_MIN = 3;
            var SEGMENTS_MAX = 10000;
            var Mask = exports("Mask", (_dec = ccclass('cc.Mask'), _dec2 = executionOrder(110), _dec3 = type(MaskType), _dec(_class = _dec2(_class = (_class2 = (_class3 = function (_Component) {
              _inheritsLoose(Mask, _Component);
              function Mask() {
                var _this;
                _this = _Component.call(this) || this;
                _this._type = _initializer && _initializer();
                _this._inverted = _initializer2 && _initializer2();
                _this._segments = _initializer3 && _initializer3();
                _this._alphaThreshold = _initializer4 && _initializer4();
                _this._sprite = null;
                _this._graphics = null;
                _this._stencilStage = Stage.DISABLED;
                return _this;
              }
              var _proto = Mask.prototype;
              _proto.onLoad = function onLoad() {
                this._changeRenderType();
              };
              _proto.onEnable = function onEnable() {
                this._changeRenderType();
                this._updateGraphics();
                this._enableRender();
                this.node.on(NodeEventType.ANCHOR_CHANGED, this._nodeStateChange, this);
                this.node.on(NodeEventType.SIZE_CHANGED, this._nodeStateChange, this);
              };
              _proto.onRestore = function onRestore() {
                this._changeRenderType();
                this._updateGraphics();
              };
              _proto.onDisable = function onDisable() {
                this._disableRender();
                this.node.off(NodeEventType.ANCHOR_CHANGED, this._nodeStateChange, this);
                this.node.off(NodeEventType.SIZE_CHANGED, this._nodeStateChange, this);
              };
              _proto.onDestroy = function onDestroy() {
                this._removeMaskNode();
              }
              ;
              _proto.isHit =
              function isHit(worldPt) {
                var uiTrans = this.node._getUITransformComp();
                var size = uiTrans.contentSize;
                var w = size.width;
                var h = size.height;
                var testPt = _vec2_temp;
                this.node.getWorldMatrix(_worldMatrix);
                Mat4.invert(_mat4_temp, _worldMatrix);
                Vec2.transformMat4(testPt, worldPt, _mat4_temp);
                var ap = uiTrans.anchorPoint;
                testPt.x += ap.x * w;
                testPt.y += ap.y * h;
                var result = false;
                if (this.type === MaskType.GRAPHICS_RECT || this.type === MaskType.GRAPHICS_STENCIL || this.type === MaskType.SPRITE_STENCIL) {
                  result = testPt.x >= 0 && testPt.y >= 0 && testPt.x <= w && testPt.y <= h;
                } else if (this.type === MaskType.GRAPHICS_ELLIPSE) {
                  var rx = w / 2;
                  var ry = h / 2;
                  var px = testPt.x - 0.5 * w;
                  var py = testPt.y - 0.5 * h;
                  result = px * px / (rx * rx) + py * py / (ry * ry) < 1;
                }
                if (this._inverted) {
                  result = !result;
                }
                return result;
              };
              _proto._nodeStateChange = function _nodeStateChange(type) {
                this._updateGraphics();
              };
              _proto._changeRenderType = function _changeRenderType() {
                var isGraphics = this._type !== MaskType.SPRITE_STENCIL;
                if (isGraphics) {
                  this._createGraphics();
                } else {
                  this._createSprite();
                }
              };
              _proto._createSprite = function _createSprite() {
                if (!this._sprite) {
                  var sprite = this._sprite = this.node.getComponent(Sprite);
                  if (!sprite) {
                    var node = this.node;
                    sprite = this._sprite = node.addComponent(Sprite);
                  }
                }
                this._sprite.stencilStage = this.inverted ? Stage.ENTER_LEVEL_INVERTED : Stage.ENTER_LEVEL;
                this._sprite.updateMaterial();
              };
              _proto._createGraphics = function _createGraphics() {
                if (!this._graphics) {
                  var graphics = this._graphics = this.node.getComponent(Graphics);
                  if (!graphics) {
                    var node = this.node;
                    graphics = this._graphics = node.addComponent(Graphics);
                  }
                  graphics.lineWidth = 1;
                  var color = Color.WHITE.clone();
                  color.a = 0;
                  graphics.fillColor = color;
                }
                this._graphics.stencilStage = this.inverted ? Stage.ENTER_LEVEL_INVERTED : Stage.ENTER_LEVEL;
              };
              _proto._updateGraphics = function _updateGraphics() {
                if (!this._graphics || this._type !== MaskType.GRAPHICS_RECT && this._type !== MaskType.GRAPHICS_ELLIPSE) {
                  return;
                }
                var uiTrans = this.node._getUITransformComp();
                var graphics = this._graphics;
                graphics.clear();
                var size = uiTrans.contentSize;
                var width = size.width;
                var height = size.height;
                var ap = uiTrans.anchorPoint;
                var x = -width * ap.x;
                var y = -height * ap.y;
                if (this._type === MaskType.GRAPHICS_RECT) {
                  graphics.rect(x, y, width, height);
                } else if (this._type === MaskType.GRAPHICS_ELLIPSE) {
                  var center = new Vec3(x + width / 2, y + height / 2, 0);
                  var radius = new Vec3(width / 2, height / 2, 0);
                  var points = _calculateCircle(center, radius, this._segments);
                  for (var i = 0; i < points.length; ++i) {
                    var point = points[i];
                    if (i === 0) {
                      graphics.moveTo(point.x, point.y);
                    } else {
                      graphics.lineTo(point.x, point.y);
                    }
                  }
                  graphics.close();
                }
                graphics.fill();
              };
              _proto._enableRender = function _enableRender() {
                if (this.subComp) {
                  this.subComp.enabled = true;
                }
              };
              _proto._disableRender = function _disableRender() {
                if (this.subComp) {
                  this.subComp.stencilStage = Stage.DISABLED;
                  this.subComp.updateMaterial();
                  if (this.node.activeInHierarchy) {
                    this.subComp.enabled = false;
                  }
                }
              };
              _proto._removeMaskNode = function _removeMaskNode() {
                if (this._sprite) {
                  this._sprite = null;
                }
                if (this._graphics) {
                  this._graphics = null;
                }
              }
              ;
              _proto.markForUpdateRenderData =
              function markForUpdateRenderData(enable) {
                if (enable === void 0) {
                  enable = true;
                }
                warnID(9007);
                if (this.subComp) {
                  this.subComp._markForUpdateRenderData(enable);
                }
              }
              ;
              _proto.requestRenderData =
              function requestRenderData(any) {
                warnID(9007);
              }
              ;
              _proto.destroyRenderData =
              function destroyRenderData() {
                warnID(9007);
              }
              ;
              _proto.updateRenderer =
              function updateRenderer() {
                warnID(9007);
                if (this.subComp) {
                  this.subComp.updateRenderer();
                }
              }
              ;
              _proto.fillBuffers =
              function fillBuffers(render) {
                warnID(9007);
              }
              ;
              _proto.postUpdateAssembler =
              function postUpdateAssembler(render) {
                warnID(9007);
              }
              ;
              _proto.setNodeDirty =
              function setNodeDirty() {
                warnID(9007);
                if (this.subComp) {
                  this.subComp.setNodeDirty();
                }
              }
              ;
              _proto.setTextureDirty =
              function setTextureDirty() {
                warnID(9007);
                if (this.subComp) {
                  this.subComp.setTextureDirty();
                }
              }
              ;
              _proto.getMaterial =
              function getMaterial(idx) {
                warnID(9007);
                if (this.subComp) {
                  return this.subComp.getSharedMaterial(idx);
                }
                return null;
              }
              ;
              _proto.setMaterial =
              function setMaterial(material, index) {
                warnID(9007);
                if (this.subComp) {
                  this.subComp.setMaterial(material, index);
                }
              }
              ;
              _proto.getMaterialInstance =
              function getMaterialInstance(idx) {
                warnID(9007);
                if (this.subComp) {
                  return this.subComp.getMaterialInstance(idx);
                }
                return null;
              }
              ;
              _proto.setMaterialInstance =
              function setMaterialInstance(matInst, index) {
                warnID(9007);
                if (this.subComp) {
                  this.subComp.setMaterialInstance(matInst, index);
                }
              }
              ;
              _proto.getRenderMaterial =
              function getRenderMaterial(index) {
                warnID(9007);
                if (this.subComp) {
                  return this.subComp.getRenderMaterial(index);
                }
                return null;
              };
              _createClass(Mask, [{
                key: "type",
                get:
                function get() {
                  return this._type;
                },
                set: function set(value) {
                  if (this._type === value) {
                    return;
                  }
                  this._type = value;
                  if (this._type !== MaskType.SPRITE_STENCIL) {
                    if (this._sprite) {
                      this.node.removeComponent(Sprite);
                      this._sprite._destroyImmediate();
                      this._sprite = null;
                    }
                    this._changeRenderType();
                    this._updateGraphics();
                  } else {
                    if (this._graphics) {
                      this._graphics.clear();
                      this.node.removeComponent(Graphics);
                      this._graphics._destroyImmediate();
                      this._graphics = null;
                    }
                    this._changeRenderType();
                  }
                }
              }, {
                key: "inverted",
                get:
                function get() {
                  return this._inverted;
                },
                set: function set(value) {
                  this._inverted = value;
                  this.subComp.stencilStage = this.inverted ? Stage.ENTER_LEVEL_INVERTED : Stage.ENTER_LEVEL;
                }
              }, {
                key: "segments",
                get:
                function get() {
                  return this._segments;
                },
                set: function set(value) {
                  if (this._segments === value) {
                    return;
                  }
                  this._segments = clamp(value, SEGMENTS_MIN, SEGMENTS_MAX);
                  this._updateGraphics();
                }
              }, {
                key: "spriteFrame",
                get:
                function get() {
                  if (this._sprite) {
                    return this._sprite.spriteFrame;
                  }
                  return null;
                },
                set: function set(value) {
                  if (this._sprite) {
                    this._sprite.spriteFrame = value;
                  } else {
                    errorID(16307);
                  }
                }
              }, {
                key: "alphaThreshold",
                get:
                function get() {
                  return this._alphaThreshold;
                },
                set: function set(value) {
                  if (this._alphaThreshold === value) {
                    return;
                  }
                  this._alphaThreshold = value;
                  if (this.type === MaskType.SPRITE_STENCIL && this._sprite) {
                    var mat = this._sprite.getMaterialInstance(0);
                    mat.setProperty('alphaThreshold', this._alphaThreshold);
                  }
                }
              }, {
                key: "subComp",
                get:
                function get() {
                  return this._graphics || this._sprite;
                }
              }, {
                key: "customMaterial",
                get:
                function get() {
                  warnID(9007);
                  if (this.subComp) {
                    return this.subComp.customMaterial;
                  }
                  return null;
                },
                set: function set(val) {
                  warnID(9007);
                  if (this.subComp) {
                    this.subComp.customMaterial = val;
                  }
                }
              }, {
                key: "color",
                get:
                function get() {
                  warnID(9007);
                  if (this.subComp) {
                    return this.subComp.color;
                  }
                  return null;
                },
                set: function set(value) {
                  warnID(9007);
                  if (this.subComp && value) {
                    this.subComp.color = value;
                  }
                }
              }, {
                key: "sharedMaterial",
                get:
                function get() {
                  warnID(9007);
                  if (this.subComp) {
                    return this.subComp.sharedMaterial;
                  }
                  return null;
                }
              }, {
                key: "sharedMaterials",
                get:
                function get() {
                  warnID(9007);
                  if (this.subComp) {
                    return this.subComp.sharedMaterials;
                  }
                  return null;
                },
                set: function set(val) {
                  warnID(9007);
                  if (this.subComp && val) {
                    this.subComp.sharedMaterials = val;
                  }
                }
              }, {
                key: "material",
                get:
                function get() {
                  warnID(9007);
                  if (this.subComp) {
                    return this.subComp.material;
                  }
                  return null;
                },
                set: function set(val) {
                  warnID(9007);
                  if (this.subComp) {
                    this.subComp.material = val;
                  }
                }
              }, {
                key: "materials",
                get:
                function get() {
                  warnID(9007);
                  if (this.subComp) {
                    return this.subComp.materials;
                  }
                  return [null];
                },
                set: function set(val) {
                  warnID(9007);
                  if (this.subComp) {
                    this.subComp.materials = val;
                  }
                }
              }]);
              return Mask;
            }(Component), _class3.Type = MaskType, _class3), (_applyDecoratedDescriptor(_class2.prototype, "type", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _initializer = applyDecoratedInitializer(_class2.prototype, "_type", [serializable], function () {
              return MaskType.GRAPHICS_RECT;
            }), _initializer2 = applyDecoratedInitializer(_class2.prototype, "_inverted", [serializable], function () {
              return false;
            }), _initializer3 = applyDecoratedInitializer(_class2.prototype, "_segments", [serializable], function () {
              return 64;
            }), _initializer4 = applyDecoratedInitializer(_class2.prototype, "_alphaThreshold", [serializable], function () {
              return 0.1;
            })), _class2)) || _class) || _class));
            NodeEventProcessor._maskComp = Mask;
            cclegacy.Mask = Mask;

        })
    };
}));
