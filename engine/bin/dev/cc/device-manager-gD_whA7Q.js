System.register(['./buffer-barrier-BmKiPanc.js', './global-exports-C7R_I6Kn.js', './index-oHSn7cpO.js', './gc-object-CbS29vYa.js', './_virtual_internal_constants-Cb-eEldT.js'], (function (exports) {
    'use strict';
    var defines, Device, Swapchain, Buffer, Texture, Sampler, Shader, InputAssembler, RenderPass, Framebuffer, DescriptorSet, DescriptorSetLayout, PipelineLayout, PipelineState, CommandBuffer, Queue, GeneralBarrier, TextureBarrier, BufferBarrier, RasterizerState, BlendState, BlendTarget, DepthStencilState, PipelineStateInfo, Feature, ColorAttachment, DepthStencilAttachment, SwapchainInfo, DeviceInfo, cclegacy, replaceProperty, removeProperty, sys, screen, settings, Settings, BrowserType, errorID, getError, _createClass, EDITOR;
    return {
        setters: [function (module) {
            defines = module.z;
            Device = module.E;
            Swapchain = module.G;
            Buffer = module.H;
            Texture = module.J;
            Sampler = module.K;
            Shader = module.L;
            InputAssembler = module.N;
            RenderPass = module.O;
            Framebuffer = module.Q;
            DescriptorSet = module.W;
            DescriptorSetLayout = module.X;
            PipelineLayout = module.Y;
            PipelineState = module.Z;
            CommandBuffer = module._;
            Queue = module.$;
            GeneralBarrier = module.a0;
            TextureBarrier = module.a1;
            BufferBarrier = module.a2;
            RasterizerState = module.a3;
            BlendState = module.a4;
            BlendTarget = module.a5;
            DepthStencilState = module.a6;
            PipelineStateInfo = module.t;
            Feature = module.a7;
            ColorAttachment = module.w;
            DepthStencilAttachment = module.x;
            SwapchainInfo = module.a8;
            DeviceInfo = module.a9;
        }, function (module) {
            cclegacy = module.c;
        }, function (module) {
            replaceProperty = module.r;
            removeProperty = module.i;
            sys = module.n;
            screen = module.D;
        }, function (module) {
            settings = module.s;
            Settings = module.N;
            BrowserType = module.O;
            errorID = module.h;
            getError = module.g;
            _createClass = module.a;
        }, function (module) {
            EDITOR = module.E;
        }],
        execute: (function () {

            var polyfills$1 = {
              Device: Device,
              Swapchain: Swapchain,
              Buffer: Buffer,
              Texture: Texture,
              Sampler: Sampler,
              Shader: Shader,
              InputAssembler: InputAssembler,
              RenderPass: RenderPass,
              Framebuffer: Framebuffer,
              DescriptorSet: DescriptorSet,
              DescriptorSetLayout: DescriptorSetLayout,
              PipelineLayout: PipelineLayout,
              PipelineState: PipelineState,
              CommandBuffer: CommandBuffer,
              Queue: Queue,
              GeneralBarrier: GeneralBarrier,
              TextureBarrier: TextureBarrier,
              BufferBarrier: BufferBarrier,
              RasterizerState: RasterizerState,
              BlendState: BlendState,
              BlendTarget: BlendTarget,
              DepthStencilState: DepthStencilState,
              PipelineStateInfo: PipelineStateInfo
            };
            Object.assign(polyfills$1, defines);
            cclegacy.gfx = polyfills$1;

            var polyfills = {
              GFXDevice: true,
              GFXBuffer: true,
              GFXTexture: true,
              GFXSampler: true,
              GFXShader: true,
              GFXInputAssembler: true,
              GFXRenderPass: true,
              GFXFramebuffer: true,
              GFXPipelineState: true,
              GFXCommandBuffer: true,
              GFXQueue: true,
              GFXObjectType: true,
              GFXObject: false,
              GFXAttributeName: true,
              GFXType: true,
              GFXFormat: true,
              GFXBufferUsageBit: true,
              GFXMemoryUsageBit: true,
              GFXBufferFlagBit: true,
              GFXBufferAccessBit: 'MemoryAccessBit',
              GFXPrimitiveMode: true,
              GFXPolygonMode: true,
              GFXShadeModel: true,
              GFXCullMode: true,
              GFXComparisonFunc: true,
              GFXStencilOp: true,
              GFXBlendOp: true,
              GFXBlendFactor: true,
              GFXColorMask: true,
              GFXFilter: true,
              GFXAddress: true,
              GFXTextureType: true,
              GFXTextureUsageBit: true,
              GFXSampleCount: true,
              GFXTextureFlagBit: true,
              GFXShaderStageFlagBit: true,
              GFXDescriptorType: true,
              GFXCommandBufferType: true,
              GFXLoadOp: true,
              GFXStoreOp: true,
              GFXPipelineBindPoint: true,
              GFXDynamicStateFlagBit: true,
              GFXStencilFace: true,
              GFXQueueType: true,
              GFXRect: true,
              GFXViewport: true,
              GFXColor: true,
              GFXClearFlag: true,
              GFXOffset: true,
              GFXExtent: true,
              GFXTextureSubres: 'TextureSubresLayers',
              GFXTextureCopy: true,
              GFXBufferTextureCopy: true,
              GFXFormatType: true,
              GFXFormatInfo: true,
              GFXMemoryStatus: true,
              GFXFormatInfos: true,
              GFXFormatSize: true,
              GFXFormatSurfaceSize: true,
              GFXGetTypeSize: true,
              getTypedArrayConstructor: false
            };
            for (var name in polyfills) {
              var newName = polyfills[name];
              if (newName === true) {
                newName = name.slice(3);
              } else if (newName === false) {
                newName = name;
              }
              replaceProperty(cclegacy, 'cc', [{
                name: name,
                newName: newName,
                target: cclegacy.gfx,
                targetName: 'cc.gfx'
              }]);
            }
            removeProperty(cclegacy, 'cc', [{
              name: 'GFX_MAX_VERTEX_ATTRIBUTES'
            }, {
              name: 'GFX_MAX_TEXTURE_UNITS'
            }, {
              name: 'GFX_MAX_ATTACHMENTS'
            }, {
              name: 'GFX_MAX_BUFFER_BINDINGS'
            }, {
              name: 'GFXTextureLayout'
            }]);

            removeProperty(Feature, 'Feature', [{
              name: 'COLOR_FLOAT',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = device.getFormatFeatures(Format.R32F) & FormatFeatureBit.RENDER_TARGET;'
            }, {
              name: 'COLOR_HALF_FLOAT',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = device.getFormatFeatures(Format.R16F) & FormatFeatureBit.RENDER_TARGET;'
            }, {
              name: 'TEXTURE_FLOAT',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = (device.getFormatFeatures(Format.R32F) & (FormatFeatureBit.RENDER_TARGET' + ' | FormatFeatureBit.SAMPLED_TEXTURE)) === (FormatFeatureBit.RENDER_TARGET | FormatFeatureBit.SAMPLED_TEXTURE);'
            }, {
              name: 'TEXTURE_HALF_FLOAT',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = (device.getFormatFeatures(Format.R16F) & (FormatFeatureBit.RENDER_TARGET' + ' | FormatFeatureBit.SAMPLED_TEXTURE)) === (FormatFeatureBit.RENDER_TARGET | FormatFeatureBit.SAMPLED_TEXTURE);'
            }, {
              name: 'TEXTURE_FLOAT_LINEAR',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = device.getFormatFeatures(Format.R32F) & FormatFeatureBit.LINEAR_FILTER;'
            }, {
              name: 'TEXTURE_HALF_FLOAT_LINEAR',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = device.getFormatFeatures(Format.R16F) & FormatFeatureBit.LINEAR_FILTER;'
            }, {
              name: 'FORMAT_R11G11B10F',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = device.getFormatFeatures(Format.R11G11B10F) !== FormatFeatureBit.NONE;'
            }, {
              name: 'FORMAT_SRGB',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = device.getFormatFeatures(Format.SRGB8) !== FormatFeatureBit.NONE;'
            }, {
              name: 'FORMAT_ETC1',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = device.getFormatFeatures(Format.ETC_RGB8) !== FormatFeatureBit.NONE;'
            }, {
              name: 'FORMAT_ETC2',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = device.getFormatFeatures(Format.ETC2_RGB8) !== FormatFeatureBit.NONE;'
            }, {
              name: 'FORMAT_DXT',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = device.getFormatFeatures(Format.BC1) !== FormatFeatureBit.NONE;'
            }, {
              name: 'FORMAT_PVRTC',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = device.getFormatFeatures(Format.PVRTC_RGB2) !== FormatFeatureBit.NONE;'
            }, {
              name: 'FORMAT_ASTC',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = device.getFormatFeatures(Format.ASTC_RGBA_4x4) !== FormatFeatureBit.NONE;'
            }, {
              name: 'FORMAT_RGB8',
              suggest: 'Please use device.getFormatFeatures() instead, like: \n' + 'let isSupported = device.getFormatFeatures(Format.RGB8) !== FormatFeatureBit.NONE;'
            }]);
            removeProperty(ColorAttachment.prototype, 'ColorAttachment', [{
              name: 'beginAccesses',
              suggest: 'Please assign to ColorAttachment.barrier instead'
            }, {
              name: 'endAccesses',
              suggest: 'Please assign to ColorAttachment.barrier instead'
            }]);
            removeProperty(DepthStencilAttachment.prototype, 'DepthStencilAttachment', [{
              name: 'beginAccesses',
              suggest: 'Please assign to DepthStencilAttachment.barrier instead'
            }, {
              name: 'endAccesses',
              suggest: 'Please assign to DepthStencilAttachment.barrier instead'
            }]);
            replaceProperty(Device.prototype, 'Device', [{
              name: 'getGlobalBarrier',
              newName: 'getGeneralBarrier'
            }]);

            var LegacyRenderMode; exports("L", LegacyRenderMode);
            (function (LegacyRenderMode) {
              LegacyRenderMode[LegacyRenderMode["AUTO"] = 0] = "AUTO";
              LegacyRenderMode[LegacyRenderMode["CANVAS"] = 1] = "CANVAS";
              LegacyRenderMode[LegacyRenderMode["WEBGL"] = 2] = "WEBGL";
              LegacyRenderMode[LegacyRenderMode["HEADLESS"] = 3] = "HEADLESS";
              LegacyRenderMode[LegacyRenderMode["WEBGPU"] = 4] = "WEBGPU";
            })(LegacyRenderMode || (exports("L", LegacyRenderMode = {})));
            var RenderType; exports("R", RenderType);
            (function (RenderType) {
              RenderType[RenderType["UNKNOWN"] = -1] = "UNKNOWN";
              RenderType[RenderType["CANVAS"] = 0] = "CANVAS";
              RenderType[RenderType["WEBGL"] = 1] = "WEBGL";
              RenderType[RenderType["WEBGPU"] = 2] = "WEBGPU";
              RenderType[RenderType["OPENGL"] = 3] = "OPENGL";
              RenderType[RenderType["HEADLESS"] = 4] = "HEADLESS";
            })(RenderType || (exports("R", RenderType = {})));
            var DeviceManager = exports("D", function () {
              function DeviceManager() {
                this.initialized = false;
                this._gfxDevice = void 0;
                this._canvas = null;
                this._swapchain = void 0;
                this._renderType = RenderType.UNKNOWN;
                this._deviceInitialized = false;
              }
              var _proto = DeviceManager.prototype;
              _proto._tryInitializeWebGPUDevice = function _tryInitializeWebGPUDevice(DeviceConstructor, info) {
                var _this = this;
                if (this._deviceInitialized) {
                  return Promise.resolve(true);
                }
                if (DeviceConstructor) {
                  this._gfxDevice = new DeviceConstructor();
                  return new Promise(function (resolve, reject) {
                    _this._gfxDevice.initialize(info).then(function (val) {
                      _this._deviceInitialized = val;
                      resolve(val);
                    })["catch"](function (err) {
                      reject(err);
                    });
                  });
                }
                return Promise.resolve(false);
              };
              _proto._tryInitializeDeviceSync = function _tryInitializeDeviceSync(DeviceConstructor, info) {
                if (this._deviceInitialized) {
                  return true;
                }
                if (DeviceConstructor) {
                  this._gfxDevice = new DeviceConstructor();
                  this._deviceInitialized = this._gfxDevice.initialize(info);
                }
                return this._deviceInitialized;
              };
              _proto.init = function init(canvas, bindingMappingInfo) {
                var _this2 = this;
                if (this.initialized) {
                  return true;
                }
                var renderMode = settings.querySettings(Settings.Category.RENDERING, 'renderMode');
                this._canvas = canvas;
                if (this._canvas) {
                  this._canvas.oncontextmenu = function () {
                    return false;
                  };
                }
                this._renderType = this._determineRenderType(renderMode);
                this._deviceInitialized = false;
                var deviceInfo = new DeviceInfo(bindingMappingInfo);
                if (this._renderType === RenderType.WEBGL || this._renderType === RenderType.WEBGPU) {
                  {
                    var useWebGL2 = !!globalThis.WebGL2RenderingContext;
                    globalThis.navigator.userAgent.toLowerCase();
                    if (sys.browserType === BrowserType.UC) {
                      useWebGL2 = false;
                    }
                    Device.canvas = canvas;
                    if (this._renderType === RenderType.WEBGPU && cclegacy.WebGPUDevice) {
                      return new Promise(function (resolve, reject) {
                        _this2._tryInitializeWebGPUDevice(cclegacy.WebGPUDevice, deviceInfo).then(function (val) {
                          _this2._initSwapchain();
                          resolve(val);
                        })["catch"](function (err) {
                          reject(err);
                        });
                      });
                    }
                    if (useWebGL2 && cclegacy.WebGL2Device) {
                      this._tryInitializeDeviceSync(cclegacy.WebGL2Device, deviceInfo);
                    }
                    if (cclegacy.WebGLDevice) {
                      this._tryInitializeDeviceSync(cclegacy.WebGLDevice, deviceInfo);
                    }
                    if (cclegacy.EmptyDevice) {
                      this._tryInitializeDeviceSync(cclegacy.EmptyDevice, deviceInfo);
                    }
                    this._initSwapchain();
                  }
                } else if (this._renderType === RenderType.HEADLESS && cclegacy.EmptyDevice) {
                  this._tryInitializeDeviceSync(cclegacy.EmptyDevice, deviceInfo);
                  this._initSwapchain();
                }
                if (!this._gfxDevice) {
                  errorID(16337);
                  this._renderType = RenderType.UNKNOWN;
                  return false;
                }
                return true;
              };
              _proto._initSwapchain = function _initSwapchain() {
                var swapchainInfo = new SwapchainInfo(1, this._canvas);
                var windowSize = screen.windowSize;
                swapchainInfo.width = windowSize.width;
                swapchainInfo.height = windowSize.height;
                this._swapchain = this._gfxDevice.createSwapchain(swapchainInfo);
              };
              _proto._supportWebGPU = function _supportWebGPU() {
                return 'gpu' in globalThis.navigator;
              };
              _proto._determineRenderType = function _determineRenderType(renderMode) {
                if (typeof renderMode !== 'number' || renderMode > LegacyRenderMode.WEBGPU || renderMode < LegacyRenderMode.AUTO) {
                  renderMode = LegacyRenderMode.AUTO;
                }
                var renderType = RenderType.CANVAS;
                var supportRender = false;
                if (renderMode === LegacyRenderMode.CANVAS) {
                  renderType = RenderType.CANVAS;
                  supportRender = true;
                } else if (renderMode === LegacyRenderMode.AUTO || renderMode === LegacyRenderMode.WEBGPU) {
                  renderType = this._supportWebGPU() && !EDITOR ? RenderType.WEBGPU : RenderType.WEBGL;
                  supportRender = true;
                } else if (renderMode === LegacyRenderMode.WEBGL) {
                  renderType = RenderType.WEBGL;
                  supportRender = true;
                } else if (renderMode === LegacyRenderMode.HEADLESS) {
                  renderType = RenderType.HEADLESS;
                  supportRender = true;
                }
                if (!supportRender) {
                  throw new Error(getError(3820, renderMode));
                }
                return renderType;
              };
              _createClass(DeviceManager, [{
                key: "gfxDevice",
                get: function get() {
                  return this._gfxDevice;
                }
              }, {
                key: "swapchain",
                get: function get() {
                  return this._swapchain;
                }
              }]);
              return DeviceManager;
            }());
            var deviceManager = exports("d", new DeviceManager());

        })
    };
}));
