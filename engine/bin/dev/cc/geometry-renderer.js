System.register(['./index-oHSn7cpO.js', './pipeline-state-manager-C5ShdTPh.js', './device-manager-gD_whA7Q.js', './buffer-barrier-BmKiPanc.js', './global-exports-C7R_I6Kn.js', './gc-object-CbS29vYa.js', './_virtual_internal_constants-Cb-eEldT.js'], (function (exports) {
    'use strict';
    var Vec3, Color, Vec4, Mat4, toRadian, PipelineStateManager, SetIndex, Attribute, AttributeName, Format, DrawInfo, BufferInfo, BufferUsageBit, MemoryUsageBit, InputAssemblerInfo, cclegacy, warnID;
    return {
        setters: [function (module) {
            Vec3 = module.f;
            Color = module.C;
            Vec4 = module.g;
            Mat4 = module.M;
            toRadian = module.h;
        }, function (module) {
            PipelineStateManager = module.P;
            SetIndex = module.S;
        }, null, function (module) {
            Attribute = module.A;
            AttributeName = module.a;
            Format = module.F;
            DrawInfo = module.D;
            BufferInfo = module.B;
            BufferUsageBit = module.b;
            MemoryUsageBit = module.M;
            InputAssemblerInfo = module.I;
        }, function (module) {
            cclegacy = module.c;
        }, function (module) {
            warnID = module.w;
        }, null],
        execute: (function () {

            var _min = new Vec3();
            var _max = new Vec3();
            var _v0 = new Vec3();
            var _v1 = new Vec3();
            var _v2 = new Vec3();
            var _v3 = new Vec3();
            var _v4 = new Vec3();
            var _v5 = new Vec3();
            var _v6 = new Vec3();
            var _v7 = new Vec3();
            var GEOMETRY_DEPTH_TYPE_COUNT = 2;
            var GEOMETRY_NO_DEPTH_TEST_PASS_NUM = 1;
            var GEOMETRY_DEPTH_TEST_PASS_NUM = 2;
            var GEOMETRY_VERTICES_PER_LINE = 2;
            var GEOMETRY_VERTICES_PER_TRIANGLE = 3;
            var GEOMETRY_MAX_LINES = 30000;
            var GEOMETRY_MAX_DASHED_LINES = 10000;
            var GEOMETRY_MAX_TRIANGLES = 10000;
            var GeometryType;
            (function (GeometryType) {
              GeometryType[GeometryType["LINE"] = 0] = "LINE";
              GeometryType[GeometryType["DASHED_LINE"] = 1] = "DASHED_LINE";
              GeometryType[GeometryType["TRIANGLE"] = 2] = "TRIANGLE";
            })(GeometryType || (GeometryType = {}));
            var GeometryVertexBuffer = function () {
              function GeometryVertexBuffer() {
                this._maxVertices = 0;
                this._vertexCount = 0;
                this._stride = 0;
                this._vertices = void 0;
                this._buffer = void 0;
                this._inputAssembler = void 0;
              }
              var _proto = GeometryVertexBuffer.prototype;
              _proto.init = function init(device, maxVertices, stride, attributes) {
                this._maxVertices = maxVertices;
                this._vertexCount = 0;
                this._stride = stride;
                this._vertices = new Float32Array(maxVertices * stride / Float32Array.BYTES_PER_ELEMENT);
                this._buffer = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, maxVertices * stride, stride));
                this._inputAssembler = device.createInputAssembler(new InputAssemblerInfo(attributes, [this._buffer], null));
              };
              _proto.getCount = function getCount() {
                return Math.min(this._vertexCount, this._maxVertices);
              };
              _proto.empty = function empty() {
                return this._vertexCount === 0;
              };
              _proto.reset = function reset() {
                this._vertexCount = 0;
              };
              _proto.update = function update() {
                if (!this.empty()) {
                  var count = this.getCount();
                  var size = count * this._stride;
                  this._buffer.update(this._vertices, size);
                }
              };
              _proto.destroy = function destroy() {
                if (this._inputAssembler) {
                  this._inputAssembler.destroy();
                }
                if (this._buffer) {
                  this._buffer.destroy();
                }
              };
              return GeometryVertexBuffer;
            }();
            var GeometryVertexBuffers = function GeometryVertexBuffers() {
              this.lines = [];
              this.dashedLines = [];
              this.triangles = [];
              for (var i = 0; i < GEOMETRY_DEPTH_TYPE_COUNT; i++) {
                this.lines[i] = new GeometryVertexBuffer();
                this.dashedLines[i] = new GeometryVertexBuffer();
                this.triangles[i] = new GeometryVertexBuffer();
              }
            };
            var GeometryRenderer = exports("GeometryRenderer", function () {
              function GeometryRenderer() {
                this._device = null;
                this._buffers = void 0;
                this._buffers = new GeometryVertexBuffers();
              }
              var _proto2 = GeometryRenderer.prototype;
              _proto2.activate = function activate(device, info) {
                this._device = device;
                var posColorAttributes = [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), new Attribute(AttributeName.ATTR_COLOR, Format.RGBA32F)];
                var posNormColorAttributes = [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), new Attribute(AttributeName.ATTR_NORMAL, Format.RGBA32F), new Attribute(AttributeName.ATTR_COLOR, Format.RGBA32F)];
                var maxLines = info ? info.maxLines : GEOMETRY_MAX_LINES;
                var maxDashedLines = info ? info.maxDashedLines : GEOMETRY_MAX_DASHED_LINES;
                var maxTriangles = info ? info.maxTriangles : GEOMETRY_MAX_TRIANGLES;
                var lineStride = Float32Array.BYTES_PER_ELEMENT * (Vec3.length + Color.length);
                var triangleStride = Float32Array.BYTES_PER_ELEMENT * (Vec3.length + Vec4.length + Color.length);
                for (var i = 0; i < GEOMETRY_DEPTH_TYPE_COUNT; i++) {
                  this._buffers.lines[i].init(this._device, maxLines * GEOMETRY_VERTICES_PER_LINE, lineStride, posColorAttributes);
                  this._buffers.dashedLines[i].init(this._device, maxDashedLines * GEOMETRY_VERTICES_PER_LINE, lineStride, posColorAttributes);
                  this._buffers.triangles[i].init(this._device, maxTriangles * GEOMETRY_VERTICES_PER_TRIANGLE, triangleStride, posNormColorAttributes);
                }
              };
              _proto2.render = function render(renderPass, cmdBuff, sceneData) {
                var passes = sceneData.geometryRendererPasses;
                var shaders = sceneData.geometryRendererShaders;
                var offset = 0;
                var passCount = [GEOMETRY_NO_DEPTH_TEST_PASS_NUM, GEOMETRY_DEPTH_TEST_PASS_NUM];
                for (var i = 0; i < GEOMETRY_DEPTH_TYPE_COUNT; i++) {
                  var lines = this._buffers.lines[i];
                  if (!lines.empty()) {
                    var drawInfo = new DrawInfo();
                    drawInfo.vertexCount = lines.getCount();
                    for (var p = 0; p < passCount[i]; p++) {
                      var pass = passes[offset + p];
                      var shader = shaders[offset + p];
                      var pso = PipelineStateManager.getOrCreatePipelineState(this._device, pass, shader, renderPass, lines._inputAssembler);
                      cmdBuff.bindPipelineState(pso);
                      cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
                      cmdBuff.bindInputAssembler(lines._inputAssembler);
                      cmdBuff.draw(drawInfo);
                    }
                  }
                  offset += passCount[i];
                }
                for (var _i2 = 0; _i2 < GEOMETRY_DEPTH_TYPE_COUNT; _i2++) {
                  var dashedLines = this._buffers.dashedLines[_i2];
                  if (!dashedLines.empty()) {
                    var _drawInfo = new DrawInfo();
                    _drawInfo.vertexCount = dashedLines.getCount();
                    for (var _p2 = 0; _p2 < passCount[_i2]; _p2++) {
                      var _pass = passes[offset + _p2];
                      var _shader = shaders[offset + _p2];
                      var _pso = PipelineStateManager.getOrCreatePipelineState(this._device, _pass, _shader, renderPass, dashedLines._inputAssembler);
                      cmdBuff.bindPipelineState(_pso);
                      cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, _pass.descriptorSet);
                      cmdBuff.bindInputAssembler(dashedLines._inputAssembler);
                      cmdBuff.draw(_drawInfo);
                    }
                  }
                  offset += passCount[_i2];
                }
                for (var _i4 = 0; _i4 < GEOMETRY_DEPTH_TYPE_COUNT; _i4++) {
                  var triangles = this._buffers.triangles[_i4];
                  if (!triangles.empty()) {
                    var _drawInfo2 = new DrawInfo();
                    _drawInfo2.vertexCount = triangles.getCount();
                    for (var _p4 = 0; _p4 < passCount[_i4]; _p4++) {
                      var _pass2 = passes[offset + _p4];
                      var _shader2 = shaders[offset + _p4];
                      var _pso2 = PipelineStateManager.getOrCreatePipelineState(this._device, _pass2, _shader2, renderPass, triangles._inputAssembler);
                      cmdBuff.bindPipelineState(_pso2);
                      cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, _pass2.descriptorSet);
                      cmdBuff.bindInputAssembler(triangles._inputAssembler);
                      cmdBuff.draw(_drawInfo2);
                    }
                  }
                  offset += passCount[_i4];
                }
                this.reset();
              };
              _proto2.destroy = function destroy() {
                for (var i = 0; i < GEOMETRY_DEPTH_TYPE_COUNT; i++) {
                  this._buffers.lines[i].destroy();
                  this._buffers.dashedLines[i].destroy();
                  this._buffers.triangles[i].destroy();
                }
              };
              _proto2.empty = function empty() {
                for (var i = 0; i < GEOMETRY_DEPTH_TYPE_COUNT; i++) {
                  if (!this._buffers.lines[i].empty() || !this._buffers.dashedLines[i].empty() || !this._buffers.triangles[i].empty()) {
                    return false;
                  }
                }
                return true;
              };
              _proto2.update = function update() {
                for (var i = 0; i < GEOMETRY_DEPTH_TYPE_COUNT; i++) {
                  this._buffers.lines[i].update();
                  this._buffers.dashedLines[i].update();
                  this._buffers.triangles[i].update();
                }
              };
              _proto2.reset = function reset() {
                for (var i = 0; i < GEOMETRY_DEPTH_TYPE_COUNT; i++) {
                  this._buffers.lines[i].reset();
                  this._buffers.dashedLines[i].reset();
                  this._buffers.triangles[i].reset();
                }
              };
              _proto2.addDashedLine = function addDashedLine(v0, v1, color, depthTest) {
                if (depthTest === void 0) {
                  depthTest = true;
                }
                var dashedLines = this._buffers.dashedLines[depthTest ? 1 : 0];
                if (dashedLines._vertexCount + GEOMETRY_VERTICES_PER_LINE > dashedLines._maxVertices) {
                  warnID(12008);
                  return;
                }
                var offset = dashedLines._vertexCount * (Vec3.length + Color.length);
                Vec3.toArray(dashedLines._vertices, v0, offset);
                offset += Vec3.length;
                Color.toArray(dashedLines._vertices, color, offset);
                offset += Color.length;
                Vec3.toArray(dashedLines._vertices, v1, offset);
                offset += Vec3.length;
                Color.toArray(dashedLines._vertices, color, offset);
                dashedLines._vertexCount += GEOMETRY_VERTICES_PER_LINE;
              };
              _proto2.addLine = function addLine(v0, v1, color, depthTest) {
                if (depthTest === void 0) {
                  depthTest = true;
                }
                var lines = this._buffers.lines[depthTest ? 1 : 0];
                if (lines._vertexCount + GEOMETRY_VERTICES_PER_LINE > lines._maxVertices) {
                  warnID(12008);
                  return;
                }
                var offset = lines._vertexCount * (Vec3.length + Color.length);
                Vec3.toArray(lines._vertices, v0, offset);
                offset += Vec3.length;
                Color.toArray(lines._vertices, color, offset);
                offset += Color.length;
                Vec3.toArray(lines._vertices, v1, offset);
                offset += Vec3.length;
                Color.toArray(lines._vertices, color, offset);
                lines._vertexCount += GEOMETRY_VERTICES_PER_LINE;
              };
              _proto2.addTriangle = function addTriangle(v0, v1, v2, color, wireframe, depthTest, unlit) {
                if (wireframe === void 0) {
                  wireframe = true;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (unlit === void 0) {
                  unlit = false;
                }
                if (wireframe) {
                  this.addLine(v0, v1, color, depthTest);
                  this.addLine(v1, v2, color, depthTest);
                  this.addLine(v2, v0, color, depthTest);
                  return;
                }
                var triangles = this._buffers.triangles[depthTest ? 1 : 0];
                if (triangles._vertexCount + GEOMETRY_VERTICES_PER_TRIANGLE > triangles._maxVertices) {
                  warnID(12009);
                  return;
                }
                var normal = new Vec4(Vec4.ZERO);
                if (!unlit) {
                  var dist1 = new Vec3(v1.x - v0.x, v1.y - v0.y, v1.z - v0.z);
                  var dist2 = new Vec3(v2.x - v0.x, v2.y - v0.y, v2.z - v0.z);
                  var norm = new Vec3();
                  Vec3.normalize(norm, Vec3.cross(norm, dist1, dist2));
                  normal.set(norm.x, norm.y, norm.z, 1.0);
                }
                var offset = triangles._vertexCount * (Vec3.length + Vec4.length + Color.length);
                Vec3.toArray(triangles._vertices, v0, offset);
                offset += Vec3.length;
                Vec4.toArray(triangles._vertices, normal, offset);
                offset += Vec4.length;
                Color.toArray(triangles._vertices, color, offset);
                offset += Color.length;
                Vec3.toArray(triangles._vertices, v1, offset);
                offset += Vec3.length;
                Vec4.toArray(triangles._vertices, normal, offset);
                offset += Vec4.length;
                Color.toArray(triangles._vertices, color, offset);
                offset += Color.length;
                Vec3.toArray(triangles._vertices, v2, offset);
                offset += Vec3.length;
                Vec4.toArray(triangles._vertices, normal, offset);
                offset += Vec4.length;
                Color.toArray(triangles._vertices, color, offset);
                triangles._vertexCount += GEOMETRY_VERTICES_PER_TRIANGLE;
              };
              _proto2.addQuad = function addQuad(v0, v1, v2, v3, color, wireframe, depthTest, unlit) {
                if (wireframe === void 0) {
                  wireframe = true;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (unlit === void 0) {
                  unlit = false;
                }
                if (wireframe) {
                  this.addLine(v0, v1, color, depthTest);
                  this.addLine(v1, v2, color, depthTest);
                  this.addLine(v2, v3, color, depthTest);
                  this.addLine(v3, v0, color, depthTest);
                } else {
                  this.addTriangle(v0, v1, v2, color, wireframe, depthTest, unlit);
                  this.addTriangle(v0, v2, v3, color, wireframe, depthTest, unlit);
                }
              };
              _proto2.addBoundingBox = function addBoundingBox(aabb, color, wireframe, depthTest, unlit, useTransform, transform) {
                if (wireframe === void 0) {
                  wireframe = true;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (unlit === void 0) {
                  unlit = false;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = new Mat4();
                }
                _min.set(aabb.center.x - aabb.halfExtents.x, aabb.center.y - aabb.halfExtents.y, aabb.center.z - aabb.halfExtents.z);
                _max.set(aabb.center.x + aabb.halfExtents.x, aabb.center.y + aabb.halfExtents.y, aabb.center.z + aabb.halfExtents.z);
                _v0.set(_min.x, _min.y, _min.z);
                _v1.set(_max.x, _min.y, _min.z);
                _v2.set(_min.x, _max.y, _min.z);
                _v3.set(_max.x, _max.y, _min.z);
                _v4.set(_min.x, _min.y, _max.z);
                _v5.set(_max.x, _min.y, _max.z);
                _v6.set(_min.x, _max.y, _max.z);
                _v7.set(_max.x, _max.y, _max.z);
                if (useTransform) {
                  Vec3.transformMat4(_v0, _v0, transform);
                  Vec3.transformMat4(_v1, _v1, transform);
                  Vec3.transformMat4(_v2, _v2, transform);
                  Vec3.transformMat4(_v3, _v3, transform);
                  Vec3.transformMat4(_v4, _v4, transform);
                  Vec3.transformMat4(_v5, _v5, transform);
                  Vec3.transformMat4(_v6, _v6, transform);
                  Vec3.transformMat4(_v7, _v7, transform);
                }
                if (wireframe) {
                  this.addLine(_v6, _v7, color, depthTest);
                  this.addLine(_v7, _v3, color, depthTest);
                  this.addLine(_v3, _v2, color, depthTest);
                  this.addLine(_v2, _v6, color, depthTest);
                  this.addLine(_v4, _v5, color, depthTest);
                  this.addLine(_v5, _v1, color, depthTest);
                  this.addLine(_v1, _v0, color, depthTest);
                  this.addLine(_v0, _v4, color, depthTest);
                  this.addLine(_v6, _v4, color, depthTest);
                  this.addLine(_v7, _v5, color, depthTest);
                  this.addLine(_v3, _v1, color, depthTest);
                  this.addLine(_v2, _v0, color, depthTest);
                } else {
                  this.addQuad(_v4, _v5, _v7, _v6, color, wireframe, depthTest, unlit);
                  this.addQuad(_v5, _v1, _v3, _v7, color, wireframe, depthTest, unlit);
                  this.addQuad(_v1, _v0, _v2, _v3, color, wireframe, depthTest, unlit);
                  this.addQuad(_v0, _v4, _v6, _v2, color, wireframe, depthTest, unlit);
                  this.addQuad(_v6, _v7, _v3, _v2, color, wireframe, depthTest, unlit);
                  this.addQuad(_v0, _v1, _v5, _v4, color, wireframe, depthTest, unlit);
                }
              };
              _proto2.addCross = function addCross(position, size, color, depthTest) {
                if (depthTest === void 0) {
                  depthTest = true;
                }
                var halfSize = size * 0.5;
                var v0 = new Vec3(position.x - halfSize, position.y, position.z);
                var v1 = new Vec3(position.x + halfSize, position.y, position.z);
                this.addLine(v0, v1, color, depthTest);
                v0.set(position.x, position.y - halfSize, position.z);
                v1.set(position.x, position.y + halfSize, position.z);
                this.addLine(v0, v1, color, depthTest);
                v0.set(position.x, position.y, position.z - halfSize);
                v1.set(position.x, position.y, position.z + halfSize);
                this.addLine(v0, v1, color, depthTest);
              };
              _proto2.addFrustum = function addFrustum(frustum, color, depthTest) {
                if (depthTest === void 0) {
                  depthTest = true;
                }
                var vertices = frustum.vertices;
                this.addLine(vertices[0], vertices[1], color, depthTest);
                this.addLine(vertices[1], vertices[2], color, depthTest);
                this.addLine(vertices[2], vertices[3], color, depthTest);
                this.addLine(vertices[3], vertices[0], color, depthTest);
                this.addLine(vertices[4], vertices[5], color, depthTest);
                this.addLine(vertices[5], vertices[6], color, depthTest);
                this.addLine(vertices[6], vertices[7], color, depthTest);
                this.addLine(vertices[7], vertices[4], color, depthTest);
                this.addLine(vertices[0], vertices[4], color, depthTest);
                this.addLine(vertices[1], vertices[5], color, depthTest);
                this.addLine(vertices[2], vertices[6], color, depthTest);
                this.addLine(vertices[3], vertices[7], color, depthTest);
              };
              _proto2.addCapsule = function addCapsule(center, radius, height, color, segmentsU, hemiSegmentsV, wireframe, depthTest, unlit, useTransform, transform) {
                if (segmentsU === void 0) {
                  segmentsU = 32;
                }
                if (hemiSegmentsV === void 0) {
                  hemiSegmentsV = 8;
                }
                if (wireframe === void 0) {
                  wireframe = true;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (unlit === void 0) {
                  unlit = false;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                var deltaPhi = Math.PI * 2.0 / segmentsU;
                var deltaTheta = Math.PI / 2.0 / hemiSegmentsV;
                var bottomCenter = new Vec3(center.x, center.y - height / 2.0, center.z);
                var topCenter = new Vec3(center.x, center.y + height / 2.0, center.z);
                var bottomPoints = [];
                var topPoints = [];
                for (var i = 0; i < hemiSegmentsV + 1; i++) {
                  var bottomList = [];
                  var topList = [];
                  var theta = i * deltaTheta;
                  var sinTheta = Math.sin(theta);
                  var cosTheta = Math.cos(theta);
                  for (var j = 0; j < segmentsU + 1; j++) {
                    var phi = j * deltaPhi;
                    var sinPhi = Math.sin(phi);
                    var cosPhi = Math.cos(phi);
                    var p = new Vec3(radius * sinTheta * cosPhi, radius * cosTheta, radius * sinTheta * sinPhi);
                    var p0 = new Vec3(bottomCenter.x + p.x, bottomCenter.y - p.y, bottomCenter.z + p.z);
                    var p1 = new Vec3(topCenter.x + p.x, topCenter.y + p.y, topCenter.z + p.z);
                    bottomList.push(p0);
                    topList.push(p1);
                  }
                  bottomPoints.push(bottomList);
                  topPoints.push(topList);
                }
                if (useTransform) {
                  for (var _i6 = 0; _i6 < hemiSegmentsV + 1; _i6++) {
                    for (var _j2 = 0; _j2 < segmentsU + 1; _j2++) {
                      Vec3.transformMat4(bottomPoints[_i6][_j2], bottomPoints[_i6][_j2], transform);
                      Vec3.transformMat4(topPoints[_i6][_j2], topPoints[_i6][_j2], transform);
                    }
                  }
                }
                for (var _i8 = 0; _i8 < hemiSegmentsV; _i8++) {
                  for (var _j4 = 0; _j4 < segmentsU; _j4++) {
                    this.addTriangle(bottomPoints[_i8 + 1][_j4], bottomPoints[_i8][_j4 + 1], bottomPoints[_i8][_j4], color, wireframe, depthTest, unlit);
                    this.addTriangle(bottomPoints[_i8 + 1][_j4], bottomPoints[_i8 + 1][_j4 + 1], bottomPoints[_i8][_j4 + 1], color, wireframe, depthTest, unlit);
                    this.addTriangle(topPoints[_i8][_j4], topPoints[_i8 + 1][_j4 + 1], topPoints[_i8 + 1][_j4], color, wireframe, depthTest, unlit);
                    this.addTriangle(topPoints[_i8][_j4], topPoints[_i8][_j4 + 1], topPoints[_i8 + 1][_j4 + 1], color, wireframe, depthTest, unlit);
                  }
                }
                var bottomCircle = bottomPoints[hemiSegmentsV];
                var topCircle = topPoints[hemiSegmentsV];
                for (var _j6 = 0; _j6 < segmentsU; _j6++) {
                  this.addTriangle(topCircle[_j6], bottomCircle[_j6 + 1], bottomCircle[_j6], color, wireframe, depthTest, unlit);
                  this.addTriangle(topCircle[_j6], topCircle[_j6 + 1], bottomCircle[_j6 + 1], color, wireframe, depthTest, unlit);
                }
              };
              _proto2.addCylinder = function addCylinder(center, radius, height, color, segments, wireframe, depthTest, unlit, useTransform, transform) {
                if (segments === void 0) {
                  segments = 32;
                }
                if (wireframe === void 0) {
                  wireframe = true;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (unlit === void 0) {
                  unlit = false;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                var deltaPhi = Math.PI * 2.0 / segments;
                var bottomCenter = new Vec3(center.x, center.y - height / 2.0, center.z);
                var topCenter = new Vec3(center.x, center.y + height / 2.0, center.z);
                var bottomPoints = [];
                var topPoints = [];
                for (var i = 0; i < segments + 1; i++) {
                  var phi = i * deltaPhi;
                  var p = new Vec3(radius * Math.cos(phi), 0.0, radius * Math.sin(phi));
                  var p0 = new Vec3(p.x + bottomCenter.x, p.y + bottomCenter.y, p.z + bottomCenter.z);
                  var p1 = new Vec3(p.x + topCenter.x, p.y + topCenter.y, p.z + topCenter.z);
                  bottomPoints.push(p0);
                  topPoints.push(p1);
                }
                if (useTransform) {
                  Vec3.transformMat4(bottomCenter, bottomCenter, transform);
                  Vec3.transformMat4(topCenter, topCenter, transform);
                  for (var _i10 = 0; _i10 < segments + 1; _i10++) {
                    Vec3.transformMat4(bottomPoints[_i10], bottomPoints[_i10], transform);
                    Vec3.transformMat4(topPoints[_i10], topPoints[_i10], transform);
                  }
                }
                for (var _i12 = 0; _i12 < segments; _i12++) {
                  this.addTriangle(topCenter, topPoints[_i12 + 1], topPoints[_i12], color, wireframe, depthTest, unlit);
                  this.addTriangle(bottomCenter, bottomPoints[_i12], bottomPoints[_i12 + 1], color, wireframe, depthTest, unlit);
                  this.addTriangle(topPoints[_i12], bottomPoints[_i12 + 1], bottomPoints[_i12], color, wireframe, depthTest, unlit);
                  this.addTriangle(topPoints[_i12], topPoints[_i12 + 1], bottomPoints[_i12 + 1], color, wireframe, depthTest, unlit);
                }
              };
              _proto2.addCone = function addCone(center, radius, height, color, segments, wireframe, depthTest, unlit, useTransform, transform) {
                if (segments === void 0) {
                  segments = 32;
                }
                if (wireframe === void 0) {
                  wireframe = true;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (unlit === void 0) {
                  unlit = false;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                var deltaPhi = Math.PI * 2.0 / segments;
                var bottomCenter = new Vec3(center.x, center.y - height / 2.0, center.z);
                var topCenter = new Vec3(center.x, center.y + height / 2.0, center.z);
                var bottomPoints = [];
                for (var i = 0; i < segments + 1; i++) {
                  var point = new Vec3(radius * Math.cos(i * deltaPhi), 0.0, radius * Math.sin(i * deltaPhi));
                  var p0 = new Vec3(point.x + bottomCenter.x, point.y + bottomCenter.y, point.z + bottomCenter.z);
                  bottomPoints.push(p0);
                }
                if (useTransform) {
                  Vec3.transformMat4(bottomCenter, bottomCenter, transform);
                  Vec3.transformMat4(topCenter, topCenter, transform);
                  for (var _i14 = 0; _i14 < segments + 1; _i14++) {
                    Vec3.transformMat4(bottomPoints[_i14], bottomPoints[_i14], transform);
                  }
                }
                for (var _i16 = 0; _i16 < segments; _i16++) {
                  this.addTriangle(topCenter, bottomPoints[_i16 + 1], bottomPoints[_i16], color, wireframe, depthTest, unlit);
                  this.addTriangle(bottomCenter, bottomPoints[_i16], bottomPoints[_i16 + 1], color, wireframe, depthTest, unlit);
                }
              };
              _proto2.addCircle = function addCircle(center, radius, color, segments, depthTest, useTransform, transform) {
                if (segments === void 0) {
                  segments = 32;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                var deltaPhi = Math.PI * 2.0 / segments;
                var points = [];
                for (var i = 0; i < segments + 1; i++) {
                  var point = new Vec3(radius * Math.cos(i * deltaPhi), 0.0, radius * Math.sin(i * deltaPhi));
                  var p0 = new Vec3(point.x + center.x, point.y + center.y, point.z + center.z);
                  points.push(p0);
                }
                if (useTransform) {
                  for (var _i18 = 0; _i18 < segments + 1; _i18++) {
                    Vec3.transformMat4(points[_i18], points[_i18], transform);
                  }
                }
                for (var _i20 = 0; _i20 < segments; _i20++) {
                  this.addLine(points[_i20], points[_i20 + 1], color, depthTest);
                }
              };
              _proto2.addArc = function addArc(center, radius, color, startAngle, endAngle, segments, depthTest, useTransform, transform) {
                if (segments === void 0) {
                  segments = 32;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                var startRadian = toRadian(startAngle);
                var endRadian = toRadian(endAngle);
                var deltaPhi = (endRadian - startRadian) / segments;
                var points = [];
                for (var i = 0; i < segments + 1; i++) {
                  var point = new Vec3(radius * Math.cos(i * deltaPhi + startRadian), 0.0, radius * Math.sin(i * deltaPhi + startRadian));
                  var p0 = new Vec3(point.x + center.x, point.y + center.y, point.z + center.z);
                  points.push(p0);
                }
                if (useTransform) {
                  for (var _i22 = 0; _i22 < segments + 1; _i22++) {
                    Vec3.transformMat4(points[_i22], points[_i22], transform);
                  }
                }
                for (var _i24 = 0; _i24 < segments; _i24++) {
                  this.addLine(points[_i24], points[_i24 + 1], color, depthTest);
                }
              };
              _proto2.addPolygon = function addPolygon(center, radius, color, segments, wireframe, depthTest, unlit, useTransform, transform) {
                if (segments === void 0) {
                  segments = 6;
                }
                if (wireframe === void 0) {
                  wireframe = true;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (unlit === void 0) {
                  unlit = false;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                if (wireframe) {
                  this.addCircle(center, radius, color, segments, depthTest, useTransform, transform);
                } else {
                  this.addDisc(center, radius, color, segments, wireframe, depthTest, unlit, useTransform, transform);
                }
              };
              _proto2.addDisc = function addDisc(center, radius, color, segments, wireframe, depthTest, unlit, useTransform, transform) {
                if (segments === void 0) {
                  segments = 32;
                }
                if (wireframe === void 0) {
                  wireframe = true;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (unlit === void 0) {
                  unlit = false;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                var deltaPhi = Math.PI * 2.0 / segments;
                var points = [];
                var newCenter = new Vec3(center);
                for (var i = 0; i < segments + 1; i++) {
                  var point = new Vec3(radius * Math.cos(i * deltaPhi), 0.0, radius * Math.sin(i * deltaPhi));
                  var p0 = new Vec3(point.x + newCenter.x, point.y + newCenter.y, point.z + newCenter.z);
                  points.push(p0);
                }
                if (useTransform) {
                  Vec3.transformMat4(newCenter, newCenter, transform);
                  for (var _i26 = 0; _i26 < segments + 1; _i26++) {
                    Vec3.transformMat4(points[_i26], points[_i26], transform);
                  }
                }
                for (var _i28 = 0; _i28 < segments; _i28++) {
                  this.addTriangle(newCenter, points[_i28], points[_i28 + 1], color, wireframe, depthTest, unlit);
                }
                if (!wireframe) {
                  for (var _i30 = 0; _i30 < segments; _i30++) {
                    this.addTriangle(newCenter, points[_i30 + 1], points[_i30], color, wireframe, depthTest, unlit);
                  }
                }
              };
              _proto2.addSector = function addSector(center, radius, color, startAngle, endAngle, segments, wireframe, depthTest, unlit, useTransform, transform) {
                if (segments === void 0) {
                  segments = 32;
                }
                if (wireframe === void 0) {
                  wireframe = true;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (unlit === void 0) {
                  unlit = false;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                var startRadian = toRadian(startAngle);
                var endRadian = toRadian(endAngle);
                var deltaPhi = (endRadian - startRadian) / segments;
                var points = [];
                var newCenter = new Vec3(center);
                for (var i = 0; i < segments + 1; i++) {
                  var point = new Vec3(radius * Math.cos(i * deltaPhi), 0.0, radius * Math.sin(i * deltaPhi));
                  var p0 = new Vec3(point.x + newCenter.x, point.y + newCenter.y, point.z + newCenter.z);
                  points.push(p0);
                }
                if (useTransform) {
                  Vec3.transformMat4(newCenter, newCenter, transform);
                  for (var _i32 = 0; _i32 < segments + 1; _i32++) {
                    Vec3.transformMat4(points[_i32], points[_i32], transform);
                  }
                }
                for (var _i34 = 0; _i34 < segments; _i34++) {
                  this.addTriangle(newCenter, points[_i34], points[_i34 + 1], color, wireframe, depthTest, unlit);
                }
                if (!wireframe) {
                  for (var _i36 = 0; _i36 < segments; _i36++) {
                    this.addTriangle(newCenter, points[_i36 + 1], points[_i36], color, wireframe, depthTest, unlit);
                  }
                }
              };
              _proto2.addSphere = function addSphere(center, radius, color, segmentsU, segmentsV, wireframe, depthTest, unlit, useTransform, transform) {
                if (segmentsU === void 0) {
                  segmentsU = 32;
                }
                if (segmentsV === void 0) {
                  segmentsV = 16;
                }
                if (wireframe === void 0) {
                  wireframe = true;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (unlit === void 0) {
                  unlit = false;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                var deltaPhi = Math.PI * 2.0 / segmentsU;
                var deltaTheta = Math.PI / segmentsV;
                var points = [];
                for (var i = 0; i < segmentsV + 1; i++) {
                  var list = [];
                  var theta = i * deltaTheta;
                  var sinTheta = Math.sin(theta);
                  var cosTheta = Math.cos(theta);
                  for (var j = 0; j < segmentsU + 1; j++) {
                    var phi = j * deltaPhi;
                    var sinPhi = Math.sin(phi);
                    var cosPhi = Math.cos(phi);
                    var p = new Vec3(radius * sinTheta * cosPhi, radius * cosTheta, radius * sinTheta * sinPhi);
                    var p0 = new Vec3(center.x + p.x, center.y + p.y, center.z + p.z);
                    list.push(p0);
                  }
                  points.push(list);
                }
                if (useTransform) {
                  for (var _i38 = 0; _i38 < segmentsV + 1; _i38++) {
                    for (var _j8 = 0; _j8 < segmentsU + 1; _j8++) {
                      Vec3.transformMat4(points[_i38][_j8], points[_i38][_j8], transform);
                    }
                  }
                }
                for (var _i40 = 0; _i40 < segmentsV; _i40++) {
                  for (var _j10 = 0; _j10 < segmentsU; _j10++) {
                    this.addTriangle(points[_i40][_j10], points[_i40 + 1][_j10 + 1], points[_i40 + 1][_j10], color, wireframe, depthTest, unlit);
                    this.addTriangle(points[_i40][_j10], points[_i40][_j10 + 1], points[_i40 + 1][_j10 + 1], color, wireframe, depthTest, unlit);
                  }
                }
              };
              _proto2.addTorus = function addTorus(center, bigRadius, radius, color, segmentsU, segmentsV, wireframe, depthTest, unlit, useTransform, transform) {
                if (segmentsU === void 0) {
                  segmentsU = 32;
                }
                if (segmentsV === void 0) {
                  segmentsV = 16;
                }
                if (wireframe === void 0) {
                  wireframe = true;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (unlit === void 0) {
                  unlit = false;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                var deltaPhi = Math.PI * 2.0 / segmentsU;
                var deltaTheta = Math.PI * 2.0 / segmentsV;
                var points = [];
                for (var i = 0; i < segmentsU + 1; i++) {
                  var list = [];
                  var phi = i * deltaPhi;
                  var sinPhi = Math.sin(phi);
                  var cosPhi = Math.cos(phi);
                  for (var j = 0; j < segmentsV + 1; j++) {
                    var theta = j * deltaTheta;
                    var sinTheta = Math.sin(theta);
                    var cosTheta = Math.cos(theta);
                    var p = new Vec3((bigRadius + radius * cosTheta) * cosPhi, radius * sinTheta, (bigRadius + radius * cosTheta) * sinPhi);
                    var p0 = new Vec3(center.x + p.x, center.y + p.y, center.z + p.z);
                    list.push(p0);
                  }
                  points.push(list);
                }
                if (useTransform) {
                  for (var _i42 = 0; _i42 < segmentsU + 1; _i42++) {
                    for (var _j12 = 0; _j12 < segmentsV + 1; _j12++) {
                      Vec3.transformMat4(points[_i42][_j12], points[_i42][_j12], transform);
                    }
                  }
                }
                for (var _i44 = 0; _i44 < segmentsU; _i44++) {
                  for (var _j14 = 0; _j14 < segmentsV; _j14++) {
                    this.addTriangle(points[_i44][_j14 + 1], points[_i44 + 1][_j14], points[_i44][_j14], color, wireframe, depthTest, unlit);
                    this.addTriangle(points[_i44][_j14 + 1], points[_i44 + 1][_j14 + 1], points[_i44 + 1][_j14], color, wireframe, depthTest, unlit);
                  }
                }
              };
              _proto2.addOctahedron = function addOctahedron(center, radius, color, wireframe, depthTest, unlit, useTransform, transform) {
                if (wireframe === void 0) {
                  wireframe = true;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (unlit === void 0) {
                  unlit = false;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                var points = [];
                points.push(new Vec3(radius + center.x, center.y, center.z));
                points.push(new Vec3(center.x, center.y, center.z - radius));
                points.push(new Vec3(-radius + center.x, center.y, center.z));
                points.push(new Vec3(center.x, center.y, center.z + radius));
                points.push(new Vec3(center.x, center.y + radius, center.z));
                points.push(new Vec3(center.x, center.y - radius, center.z));
                if (useTransform) {
                  for (var i = 0; i < points.length; i++) {
                    Vec3.transformMat4(points[i], points[i], transform);
                  }
                }
                if (wireframe) {
                  this.addLine(points[0], points[1], color, depthTest);
                  this.addLine(points[1], points[2], color, depthTest);
                  this.addLine(points[2], points[3], color, depthTest);
                  this.addLine(points[3], points[0], color, depthTest);
                  this.addLine(points[0], points[4], color, depthTest);
                  this.addLine(points[1], points[4], color, depthTest);
                  this.addLine(points[2], points[4], color, depthTest);
                  this.addLine(points[3], points[4], color, depthTest);
                  this.addLine(points[0], points[5], color, depthTest);
                  this.addLine(points[1], points[5], color, depthTest);
                  this.addLine(points[2], points[5], color, depthTest);
                  this.addLine(points[3], points[5], color, depthTest);
                } else {
                  this.addTriangle(points[0], points[1], points[4], color, wireframe, depthTest, unlit);
                  this.addTriangle(points[1], points[2], points[4], color, wireframe, depthTest, unlit);
                  this.addTriangle(points[2], points[3], points[4], color, wireframe, depthTest, unlit);
                  this.addTriangle(points[3], points[0], points[4], color, wireframe, depthTest, unlit);
                  this.addTriangle(points[0], points[3], points[5], color, wireframe, depthTest, unlit);
                  this.addTriangle(points[3], points[2], points[5], color, wireframe, depthTest, unlit);
                  this.addTriangle(points[2], points[1], points[5], color, wireframe, depthTest, unlit);
                  this.addTriangle(points[1], points[0], points[5], color, wireframe, depthTest, unlit);
                }
              };
              _proto2.addBezier = function addBezier(v0, v1, v2, v3, color, segments, depthTest, useTransform, transform) {
                if (segments === void 0) {
                  segments = 32;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                var deltaT = 1.0 / segments;
                var points = [];
                var newV0 = new Vec3(v0);
                var newV1 = new Vec3(v1);
                var newV2 = new Vec3(v2);
                var newV3 = new Vec3(v3);
                if (useTransform) {
                  Vec3.transformMat4(newV0, newV0, transform);
                  Vec3.transformMat4(newV1, newV1, transform);
                  Vec3.transformMat4(newV2, newV2, transform);
                  Vec3.transformMat4(newV3, newV3, transform);
                }
                for (var i = 0; i < segments + 1; i++) {
                  var t = i * deltaT;
                  var a = (1.0 - t) * (1.0 - t) * (1.0 - t);
                  var b = 3.0 * t * (1.0 - t) * (1.0 - t);
                  var c = 3.0 * t * t * (1.0 - t);
                  var d = t * t * t;
                  var p0 = new Vec3(a * newV0.x + b * newV1.x + c * newV2.x + d * newV3.x, a * newV0.y + b * newV1.y + c * newV2.y + d * newV3.y, a * newV0.z + b * newV1.z + c * newV2.z + d * newV3.z);
                  points.push(p0);
                }
                for (var _i46 = 0; _i46 < segments; _i46++) {
                  this.addLine(points[_i46], points[_i46 + 1], color, depthTest);
                }
              };
              _proto2.addSpline = function addSpline(spline, color, index, knotSize, segments, depthTest, useTransform, transform) {
                if (index === void 0) {
                  index = 0xffffffff;
                }
                if (knotSize === void 0) {
                  knotSize = 0.5;
                }
                if (segments === void 0) {
                  segments = 32;
                }
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                var numPoints = segments + 1;
                var points = spline.getPoints(numPoints, index);
                if (useTransform) {
                  points.forEach(function (v) {
                    v.transformMat4(transform);
                  });
                }
                for (var i = 0; i < segments; i++) {
                  this.addLine(points[i], points[i + 1], color, depthTest);
                }
                if (knotSize > 0.0 && index === 0xffffffff) {
                  var crossColor = new Color(255 - color.r, 255 - color.g, 255 - color.b, color.a);
                  var numKnots = spline.getKnotCount();
                  var knots = spline.knots;
                  for (var _i48 = 0; _i48 < numKnots; _i48++) {
                    var knot = knots[_i48];
                    if (useTransform) {
                      knot = knot.clone().transformMat4(transform);
                    }
                    this.addCross(knot, knotSize, crossColor, depthTest);
                  }
                }
              };
              _proto2.addMesh = function addMesh(center, vertices, color, depthTest, useTransform, transform) {
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                for (var i = 0; i < vertices.length; i += 3) {
                  var v0 = new Vec3(center.x + vertices[i].x, center.y + vertices[i].y, center.z + vertices[i].z);
                  var v1 = new Vec3(center.x + vertices[i + 1].x, center.y + vertices[i + 1].y, center.z + vertices[i + 1].z);
                  var v2 = new Vec3(center.x + vertices[i + 2].x, center.y + vertices[i + 2].y, center.z + vertices[i + 2].z);
                  if (useTransform) {
                    Vec3.transformMat4(v0, v0, transform);
                    Vec3.transformMat4(v1, v1, transform);
                    Vec3.transformMat4(v2, v2, transform);
                  }
                  this.addLine(v0, v1, color, depthTest);
                  this.addLine(v1, v2, color, depthTest);
                  this.addLine(v2, v0, color, depthTest);
                }
              };
              _proto2.addIndexedMesh = function addIndexedMesh(center, vertices, indices, color, depthTest, useTransform, transform) {
                if (depthTest === void 0) {
                  depthTest = true;
                }
                if (useTransform === void 0) {
                  useTransform = false;
                }
                if (transform === void 0) {
                  transform = Mat4.IDENTITY;
                }
                for (var i = 0; i < indices.length; i += 3) {
                  var v0 = new Vec3(center.x + vertices[indices[i]].x, center.y + vertices[indices[i]].y, center.z + vertices[indices[i]].z);
                  var v1 = new Vec3(center.x + vertices[indices[i + 1]].x, center.y + vertices[indices[i + 1]].y, center.z + vertices[indices[i + 1]].z);
                  var v2 = new Vec3(center.x + vertices[indices[i + 2]].x, center.y + vertices[indices[i + 2]].y, center.z + vertices[indices[i + 2]].z);
                  if (useTransform) {
                    Vec3.transformMat4(v0, v0, transform);
                    Vec3.transformMat4(v1, v1, transform);
                    Vec3.transformMat4(v2, v2, transform);
                  }
                  this.addLine(v0, v1, color, depthTest);
                  this.addLine(v1, v2, color, depthTest);
                  this.addLine(v2, v0, color, depthTest);
                }
              };
              return GeometryRenderer;
            }());
            cclegacy.internal.GeometryRenderer = GeometryRenderer;

        })
    };
}));
