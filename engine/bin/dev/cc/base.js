System.register(['./global-exports-C7R_I6Kn.js', './gc-object-CbS29vYa.js', './node-event-BDQEXkZZ.js', './debug-view-CfU41ypM.js', './deprecated-DMYVurVK.js', './scene-B79xt5WD.js', './index-oHSn7cpO.js', './device-manager-gD_whA7Q.js', './buffer-barrier-BmKiPanc.js', './deprecated-CIxijlmD.js', './pipeline-state-manager-C5ShdTPh.js', './render-types-CckVe7el.js', './prefab-CvAWu2P7.js', './deprecated-DbHjng6y.js', './camera-component-2LVRWB7s.js', './model-renderer-CC8iC6el.js', './renderer-2n4MtCXy.js', './deprecated-B0llPila.js', './director-CFEaPqP_.js', './instantiate-CDXpXX6j.js', './_virtual_internal_constants-Cb-eEldT.js', './touch-iR3Bpatu.js', './move-DVEb9A_n.js'], (function (exports) {
    'use strict';
    var legacyCC, CachedArray, Pool, RecyclePool, log, warn, error, assert, _throw, logID, warnID, errorID, assertID, debug, join, extname, mainFileName, basename, dirname, changeExtname, changeBasename, _normalize, stripSep, getSeperator, Camera, CameraAperture, CameraFOVAxis, CameraISO, CameraProjection, CameraShutter, CameraType, CameraUsage, ColorTemperatureToRGB, Light, LightType, Octree, ProbeClearFlag, ProbeType, ReflectionProbe, SKYBOX_FLAG, Skin, SkyBoxFlagValue, TrackingType, nt2lm, DirectionalLight, LODData, LODGroup, Model, ModelType, PointLight, RangedDirectionalLight, SphereLight, SpotLight, SubModel, RenderScene, RenderWindow, Ambient, CSMLevel, CSMOptimizationMode, EnvironmentLightingType, FOG_TYPE_NONE, Fog, FogType, PCFType, PostSettings, ShadowSize, ShadowType, Shadows, Skybox, ToneMappingType, BatchingSchemes, MaterialInstance, Pass, PassInstance, customizeType, genHandle, getBindingFromHandle, getCountFromHandle, getDefaultFromType, getDeviceShaderVersion, getOffsetFromHandle, getStringFromType, getTypeFromHandle, overrideMacros, programLib, type2reader, type2validator, type2writer, DeviceManager, LegacyRenderMode, RenderType, deviceManager, API, AccessFlagBit, Address, Attribute, AttributeName, BarrierType, BindingMappingInfo, BlendFactor, BlendOp, BlendState, BlendTarget, Buffer, BufferBarrierInfo, BufferFlagBit, BufferInfo, BufferTextureCopy, BufferUsageBit, BufferViewInfo, ClearFlagBit, Color, ColorAttachment, ColorMask, CommandBuffer, CommandBufferInfo, CommandBufferType, ComparisonFunc, CullMode, DESCRIPTOR_BUFFER_TYPE, DESCRIPTOR_DYNAMIC_TYPE, DESCRIPTOR_SAMPLER_TYPE, DESCRIPTOR_STORAGE_BUFFER_TYPE, DRAW_INFO_SIZE, DefaultResource, DepthStencilAttachment, DepthStencilState, DescriptorSet, DescriptorSetInfo, DescriptorSetLayout, DescriptorSetLayoutBinding, DescriptorSetLayoutInfo, DescriptorType, Device, DeviceCaps, DeviceInfo, DeviceOptions, DispatchInfo, DrawInfo, DynamicStateFlagBit, DynamicStates, DynamicStencilStates, Extent, Feature, Filter, Format, FormatFeatureBit, FormatInfo, FormatInfos, FormatSize, FormatSurfaceSize, FormatType, Framebuffer, FramebufferInfo, GFXObject, GeneralBarrier, GeneralBarrierInfo, GetTypeSize, IndirectBuffer, InputAssembler, InputAssemblerInfo, InputState, IsPowerOf2, LoadOp, MarkerInfo, MemoryAccessBit, MemoryStatus, MemoryUsageBit, ObjectType, Offset, PassType, PipelineBindPoint, PipelineLayout, PipelineLayoutInfo, PipelineState, PipelineStateInfo, PolygonMode, PrimitiveMode, QueryPoolInfo, QueryType, Queue, QueueInfo, QueueType, RasterizerState, Rect, RenderPass, RenderPassInfo, ResolveMode, ResourceRange, SampleCount, SampleType, Sampler, SamplerInfo, ShadeModel, Shader, ShaderInfo, ShaderStage, ShaderStageFlagBit, Size, Status, StencilFace, StencilOp, StoreOp, SubpassDependency, SubpassInfo, SurfaceTransform, Swapchain, SwapchainInfo, Texture, TextureBarrier, TextureBarrierInfo, TextureBlit, TextureCopy, TextureFlagBit, TextureInfo, TextureSubresLayers, TextureSubresRange, TextureType, TextureUsageBit, TextureViewInfo, Type, Uniform, UniformBlock, UniformInputAttachment, UniformSampler, UniformSamplerTexture, UniformStorageBuffer, UniformStorageImage, UniformTexture, ViewDimension, Viewport, VsyncMode, alignTo, formatAlignment, getTypedArrayConstructor, CameraVisFlags, PassStage, RenderQueue, TextureBufferPool, VisibilityFlags, nearestPOT;
    return {
        setters: [function (module) {
            legacyCC = module.l;
            exports({ VERSION: module.e, cclegacy: module.c });
        }, function (module) {
            CachedArray = module.a5;
            Pool = module.P;
            RecyclePool = module.R;
            log = module.G;
            warn = module.F;
            error = module.L;
            assert = module.H;
            _throw = module.a6;
            logID = module.T;
            warnID = module.w;
            errorID = module.h;
            assertID = module.J;
            debug = module.a7;
            exports({ AsyncDelegate: module.a2, BITMASK_TAG: module.aj, BitMask: module.B, CCBoolean: module.C, CCClass: module.ab, CCFloat: module.o, CCInteger: module.m, CCObject: module.K, CCObjectFlags: module.d, CCString: module.f, CachedArray: module.a5, CallbacksInvoker: module.ak, DebugMode: module.$, ENUM_TAG: module.ai, Enum: module.E, EventTarget: module.n, Eventify: module.Y, GCObject: module.af, Pool: module.P, RecyclePool: module.R, Settings: module.N, SettingsCategory: module.S, ValueType: module.V, _resetDebugSetting: module.a0, assert: module.H, assertID: module.J, assertIsNonNullable: module.Q, assertIsTrue: module.l, assertsArrayIndex: module.c, bits: module.a8, ccenum: module.r, debug: module.x, debugID: module.ac, error: module.L, errorID: module.h, garbageCollectionManager: module.a1, getError: module.g, isCCClassOrFastDefined: module.e, isCCObject: module.i, isDisplayStats: module.ad, isValid: module.D, js: module.a9, log: module.G, logID: module.T, macro: module.z, misc: module.aa, setDisplayStats: module.ae, setPropertyEnumType: module.ag, setPropertyEnumTypeOnAttrs: module.ah, settings: module.s, warn: module.F, warnID: module.w });
        }, function (module) {
            join = module.j;
            extname = module.e;
            mainFileName = module.m;
            basename = module.b;
            dirname = module.d;
            changeExtname = module.a;
            changeBasename = module.c;
            _normalize = module._;
            stripSep = module.s;
            getSeperator = module.g;
            exports({ Asset: module.A, Component: module.C, EventHandler: module.E, JavaScript: module.J, NodeEventType: module.N, Script: module.S, TypeScript: module.T, path: module.p });
        }, function (module) {
            Camera = module.f;
            CameraAperture = module.b;
            CameraFOVAxis = module.a;
            CameraISO = module.d;
            CameraProjection = module.C;
            CameraShutter = module.c;
            CameraType = module.e;
            CameraUsage = module.j;
            ColorTemperatureToRGB = module.k;
            Light = module.l;
            LightType = module.L;
            Octree = module.O;
            ProbeClearFlag = module.m;
            ProbeType = module.n;
            ReflectionProbe = module.o;
            SKYBOX_FLAG = module.p;
            Skin = module.q;
            SkyBoxFlagValue = module.S;
            TrackingType = module.T;
            nt2lm = module.s;
            exports({ DebugView: module.D, PipelineEventProcessor: module.h, PipelineEventType: module.P, PipelineSceneData: module.t, RenderTexture: module.R, RenderingSubMesh: module.g, SceneAsset: module.i });
        }, function (module) {
            DirectionalLight = module.D;
            LODData = module.L;
            LODGroup = module.d;
            Model = module.M;
            ModelType = module.e;
            PointLight = module.P;
            RangedDirectionalLight = module.f;
            SphereLight = module.g;
            SpotLight = module.S;
            SubModel = module.b;
            RenderScene = module.a;
            RenderWindow = module.c;
            exports({ AssetLibrary: module.A, CCLoader: module.C, loader: module.l, url: module.u });
        }, function (module) {
            Ambient = module.A;
            CSMLevel = module.C;
            CSMOptimizationMode = module.o;
            EnvironmentLightingType = module.p;
            FOG_TYPE_NONE = module.F;
            Fog = module.q;
            FogType = module.s;
            PCFType = module.t;
            PostSettings = module.u;
            ShadowSize = module.v;
            ShadowType = module.w;
            Shadows = module.S;
            Skybox = module.x;
            ToneMappingType = module.y;
            BatchingSchemes = module.B;
            MaterialInstance = module.M;
            Pass = module.h;
            PassInstance = module.z;
            customizeType = module.D;
            genHandle = module.G;
            getBindingFromHandle = module.H;
            getCountFromHandle = module.J;
            getDefaultFromType = module.K;
            getDeviceShaderVersion = module.L;
            getOffsetFromHandle = module.O;
            getStringFromType = module.Q;
            getTypeFromHandle = module.R;
            overrideMacros = module.U;
            programLib = module.V;
            type2reader = module.X;
            type2validator = module.Y;
            type2writer = module.Z;
            exports({ AmbientInfo: module.a0, AssetManager: module.aj, BaseNode: module.N, BufferAsset: module.af, BuiltinResMgr: module.al, DEFAULT_OCTREE_DEPTH: module.a6, DEFAULT_WORLD_MAX_POS: module.a5, DEFAULT_WORLD_MIN_POS: module.a4, Details: module.ae, EffectAsset: module.E, FogInfo: module.a2, ImageAsset: module.I, InstancedBuffer: module._, JsonAsset: module.ah, LightProbeInfo: module.aa, Material: module.b, MissingScript: module.ac, MobilityMode: module.c, Node: module.N, NodeSpace: module.$, OctreeInfo: module.a7, PostSettingsInfo: module.a9, Scene: module.l, SceneGlobals: module.ab, ShadowsInfo: module.a3, SkinInfo: module.a8, SkyboxInfo: module.a1, TextAsset: module.ag, Texture2D: module.i, TextureCube: module.ai, TransformBit: module.T, assetManager: module.k, builtinResMgr: module.d, deserialize: module.ad, getPhaseID: module.g, resources: module.ak });
        }, function (module) {
            exports({ AlphaKey: module.aI, Color: module.C, ColorKey: module.aH, CompactValueTypeArray: module.av, EPSILON: module.N, EasingMethod: module.aX, EditorExtendable: module.az, ExtrapolationMode: module.aC, Gradient: module.aJ, HALF_PI: module.a4, MATH_FLOAT_ARRAY: module.am, Mat3: module.L, Mat4: module.M, MathBase: module.an, ObjectCurve: module.aG, Quat: module.Q, QuatCurve: module.aE, QuatInterpolationMode: module.aF, RealCurve: module.aA, RealInterpolationMode: module.aB, Rect: module.l, Scheduler: module.B, Size: module.A, System: module.S, SystemPriority: module.aK, TWO_PI: module.a5, TangentWeightMode: module.aD, Vec2: module.V, Vec3: module.f, Vec4: module.g, WorldNode3DToLocalNodeUI: module.ar, WorldNode3DToWorldNodeUI: module.as, __checkObsoleteInNamespace__: module.aq, __checkObsolete__: module.ap, _decorator: module.au, absMax: module.aj, absMaxComponent: module.ai, approx: module.a7, bezier: module.aM, bezierByTime: module.aN, binarySearch: module.aY, binarySearchBy: module.a_, binarySearchEpsilon: module.aZ, clamp: module.b, clamp01: module.P, color: module.a3, convertUtils: module.at, deprecateModuleExportedName: module.W, deserializeTag: module.aw, disallowAnimation: module.aW, displayName: module.aR, displayOrder: module.aS, easing: module.aL, editable: module.aO, editorExtrasTag: module.e, enumerableProps: module.ak, equals: module.a6, floatToHalf: module.al, formerlySerializedAs: module.k, geometry: module.a1, getSerializationMetadata: module.ay, halfToFloat: module.H, inverseLerp: module.ah, lerp: module.a8, markAsWarning: module.q, mat4: module.w, math: module.a0, nextPow2: module.F, override: module.I, pingPong: module.ag, preTransforms: module.m, pseudoRandom: module.ac, pseudoRandomRange: module.ad, pseudoRandomRangeInt: module.ae, quat: module.a2, random: module.X, randomRange: module.aa, randomRangeInt: module.ab, range: module.aT, rangeStep: module.aU, rect: module.x, removeProperty: module.i, repeat: module.af, replaceProperty: module.r, screen: module.D, serializable: module.s, serializeTag: module.ax, setDefaultLogTimes: module.ao, setRandGenerator: module.a9, size: module.z, slide: module.aV, sys: module.n, toDegree: module.Y, toRadian: module.h, tooltip: module.aP, v2: module.v, v3: module.u, v4: module.y, visible: module.aQ, visibleRect: module.O });
        }, function (module) {
            DeviceManager = module.D;
            LegacyRenderMode = module.L;
            RenderType = module.R;
            deviceManager = module.d;
        }, function (module) {
            API = module.r;
            AccessFlagBit = module.ag;
            Address = module.ae;
            Attribute = module.A;
            AttributeName = module.a;
            BarrierType = module.ah;
            BindingMappingInfo = module.n;
            BlendFactor = module.af;
            BlendOp = module.ai;
            BlendState = module.a4;
            BlendTarget = module.a5;
            Buffer = module.H;
            BufferBarrierInfo = module.aj;
            BufferFlagBit = module.ak;
            BufferInfo = module.B;
            BufferTextureCopy = module.f;
            BufferUsageBit = module.b;
            BufferViewInfo = module.al;
            ClearFlagBit = module.C;
            Color = module.ab;
            ColorAttachment = module.w;
            ColorMask = module.am;
            CommandBuffer = module._;
            CommandBufferInfo = module.an;
            CommandBufferType = module.ao;
            ComparisonFunc = module.ap;
            CullMode = module.aq;
            DESCRIPTOR_BUFFER_TYPE = module.ar;
            DESCRIPTOR_DYNAMIC_TYPE = module.as;
            DESCRIPTOR_SAMPLER_TYPE = module.at;
            DESCRIPTOR_STORAGE_BUFFER_TYPE = module.au;
            DRAW_INFO_SIZE = module.av;
            DefaultResource = module.aw;
            DepthStencilAttachment = module.x;
            DepthStencilState = module.a6;
            DescriptorSet = module.W;
            DescriptorSetInfo = module.ax;
            DescriptorSetLayout = module.X;
            DescriptorSetLayoutBinding = module.g;
            DescriptorSetLayoutInfo = module.ay;
            DescriptorType = module.h;
            Device = module.E;
            DeviceCaps = module.az;
            DeviceInfo = module.a9;
            DeviceOptions = module.aA;
            DispatchInfo = module.aB;
            DrawInfo = module.D;
            DynamicStateFlagBit = module.aC;
            DynamicStates = module.aD;
            DynamicStencilStates = module.aE;
            Extent = module.aF;
            Feature = module.a7;
            Filter = module.v;
            Format = module.F;
            FormatFeatureBit = module.o;
            FormatInfo = module.aG;
            FormatInfos = module.c;
            FormatSize = module.aH;
            FormatSurfaceSize = module.aI;
            FormatType = module.aa;
            Framebuffer = module.Q;
            FramebufferInfo = module.aJ;
            GFXObject = module.aK;
            GeneralBarrier = module.a0;
            GeneralBarrierInfo = module.aL;
            GetTypeSize = module.aM;
            IndirectBuffer = module.aN;
            InputAssembler = module.N;
            InputAssemblerInfo = module.I;
            InputState = module.s;
            IsPowerOf2 = module.aO;
            LoadOp = module.aP;
            MarkerInfo = module.aQ;
            MemoryAccessBit = module.l;
            MemoryStatus = module.aR;
            MemoryUsageBit = module.M;
            ObjectType = module.aS;
            Offset = module.aT;
            PassType = module.aU;
            PipelineBindPoint = module.aV;
            PipelineLayout = module.Y;
            PipelineLayoutInfo = module.aW;
            PipelineState = module.Z;
            PipelineStateInfo = module.t;
            PolygonMode = module.aX;
            PrimitiveMode = module.P;
            QueryPoolInfo = module.aY;
            QueryType = module.aZ;
            Queue = module.$;
            QueueInfo = module.a_;
            QueueType = module.a$;
            RasterizerState = module.a3;
            Rect = module.ac;
            RenderPass = module.O;
            RenderPassInfo = module.R;
            ResolveMode = module.b0;
            ResourceRange = module.b1;
            SampleCount = module.q;
            SampleType = module.b2;
            Sampler = module.K;
            SamplerInfo = module.ad;
            ShadeModel = module.b3;
            Shader = module.L;
            ShaderInfo = module.b4;
            ShaderStage = module.b5;
            ShaderStageFlagBit = module.S;
            Size = module.b6;
            Status = module.b7;
            StencilFace = module.b8;
            StencilOp = module.b9;
            StoreOp = module.y;
            SubpassDependency = module.ba;
            SubpassInfo = module.bb;
            SurfaceTransform = module.bc;
            Swapchain = module.G;
            SwapchainInfo = module.a8;
            Texture = module.J;
            TextureBarrier = module.a1;
            TextureBarrierInfo = module.bd;
            TextureBlit = module.be;
            TextureCopy = module.bf;
            TextureFlagBit = module.p;
            TextureInfo = module.T;
            TextureSubresLayers = module.bg;
            TextureSubresRange = module.bh;
            TextureType = module.d;
            TextureUsageBit = module.e;
            TextureViewInfo = module.bi;
            Type = module.j;
            Uniform = module.i;
            UniformBlock = module.U;
            UniformInputAttachment = module.bj;
            UniformSampler = module.bk;
            UniformSamplerTexture = module.k;
            UniformStorageBuffer = module.bl;
            UniformStorageImage = module.bm;
            UniformTexture = module.bn;
            ViewDimension = module.V;
            Viewport = module.bo;
            VsyncMode = module.bp;
            alignTo = module.bq;
            formatAlignment = module.br;
            getTypedArrayConstructor = module.u;
            exports("murmurhash2_32_gc", module.m);
        }, function (module) {
            CameraVisFlags = module.C;
            PassStage = module.P;
            RenderQueue = module.R;
            TextureBufferPool = module.T;
            VisibilityFlags = module.V;
            nearestPOT = module.n;
        }, function (module) {
            exports({ Layers: module.L, PipelineStateManager: module.P, pipeline: module.m });
        }, function (module) {
            exports("PipelineInputAssemblerData", module.P);
        }, function (module) {
            exports({ Acceleration: module.A, Input: module.I, NodeActivator: module.N, Prefab: module.P, PrivateNode: module.b, SystemEvent: module.S, find: module.f, flattenCodeArray: module.a, input: module.i, systemEvent: module.s });
        }, function (module) {
            exports("PrefabLink", module.P);
        }, function (module) {
            exports({ Camera: module.C, CameraComponent: module.C });
        }, function (module) {
            exports({ ModelRenderer: module.M, RenderableComponent: module.M });
        }, function (module) {
            exports("Renderer", module.R);
        }, function (module) {
            exports({ Game: module.G, game: module.g });
        }, function (module) {
            exports({ Director: module.a, DirectorEvent: module.D, Root: module.R, director: module.d });
        }, function (module) {
            exports("instantiate", module.i);
        }, null, function (module) {
            exports({ Event: module.E, EventAcceleration: module.a, EventGamepad: module.e, EventHMD: module.g, EventHandheld: module.h, EventHandle: module.f, EventKeyboard: module.b, EventMouse: module.c, EventTouch: module.d, KeyCode: module.K, SystemEventType: module.S, Touch: module.T });
        }, function (module) {
            exports("shift", module.s);
        }],
        execute: (function () {

            exports("applyMixins", applyMixins);

            var index$2 = /*#__PURE__*/Object.freeze({
                __proto__: null,
                CachedArray: CachedArray,
                Pool: Pool,
                RecyclePool: RecyclePool
            });
            exports("memop", index$2);

            legacyCC.log = log;
            legacyCC.warn = warn;
            legacyCC.error = error;
            legacyCC.assert = assert;
            legacyCC._throw = _throw;
            legacyCC.logID = logID;
            legacyCC.warnID = warnID;
            legacyCC.errorID = errorID;
            legacyCC.assertID = assertID;
            legacyCC.debug = debug;
            legacyCC.path = {
              join: join,
              extname: extname,
              mainFileName: mainFileName,
              basename: basename,
              dirname: dirname,
              changeExtname: changeExtname,
              changeBasename: changeBasename,
              _normalize: _normalize,
              stripSep: stripSep,
              get sep() {
                return getSeperator();
              }
            };

            function applyMixins(derivedCtor, baseCtors) {
              baseCtors.forEach(function (baseCtor) {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                  if (name !== 'constructor') {
                    Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
                  }
                });
              });
            }

            var index$1 = /*#__PURE__*/Object.freeze({
                __proto__: null,
                get API () { return API; },
                get AccessFlagBit () { return AccessFlagBit; },
                get Address () { return Address; },
                Attribute: Attribute,
                get AttributeName () { return AttributeName; },
                get BarrierType () { return BarrierType; },
                BindingMappingInfo: BindingMappingInfo,
                get BlendFactor () { return BlendFactor; },
                get BlendOp () { return BlendOp; },
                BlendState: BlendState,
                BlendTarget: BlendTarget,
                Buffer: Buffer,
                BufferBarrierInfo: BufferBarrierInfo,
                get BufferFlagBit () { return BufferFlagBit; },
                BufferInfo: BufferInfo,
                BufferTextureCopy: BufferTextureCopy,
                get BufferUsageBit () { return BufferUsageBit; },
                BufferViewInfo: BufferViewInfo,
                get ClearFlagBit () { return ClearFlagBit; },
                Color: Color,
                ColorAttachment: ColorAttachment,
                get ColorMask () { return ColorMask; },
                CommandBuffer: CommandBuffer,
                CommandBufferInfo: CommandBufferInfo,
                get CommandBufferType () { return CommandBufferType; },
                get ComparisonFunc () { return ComparisonFunc; },
                get CullMode () { return CullMode; },
                DESCRIPTOR_BUFFER_TYPE: DESCRIPTOR_BUFFER_TYPE,
                DESCRIPTOR_DYNAMIC_TYPE: DESCRIPTOR_DYNAMIC_TYPE,
                DESCRIPTOR_SAMPLER_TYPE: DESCRIPTOR_SAMPLER_TYPE,
                DESCRIPTOR_STORAGE_BUFFER_TYPE: DESCRIPTOR_STORAGE_BUFFER_TYPE,
                DRAW_INFO_SIZE: DRAW_INFO_SIZE,
                DefaultResource: DefaultResource,
                DepthStencilAttachment: DepthStencilAttachment,
                DepthStencilState: DepthStencilState,
                DescriptorSet: DescriptorSet,
                DescriptorSetInfo: DescriptorSetInfo,
                DescriptorSetLayout: DescriptorSetLayout,
                DescriptorSetLayoutBinding: DescriptorSetLayoutBinding,
                DescriptorSetLayoutInfo: DescriptorSetLayoutInfo,
                get DescriptorType () { return DescriptorType; },
                Device: Device,
                DeviceCaps: DeviceCaps,
                DeviceInfo: DeviceInfo,
                DeviceManager: DeviceManager,
                DeviceOptions: DeviceOptions,
                DispatchInfo: DispatchInfo,
                DrawInfo: DrawInfo,
                get DynamicStateFlagBit () { return DynamicStateFlagBit; },
                DynamicStates: DynamicStates,
                DynamicStencilStates: DynamicStencilStates,
                Extent: Extent,
                get Feature () { return Feature; },
                get Filter () { return Filter; },
                get Format () { return Format; },
                get FormatFeatureBit () { return FormatFeatureBit; },
                FormatInfo: FormatInfo,
                FormatInfos: FormatInfos,
                FormatSize: FormatSize,
                FormatSurfaceSize: FormatSurfaceSize,
                get FormatType () { return FormatType; },
                Framebuffer: Framebuffer,
                FramebufferInfo: FramebufferInfo,
                GFXObject: GFXObject,
                GeneralBarrier: GeneralBarrier,
                GeneralBarrierInfo: GeneralBarrierInfo,
                GetTypeSize: GetTypeSize,
                IndirectBuffer: IndirectBuffer,
                InputAssembler: InputAssembler,
                InputAssemblerInfo: InputAssemblerInfo,
                InputState: InputState,
                IsPowerOf2: IsPowerOf2,
                get LegacyRenderMode () { return LegacyRenderMode; },
                get LoadOp () { return LoadOp; },
                MarkerInfo: MarkerInfo,
                get MemoryAccessBit () { return MemoryAccessBit; },
                MemoryStatus: MemoryStatus,
                get MemoryUsageBit () { return MemoryUsageBit; },
                get ObjectType () { return ObjectType; },
                Offset: Offset,
                get PassType () { return PassType; },
                get PipelineBindPoint () { return PipelineBindPoint; },
                PipelineLayout: PipelineLayout,
                PipelineLayoutInfo: PipelineLayoutInfo,
                PipelineState: PipelineState,
                PipelineStateInfo: PipelineStateInfo,
                get PolygonMode () { return PolygonMode; },
                get PrimitiveMode () { return PrimitiveMode; },
                QueryPoolInfo: QueryPoolInfo,
                get QueryType () { return QueryType; },
                Queue: Queue,
                QueueInfo: QueueInfo,
                get QueueType () { return QueueType; },
                RasterizerState: RasterizerState,
                Rect: Rect,
                RenderPass: RenderPass,
                RenderPassInfo: RenderPassInfo,
                get RenderType () { return RenderType; },
                get ResolveMode () { return ResolveMode; },
                ResourceRange: ResourceRange,
                get SampleCount () { return SampleCount; },
                get SampleType () { return SampleType; },
                Sampler: Sampler,
                SamplerInfo: SamplerInfo,
                get ShadeModel () { return ShadeModel; },
                Shader: Shader,
                ShaderInfo: ShaderInfo,
                ShaderStage: ShaderStage,
                get ShaderStageFlagBit () { return ShaderStageFlagBit; },
                Size: Size,
                get Status () { return Status; },
                get StencilFace () { return StencilFace; },
                get StencilOp () { return StencilOp; },
                get StoreOp () { return StoreOp; },
                SubpassDependency: SubpassDependency,
                SubpassInfo: SubpassInfo,
                get SurfaceTransform () { return SurfaceTransform; },
                Swapchain: Swapchain,
                SwapchainInfo: SwapchainInfo,
                Texture: Texture,
                TextureBarrier: TextureBarrier,
                TextureBarrierInfo: TextureBarrierInfo,
                TextureBlit: TextureBlit,
                TextureCopy: TextureCopy,
                get TextureFlagBit () { return TextureFlagBit; },
                TextureInfo: TextureInfo,
                TextureSubresLayers: TextureSubresLayers,
                TextureSubresRange: TextureSubresRange,
                get TextureType () { return TextureType; },
                get TextureUsageBit () { return TextureUsageBit; },
                TextureViewInfo: TextureViewInfo,
                get Type () { return Type; },
                Uniform: Uniform,
                UniformBlock: UniformBlock,
                UniformInputAttachment: UniformInputAttachment,
                UniformSampler: UniformSampler,
                UniformSamplerTexture: UniformSamplerTexture,
                UniformStorageBuffer: UniformStorageBuffer,
                UniformStorageImage: UniformStorageImage,
                UniformTexture: UniformTexture,
                get ViewDimension () { return ViewDimension; },
                Viewport: Viewport,
                get VsyncMode () { return VsyncMode; },
                alignTo: alignTo,
                deviceManager: deviceManager,
                formatAlignment: formatAlignment,
                getTypedArrayConstructor: getTypedArrayConstructor
            });
            exports("gfx", index$1);

            var index = /*#__PURE__*/Object.freeze({
                __proto__: null,
                Ambient: Ambient,
                CSMLevel: CSMLevel,
                CSMOptimizationMode: CSMOptimizationMode,
                Camera: Camera,
                get CameraAperture () { return CameraAperture; },
                get CameraFOVAxis () { return CameraFOVAxis; },
                get CameraISO () { return CameraISO; },
                get CameraProjection () { return CameraProjection; },
                get CameraShutter () { return CameraShutter; },
                get CameraType () { return CameraType; },
                get CameraUsage () { return CameraUsage; },
                ColorTemperatureToRGB: ColorTemperatureToRGB,
                DirectionalLight: DirectionalLight,
                get EnvironmentLightingType () { return EnvironmentLightingType; },
                FOG_TYPE_NONE: FOG_TYPE_NONE,
                Fog: Fog,
                FogType: FogType,
                LODData: LODData,
                LODGroup: LODGroup,
                Light: Light,
                get LightType () { return LightType; },
                Model: Model,
                get ModelType () { return ModelType; },
                Octree: Octree,
                PCFType: PCFType,
                PointLight: PointLight,
                PostSettings: PostSettings,
                get ProbeClearFlag () { return ProbeClearFlag; },
                get ProbeType () { return ProbeType; },
                RangedDirectionalLight: RangedDirectionalLight,
                ReflectionProbe: ReflectionProbe,
                SKYBOX_FLAG: SKYBOX_FLAG,
                ShadowSize: ShadowSize,
                ShadowType: ShadowType,
                Shadows: Shadows,
                Skin: Skin,
                get SkyBoxFlagValue () { return SkyBoxFlagValue; },
                Skybox: Skybox,
                SphereLight: SphereLight,
                SpotLight: SpotLight,
                SubModel: SubModel,
                ToneMappingType: ToneMappingType,
                get TrackingType () { return TrackingType; },
                nt2lm: nt2lm
            });

            function createIA(device, data) {
              if (!data.positions) {
                errorID(16306);
                return null;
              }
              var verts = [];
              var vcount = data.positions.length / 3;
              for (var i = 0; i < vcount; ++i) {
                verts.push(data.positions[3 * i], data.positions[3 * i + 1], data.positions[3 * i + 2]);
                if (data.normals) {
                  verts.push(data.normals[3 * i], data.normals[3 * i + 1], data.normals[3 * i + 2]);
                }
                if (data.uvs) {
                  verts.push(data.uvs[2 * i], data.uvs[2 * i + 1]);
                }
                if (data.colors) {
                  verts.push(data.colors[3 * i], data.colors[3 * i + 1], data.colors[3 * i + 2]);
                }
              }
              var vfmt = [];
              vfmt.push(new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F));
              if (data.normals) {
                vfmt.push(new Attribute(AttributeName.ATTR_NORMAL, Format.RGB32F));
              }
              if (data.uvs) {
                vfmt.push(new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F));
              }
              if (data.colors) {
                vfmt.push(new Attribute(AttributeName.ATTR_COLOR, Format.RGB32F));
              }
              var vb = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, verts.length * 4, verts.length * 4 / vcount));
              vb.update(new Float32Array(verts));
              var ib = null;
              if (data.indices) {
                ib = device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, data.indices.length * 2, 2));
                ib.update(new Uint16Array(data.indices));
              }
              return device.createInputAssembler(new InputAssemblerInfo(vfmt, [vb], ib));
            }

            var renderer = /*#__PURE__*/Object.freeze({
                __proto__: null,
                get BatchingSchemes () { return BatchingSchemes; },
                CameraVisFlags: CameraVisFlags,
                MaterialInstance: MaterialInstance,
                Pass: Pass,
                PassInstance: PassInstance,
                get PassStage () { return PassStage; },
                get RenderQueue () { return RenderQueue; },
                RenderScene: RenderScene,
                RenderWindow: RenderWindow,
                TextureBufferPool: TextureBufferPool,
                VisibilityFlags: VisibilityFlags,
                createIA: createIA,
                customizeType: customizeType,
                genHandle: genHandle,
                getBindingFromHandle: getBindingFromHandle,
                getCountFromHandle: getCountFromHandle,
                getDefaultFromType: getDefaultFromType,
                getDeviceShaderVersion: getDeviceShaderVersion,
                getOffsetFromHandle: getOffsetFromHandle,
                getStringFromType: getStringFromType,
                getTypeFromHandle: getTypeFromHandle,
                nearestPOT: nearestPOT,
                overrideMacros: overrideMacros,
                programLib: programLib,
                scene: index,
                type2reader: type2reader,
                type2validator: type2validator,
                type2writer: type2writer
            });
            exports("renderer", renderer);

            var NodePool = exports("NodePool", function () {
              function NodePool(poolHandlerComp) {
                this._pool = [];
                this.poolHandlerComp = poolHandlerComp;
              }
              var _proto = NodePool.prototype;
              _proto.size =
              function size() {
                return this._pool.length;
              }
              ;
              _proto.clear =
              function clear() {
                var count = this._pool.length;
                for (var i = 0; i < count; ++i) {
                  this._pool[i].destroy();
                }
                this._pool.length = 0;
              }
              ;
              _proto.put =
              function put(obj) {
                if (obj && this._pool.indexOf(obj) === -1) {
                  obj.removeFromParent();
                  var handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null;
                  if (handler && handler.unuse) {
                    handler.unuse();
                  }
                  this._pool.push(obj);
                }
              }
              ;
              _proto.get =
              function get() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }
                var last = this._pool.length - 1;
                if (last < 0) {
                  return null;
                } else {
                  var obj = this._pool[last];
                  this._pool.length = last;
                  var handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null;
                  if (handler && handler.reuse) {
                    handler.reuse(arguments);
                  }
                  return obj;
                }
              };
              return NodePool;
            }());
            legacyCC.NodePool = NodePool;

            var _globalThis$jsb, _globalJsb$copyTextTo;
            var globalJsb = (_globalThis$jsb = globalThis.jsb) !== null && _globalThis$jsb !== void 0 ? _globalThis$jsb : {};
            var _native = exports("native", {
              DownloaderHints: globalJsb.DownloaderHints,
              Downloader: globalJsb.Downloader,
              zipUtils: globalJsb.zipUtils,
              fileUtils: globalJsb.fileUtils,
              DebugRenderer: globalJsb.DebugRenderer,
              copyTextToClipboard: (_globalJsb$copyTextTo = globalJsb.copyTextToClipboard) == null ? void 0 : _globalJsb$copyTextTo.bind(globalJsb),
              garbageCollect: globalJsb.garbageCollect,
              reflection: globalJsb.reflection,
              bridge: globalJsb.bridge,
              jsbBridgeWrapper: globalJsb.jsbBridgeWrapper,
              AssetsManager: globalJsb.AssetsManager,
              EventAssetsManager: globalJsb.EventAssetsManager,
              Manifest: globalJsb.Manifest,
              saveImageData: globalJsb.saveImageData,
              process: globalJsb.process,
              adpf: globalJsb.adpf
            });

            legacyCC.renderer = renderer;

        })
    };
}));
