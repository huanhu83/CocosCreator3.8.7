System.register(['./sorting-layers-Bt6H5Neq.js', './gc-object-CbS29vYa.js', './index-oHSn7cpO.js', './_virtual_internal_constants-Cb-eEldT.js', './global-exports-C7R_I6Kn.js', './node-event-BDQEXkZZ.js', './ui-renderer-CrISADqA.js', './scene-B79xt5WD.js', './device-manager-gD_whA7Q.js', './buffer-barrier-BmKiPanc.js', './pipeline-state-manager-C5ShdTPh.js', './debug-view-CfU41ypM.js', './deprecated-DMYVurVK.js', './deprecated-CIxijlmD.js'], (function (exports) {
    'use strict';
    var SortingLayers, _createClass, RecyclePool, _createForOfIteratorHelperLoose, assert, assertIsTrue, CachedArray, Pool, _inheritsLoose, warnID, _applyDecoratedDescriptor, Vec4, clamp, Mat4, approx, EPSILON, ccclass, type, disallowMultiple, applyDecoratedInitializer, requireComponent, serializable, cclegacy, Component, StencilManager, vfmtPosUvColor, getAttributeStride, StaticVBAccessor, Stage, RenderEntityFillColorType, vfmt, UIRenderer, Pass, builtinResMgr, Material, deviceManager, FormatInfos, BufferInfo, BufferUsageBit, MemoryUsageBit, PrimitiveMode, DescriptorSetInfo, Layers, ModelLocalBindings, UBOLocalEnum, RenderingSubMesh, Model;
    return {
        setters: [function (module) {
            SortingLayers = module.S;
        }, function (module) {
            _createClass = module.a;
            RecyclePool = module.R;
            _createForOfIteratorHelperLoose = module.j;
            assert = module.H;
            assertIsTrue = module.l;
            CachedArray = module.a5;
            Pool = module.P;
            _inheritsLoose = module._;
            warnID = module.w;
            _applyDecoratedDescriptor = module.b;
        }, function (module) {
            Vec4 = module.g;
            clamp = module.b;
            Mat4 = module.M;
            approx = module.a7;
            EPSILON = module.N;
            ccclass = module.c;
            type = module.t;
            disallowMultiple = module.d;
            applyDecoratedInitializer = module.a;
            requireComponent = module.K;
            serializable = module.s;
        }, null, function (module) {
            cclegacy = module.c;
        }, function (module) {
            Component = module.C;
        }, function (module) {
            StencilManager = module.n;
            vfmtPosUvColor = module.d;
            getAttributeStride = module.a;
            StaticVBAccessor = module.j;
            Stage = module.S;
            RenderEntityFillColorType = module.e;
            vfmt = module.p;
            UIRenderer = module.U;
        }, function (module) {
            Pass = module.h;
            builtinResMgr = module.d;
            Material = module.b;
        }, function (module) {
            deviceManager = module.d;
        }, function (module) {
            FormatInfos = module.c;
            BufferInfo = module.B;
            BufferUsageBit = module.b;
            MemoryUsageBit = module.M;
            PrimitiveMode = module.P;
            DescriptorSetInfo = module.ax;
        }, function (module) {
            Layers = module.L;
            ModelLocalBindings = module.M;
            UBOLocalEnum = module.c;
        }, function (module) {
            RenderingSubMesh = module.g;
        }, function (module) {
            Model = module.M;
        }, null],
        execute: (function () {

            exports("f", fillMeshVertices3D);

            var _col = new Vec4();
            function fillMeshVertices3D(node, renderer, renderData, color) {
              if (!renderData) return;
              var chunk = renderData.chunk;
              var dataList = renderData.data;
              var vData = chunk.vb;
              var vertexCount = renderData.vertexCount;
              var m = node.worldMatrix;
              var m00 = m.m00;
              var m01 = m.m01;
              var m02 = m.m02;
              var m03 = m.m03;
              var m04 = m.m04;
              var m05 = m.m05;
              var m06 = m.m06;
              var m07 = m.m07;
              var m12 = m.m12;
              var m13 = m.m13;
              var m14 = m.m14;
              var m15 = m.m15;
              _col.set(color.r / 255, color.g / 255, color.b / 255, color.a / 255);
              var vertexOffset = 0;
              for (var i = 0; i < vertexCount; ++i) {
                var vert = dataList[i];
                var x = vert.x;
                var y = vert.y;
                var rhw = m03 * x + m07 * y + m15;
                rhw = rhw ? 1 / rhw : 1;
                vData[vertexOffset + 0] = (m00 * x + m04 * y + m12) * rhw;
                vData[vertexOffset + 1] = (m01 * x + m05 * y + m13) * rhw;
                vData[vertexOffset + 2] = (m02 * x + m06 * y + m14) * rhw;
                Vec4.toArray(vData, _col, vertexOffset + 5);
                vertexOffset += renderData.floatStride;
              }
              chunk.bufferId;
              var vid = chunk.vertexOffset;
              var meshBuffer = chunk.meshBuffer;
              var ib = chunk.meshBuffer.iData;
              var indexOffset = meshBuffer.indexOffset;
              for (var _i2 = 0, count = vertexCount / 4; _i2 < count; _i2++) {
                var start = vid + _i2 * 4;
                ib[indexOffset++] = start;
                ib[indexOffset++] = start + 1;
                ib[indexOffset++] = start + 2;
                ib[indexOffset++] = start + 1;
                ib[indexOffset++] = start + 3;
                ib[indexOffset++] = start + 2;
              }
              meshBuffer.indexOffset += renderData.indexCount;
              meshBuffer.setDirty();
            }
            function updateOpacity(renderData, opacity) {
              if (!renderData.chunk) {
                return;
              }
              var vfmt = renderData.vertexFormat;
              var vb = renderData.chunk.vb;
              var vbUint32View;
              var attr;
              var format;
              var stride;
              var offset = 0;
              for (var i = 0; i < vfmt.length; ++i) {
                attr = vfmt[i];
                format = FormatInfos[attr.format];
                if (format.hasAlpha) {
                  stride = renderData.floatStride;
                  if (format.size / format.count === 1) {
                    if (!vbUint32View) {
                      vbUint32View = new Uint32Array(vb.buffer, vb.byteOffset, vb.length);
                    }
                    var alpha = ~~clamp(Math.round(opacity * 255), 0, 255);
                    for (var color = offset; color < vbUint32View.length; color += stride) {
                      vbUint32View[color] = (vbUint32View[color] & 0x00ffffff | alpha << 24) >>> 0;
                    }
                  } else if (format.size / format.count === 4) {
                    for (var _alpha2 = offset + 3; _alpha2 < vb.length; _alpha2 += stride) {
                      vb[_alpha2] = opacity;
                    }
                  }
                }
                offset += format.size >> 2;
              }
            }

            var UI_VIS_FLAG = Layers.Enum.NONE | Layers.Enum.UI_3D;
            var DrawBatch2D = exports("D", function () {
              function DrawBatch2D() {
                this.model = null;
                this.texture = null;
                this.sampler = null;
                this.useLocalData = null;
                this.isStatic = false;
                this.textureHash = 0;
                this.samplerHash = 0;
                this._passes = [];
                this._shaders = [];
                this.visFlags = UI_VIS_FLAG;
                this.inputAssembler = null;
                this.descriptorSet = null;
              }
              var _proto = DrawBatch2D.prototype;
              _proto.destroy =
              function destroy(ui) {
                this._passes = [];
              };
              _proto.clear = function clear() {
                this.inputAssembler = null;
                this.descriptorSet = null;
                this.texture = null;
                this.sampler = null;
                this.textureHash = 0;
                this.samplerHash = 0;
                this.model = null;
                this.isStatic = false;
                this.useLocalData = null;
                this.visFlags = UI_VIS_FLAG;
              }
              ;
              _proto.fillPasses =
              function fillPasses(mat, dss, dssHash, patches) {
                if (mat) {
                  var passes = mat.passes;
                  if (!passes) {
                    return;
                  }
                  this._shaders.length = passes.length;
                  for (var i = 0; i < passes.length; i++) {
                    if (!this._passes[i]) {
                      this._passes[i] = new Pass(cclegacy.director.root);
                    }
                    var mtlPass = passes[i];
                    var passInUse = this._passes[i];
                    mtlPass.update();
                    if (!dss) {
                      dss = mtlPass.depthStencilState;
                      dssHash = 0;
                    }
                    passInUse._initPassFromTarget(mtlPass, dss, dssHash);
                    this._shaders[i] = passInUse.getShaderVariant(patches);
                  }
                }
              };
              _createClass(DrawBatch2D, [{
                key: "passes",
                get: function get() {
                  return this._passes;
                }
              }, {
                key: "shaders",
                get: function get() {
                  return this._shaders;
                }
              }]);
              return DrawBatch2D;
            }());

            var sorting2DCount$1 = 0;
            function _setSorting2DCount(v) {
              sorting2DCount$1 = v;
            }
            var _dsInfo = new DescriptorSetInfo(null);
            var m4_1 = new Mat4();
            var recordedRendererInfoPool = new RecyclePool(function () {
              return {
                uiRenderer: null,
                finalOpacity: 0,
                opacityDirty: false
              };
            }, 128);
            var Batcher2D = exports("B", function () {
              function Batcher2D(_root) {
                var _this = this;
                this._screens = [];
                this._staticVBBuffer = null;
                this._bufferAccessors = new Map();
                this._currBID = -1;
                this._indexStart = 0;
                this._emptyMaterial = new Material();
                this._currRenderData = null;
                this._currMaterial = this._emptyMaterial;
                this._currTexture = null;
                this._currSampler = null;
                this._currStaticRoot = null;
                this._currComponent = null;
                this._currTransform = null;
                this._currTextureHash = 0;
                this._currSamplerHash = 0;
                this._currLayer = 0;
                this._currDepthStencilStateStage = null;
                this._currHash = 0;
                this._currIsMiddleware = false;
                this._middlewareEnableBatch = false;
                this._middlewareBuffer = null;
                this._middlewareIndexStart = 0;
                this._middlewareIndexCount = 0;
                this._pOpacity = 1;
                this._opacityDirty = 0;
                this._descriptorSetCache = new DescriptorSetCache();
                this._meshDataArray = [];
                this._maskClearModel = null;
                this._maskClearMtl = null;
                this._maskModelMesh = null;
                this._recordedRendererInfoQueue = [];
                this._root = _root;
                this.device = _root.device;
                this._batches = new CachedArray(64);
                this._drawBatchPool = new Pool(function () {
                  return new DrawBatch2D();
                }, 128, function (obj) {
                  return obj.destroy(_this);
                });
              }
              var _proto = Batcher2D.prototype;
              _proto.getRecordedRendererInfoQueue = function getRecordedRendererInfoQueue() {
                return this._recordedRendererInfoQueue;
              };
              _proto.initialize = function initialize() {
                return true;
              };
              _proto.destroy = function destroy() {
                this._recordedRendererInfoQueue.length = 0;
                for (var i = 0; i < this._batches.length; i++) {
                  if (this._batches.array[i]) {
                    this._batches.array[i].destroy(this);
                  }
                }
                this._batches.destroy();
                for (var _iterator = _createForOfIteratorHelperLoose(this._bufferAccessors.values()), _step; !(_step = _iterator()).done;) {
                  var accessor = _step.value;
                  accessor.destroy();
                }
                this._bufferAccessors.clear();
                if (this._drawBatchPool) {
                  this._drawBatchPool.destroy();
                }
                this._descriptorSetCache.destroy();
                StencilManager.sharedManager.destroy();
                if (this._maskClearModel && this._maskModelMesh) {
                  cclegacy.director.root.destroyModel(this._maskClearModel);
                  this._maskModelMesh.destroy();
                }
                if (this._maskClearMtl) {
                  this._maskClearMtl.destroy();
                }
              };
              _proto.syncRootNodesToNative = function syncRootNodesToNative() {
              }
              ;
              _proto.addScreen =
              function addScreen(comp) {
                this._screens.push(comp);
                this._screens.sort(this._screenSort);
              }
              ;
              _proto.removeScreen =
              function removeScreen(comp) {
                var idx = this._screens.indexOf(comp);
                if (idx === -1) {
                  return;
                }
                this._screens.splice(idx, 1);
              };
              _proto.sortScreens = function sortScreens() {
                this._screens.sort(this._screenSort);
              };
              _proto.getFirstRenderCamera = function getFirstRenderCamera(node) {
                if (node.scene && node.scene.renderScene) {
                  var cameras = node.scene.renderScene.cameras;
                  for (var i = 0; i < cameras.length; i++) {
                    var camera = cameras[i];
                    if (camera.visibility & node.layer) {
                      return camera;
                    }
                  }
                }
                return null;
              };
              _proto.update = function update() {
                var screens = this._screens;
                var offset = 0;
                for (var i = 0; i < screens.length; ++i) {
                  var screen = screens[i];
                  var _scene = screen._getRenderScene();
                  if (!screen.enabledInHierarchy || !_scene) {
                    continue;
                  }
                  this._opacityDirty = 0;
                  this._pOpacity = 1;
                  this.walk(screen.node);
                  if (sorting2DCount$1 > 0) {
                    this._flushRecordedUIRenderers();
                  }
                  this.autoMergeBatches(this._currComponent);
                  this.resetRenderStates();
                  var batchPriority = 0;
                  if (this._batches.length > offset) {
                    for (; offset < this._batches.length; ++offset) {
                      var batch = this._batches.array[offset];
                      if (batch.model) {
                        var subModels = batch.model.subModels;
                        for (var j = 0; j < subModels.length; j++) {
                          subModels[j].priority = batchPriority++;
                        }
                      } else {
                        batch.descriptorSet = this._descriptorSetCache.getDescriptorSet(batch);
                      }
                      _scene.addBatch(batch);
                    }
                  }
                }
                if (sorting2DCount$1 > 0) {
                  recordedRendererInfoPool.reset();
                }
              };
              _proto.uploadBuffers = function uploadBuffers() {
                if (this._batches.length > 0) {
                  var length = this._meshDataArray.length;
                  for (var i = 0; i < length; i++) {
                    this._meshDataArray[i].uploadBuffers();
                  }
                  for (var _iterator3 = _createForOfIteratorHelperLoose(this._bufferAccessors.values()), _step3; !(_step3 = _iterator3()).done;) {
                    var accessor = _step3.value;
                    accessor.uploadBuffers();
                    accessor.reset();
                  }
                  this._descriptorSetCache.update();
                }
              };
              _proto.reset = function reset() {
                {
                  for (var i = 0; i < this._batches.length; ++i) {
                    var batch = this._batches.array[i];
                    if (batch.isStatic) {
                      continue;
                    }
                    batch.clear();
                    this._drawBatchPool.free(batch);
                  }
                  for (var _iterator4 = _createForOfIteratorHelperLoose(this._bufferAccessors.values()), _step4; !(_step4 = _iterator4()).done;) {
                    var accessor = _step4.value;
                    accessor.reset();
                  }
                  var length = this._meshDataArray.length;
                  for (var _i2 = 0; _i2 < length; _i2++) {
                    this._meshDataArray[_i2].freeIAPool();
                  }
                  this._meshDataArray.length = 0;
                  this._staticVBBuffer = null;
                  this._currBID = -1;
                  this._indexStart = 0;
                  this._currHash = 0;
                  this._currLayer = 0;
                  this._currRenderData = null;
                  this._currMaterial = this._emptyMaterial;
                  this._currTexture = null;
                  this._currSampler = null;
                  this._currComponent = null;
                  this._currTransform = null;
                  this._batches.clear();
                  StencilManager.sharedManager.reset();
                }
              }
              ;
              _proto.switchBufferAccessor =
              function switchBufferAccessor(attributes) {
                if (attributes === void 0) {
                  attributes = vfmtPosUvColor;
                }
                var strideBytes = attributes === vfmtPosUvColor ? 36 : getAttributeStride(attributes);
                if (!this._staticVBBuffer || this._staticVBBuffer.vertexFormatBytes !== strideBytes) {
                  var accessor = this._bufferAccessors.get(strideBytes);
                  if (!accessor) {
                    accessor = new StaticVBAccessor(this.device, attributes);
                    this._bufferAccessors.set(strideBytes, accessor);
                  }
                  this._staticVBBuffer = accessor;
                  this._currBID = -1;
                }
                return this._staticVBBuffer;
              };
              _proto.registerBufferAccessor = function registerBufferAccessor(key, accessor) {
                this._bufferAccessors.set(key, accessor);
              };
              _proto.updateBuffer = function updateBuffer(attributes, bid) {
                var accessor = this.switchBufferAccessor(attributes);
                if (this._currBID !== bid) {
                  this._currBID = bid;
                  this._indexStart = accessor.getMeshBuffer(bid).indexOffset;
                }
              }
              ;
              _proto.commitComp =
              function commitComp(comp, renderData, frame, assembler, transform) {
                var dataHash = 0;
                var mat;
                var bufferID = -1;
                if (renderData && renderData.chunk) {
                  if (!renderData.isValid()) return;
                  dataHash = renderData.dataHash;
                  mat = renderData.material;
                  bufferID = renderData.chunk.bufferId;
                }
                if (comp.stencilStage === Stage.ENTER_LEVEL || comp.stencilStage === Stage.ENTER_LEVEL_INVERTED) {
                  this._insertMaskBatch(comp);
                } else {
                  comp.stencilStage = StencilManager.sharedManager.stage;
                }
                var depthStencilStateStage = comp.stencilStage;
                if (this._currHash !== dataHash || dataHash === 0 || this._currMaterial !== mat || this._currDepthStencilStateStage !== depthStencilStateStage) {
                  this.autoMergeBatches(this._currComponent);
                  if (renderData && !renderData._isMeshBuffer) {
                    this.updateBuffer(renderData.vertexFormat, bufferID);
                  }
                  this._currRenderData = renderData;
                  this._currHash = renderData ? renderData.dataHash : 0;
                  this._currComponent = comp;
                  this._currTransform = transform;
                  this._currMaterial = comp.getRenderMaterial(0);
                  this._currDepthStencilStateStage = depthStencilStateStage;
                  this._currLayer = comp.node.layer;
                  if (frame) {
                    {
                      assert(frame.isValid, 'frame should not be invalid, it may have been released');
                    }
                    this._currTexture = frame.getGFXTexture();
                    this._currSampler = frame.getGFXSampler();
                    this._currTextureHash = frame.getHash();
                    this._currSamplerHash = this._currSampler.hash;
                  } else {
                    this._currTexture = null;
                    this._currSampler = null;
                    this._currTextureHash = 0;
                    this._currSamplerHash = 0;
                  }
                }
                if (assembler.fillBuffers) assembler.fillBuffers(comp, this);
              }
              ;
              _proto.commitIA =
              function commitIA(renderComp, ia, tex, mat, transform) {
                if (this._currMaterial !== this._emptyMaterial) {
                  this.autoMergeBatches(this._currComponent);
                  this.resetRenderStates();
                }
                var depthStencil = null;
                var dssHash = 0;
                if (renderComp) {
                  renderComp.stencilStage = StencilManager.sharedManager.stage;
                  if (renderComp.customMaterial !== null) {
                    depthStencil = StencilManager.sharedManager.getStencilStage(renderComp.stencilStage, mat);
                  } else {
                    depthStencil = StencilManager.sharedManager.getStencilStage(renderComp.stencilStage);
                  }
                  dssHash = StencilManager.sharedManager.getStencilHash(renderComp.stencilStage);
                }
                var curDrawBatch = this._currStaticRoot ? this._currStaticRoot._requireDrawBatch() : this._drawBatchPool.alloc();
                curDrawBatch.visFlags = renderComp.node.layer;
                curDrawBatch.inputAssembler = ia;
                curDrawBatch.useLocalData = transform || null;
                if (tex) {
                  curDrawBatch.texture = tex.getGFXTexture();
                  curDrawBatch.sampler = tex.getGFXSampler();
                  curDrawBatch.textureHash = tex.getHash();
                  curDrawBatch.samplerHash = curDrawBatch.sampler.hash;
                }
                curDrawBatch.fillPasses(mat || null, depthStencil, dssHash, null);
                this._batches.push(curDrawBatch);
              }
              ;
              _proto.commitMiddleware =
              function commitMiddleware(comp, meshBuffer, indexOffset, indexCount, tex, mat, enableBatch) {
                var texture = tex.getGFXTexture();
                if (enableBatch && this._middlewareEnableBatch && this._middlewareBuffer === meshBuffer && this._currTexture === texture && this._currMaterial.hash === mat.hash && this._middlewareIndexStart + this._middlewareIndexCount === indexOffset && this._currLayer === comp.node.layer) {
                  this._middlewareIndexCount += indexCount;
                } else {
                  this.autoMergeBatches(this._currComponent);
                  this.resetRenderStates();
                  this._currComponent = comp;
                  this._currTexture = texture;
                  this._currSampler = tex.getGFXSampler();
                  this._currTextureHash = tex.getHash();
                  this._currLayer = comp.node.layer;
                  this._currSamplerHash = this._currSampler.hash;
                  this._currHash = 0;
                  this._currTransform = enableBatch ? null : comp.node;
                  this._middlewareEnableBatch = enableBatch;
                  this._middlewareBuffer = meshBuffer;
                  this._currMaterial = mat;
                  this._middlewareIndexStart = indexOffset;
                  this._middlewareIndexCount = indexCount;
                }
                this._currIsMiddleware = true;
              }
              ;
              _proto.commitModel =
              function commitModel(comp, model, mat) {
                if (this._currMaterial !== this._emptyMaterial) {
                  this.autoMergeBatches(this._currComponent);
                  this.resetRenderStates();
                }
                var depthStencil = null;
                var dssHash = 0;
                if (mat) {
                  if (comp.stencilStage === Stage.ENTER_LEVEL || comp.stencilStage === Stage.ENTER_LEVEL_INVERTED) {
                    this._insertMaskBatch(comp);
                  } else {
                    comp.stencilStage = StencilManager.sharedManager.stage;
                  }
                  depthStencil = StencilManager.sharedManager.getStencilStage(comp.stencilStage, mat);
                  dssHash = StencilManager.sharedManager.getStencilHash(comp.stencilStage);
                }
                var stamp = cclegacy.director.getTotalFrames();
                if (model) {
                  model.updateTransform(stamp);
                  model.updateUBOs(stamp);
                }
                for (var i = 0; i < model.subModels.length; i++) {
                  var curDrawBatch = this._drawBatchPool.alloc();
                  var subModel = model.subModels[i];
                  curDrawBatch.visFlags = comp.node.layer;
                  curDrawBatch.model = model;
                  curDrawBatch.texture = null;
                  curDrawBatch.sampler = null;
                  curDrawBatch.useLocalData = null;
                  if (!depthStencil) {
                    depthStencil = null;
                  }
                  curDrawBatch.fillPasses(mat, depthStencil, dssHash, subModel.patches);
                  curDrawBatch.inputAssembler = subModel.inputAssembler;
                  curDrawBatch.model.visFlags = curDrawBatch.visFlags;
                  curDrawBatch.descriptorSet = subModel.descriptorSet;
                  this._batches.push(curDrawBatch);
                }
              };
              _proto.setupStaticBatch = function setupStaticBatch(staticComp, bufferAccessor) {
                this.finishMergeBatches();
                this._staticVBBuffer = bufferAccessor;
                this.currStaticRoot = staticComp;
              };
              _proto.endStaticBatch = function endStaticBatch() {
                this.finishMergeBatches();
                this.currStaticRoot = null;
                this._staticVBBuffer = null;
                this.switchBufferAccessor();
              }
              ;
              _proto.commitStaticBatch =
              function commitStaticBatch(comp) {
                this._batches.concat(comp.drawBatchList);
                this.finishMergeBatches();
              }
              ;
              _proto.autoMergeBatches =
              function autoMergeBatches(renderComp) {
                if (this._currIsMiddleware) {
                  this.mergeBatchesForMiddleware(renderComp);
                  return;
                }
                var mat = this._currMaterial;
                if (!mat) {
                  return;
                }
                var ia;
                var rd = this._currRenderData;
                var accessor = this._staticVBBuffer;
                if (rd && rd._isMeshBuffer) {
                  ia = rd.requestIA(this.device);
                  if (this._meshDataArray.indexOf(rd) === -1) {
                    this._meshDataArray.push(rd);
                  }
                } else if (accessor) {
                  var bid = this._currBID;
                  var buf = accessor.getMeshBuffer(bid);
                  if (!buf) {
                    return;
                  }
                  var indexCount = buf.indexOffset - this._indexStart;
                  if (indexCount <= 0) return;
                  assertIsTrue(this._indexStart < buf.indexOffset);
                  buf.setDirty();
                  ia = buf.requireFreeIA(this.device);
                  ia.firstIndex = this._indexStart;
                  ia.indexCount = indexCount;
                  this._indexStart = buf.indexOffset;
                }
                this._currBID = -1;
                if (!ia || !this._currTexture) {
                  return;
                }
                var depthStencil = null;
                var dssHash = 0;
                if (renderComp) {
                  if (renderComp.customMaterial !== null) {
                    depthStencil = StencilManager.sharedManager.getStencilStage(renderComp.stencilStage, mat);
                  } else {
                    depthStencil = StencilManager.sharedManager.getStencilStage(renderComp.stencilStage);
                  }
                  dssHash = StencilManager.sharedManager.getStencilHash(renderComp.stencilStage);
                }
                var curDrawBatch = this._currStaticRoot ? this._currStaticRoot._requireDrawBatch() : this._drawBatchPool.alloc();
                curDrawBatch.visFlags = this._currLayer;
                curDrawBatch.texture = this._currTexture;
                curDrawBatch.sampler = this._currSampler;
                curDrawBatch.inputAssembler = ia;
                curDrawBatch.useLocalData = this._currTransform;
                curDrawBatch.textureHash = this._currTextureHash;
                curDrawBatch.samplerHash = this._currSamplerHash;
                curDrawBatch.fillPasses(mat, depthStencil, dssHash, null);
                this._batches.push(curDrawBatch);
              };
              _proto.mergeBatchesForMiddleware = function mergeBatchesForMiddleware(renderComp) {
                var depthStencil = null;
                var dssHash = 0;
                renderComp.stencilStage = StencilManager.sharedManager.stage;
                if (renderComp.customMaterial !== null) {
                  depthStencil = StencilManager.sharedManager.getStencilStage(renderComp.stencilStage, this._currMaterial);
                } else {
                  depthStencil = StencilManager.sharedManager.getStencilStage(renderComp.stencilStage);
                }
                dssHash = StencilManager.sharedManager.getStencilHash(renderComp.stencilStage);
                var curDrawBatch = this._currStaticRoot ? this._currStaticRoot._requireDrawBatch() : this._drawBatchPool.alloc();
                curDrawBatch.visFlags = renderComp.node.layer;
                var ia = this._middlewareBuffer.requireFreeIA(this.device);
                ia.firstIndex = this._middlewareIndexStart;
                ia.indexCount = this._middlewareIndexCount;
                curDrawBatch.inputAssembler = ia;
                curDrawBatch.useLocalData = this._currTransform;
                curDrawBatch.texture = this._currTexture;
                curDrawBatch.sampler = this._currSampler;
                curDrawBatch.textureHash = this._currTextureHash;
                curDrawBatch.samplerHash = this._currSamplerHash;
                curDrawBatch.fillPasses(this._currMaterial || null, depthStencil, dssHash, null);
                this._batches.push(curDrawBatch);
                this._currIsMiddleware = false;
                this._middlewareBuffer = null;
              }
              ;
              _proto.forceMergeBatches =
              function forceMergeBatches(material, frame, renderComp) {
                this._currMaterial = material;
                if (frame) {
                  this._currTexture = frame.getGFXTexture();
                  this._currSampler = frame.getGFXSampler();
                  this._currTextureHash = frame.getHash();
                  this._currSamplerHash = this._currSampler.hash;
                } else {
                  this._currTexture = this._currSampler = null;
                  this._currTextureHash = this._currSamplerHash = 0;
                }
                this._currLayer = renderComp.node.layer;
                this.autoMergeBatches(renderComp);
              };
              _proto.resetRenderStates = function resetRenderStates() {
                this._currMaterial = this._emptyMaterial;
                this._currRenderData = null;
                this._currTexture = null;
                this._currComponent = null;
                this._currTransform = null;
                this._currTextureHash = 0;
                this._currSamplerHash = 0;
                this._currLayer = 0;
              }
              ;
              _proto.finishMergeBatches =
              function finishMergeBatches() {
                this.autoMergeBatches();
                this.resetRenderStates();
              }
              ;
              _proto.flushMaterial =
              function flushMaterial(mat) {
                this._currMaterial = mat;
              };
              _proto._handleUIRenderer = function _handleUIRenderer(render, finalOpacity, opacityDirty) {
                var renderData = render ? render.renderData : null;
                var vertexCount = renderData ? renderData.vertexCount : 0;
                if (render && render.enabledInHierarchy) {
                  render.fillBuffers(this);
                }
                if (opacityDirty && vertexCount > 0) {
                  switch (render.getFillColorType()) {
                    case RenderEntityFillColorType.COLOR:
                      {
                        updateOpacity(renderData, finalOpacity);
                        break;
                      }
                    case RenderEntityFillColorType.VERTEX:
                      {
                        break;
                      }
                  }
                  var buffer = renderData.getMeshBuffer();
                  if (buffer) {
                    buffer.setDirty();
                  }
                }
              };
              _proto._recordUIRenderer = function _recordUIRenderer(render, finalOpacity, opacityDirty) {
                var queue = this.getRecordedRendererInfoQueue();
                var info = recordedRendererInfoPool.add();
                info.uiRenderer = render;
                info.finalOpacity = finalOpacity;
                info.opacityDirty = opacityDirty;
                queue.push(info);
                return info;
              };
              _proto._flushRecordedUIRenderers = function _flushRecordedUIRenderers() {
                var queue = this.getRecordedRendererInfoQueue();
                var length = queue.length;
                if (length === 0) return;
                queue.sort(function (a, b) {
                  return a.uiRenderer.priority - b.uiRenderer.priority;
                });
                for (var i = 0; i < length; i++) {
                  var info = queue[i];
                  var render = info.uiRenderer;
                  if (render) {
                    this._handleUIRenderer(render, info.finalOpacity, info.opacityDirty);
                    if (render.enabledInHierarchy) {
                      render.postUpdateAssembler(this);
                    }
                  }
                  info.finalOpacity = 1;
                  info.opacityDirty = false;
                  info.uiRenderer = null;
                }
                queue.length = 0;
              };
              _proto.walk = function walk(node, level) {
                if (level === void 0) {
                  level = 0;
                }
                if (!node.activeInHierarchy) {
                  return;
                }
                var children = node.children;
                var uiProps = node._uiProps;
                var render = uiProps.uiComp;
                var parentOpacity = this._pOpacity;
                var opacity = parentOpacity;
                var selfOpacity = render && render.color ? render.color.a / 255 : 1;
                this._pOpacity = opacity *= selfOpacity * uiProps.localOpacity;
                uiProps.setOpacity(opacity);
                var visable = !approx(opacity, 0, EPSILON);
                if (visable) {
                  if (uiProps.colorDirty) {
                    this._opacityDirty++;
                  }
                  if (render) {
                    if (sorting2DCount$1 > 0) {
                      if (render.stencilStage === Stage.ENTER_LEVEL || render.stencilStage === Stage.ENTER_LEVEL_INVERTED) {
                        this._flushRecordedUIRenderers();
                        this.autoMergeBatches(this._currComponent);
                        this.resetRenderStates();
                      }
                      this._recordUIRenderer(render, opacity, !!this._opacityDirty);
                    } else {
                      this._handleUIRenderer(render, opacity, !!this._opacityDirty);
                    }
                  }
                  if (children.length > 0 && !node._static) {
                    for (var i = 0; i < children.length; ++i) {
                      var child = children[i];
                      this.walk(child, level);
                    }
                  }
                  if (uiProps.colorDirty) {
                    this._opacityDirty--;
                    uiProps.colorDirty = false;
                  }
                }
                this._pOpacity = parentOpacity;
                if (render && render.enabledInHierarchy) {
                  if (visable && (render.stencilStage === Stage.ENTER_LEVEL || render.stencilStage === Stage.ENTER_LEVEL_INVERTED)) {
                    if (sorting2DCount$1 > 0) {
                      this._flushRecordedUIRenderers();
                    }
                    if (StencilManager.sharedManager.getMaskStackSize() > 0) {
                      this.autoMergeBatches(this._currComponent);
                      this.resetRenderStates();
                      StencilManager.sharedManager.exitMask();
                    }
                  }
                }
                level += 1;
              };
              _proto._screenSort = function _screenSort(a, b) {
                return a.node.siblingIndex - b.node.siblingIndex;
              }
              ;
              _proto._releaseDescriptorSetCache =
              function _releaseDescriptorSetCache(textureHash, sampler) {
                {
                  this._descriptorSetCache.releaseDescriptorSetCache(textureHash);
                }
              }
              ;
              _proto._createClearModel =
              function _createClearModel() {
                if (!this._maskClearModel) {
                  this._maskClearMtl = builtinResMgr.get('default-clear-stencil');
                  this._maskClearModel = cclegacy.director.root.createModel(Model);
                  var stride = getAttributeStride(vfmt);
                  var gfxDevice = deviceManager.gfxDevice;
                  var vertexBuffer = gfxDevice.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, 4 * stride, stride));
                  var vb = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]);
                  vertexBuffer.update(vb);
                  var indexBuffer = gfxDevice.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, 6 * Uint16Array.BYTES_PER_ELEMENT, Uint16Array.BYTES_PER_ELEMENT));
                  var ib = new Uint16Array([0, 1, 2, 2, 1, 3]);
                  indexBuffer.update(ib);
                  this._maskModelMesh = new RenderingSubMesh([vertexBuffer], vfmt, PrimitiveMode.TRIANGLE_LIST, indexBuffer);
                  this._maskModelMesh.subMeshIdx = 0;
                  this._maskClearModel.initSubModel(0, this._maskModelMesh, this._maskClearMtl);
                }
              };
              _proto._insertMaskBatch = function _insertMaskBatch(comp) {
                this.autoMergeBatches(this._currComponent);
                this.resetRenderStates();
                this._createClearModel();
                this._maskClearModel.node = this._maskClearModel.transform = comp.node;
                var stencilManager = StencilManager.sharedManager;
                stencilManager.pushMask(1);
                var stage = stencilManager.clear(comp);
                var depthStencil = null;
                var dssHash = 0;
                var mat = this._maskClearMtl;
                if (mat) {
                  depthStencil = stencilManager.getStencilStage(stage, mat);
                  dssHash = stencilManager.getStencilHash(stage);
                }
                var model = this._maskClearModel;
                var stamp = cclegacy.director.getTotalFrames();
                if (model) {
                  model.updateTransform(stamp);
                  model.updateUBOs(stamp);
                }
                for (var i = 0; i < model.subModels.length; i++) {
                  var curDrawBatch = this._drawBatchPool.alloc();
                  var subModel = model.subModels[i];
                  curDrawBatch.visFlags = comp.node.layer;
                  curDrawBatch.model = model;
                  curDrawBatch.texture = null;
                  curDrawBatch.sampler = null;
                  curDrawBatch.useLocalData = null;
                  if (!depthStencil) {
                    depthStencil = null;
                  }
                  curDrawBatch.fillPasses(mat, depthStencil, dssHash, subModel.patches);
                  curDrawBatch.inputAssembler = subModel.inputAssembler;
                  curDrawBatch.model.visFlags = curDrawBatch.visFlags;
                  curDrawBatch.descriptorSet = subModel.descriptorSet;
                  this._batches.push(curDrawBatch);
                }
                stencilManager.enableMask();
              }
              ;
              _proto.syncMeshBuffersToNative =
              function syncMeshBuffersToNative(accId, buffers) {
              };
              _createClass(Batcher2D, [{
                key: "nativeObj",
                get: function get() {
                  return this._nativeObj;
                }
              }, {
                key: "currBufferAccessor",
                get: function get() {
                  if (this._staticVBBuffer) return this._staticVBBuffer;
                  this._staticVBBuffer = this.switchBufferAccessor();
                  return this._staticVBBuffer;
                }
              }, {
                key: "batches",
                get: function get() {
                  return this._batches;
                }
              }, {
                key: "currStaticRoot",
                set: function set(value) {
                  this._currStaticRoot = value;
                }
              }, {
                key: "currIsStatic",
                set:
                function set(value) {}
              }]);
              return Batcher2D;
            }());
            var LocalDescriptorSet = function () {
              var _proto2 = LocalDescriptorSet.prototype;
              _proto2.getDescriptorSet =
              function getDescriptorSet() {
                return this._descriptorSet;
              };
              function LocalDescriptorSet() {
                this._descriptorSet = null;
                this._transform = null;
                this._textureHash = 0;
                this._samplerHash = 0;
                this._localBuffer = null;
                this._transformUpdate = true;
                var device = deviceManager.gfxDevice;
                this._localData = new Float32Array(UBOLocalEnum.COUNT);
                this._localBuffer = device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOLocalEnum.SIZE, UBOLocalEnum.SIZE));
              }
              _proto2.initialize = function initialize(batch) {
                var device = deviceManager.gfxDevice;
                this._transform = batch.useLocalData;
                this._textureHash = batch.textureHash;
                this._samplerHash = batch.samplerHash;
                _dsInfo.layout = batch.passes[0].localSetLayout;
                this._descriptorSet = device.createDescriptorSet(_dsInfo);
                this._descriptorSet.bindBuffer(UBOLocalEnum.BINDING, this._localBuffer);
                var binding = ModelLocalBindings.SAMPLER_SPRITE;
                this._descriptorSet.bindTexture(binding, batch.texture);
                this._descriptorSet.bindSampler(binding, batch.sampler);
                this._descriptorSet.update();
                this._transformUpdate = true;
              };
              _proto2.updateTransform = function updateTransform(transform) {
                if (transform === this._transform) return;
                this._transform = transform;
                this._transformUpdate = true;
                this.uploadLocalData();
              };
              _proto2.equals = function equals(transform, textureHash, samplerHash) {
                return this._transform === transform && this._textureHash === textureHash && this._samplerHash === samplerHash;
              };
              _proto2.reset = function reset() {
                this._transform = null;
                this._textureHash = 0;
                this._samplerHash = 0;
              };
              _proto2.destroy = function destroy() {
                if (this._localBuffer) {
                  this._localBuffer.destroy();
                  this._localBuffer = null;
                }
                if (this._descriptorSet) {
                  this._descriptorSet.destroy();
                  this._descriptorSet = null;
                }
                this._localData = null;
              };
              _proto2.isValid = function isValid() {
                return this._transform && this._transform.isValid;
              };
              _proto2.uploadLocalData = function uploadLocalData() {
                var node = this._transform;
                if (node.hasChangedFlags || node.isTransformDirty()) {
                  node.updateWorldTransform();
                  this._transformUpdate = true;
                }
                if (this._transformUpdate) {
                  var worldMatrix = node.worldMatrix;
                  Mat4.toArray(this._localData, worldMatrix, UBOLocalEnum.MAT_WORLD_OFFSET);
                  Mat4.invert(m4_1, worldMatrix);
                  Mat4.transpose(m4_1, m4_1);
                  {
                    var det = Mat4.determinant(m4_1);
                    var factor = 1.0 / Math.sqrt(det);
                    Mat4.multiplyScalar(m4_1, m4_1, factor);
                  }
                  Mat4.toArray(this._localData, m4_1, UBOLocalEnum.MAT_WORLD_IT_OFFSET);
                  this._localBuffer.update(this._localData);
                  this._transformUpdate = false;
                }
              };
              return LocalDescriptorSet;
            }();
            var DescriptorSetCache = function () {
              function DescriptorSetCache() {
                this._descriptorSetCache = new Map();
                this._dsCacheHashByTexture = new Map();
                this._localDescriptorSetCache = [];
                this._localCachePool = new Pool(function () {
                  return new LocalDescriptorSet();
                }, 16, function (obj) {
                  return obj.destroy();
                });
              }
              var _proto3 = DescriptorSetCache.prototype;
              _proto3.getDescriptorSet = function getDescriptorSet(batch) {
                if (batch.useLocalData) {
                  var caches = this._localDescriptorSetCache;
                  for (var i = 0, len = caches.length; i < len; i++) {
                    var cache = caches[i];
                    if (cache.equals(batch.useLocalData, batch.textureHash, batch.samplerHash)) {
                      return cache.getDescriptorSet();
                    }
                  }
                  var localDs = this._localCachePool.alloc();
                  localDs.initialize(batch);
                  this._localDescriptorSetCache.push(localDs);
                  return localDs.getDescriptorSet();
                } else {
                  var hash = batch.textureHash ^ batch.samplerHash;
                  if (this._descriptorSetCache.has(hash)) {
                    return this._descriptorSetCache.get(hash);
                  } else {
                    _dsInfo.layout = batch.passes[0].localSetLayout;
                    var descriptorSet = deviceManager.gfxDevice.createDescriptorSet(_dsInfo);
                    var binding = ModelLocalBindings.SAMPLER_SPRITE;
                    descriptorSet.bindTexture(binding, batch.texture);
                    descriptorSet.bindSampler(binding, batch.sampler);
                    descriptorSet.update();
                    this._descriptorSetCache.set(hash, descriptorSet);
                    this._dsCacheHashByTexture.set(batch.textureHash, hash);
                    return descriptorSet;
                  }
                }
              };
              _proto3.update = function update() {
                var caches = this._localDescriptorSetCache;
                var length = caches.length;
                if (length === 0) {
                  return;
                }
                var uselessArray = [];
                for (var i = 0; i < length; i++) {
                  var value = caches[i];
                  if (value.isValid()) {
                    value.uploadLocalData();
                  } else {
                    value.reset();
                    var pos = caches.indexOf(value);
                    uselessArray.push(pos);
                  }
                }
                for (var _i4 = uselessArray.length - 1; _i4 >= 0; _i4--) {
                  var index = uselessArray[_i4];
                  var localDs = caches[index];
                  caches.splice(index, 1);
                  this._localCachePool.free(localDs);
                }
              };
              _proto3.reset = function reset() {
                var caches = this._localDescriptorSetCache;
                var length = caches.length;
                for (var i = 0; i < length; i++) {
                  var value = caches[i];
                  this._localCachePool.free(value);
                }
                this._localDescriptorSetCache.length = 0;
              };
              _proto3.releaseDescriptorSetCache = function releaseDescriptorSetCache(textureHash) {
                var key = this._dsCacheHashByTexture.get(textureHash);
                if (key && this._descriptorSetCache.has(key)) {
                  this._descriptorSetCache.get(key).destroy();
                  this._descriptorSetCache["delete"](key);
                  this._dsCacheHashByTexture["delete"](textureHash);
                }
              };
              _proto3.destroy = function destroy() {
                for (var _iterator5 = _createForOfIteratorHelperLoose(this._descriptorSetCache.values()), _step5; !(_step5 = _iterator5()).done;) {
                  var value = _step5.value;
                  value.destroy();
                }
                this._descriptorSetCache.clear();
                this._dsCacheHashByTexture.clear();
                this._localDescriptorSetCache.length = 0;
                this._localCachePool.destroy();
              };
              return DescriptorSetCache;
            }();
            cclegacy.internal.Batcher2D = Batcher2D;

            var _dec, _dec2, _dec3, _class, _class2, _initializer, _initializer2;
            var MAX_INT16 = (1 << 15) - 1;
            var MIN_INT16 = -1 << 15;
            var sorting2DCount = 0;
            var Sorting2D = exports("S", (_dec = ccclass('cc.Sorting2D'), _dec2 = requireComponent(UIRenderer), _dec3 = type(SortingLayers.Enum), _dec(_class = disallowMultiple(_class = _dec2(_class = (_class2 = function (_Component) {
              _inheritsLoose(Sorting2D, _Component);
              function Sorting2D() {
                var _this;
                _this = _Component.call(this) || this;
                _this._isSorting2DEnabled = false;
                _this._sortingLayer = _initializer && _initializer();
                _this._sortingOrder = _initializer2 && _initializer2();
                _this._uiRenderer = null;
                return _this;
              }
              var _proto = Sorting2D.prototype;
              _proto.__preload = function __preload() {
                this._uiRenderer = this.getComponent(UIRenderer);
                if (!this._uiRenderer) {
                  warnID(16300, this.node.name);
                }
              };
              _proto.onEnable = function onEnable() {
                this._isSorting2DEnabled = true;
                this._updateSortingPriority();
                ++sorting2DCount;
                _setSorting2DCount(sorting2DCount);
              };
              _proto.onDisable = function onDisable() {
                this._isSorting2DEnabled = false;
                this._updateSortingPriority();
                --sorting2DCount;
                _setSorting2DCount(sorting2DCount);
              };
              _proto._updateSortingPriority = function _updateSortingPriority() {
                var uiRenderer = this._uiRenderer;
                if (uiRenderer && uiRenderer.isValid) {
                  if (this._isSorting2DEnabled) {
                    var sortingLayerValue = SortingLayers.getLayerIndex(this._sortingLayer);
                    var sortingPriority = SortingLayers.getSortingPriority(sortingLayerValue, this._sortingOrder);
                    uiRenderer.priority = sortingPriority;
                  } else {
                    uiRenderer.priority = SortingLayers.getDefaultPriority();
                  }
                }
              };
              _createClass(Sorting2D, [{
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
              return Sorting2D;
            }(Component), (_applyDecoratedDescriptor(_class2.prototype, "sortingLayer", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "sortingLayer"), _class2.prototype), _initializer = applyDecoratedInitializer(_class2.prototype, "_sortingLayer", [serializable], function () {
              return SortingLayers.Enum["default"];
            }), _initializer2 = applyDecoratedInitializer(_class2.prototype, "_sortingOrder", [serializable], function () {
              return 0;
            })), _class2)) || _class) || _class) || _class));

        })
    };
}));
