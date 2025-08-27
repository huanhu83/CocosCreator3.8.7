System.register(['./gc-object-CbS29vYa.js', './global-exports-C7R_I6Kn.js', './index-oHSn7cpO.js', './device-manager-gD_whA7Q.js', './buffer-barrier-BmKiPanc.js'], (function (exports) {
    'use strict';
    var Enum, BitMask, _extends, settings, SettingsCategory, warnID, assertIsTrue, getError, value, log2, _createClass, RecyclePool, legacyCC, cclegacy, DescriptorSetLayoutBinding, DescriptorType, ShaderStageFlagBit, UniformBlock, Uniform, Type, UniformSamplerTexture, MemoryAccessBit, ViewDimension, BindingMappingInfo, Format, FormatFeatureBit, TextureInfo, TextureType, TextureUsageBit, TextureFlagBit, SampleCount, API, InputState, PipelineStateInfo;
    return {
        setters: [function (module) {
            Enum = module.E;
            BitMask = module.B;
            _extends = module.t;
            settings = module.s;
            SettingsCategory = module.S;
            warnID = module.w;
            assertIsTrue = module.l;
            getError = module.g;
            value = module.v;
            log2 = module.u;
            _createClass = module.a;
            RecyclePool = module.R;
        }, function (module) {
            legacyCC = module.l;
            cclegacy = module.c;
        }, null, null, function (module) {
            DescriptorSetLayoutBinding = module.g;
            DescriptorType = module.h;
            ShaderStageFlagBit = module.S;
            UniformBlock = module.U;
            Uniform = module.i;
            Type = module.j;
            UniformSamplerTexture = module.k;
            MemoryAccessBit = module.l;
            ViewDimension = module.V;
            BindingMappingInfo = module.n;
            Format = module.F;
            FormatFeatureBit = module.o;
            TextureInfo = module.T;
            TextureType = module.d;
            TextureUsageBit = module.e;
            TextureFlagBit = module.p;
            SampleCount = module.q;
            API = module.r;
            InputState = module.s;
            PipelineStateInfo = module.t;
        }],
        execute: (function () {

            exports({
                F: supportsRGBA16HalfFloatTexture,
                G: getDefaultShadowTexture,
                Y: getPassPool,
                i: isEnableEffect,
                l: localDescriptorSetLayout_ResizeMaxJoints,
                z: supportsR32FloatTexture
            });

            var layerList = {
              NONE: 0,
              IGNORE_RAYCAST: 1 << 20,
              GIZMOS: 1 << 21,
              EDITOR: 1 << 22,
              UI_3D: 1 << 23,
              SCENE_GIZMO: 1 << 24,
              UI_2D: 1 << 25,
              PROFILER: 1 << 28,
              DEFAULT: 1 << 30,
              ALL: 0xffffffff
            };
            var Layers = exports("L", function () {
              function Layers() {}
              Layers.init =
              function init() {
                var userLayers = settings.querySettings(SettingsCategory.ENGINE, 'customLayers');
                if (!userLayers) return;
                for (var i = 0; i < userLayers.length; i++) {
                  var layer = userLayers[i];
                  Layers.addLayer(layer.name, layer.bit);
                }
              }
              ;
              Layers.makeMaskInclude =
              function makeMaskInclude(includes) {
                return includes.reduce(function (mask, inc) {
                  return mask | inc;
                }, 0);
              }
              ;
              Layers.makeMaskExclude =
              function makeMaskExclude(excludes) {
                return ~Layers.makeMaskInclude(excludes);
              }
              ;
              Layers.addLayer =
              function addLayer(name, bitNum) {
                if (bitNum === undefined) {
                  warnID(16364);
                  return;
                }
                if (bitNum > 19 || bitNum < 0) {
                  warnID(16365);
                  return;
                }
                var val = 1 << bitNum;
                assertIsTrue(!Layers.Enum[name], getError(2104, name));
                Layers.Enum[name] = val;
                value(Layers.Enum, String(val), name);
                Layers.BitMask[name] = val;
                value(Layers.BitMask, String(val), name);
                BitMask.update(Layers.BitMask);
                Enum.update(Layers.Enum);
              }
              ;
              Layers.deleteLayer =
              function deleteLayer(bitNum) {
                if (bitNum > 19 || bitNum < 0) {
                  warnID(16366);
                  return;
                }
                var val = 1 << bitNum;
                delete Layers.Enum[Layers.Enum[val]];
                delete Layers.Enum[val];
                delete Layers.BitMask[Layers.BitMask[val]];
                delete Layers.BitMask[val];
                BitMask.update(Layers.BitMask);
                Enum.update(Layers.Enum);
              }
              ;
              Layers.nameToLayer =
              function nameToLayer(name) {
                if (name === undefined) {
                  warnID(16367);
                  return -1;
                }
                return log2(Layers.Enum[name]);
              }
              ;
              Layers.layerToName =
              function layerToName(bitNum) {
                if (bitNum > 31 || bitNum < 0) {
                  warnID(16368);
                  return '';
                }
                return Layers.Enum[1 << bitNum];
              };
              return Layers;
            }());
            Layers.Enum = Enum(layerList);
            Layers.BitMask = BitMask(_extends({}, layerList));
            legacyCC.Layers = Layers;

            var _class, _class2, _class3, _class4, _class5, _class6, _class7, _class8, _class10, _class11, _class12, _class13, _class14, _class15;
            var PIPELINE_FLOW_MAIN = exports("$", 'MainFlow');
            var PIPELINE_FLOW_FORWARD = exports("Z", 'ForwardFlow');
            var PIPELINE_FLOW_SHADOW = exports("_", 'ShadowFlow');
            var PIPELINE_FLOW_SMAA = 'SMAAFlow';
            var PIPELINE_FLOW_TONEMAP = 'ToneMapFlow';
            var RenderPassStage; exports("a0", RenderPassStage);
            (function (RenderPassStage) {
              RenderPassStage[RenderPassStage["DEFAULT"] = 100] = "DEFAULT";
              RenderPassStage[RenderPassStage["UI"] = 200] = "UI";
            })(RenderPassStage || (exports("a0", RenderPassStage = {})));
            cclegacy.RenderPassStage = RenderPassStage;
            var RenderPriority; exports("R", RenderPriority);
            (function (RenderPriority) {
              RenderPriority[RenderPriority["MIN"] = 0] = "MIN";
              RenderPriority[RenderPriority["MAX"] = 255] = "MAX";
              RenderPriority[RenderPriority["DEFAULT"] = 128] = "DEFAULT";
            })(RenderPriority || (exports("R", RenderPriority = {})));
            var globalDescriptorSetLayout = exports("N", {
              bindings: [],
              layouts: {}
            });
            var localDescriptorSetLayout = exports("H", {
              bindings: [],
              layouts: {}
            });
            var PipelineGlobalBindings; exports("J", PipelineGlobalBindings);
            (function (PipelineGlobalBindings) {
              PipelineGlobalBindings[PipelineGlobalBindings["UBO_GLOBAL"] = 0] = "UBO_GLOBAL";
              PipelineGlobalBindings[PipelineGlobalBindings["UBO_CAMERA"] = 1] = "UBO_CAMERA";
              PipelineGlobalBindings[PipelineGlobalBindings["UBO_SHADOW"] = 2] = "UBO_SHADOW";
              PipelineGlobalBindings[PipelineGlobalBindings["UBO_CSM"] = 3] = "UBO_CSM";
              PipelineGlobalBindings[PipelineGlobalBindings["SAMPLER_SHADOWMAP"] = 4] = "SAMPLER_SHADOWMAP";
              PipelineGlobalBindings[PipelineGlobalBindings["SAMPLER_ENVIRONMENT"] = 5] = "SAMPLER_ENVIRONMENT";
              PipelineGlobalBindings[PipelineGlobalBindings["SAMPLER_SPOT_SHADOW_MAP"] = 6] = "SAMPLER_SPOT_SHADOW_MAP";
              PipelineGlobalBindings[PipelineGlobalBindings["SAMPLER_DIFFUSEMAP"] = 7] = "SAMPLER_DIFFUSEMAP";
              PipelineGlobalBindings[PipelineGlobalBindings["COUNT"] = 8] = "COUNT";
            })(PipelineGlobalBindings || (exports("J", PipelineGlobalBindings = {})));
            var GLOBAL_UBO_COUNT = PipelineGlobalBindings.SAMPLER_SHADOWMAP;
            var GLOBAL_SAMPLER_COUNT = PipelineGlobalBindings.COUNT - GLOBAL_UBO_COUNT;
            var ModelLocalBindings; exports("M", ModelLocalBindings);
            (function (ModelLocalBindings) {
              ModelLocalBindings[ModelLocalBindings["UBO_LOCAL"] = 0] = "UBO_LOCAL";
              ModelLocalBindings[ModelLocalBindings["UBO_FORWARD_LIGHTS"] = 1] = "UBO_FORWARD_LIGHTS";
              ModelLocalBindings[ModelLocalBindings["UBO_SKINNING_ANIMATION"] = 2] = "UBO_SKINNING_ANIMATION";
              ModelLocalBindings[ModelLocalBindings["UBO_SKINNING_TEXTURE"] = 3] = "UBO_SKINNING_TEXTURE";
              ModelLocalBindings[ModelLocalBindings["UBO_MORPH"] = 4] = "UBO_MORPH";
              ModelLocalBindings[ModelLocalBindings["UBO_UI_LOCAL"] = 5] = "UBO_UI_LOCAL";
              ModelLocalBindings[ModelLocalBindings["UBO_SH"] = 6] = "UBO_SH";
              ModelLocalBindings[ModelLocalBindings["SAMPLER_JOINTS"] = 7] = "SAMPLER_JOINTS";
              ModelLocalBindings[ModelLocalBindings["SAMPLER_MORPH_POSITION"] = 8] = "SAMPLER_MORPH_POSITION";
              ModelLocalBindings[ModelLocalBindings["SAMPLER_MORPH_NORMAL"] = 9] = "SAMPLER_MORPH_NORMAL";
              ModelLocalBindings[ModelLocalBindings["SAMPLER_MORPH_TANGENT"] = 10] = "SAMPLER_MORPH_TANGENT";
              ModelLocalBindings[ModelLocalBindings["SAMPLER_LIGHTMAP"] = 11] = "SAMPLER_LIGHTMAP";
              ModelLocalBindings[ModelLocalBindings["SAMPLER_SPRITE"] = 12] = "SAMPLER_SPRITE";
              ModelLocalBindings[ModelLocalBindings["SAMPLER_REFLECTION_PROBE_CUBE"] = 13] = "SAMPLER_REFLECTION_PROBE_CUBE";
              ModelLocalBindings[ModelLocalBindings["SAMPLER_REFLECTION_PROBE_PLANAR"] = 14] = "SAMPLER_REFLECTION_PROBE_PLANAR";
              ModelLocalBindings[ModelLocalBindings["SAMPLER_REFLECTION_PROBE_DATA_MAP"] = 15] = "SAMPLER_REFLECTION_PROBE_DATA_MAP";
              ModelLocalBindings[ModelLocalBindings["COUNT"] = 16] = "COUNT";
            })(ModelLocalBindings || (exports("M", ModelLocalBindings = {})));
            var LOCAL_UBO_COUNT = ModelLocalBindings.SAMPLER_JOINTS;
            var LOCAL_SAMPLER_COUNT = ModelLocalBindings.COUNT - LOCAL_UBO_COUNT;
            var LOCAL_STORAGE_IMAGE_COUNT = ModelLocalBindings.COUNT - LOCAL_UBO_COUNT - LOCAL_SAMPLER_COUNT;
            var SetIndex; exports("S", SetIndex);
            (function (SetIndex) {
              SetIndex[SetIndex["GLOBAL"] = 0] = "GLOBAL";
              SetIndex[SetIndex["MATERIAL"] = 1] = "MATERIAL";
              SetIndex[SetIndex["LOCAL"] = 2] = "LOCAL";
              SetIndex[SetIndex["COUNT"] = 3] = "COUNT";
            })(SetIndex || (exports("S", SetIndex = {})));
            var bindingMappingInfo = exports("k", new BindingMappingInfo([GLOBAL_UBO_COUNT, 0, LOCAL_UBO_COUNT, 0],
            [GLOBAL_SAMPLER_COUNT, 0, LOCAL_SAMPLER_COUNT, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, LOCAL_STORAGE_IMAGE_COUNT, 0],
            [0, 0, 0, 0],
            [0, 2, 1, 3]));
            var UBOGlobalEnum; exports("U", UBOGlobalEnum);
            (function (UBOGlobalEnum) {
              UBOGlobalEnum[UBOGlobalEnum["TIME_OFFSET"] = 0] = "TIME_OFFSET";
              UBOGlobalEnum[UBOGlobalEnum["SCREEN_SIZE_OFFSET"] = 4] = "SCREEN_SIZE_OFFSET";
              UBOGlobalEnum[UBOGlobalEnum["NATIVE_SIZE_OFFSET"] = 8] = "NATIVE_SIZE_OFFSET";
              UBOGlobalEnum[UBOGlobalEnum["PROBE_INFO_OFFSET"] = 12] = "PROBE_INFO_OFFSET";
              UBOGlobalEnum[UBOGlobalEnum["DEBUG_VIEW_MODE_OFFSET"] = 16] = "DEBUG_VIEW_MODE_OFFSET";
              UBOGlobalEnum[UBOGlobalEnum["COUNT"] = 20] = "COUNT";
              UBOGlobalEnum[UBOGlobalEnum["SIZE"] = 80] = "SIZE";
            })(UBOGlobalEnum || (exports("U", UBOGlobalEnum = {})));
            var UBOGlobal = exports("Q", function UBOGlobal() {});
            _class = UBOGlobal;
            UBOGlobal.TIME_OFFSET = UBOGlobalEnum.TIME_OFFSET;
            UBOGlobal.SCREEN_SIZE_OFFSET = UBOGlobalEnum.SCREEN_SIZE_OFFSET;
            UBOGlobal.NATIVE_SIZE_OFFSET = UBOGlobalEnum.NATIVE_SIZE_OFFSET;
            UBOGlobal.PROBE_INFO_OFFSET = UBOGlobalEnum.PROBE_INFO_OFFSET;
            UBOGlobal.DEBUG_VIEW_MODE_OFFSET = UBOGlobalEnum.DEBUG_VIEW_MODE_OFFSET;
            UBOGlobal.COUNT = UBOGlobalEnum.COUNT;
            UBOGlobal.SIZE = UBOGlobalEnum.SIZE;
            UBOGlobal.NAME = 'CCGlobal';
            UBOGlobal.BINDING = PipelineGlobalBindings.UBO_GLOBAL;
            UBOGlobal.DESCRIPTOR = new DescriptorSetLayoutBinding(_class.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.ALL);
            UBOGlobal.LAYOUT = new UniformBlock(SetIndex.GLOBAL, _class.BINDING, _class.NAME, [new Uniform('cc_time', Type.FLOAT4, 1), new Uniform('cc_screenSize', Type.FLOAT4, 1), new Uniform('cc_nativeSize', Type.FLOAT4, 1), new Uniform('cc_probeInfo', Type.FLOAT4, 1), new Uniform('cc_debug_view_mode', Type.FLOAT4, 1)], 1);
            globalDescriptorSetLayout.layouts[UBOGlobal.NAME] = UBOGlobal.LAYOUT;
            globalDescriptorSetLayout.bindings[UBOGlobal.BINDING] = UBOGlobal.DESCRIPTOR;
            var UBOCameraEnum; exports("a", UBOCameraEnum);
            (function (UBOCameraEnum) {
              UBOCameraEnum[UBOCameraEnum["MAT_VIEW_OFFSET"] = 0] = "MAT_VIEW_OFFSET";
              UBOCameraEnum[UBOCameraEnum["MAT_VIEW_INV_OFFSET"] = 16] = "MAT_VIEW_INV_OFFSET";
              UBOCameraEnum[UBOCameraEnum["MAT_PROJ_OFFSET"] = 32] = "MAT_PROJ_OFFSET";
              UBOCameraEnum[UBOCameraEnum["MAT_PROJ_INV_OFFSET"] = 48] = "MAT_PROJ_INV_OFFSET";
              UBOCameraEnum[UBOCameraEnum["MAT_VIEW_PROJ_OFFSET"] = 64] = "MAT_VIEW_PROJ_OFFSET";
              UBOCameraEnum[UBOCameraEnum["MAT_VIEW_PROJ_INV_OFFSET"] = 80] = "MAT_VIEW_PROJ_INV_OFFSET";
              UBOCameraEnum[UBOCameraEnum["CAMERA_POS_OFFSET"] = 96] = "CAMERA_POS_OFFSET";
              UBOCameraEnum[UBOCameraEnum["SURFACE_TRANSFORM_OFFSET"] = 100] = "SURFACE_TRANSFORM_OFFSET";
              UBOCameraEnum[UBOCameraEnum["SCREEN_SCALE_OFFSET"] = 104] = "SCREEN_SCALE_OFFSET";
              UBOCameraEnum[UBOCameraEnum["EXPOSURE_OFFSET"] = 108] = "EXPOSURE_OFFSET";
              UBOCameraEnum[UBOCameraEnum["MAIN_LIT_DIR_OFFSET"] = 112] = "MAIN_LIT_DIR_OFFSET";
              UBOCameraEnum[UBOCameraEnum["MAIN_LIT_COLOR_OFFSET"] = 116] = "MAIN_LIT_COLOR_OFFSET";
              UBOCameraEnum[UBOCameraEnum["AMBIENT_SKY_OFFSET"] = 120] = "AMBIENT_SKY_OFFSET";
              UBOCameraEnum[UBOCameraEnum["AMBIENT_GROUND_OFFSET"] = 124] = "AMBIENT_GROUND_OFFSET";
              UBOCameraEnum[UBOCameraEnum["GLOBAL_FOG_COLOR_OFFSET"] = 128] = "GLOBAL_FOG_COLOR_OFFSET";
              UBOCameraEnum[UBOCameraEnum["GLOBAL_FOG_BASE_OFFSET"] = 132] = "GLOBAL_FOG_BASE_OFFSET";
              UBOCameraEnum[UBOCameraEnum["GLOBAL_FOG_ADD_OFFSET"] = 136] = "GLOBAL_FOG_ADD_OFFSET";
              UBOCameraEnum[UBOCameraEnum["NEAR_FAR_OFFSET"] = 140] = "NEAR_FAR_OFFSET";
              UBOCameraEnum[UBOCameraEnum["VIEW_PORT_OFFSET"] = 144] = "VIEW_PORT_OFFSET";
              UBOCameraEnum[UBOCameraEnum["COUNT"] = 148] = "COUNT";
              UBOCameraEnum[UBOCameraEnum["SIZE"] = 592] = "SIZE";
            })(UBOCameraEnum || (exports("a", UBOCameraEnum = {})));
            var UBOCamera = exports("T", function UBOCamera() {});
            _class2 = UBOCamera;
            UBOCamera.MAT_VIEW_OFFSET = UBOCameraEnum.MAT_VIEW_OFFSET;
            UBOCamera.MAT_VIEW_INV_OFFSET = UBOCameraEnum.MAT_VIEW_INV_OFFSET;
            UBOCamera.MAT_PROJ_OFFSET = UBOCameraEnum.MAT_PROJ_OFFSET;
            UBOCamera.MAT_PROJ_INV_OFFSET = UBOCameraEnum.MAT_PROJ_INV_OFFSET;
            UBOCamera.MAT_VIEW_PROJ_OFFSET = UBOCameraEnum.MAT_VIEW_PROJ_OFFSET;
            UBOCamera.MAT_VIEW_PROJ_INV_OFFSET = UBOCameraEnum.MAT_VIEW_PROJ_INV_OFFSET;
            UBOCamera.CAMERA_POS_OFFSET = UBOCameraEnum.CAMERA_POS_OFFSET;
            UBOCamera.SURFACE_TRANSFORM_OFFSET = UBOCameraEnum.SURFACE_TRANSFORM_OFFSET;
            UBOCamera.SCREEN_SCALE_OFFSET = UBOCameraEnum.SCREEN_SCALE_OFFSET;
            UBOCamera.EXPOSURE_OFFSET = UBOCameraEnum.EXPOSURE_OFFSET;
            UBOCamera.MAIN_LIT_DIR_OFFSET = UBOCameraEnum.MAIN_LIT_DIR_OFFSET;
            UBOCamera.MAIN_LIT_COLOR_OFFSET = UBOCameraEnum.MAIN_LIT_COLOR_OFFSET;
            UBOCamera.AMBIENT_SKY_OFFSET = UBOCameraEnum.AMBIENT_SKY_OFFSET;
            UBOCamera.AMBIENT_GROUND_OFFSET = UBOCameraEnum.AMBIENT_GROUND_OFFSET;
            UBOCamera.GLOBAL_FOG_COLOR_OFFSET = UBOCameraEnum.GLOBAL_FOG_COLOR_OFFSET;
            UBOCamera.GLOBAL_FOG_BASE_OFFSET = UBOCameraEnum.GLOBAL_FOG_BASE_OFFSET;
            UBOCamera.GLOBAL_FOG_ADD_OFFSET = UBOCameraEnum.GLOBAL_FOG_ADD_OFFSET;
            UBOCamera.NEAR_FAR_OFFSET = UBOCameraEnum.NEAR_FAR_OFFSET;
            UBOCamera.VIEW_PORT_OFFSET = UBOCameraEnum.VIEW_PORT_OFFSET;
            UBOCamera.COUNT = UBOCameraEnum.COUNT;
            UBOCamera.SIZE = UBOCameraEnum.SIZE;
            UBOCamera.NAME = 'CCCamera';
            UBOCamera.BINDING = PipelineGlobalBindings.UBO_CAMERA;
            UBOCamera.DESCRIPTOR = new DescriptorSetLayoutBinding(_class2.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.ALL);
            UBOCamera.LAYOUT = new UniformBlock(SetIndex.GLOBAL, _class2.BINDING, _class2.NAME, [new Uniform('cc_matView', Type.MAT4, 1), new Uniform('cc_matViewInv', Type.MAT4, 1), new Uniform('cc_matProj', Type.MAT4, 1), new Uniform('cc_matProjInv', Type.MAT4, 1), new Uniform('cc_matViewProj', Type.MAT4, 1), new Uniform('cc_matViewProjInv', Type.MAT4, 1), new Uniform('cc_cameraPos', Type.FLOAT4, 1), new Uniform('cc_surfaceTransform', Type.FLOAT4, 1), new Uniform('cc_screenScale', Type.FLOAT4, 1), new Uniform('cc_exposure', Type.FLOAT4, 1), new Uniform('cc_mainLitDir', Type.FLOAT4, 1), new Uniform('cc_mainLitColor', Type.FLOAT4, 1), new Uniform('cc_ambientSky', Type.FLOAT4, 1), new Uniform('cc_ambientGround', Type.FLOAT4, 1), new Uniform('cc_fogColor', Type.FLOAT4, 1), new Uniform('cc_fogBase', Type.FLOAT4, 1), new Uniform('cc_fogAdd', Type.FLOAT4, 1), new Uniform('cc_nearFar', Type.FLOAT4, 1), new Uniform('cc_viewPort', Type.FLOAT4, 1)], 1);
            globalDescriptorSetLayout.layouts[UBOCamera.NAME] = UBOCamera.LAYOUT;
            globalDescriptorSetLayout.bindings[UBOCamera.BINDING] = UBOCamera.DESCRIPTOR;
            var UBOShadowEnum; exports("b", UBOShadowEnum);
            (function (UBOShadowEnum) {
              UBOShadowEnum[UBOShadowEnum["MAT_LIGHT_VIEW_OFFSET"] = 0] = "MAT_LIGHT_VIEW_OFFSET";
              UBOShadowEnum[UBOShadowEnum["MAT_LIGHT_VIEW_PROJ_OFFSET"] = 16] = "MAT_LIGHT_VIEW_PROJ_OFFSET";
              UBOShadowEnum[UBOShadowEnum["SHADOW_INV_PROJ_DEPTH_INFO_OFFSET"] = 32] = "SHADOW_INV_PROJ_DEPTH_INFO_OFFSET";
              UBOShadowEnum[UBOShadowEnum["SHADOW_PROJ_DEPTH_INFO_OFFSET"] = 36] = "SHADOW_PROJ_DEPTH_INFO_OFFSET";
              UBOShadowEnum[UBOShadowEnum["SHADOW_PROJ_INFO_OFFSET"] = 40] = "SHADOW_PROJ_INFO_OFFSET";
              UBOShadowEnum[UBOShadowEnum["SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET"] = 44] = "SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET";
              UBOShadowEnum[UBOShadowEnum["SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET"] = 48] = "SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET";
              UBOShadowEnum[UBOShadowEnum["SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET"] = 52] = "SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET";
              UBOShadowEnum[UBOShadowEnum["SHADOW_COLOR_OFFSET"] = 56] = "SHADOW_COLOR_OFFSET";
              UBOShadowEnum[UBOShadowEnum["PLANAR_NORMAL_DISTANCE_INFO_OFFSET"] = 60] = "PLANAR_NORMAL_DISTANCE_INFO_OFFSET";
              UBOShadowEnum[UBOShadowEnum["COUNT"] = 64] = "COUNT";
              UBOShadowEnum[UBOShadowEnum["SIZE"] = 256] = "SIZE";
            })(UBOShadowEnum || (exports("b", UBOShadowEnum = {})));
            var UBOShadow = exports("K", function UBOShadow() {});
            _class3 = UBOShadow;
            UBOShadow.MAT_LIGHT_VIEW_OFFSET = UBOShadowEnum.MAT_LIGHT_VIEW_OFFSET;
            UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET = UBOShadowEnum.MAT_LIGHT_VIEW_PROJ_OFFSET;
            UBOShadow.SHADOW_INV_PROJ_DEPTH_INFO_OFFSET = UBOShadowEnum.SHADOW_INV_PROJ_DEPTH_INFO_OFFSET;
            UBOShadow.SHADOW_PROJ_DEPTH_INFO_OFFSET = UBOShadowEnum.SHADOW_PROJ_DEPTH_INFO_OFFSET;
            UBOShadow.SHADOW_PROJ_INFO_OFFSET = UBOShadowEnum.SHADOW_PROJ_INFO_OFFSET;
            UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET = UBOShadowEnum.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET;
            UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET = UBOShadowEnum.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET;
            UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET = UBOShadowEnum.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET;
            UBOShadow.SHADOW_COLOR_OFFSET = UBOShadowEnum.SHADOW_COLOR_OFFSET;
            UBOShadow.PLANAR_NORMAL_DISTANCE_INFO_OFFSET = UBOShadowEnum.PLANAR_NORMAL_DISTANCE_INFO_OFFSET;
            UBOShadow.COUNT = UBOShadowEnum.COUNT;
            UBOShadow.SIZE = UBOShadowEnum.SIZE;
            UBOShadow.NAME = 'CCShadow';
            UBOShadow.BINDING = PipelineGlobalBindings.UBO_SHADOW;
            UBOShadow.DESCRIPTOR = new DescriptorSetLayoutBinding(_class3.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.ALL);
            UBOShadow.LAYOUT = new UniformBlock(SetIndex.GLOBAL, _class3.BINDING, _class3.NAME, [new Uniform('cc_matLightView', Type.MAT4, 1), new Uniform('cc_matLightViewProj', Type.MAT4, 1), new Uniform('cc_shadowInvProjDepthInfo', Type.FLOAT4, 1), new Uniform('cc_shadowProjDepthInfo', Type.FLOAT4, 1), new Uniform('cc_shadowProjInfo', Type.FLOAT4, 1), new Uniform('cc_shadowNFLSInfo', Type.FLOAT4, 1), new Uniform('cc_shadowWHPBInfo', Type.FLOAT4, 1), new Uniform('cc_shadowLPNNInfo', Type.FLOAT4, 1), new Uniform('cc_shadowColor', Type.FLOAT4, 1), new Uniform('cc_planarNDInfo', Type.FLOAT4, 1)], 1);
            globalDescriptorSetLayout.layouts[UBOShadow.NAME] = UBOShadow.LAYOUT;
            globalDescriptorSetLayout.bindings[UBOShadow.BINDING] = UBOShadow.DESCRIPTOR;
            var UBOCSMEnum; exports("O", UBOCSMEnum);
            (function (UBOCSMEnum) {
              UBOCSMEnum[UBOCSMEnum["CSM_LEVEL_COUNT"] = 4] = "CSM_LEVEL_COUNT";
              UBOCSMEnum[UBOCSMEnum["CSM_VIEW_DIR_0_OFFSET"] = 0] = "CSM_VIEW_DIR_0_OFFSET";
              UBOCSMEnum[UBOCSMEnum["CSM_VIEW_DIR_1_OFFSET"] = 16] = "CSM_VIEW_DIR_1_OFFSET";
              UBOCSMEnum[UBOCSMEnum["CSM_VIEW_DIR_2_OFFSET"] = 32] = "CSM_VIEW_DIR_2_OFFSET";
              UBOCSMEnum[UBOCSMEnum["CSM_ATLAS_OFFSET"] = 48] = "CSM_ATLAS_OFFSET";
              UBOCSMEnum[UBOCSMEnum["MAT_CSM_VIEW_PROJ_OFFSET"] = 64] = "MAT_CSM_VIEW_PROJ_OFFSET";
              UBOCSMEnum[UBOCSMEnum["CSM_PROJ_DEPTH_INFO_OFFSET"] = 128] = "CSM_PROJ_DEPTH_INFO_OFFSET";
              UBOCSMEnum[UBOCSMEnum["CSM_PROJ_INFO_OFFSET"] = 144] = "CSM_PROJ_INFO_OFFSET";
              UBOCSMEnum[UBOCSMEnum["CSM_SPLITS_INFO_OFFSET"] = 160] = "CSM_SPLITS_INFO_OFFSET";
              UBOCSMEnum[UBOCSMEnum["COUNT"] = 164] = "COUNT";
              UBOCSMEnum[UBOCSMEnum["SIZE"] = 656] = "SIZE";
            })(UBOCSMEnum || (exports("O", UBOCSMEnum = {})));
            var UBOCSM = exports("V", function UBOCSM() {});
            _class4 = UBOCSM;
            UBOCSM.CSM_LEVEL_COUNT = UBOCSMEnum.CSM_LEVEL_COUNT;
            UBOCSM.CSM_VIEW_DIR_0_OFFSET = UBOCSMEnum.CSM_VIEW_DIR_0_OFFSET;
            UBOCSM.CSM_VIEW_DIR_1_OFFSET = UBOCSMEnum.CSM_VIEW_DIR_1_OFFSET;
            UBOCSM.CSM_VIEW_DIR_2_OFFSET = UBOCSMEnum.CSM_VIEW_DIR_2_OFFSET;
            UBOCSM.CSM_ATLAS_OFFSET = UBOCSMEnum.CSM_ATLAS_OFFSET;
            UBOCSM.MAT_CSM_VIEW_PROJ_OFFSET = UBOCSMEnum.MAT_CSM_VIEW_PROJ_OFFSET;
            UBOCSM.CSM_PROJ_DEPTH_INFO_OFFSET = UBOCSMEnum.CSM_PROJ_DEPTH_INFO_OFFSET;
            UBOCSM.CSM_PROJ_INFO_OFFSET = UBOCSMEnum.CSM_PROJ_INFO_OFFSET;
            UBOCSM.CSM_SPLITS_INFO_OFFSET = UBOCSMEnum.CSM_SPLITS_INFO_OFFSET;
            UBOCSM.COUNT = UBOCSMEnum.COUNT;
            UBOCSM.SIZE = UBOCSMEnum.SIZE;
            UBOCSM.NAME = 'CCCSM';
            UBOCSM.BINDING = PipelineGlobalBindings.UBO_CSM;
            UBOCSM.DESCRIPTOR = new DescriptorSetLayoutBinding(_class4.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.FRAGMENT);
            UBOCSM.LAYOUT = new UniformBlock(SetIndex.GLOBAL, _class4.BINDING, _class4.NAME, [new Uniform('cc_csmViewDir0', Type.FLOAT4, _class4.CSM_LEVEL_COUNT), new Uniform('cc_csmViewDir1', Type.FLOAT4, _class4.CSM_LEVEL_COUNT), new Uniform('cc_csmViewDir2', Type.FLOAT4, _class4.CSM_LEVEL_COUNT), new Uniform('cc_csmAtlas', Type.FLOAT4, _class4.CSM_LEVEL_COUNT), new Uniform('cc_matCSMViewProj', Type.MAT4, _class4.CSM_LEVEL_COUNT), new Uniform('cc_csmProjDepthInfo', Type.FLOAT4, _class4.CSM_LEVEL_COUNT), new Uniform('cc_csmProjInfo', Type.FLOAT4, _class4.CSM_LEVEL_COUNT), new Uniform('cc_csmSplitsInfo', Type.FLOAT4, 1)], 1);
            globalDescriptorSetLayout.layouts[UBOCSM.NAME] = UBOCSM.LAYOUT;
            globalDescriptorSetLayout.bindings[UBOCSM.BINDING] = UBOCSM.DESCRIPTOR;
            var UNIFORM_SHADOWMAP_NAME = 'cc_shadowMap';
            var UNIFORM_SHADOWMAP_BINDING = exports("W", PipelineGlobalBindings.SAMPLER_SHADOWMAP);
            var UNIFORM_SHADOWMAP_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_SHADOWMAP_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
            var UNIFORM_SHADOWMAP_LAYOUT = new UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_SHADOWMAP_BINDING, UNIFORM_SHADOWMAP_NAME, Type.SAMPLER2D, 1);
            globalDescriptorSetLayout.layouts[UNIFORM_SHADOWMAP_NAME] = UNIFORM_SHADOWMAP_LAYOUT;
            globalDescriptorSetLayout.bindings[UNIFORM_SHADOWMAP_BINDING] = UNIFORM_SHADOWMAP_DESCRIPTOR;
            var UNIFORM_ENVIRONMENT_NAME = 'cc_environment';
            var UNIFORM_ENVIRONMENT_BINDING = exports("a1", PipelineGlobalBindings.SAMPLER_ENVIRONMENT);
            var UNIFORM_ENVIRONMENT_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_ENVIRONMENT_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
            var UNIFORM_ENVIRONMENT_LAYOUT = new UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_ENVIRONMENT_BINDING, UNIFORM_ENVIRONMENT_NAME, Type.SAMPLER_CUBE, 1);
            globalDescriptorSetLayout.layouts[UNIFORM_ENVIRONMENT_NAME] = UNIFORM_ENVIRONMENT_LAYOUT;
            globalDescriptorSetLayout.bindings[UNIFORM_ENVIRONMENT_BINDING] = UNIFORM_ENVIRONMENT_DESCRIPTOR;
            var UNIFORM_DIFFUSEMAP_NAME = 'cc_diffuseMap';
            var UNIFORM_DIFFUSEMAP_BINDING = exports("a2", PipelineGlobalBindings.SAMPLER_DIFFUSEMAP);
            var UNIFORM_DIFFUSEMAP_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_DIFFUSEMAP_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
            var UNIFORM_DIFFUSEMAP_LAYOUT = new UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_DIFFUSEMAP_BINDING, UNIFORM_DIFFUSEMAP_NAME, Type.SAMPLER_CUBE, 1);
            globalDescriptorSetLayout.layouts[UNIFORM_DIFFUSEMAP_NAME] = UNIFORM_DIFFUSEMAP_LAYOUT;
            globalDescriptorSetLayout.bindings[UNIFORM_DIFFUSEMAP_BINDING] = UNIFORM_DIFFUSEMAP_DESCRIPTOR;
            var UNIFORM_SPOT_SHADOW_MAP_TEXTURE_NAME = 'cc_spotShadowMap';
            var UNIFORM_SPOT_SHADOW_MAP_TEXTURE_BINDING = exports("X", PipelineGlobalBindings.SAMPLER_SPOT_SHADOW_MAP);
            var UNIFORM_SPOT_SHADOW_MAP_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_SPOT_SHADOW_MAP_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
            var UNIFORM_SPOT_SHADOW_MAP_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_SPOT_SHADOW_MAP_TEXTURE_BINDING, UNIFORM_SPOT_SHADOW_MAP_TEXTURE_NAME, Type.SAMPLER2D, 1);
            globalDescriptorSetLayout.layouts[UNIFORM_SPOT_SHADOW_MAP_TEXTURE_NAME] = UNIFORM_SPOT_SHADOW_MAP_TEXTURE_LAYOUT;
            globalDescriptorSetLayout.bindings[UNIFORM_SPOT_SHADOW_MAP_TEXTURE_BINDING] = UNIFORM_SPOT_SHADOW_MAP_TEXTURE_DESCRIPTOR;
            var UBOLocalEnum; exports("c", UBOLocalEnum);
            (function (UBOLocalEnum) {
              UBOLocalEnum[UBOLocalEnum["MAT_WORLD_OFFSET"] = 0] = "MAT_WORLD_OFFSET";
              UBOLocalEnum[UBOLocalEnum["MAT_WORLD_IT_OFFSET"] = 16] = "MAT_WORLD_IT_OFFSET";
              UBOLocalEnum[UBOLocalEnum["LIGHTINGMAP_UVPARAM"] = 32] = "LIGHTINGMAP_UVPARAM";
              UBOLocalEnum[UBOLocalEnum["LOCAL_SHADOW_BIAS"] = 36] = "LOCAL_SHADOW_BIAS";
              UBOLocalEnum[UBOLocalEnum["REFLECTION_PROBE_DATA1"] = 40] = "REFLECTION_PROBE_DATA1";
              UBOLocalEnum[UBOLocalEnum["REFLECTION_PROBE_DATA2"] = 44] = "REFLECTION_PROBE_DATA2";
              UBOLocalEnum[UBOLocalEnum["REFLECTION_PROBE_BLEND_DATA1"] = 48] = "REFLECTION_PROBE_BLEND_DATA1";
              UBOLocalEnum[UBOLocalEnum["REFLECTION_PROBE_BLEND_DATA2"] = 52] = "REFLECTION_PROBE_BLEND_DATA2";
              UBOLocalEnum[UBOLocalEnum["COUNT"] = 56] = "COUNT";
              UBOLocalEnum[UBOLocalEnum["SIZE"] = 224] = "SIZE";
              UBOLocalEnum[UBOLocalEnum["BINDING"] = ModelLocalBindings.UBO_LOCAL] = "BINDING";
            })(UBOLocalEnum || (exports("c", UBOLocalEnum = {})));
            var UBOLocal = exports("D", function UBOLocal() {});
            _class5 = UBOLocal;
            UBOLocal.MAT_WORLD_OFFSET = UBOLocalEnum.MAT_WORLD_OFFSET;
            UBOLocal.MAT_WORLD_IT_OFFSET = UBOLocalEnum.MAT_WORLD_IT_OFFSET;
            UBOLocal.LIGHTINGMAP_UVPARAM = UBOLocalEnum.LIGHTINGMAP_UVPARAM;
            UBOLocal.LOCAL_SHADOW_BIAS = UBOLocalEnum.LOCAL_SHADOW_BIAS;
            UBOLocal.REFLECTION_PROBE_DATA1 = UBOLocalEnum.REFLECTION_PROBE_DATA1;
            UBOLocal.REFLECTION_PROBE_DATA2 = UBOLocalEnum.REFLECTION_PROBE_DATA2;
            UBOLocal.REFLECTION_PROBE_BLEND_DATA1 = UBOLocalEnum.REFLECTION_PROBE_BLEND_DATA1;
            UBOLocal.REFLECTION_PROBE_BLEND_DATA2 = UBOLocalEnum.REFLECTION_PROBE_BLEND_DATA2;
            UBOLocal.COUNT = UBOLocalEnum.COUNT;
            UBOLocal.SIZE = UBOLocalEnum.SIZE;
            UBOLocal.NAME = 'CCLocal';
            UBOLocal.BINDING = UBOLocalEnum.BINDING;
            UBOLocal.DESCRIPTOR = new DescriptorSetLayoutBinding(UBOLocalEnum.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX | ShaderStageFlagBit.FRAGMENT | ShaderStageFlagBit.COMPUTE, MemoryAccessBit.READ_ONLY, ViewDimension.BUFFER);
            UBOLocal.LAYOUT = new UniformBlock(SetIndex.LOCAL, UBOLocalEnum.BINDING, _class5.NAME, [new Uniform('cc_matWorld', Type.MAT4, 1), new Uniform('cc_matWorldIT', Type.MAT4, 1), new Uniform('cc_lightingMapUVParam', Type.FLOAT4, 1), new Uniform('cc_localShadowBias', Type.FLOAT4, 1), new Uniform('cc_reflectionProbeData1', Type.FLOAT4, 1), new Uniform('cc_reflectionProbeData2', Type.FLOAT4, 1), new Uniform('cc_reflectionProbeBlendData1', Type.FLOAT4, 1), new Uniform('cc_reflectionProbeBlendData2', Type.FLOAT4, 1)], 1);
            localDescriptorSetLayout.layouts[UBOLocal.NAME] = UBOLocal.LAYOUT;
            localDescriptorSetLayout.bindings[UBOLocalEnum.BINDING] = UBOLocal.DESCRIPTOR;
            var UBOWorldBound = exports("d", function UBOWorldBound() {});
            _class6 = UBOWorldBound;
            UBOWorldBound.WORLD_BOUND_CENTER = 0;
            UBOWorldBound.WORLD_BOUND_HALF_EXTENTS = _class6.WORLD_BOUND_CENTER + 4;
            UBOWorldBound.COUNT = _class6.WORLD_BOUND_HALF_EXTENTS + 4;
            UBOWorldBound.SIZE = _class6.COUNT * 4;
            UBOWorldBound.NAME = 'CCWorldBound';
            UBOWorldBound.BINDING = ModelLocalBindings.UBO_LOCAL;
            UBOWorldBound.DESCRIPTOR = new DescriptorSetLayoutBinding(_class6.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX | ShaderStageFlagBit.COMPUTE, MemoryAccessBit.READ_ONLY, ViewDimension.BUFFER);
            UBOWorldBound.LAYOUT = new UniformBlock(SetIndex.LOCAL, _class6.BINDING, _class6.NAME, [new Uniform('cc_worldBoundCenter', Type.FLOAT4, 1), new Uniform('cc_worldBoundHalfExtents', Type.FLOAT4, 1)], 1);
            localDescriptorSetLayout.layouts[UBOWorldBound.NAME] = UBOWorldBound.LAYOUT;
            localDescriptorSetLayout.bindings[UBOWorldBound.BINDING] = UBOWorldBound.DESCRIPTOR;
            var INST_MAT_WORLD = exports("t", 'a_matWorld0');
            var INST_SH = exports("u", 'a_sh_linear_const_r');
            var UBOLocalBatched = function UBOLocalBatched() {};
            _class7 = UBOLocalBatched;
            UBOLocalBatched.BATCHING_COUNT = 10;
            UBOLocalBatched.MAT_WORLDS_OFFSET = 0;
            UBOLocalBatched.COUNT = 16 * _class7.BATCHING_COUNT;
            UBOLocalBatched.SIZE = _class7.COUNT * 4;
            UBOLocalBatched.NAME = 'CCLocalBatched';
            UBOLocalBatched.BINDING = ModelLocalBindings.UBO_LOCAL;
            UBOLocalBatched.DESCRIPTOR = new DescriptorSetLayoutBinding(_class7.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX | ShaderStageFlagBit.COMPUTE, MemoryAccessBit.READ_ONLY, ViewDimension.BUFFER);
            UBOLocalBatched.LAYOUT = new UniformBlock(SetIndex.LOCAL, _class7.BINDING, _class7.NAME, [new Uniform('cc_matWorlds', Type.MAT4, _class7.BATCHING_COUNT)], 1);
            localDescriptorSetLayout.layouts[UBOLocalBatched.NAME] = UBOLocalBatched.LAYOUT;
            localDescriptorSetLayout.bindings[UBOLocalBatched.BINDING] = UBOLocalBatched.DESCRIPTOR;
            var UBOForwardLightEnum; exports("A", UBOForwardLightEnum);
            (function (UBOForwardLightEnum) {
              UBOForwardLightEnum[UBOForwardLightEnum["LIGHTS_PER_PASS"] = 1] = "LIGHTS_PER_PASS";
              UBOForwardLightEnum[UBOForwardLightEnum["LIGHT_POS_OFFSET"] = 0] = "LIGHT_POS_OFFSET";
              UBOForwardLightEnum[UBOForwardLightEnum["LIGHT_COLOR_OFFSET"] = 4] = "LIGHT_COLOR_OFFSET";
              UBOForwardLightEnum[UBOForwardLightEnum["LIGHT_SIZE_RANGE_ANGLE_OFFSET"] = 8] = "LIGHT_SIZE_RANGE_ANGLE_OFFSET";
              UBOForwardLightEnum[UBOForwardLightEnum["LIGHT_DIR_OFFSET"] = 12] = "LIGHT_DIR_OFFSET";
              UBOForwardLightEnum[UBOForwardLightEnum["LIGHT_BOUNDING_SIZE_VS_OFFSET"] = 16] = "LIGHT_BOUNDING_SIZE_VS_OFFSET";
              UBOForwardLightEnum[UBOForwardLightEnum["COUNT"] = 20] = "COUNT";
              UBOForwardLightEnum[UBOForwardLightEnum["SIZE"] = 80] = "SIZE";
            })(UBOForwardLightEnum || (exports("A", UBOForwardLightEnum = {})));
            var UBOForwardLight = exports("B", function UBOForwardLight() {});
            _class8 = UBOForwardLight;
            UBOForwardLight.LIGHTS_PER_PASS = UBOForwardLightEnum.LIGHTS_PER_PASS;
            UBOForwardLight.LIGHT_POS_OFFSET = UBOForwardLightEnum.LIGHT_POS_OFFSET;
            UBOForwardLight.LIGHT_COLOR_OFFSET = UBOForwardLightEnum.LIGHT_COLOR_OFFSET;
            UBOForwardLight.LIGHT_SIZE_RANGE_ANGLE_OFFSET = UBOForwardLightEnum.LIGHT_SIZE_RANGE_ANGLE_OFFSET;
            UBOForwardLight.LIGHT_DIR_OFFSET = UBOForwardLightEnum.LIGHT_DIR_OFFSET;
            UBOForwardLight.LIGHT_BOUNDING_SIZE_VS_OFFSET = UBOForwardLightEnum.LIGHT_BOUNDING_SIZE_VS_OFFSET;
            UBOForwardLight.COUNT = UBOForwardLightEnum.COUNT;
            UBOForwardLight.SIZE = UBOForwardLightEnum.SIZE;
            UBOForwardLight.NAME = 'CCForwardLight';
            UBOForwardLight.BINDING = ModelLocalBindings.UBO_FORWARD_LIGHTS;
            UBOForwardLight.DESCRIPTOR = new DescriptorSetLayoutBinding(_class8.BINDING, DescriptorType.DYNAMIC_UNIFORM_BUFFER, 1, ShaderStageFlagBit.FRAGMENT, MemoryAccessBit.READ_ONLY, ViewDimension.BUFFER);
            UBOForwardLight.LAYOUT = new UniformBlock(SetIndex.LOCAL, _class8.BINDING, _class8.NAME, [new Uniform('cc_lightPos', Type.FLOAT4, UBOForwardLightEnum.LIGHTS_PER_PASS), new Uniform('cc_lightColor', Type.FLOAT4, UBOForwardLightEnum.LIGHTS_PER_PASS), new Uniform('cc_lightSizeRangeAngle', Type.FLOAT4, UBOForwardLightEnum.LIGHTS_PER_PASS), new Uniform('cc_lightDir', Type.FLOAT4, UBOForwardLightEnum.LIGHTS_PER_PASS), new Uniform('cc_lightBoundingSizeVS', Type.FLOAT4, UBOForwardLightEnum.LIGHTS_PER_PASS)], 1);
            localDescriptorSetLayout.layouts[UBOForwardLight.NAME] = UBOForwardLight.LAYOUT;
            localDescriptorSetLayout.bindings[UBOForwardLight.BINDING] = UBOForwardLight.DESCRIPTOR;
            var UBODeferredLight = exports("E", function UBODeferredLight() {});
            UBODeferredLight.LIGHTS_PER_PASS = 10;
            var JOINT_UNIFORM_CAPACITY = 30;
            var UBOSkinningTexture = exports("q", function UBOSkinningTexture() {});
            _class10 = UBOSkinningTexture;
            UBOSkinningTexture.JOINTS_TEXTURE_INFO_OFFSET = 0;
            UBOSkinningTexture.COUNT = _class10.JOINTS_TEXTURE_INFO_OFFSET + 4;
            UBOSkinningTexture.SIZE = _class10.COUNT * 4;
            UBOSkinningTexture.NAME = 'CCSkinningTexture';
            UBOSkinningTexture.BINDING = ModelLocalBindings.UBO_SKINNING_TEXTURE;
            UBOSkinningTexture.DESCRIPTOR = new DescriptorSetLayoutBinding(_class10.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX, MemoryAccessBit.READ_ONLY, ViewDimension.BUFFER);
            UBOSkinningTexture.LAYOUT = new UniformBlock(SetIndex.LOCAL, _class10.BINDING, _class10.NAME, [new Uniform('cc_jointTextureInfo', Type.FLOAT4, 1)], 1);
            localDescriptorSetLayout.layouts[UBOSkinningTexture.NAME] = UBOSkinningTexture.LAYOUT;
            localDescriptorSetLayout.bindings[UBOSkinningTexture.BINDING] = UBOSkinningTexture.DESCRIPTOR;
            var UBOSkinningAnimation = exports("n", function UBOSkinningAnimation() {});
            _class11 = UBOSkinningAnimation;
            UBOSkinningAnimation.JOINTS_ANIM_INFO_OFFSET = 0;
            UBOSkinningAnimation.COUNT = _class11.JOINTS_ANIM_INFO_OFFSET + 4;
            UBOSkinningAnimation.SIZE = _class11.COUNT * 4;
            UBOSkinningAnimation.NAME = 'CCSkinningAnimation';
            UBOSkinningAnimation.BINDING = ModelLocalBindings.UBO_SKINNING_ANIMATION;
            UBOSkinningAnimation.DESCRIPTOR = new DescriptorSetLayoutBinding(_class11.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX, MemoryAccessBit.READ_ONLY, ViewDimension.BUFFER);
            UBOSkinningAnimation.LAYOUT = new UniformBlock(SetIndex.LOCAL, _class11.BINDING, _class11.NAME, [new Uniform('cc_jointAnimInfo', Type.FLOAT4, 1)], 1);
            localDescriptorSetLayout.layouts[UBOSkinningAnimation.NAME] = UBOSkinningAnimation.LAYOUT;
            localDescriptorSetLayout.bindings[UBOSkinningAnimation.BINDING] = UBOSkinningAnimation.DESCRIPTOR;
            var INST_JOINT_ANIM_INFO = exports("I", 'a_jointAnimInfo');
            var UBOSkinning = exports("o", function () {
              function UBOSkinning() {}
              UBOSkinning.initLayout =
              function initLayout(capacity) {
                UBOSkinning._jointUniformCapacity = capacity;
                UBOSkinning._count = capacity * 12;
                UBOSkinning._size = UBOSkinning._count * 4;
                UBOSkinning.LAYOUT.members[0].count = capacity * 3;
              };
              _createClass(UBOSkinning, null, [{
                key: "JOINT_UNIFORM_CAPACITY",
                get: function get() {
                  return UBOSkinning._jointUniformCapacity;
                }
              }, {
                key: "COUNT",
                get: function get() {
                  return UBOSkinning._count;
                }
              }, {
                key: "SIZE",
                get: function get() {
                  return UBOSkinning._size;
                }
              }]);
              return UBOSkinning;
            }());
            _class12 = UBOSkinning;
            UBOSkinning._jointUniformCapacity = 0;
            UBOSkinning._count = 0;
            UBOSkinning._size = 0;
            UBOSkinning.NAME = 'CCSkinning';
            UBOSkinning.BINDING = ModelLocalBindings.UBO_SKINNING_TEXTURE;
            UBOSkinning.DESCRIPTOR = new DescriptorSetLayoutBinding(_class12.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX, MemoryAccessBit.READ_ONLY, ViewDimension.BUFFER);
            UBOSkinning.LAYOUT = new UniformBlock(SetIndex.LOCAL, _class12.BINDING, _class12.NAME, [new Uniform('cc_joints', Type.FLOAT4, 1)], 1);
            function localDescriptorSetLayout_ResizeMaxJoints(maxCount) {
              UBOSkinning.initLayout(maxCount);
              localDescriptorSetLayout.layouts[UBOSkinning.NAME] = UBOSkinning.LAYOUT;
              localDescriptorSetLayout.bindings[UBOSkinning.BINDING] = UBOSkinning.DESCRIPTOR;
            }
            var UBOMorphEnum; exports("e", UBOMorphEnum);
            (function (UBOMorphEnum) {
              UBOMorphEnum[UBOMorphEnum["MAX_MORPH_TARGET_COUNT"] = 60] = "MAX_MORPH_TARGET_COUNT";
              UBOMorphEnum[UBOMorphEnum["OFFSET_OF_WEIGHTS"] = 0] = "OFFSET_OF_WEIGHTS";
              UBOMorphEnum[UBOMorphEnum["OFFSET_OF_DISPLACEMENT_TEXTURE_WIDTH"] = 240] = "OFFSET_OF_DISPLACEMENT_TEXTURE_WIDTH";
              UBOMorphEnum[UBOMorphEnum["OFFSET_OF_DISPLACEMENT_TEXTURE_HEIGHT"] = 244] = "OFFSET_OF_DISPLACEMENT_TEXTURE_HEIGHT";
              UBOMorphEnum[UBOMorphEnum["OFFSET_OF_VERTICES_COUNT"] = 248] = "OFFSET_OF_VERTICES_COUNT";
              UBOMorphEnum[UBOMorphEnum["COUNT_BASE_4_BYTES"] = 64] = "COUNT_BASE_4_BYTES";
              UBOMorphEnum[UBOMorphEnum["SIZE"] = 256] = "SIZE";
            })(UBOMorphEnum || (exports("e", UBOMorphEnum = {})));
            var UBOMorph = exports("f", function UBOMorph() {});
            _class13 = UBOMorph;
            UBOMorph.MAX_MORPH_TARGET_COUNT = UBOMorphEnum.MAX_MORPH_TARGET_COUNT;
            UBOMorph.OFFSET_OF_WEIGHTS = UBOMorphEnum.OFFSET_OF_WEIGHTS;
            UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_WIDTH = UBOMorphEnum.OFFSET_OF_DISPLACEMENT_TEXTURE_WIDTH;
            UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_HEIGHT = UBOMorphEnum.OFFSET_OF_DISPLACEMENT_TEXTURE_HEIGHT;
            UBOMorph.OFFSET_OF_VERTICES_COUNT = UBOMorphEnum.OFFSET_OF_VERTICES_COUNT;
            UBOMorph.COUNT_BASE_4_BYTES = UBOMorphEnum.COUNT_BASE_4_BYTES;
            UBOMorph.SIZE = UBOMorphEnum.SIZE;
            UBOMorph.NAME = 'CCMorph';
            UBOMorph.BINDING = ModelLocalBindings.UBO_MORPH;
            UBOMorph.DESCRIPTOR = new DescriptorSetLayoutBinding(_class13.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX, MemoryAccessBit.READ_ONLY, ViewDimension.BUFFER);
            UBOMorph.LAYOUT = new UniformBlock(SetIndex.LOCAL, _class13.BINDING, _class13.NAME, [new Uniform('cc_displacementWeights', Type.FLOAT4, UBOMorphEnum.MAX_MORPH_TARGET_COUNT / 4), new Uniform('cc_displacementTextureInfo', Type.FLOAT4, 1)], 1);
            localDescriptorSetLayout.layouts[UBOMorph.NAME] = UBOMorph.LAYOUT;
            localDescriptorSetLayout.bindings[UBOMorph.BINDING] = UBOMorph.DESCRIPTOR;
            var UBOUILocal = function UBOUILocal() {};
            _class14 = UBOUILocal;
            UBOUILocal.NAME = 'CCUILocal';
            UBOUILocal.BINDING = ModelLocalBindings.UBO_UI_LOCAL;
            UBOUILocal.DESCRIPTOR = new DescriptorSetLayoutBinding(_class14.BINDING, DescriptorType.DYNAMIC_UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX, MemoryAccessBit.READ_ONLY, ViewDimension.BUFFER);
            UBOUILocal.LAYOUT = new UniformBlock(SetIndex.LOCAL, _class14.BINDING, _class14.NAME, [new Uniform('cc_local_data', Type.FLOAT4, 1)], 1);
            localDescriptorSetLayout.layouts[UBOUILocal.NAME] = UBOUILocal.LAYOUT;
            localDescriptorSetLayout.bindings[UBOUILocal.BINDING] = UBOUILocal.DESCRIPTOR;
            var UBOSHEnum; exports("s", UBOSHEnum);
            (function (UBOSHEnum) {
              UBOSHEnum[UBOSHEnum["SH_LINEAR_CONST_R_OFFSET"] = 0] = "SH_LINEAR_CONST_R_OFFSET";
              UBOSHEnum[UBOSHEnum["SH_LINEAR_CONST_G_OFFSET"] = 4] = "SH_LINEAR_CONST_G_OFFSET";
              UBOSHEnum[UBOSHEnum["SH_LINEAR_CONST_B_OFFSET"] = 8] = "SH_LINEAR_CONST_B_OFFSET";
              UBOSHEnum[UBOSHEnum["SH_QUADRATIC_R_OFFSET"] = 12] = "SH_QUADRATIC_R_OFFSET";
              UBOSHEnum[UBOSHEnum["SH_QUADRATIC_G_OFFSET"] = 16] = "SH_QUADRATIC_G_OFFSET";
              UBOSHEnum[UBOSHEnum["SH_QUADRATIC_B_OFFSET"] = 20] = "SH_QUADRATIC_B_OFFSET";
              UBOSHEnum[UBOSHEnum["SH_QUADRATIC_A_OFFSET"] = 24] = "SH_QUADRATIC_A_OFFSET";
              UBOSHEnum[UBOSHEnum["COUNT"] = 28] = "COUNT";
              UBOSHEnum[UBOSHEnum["SIZE"] = 112] = "SIZE";
              UBOSHEnum[UBOSHEnum["BINDING"] = ModelLocalBindings.UBO_SH] = "BINDING";
            })(UBOSHEnum || (exports("s", UBOSHEnum = {})));
            var UBOSH = function UBOSH() {};
            _class15 = UBOSH;
            UBOSH.SH_LINEAR_CONST_R_OFFSET = UBOSHEnum.SH_LINEAR_CONST_R_OFFSET;
            UBOSH.SH_LINEAR_CONST_G_OFFSET = UBOSHEnum.SH_LINEAR_CONST_G_OFFSET;
            UBOSH.SH_LINEAR_CONST_B_OFFSET = UBOSHEnum.SH_LINEAR_CONST_B_OFFSET;
            UBOSH.SH_QUADRATIC_R_OFFSET = UBOSHEnum.SH_QUADRATIC_R_OFFSET;
            UBOSH.SH_QUADRATIC_G_OFFSET = UBOSHEnum.SH_QUADRATIC_G_OFFSET;
            UBOSH.SH_QUADRATIC_B_OFFSET = UBOSHEnum.SH_QUADRATIC_B_OFFSET;
            UBOSH.SH_QUADRATIC_A_OFFSET = UBOSHEnum.SH_QUADRATIC_A_OFFSET;
            UBOSH.COUNT = UBOSHEnum.COUNT;
            UBOSH.SIZE = UBOSHEnum.SIZE;
            UBOSH.NAME = 'CCSH';
            UBOSH.BINDING = UBOSHEnum.BINDING;
            UBOSH.DESCRIPTOR = new DescriptorSetLayoutBinding(UBOSHEnum.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.FRAGMENT, MemoryAccessBit.READ_ONLY, ViewDimension.BUFFER);
            UBOSH.LAYOUT = new UniformBlock(SetIndex.LOCAL, UBOSHEnum.BINDING, _class15.NAME, [new Uniform('cc_sh_linear_const_r', Type.FLOAT4, 1), new Uniform('cc_sh_linear_const_g', Type.FLOAT4, 1), new Uniform('cc_sh_linear_const_b', Type.FLOAT4, 1), new Uniform('cc_sh_quadratic_r', Type.FLOAT4, 1), new Uniform('cc_sh_quadratic_g', Type.FLOAT4, 1), new Uniform('cc_sh_quadratic_b', Type.FLOAT4, 1), new Uniform('cc_sh_quadratic_a', Type.FLOAT4, 1)], 1);
            localDescriptorSetLayout.layouts[UBOSH.NAME] = UBOSH.LAYOUT;
            localDescriptorSetLayout.bindings[UBOSHEnum.BINDING] = UBOSH.DESCRIPTOR;
            var UNIFORM_JOINT_TEXTURE_NAME = 'cc_jointTexture';
            var UNIFORM_JOINT_TEXTURE_BINDING = exports("r", ModelLocalBindings.SAMPLER_JOINTS);
            var UNIFORM_JOINT_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_JOINT_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.VERTEX, MemoryAccessBit.READ_ONLY, ViewDimension.TEX2D);
            var UNIFORM_JOINT_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_JOINT_TEXTURE_BINDING, UNIFORM_JOINT_TEXTURE_NAME, Type.SAMPLER2D, 1);
            localDescriptorSetLayout.layouts[UNIFORM_JOINT_TEXTURE_NAME] = UNIFORM_JOINT_TEXTURE_LAYOUT;
            localDescriptorSetLayout.bindings[UNIFORM_JOINT_TEXTURE_BINDING] = UNIFORM_JOINT_TEXTURE_DESCRIPTOR;
            var UNIFORM_REALTIME_JOINT_TEXTURE_NAME = 'cc_realtimeJoint';
            var UNIFORM_REALTIME_JOINT_TEXTURE_BINDING = exports("p", ModelLocalBindings.SAMPLER_JOINTS);
            var UNIFORM_REALTIME_JOINT_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_REALTIME_JOINT_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.VERTEX, MemoryAccessBit.READ_ONLY, ViewDimension.TEX2D);
            var UNIFORM_REALTIME_JOINT_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_REALTIME_JOINT_TEXTURE_BINDING, UNIFORM_REALTIME_JOINT_TEXTURE_NAME, Type.SAMPLER2D, 1);
            localDescriptorSetLayout.layouts[UNIFORM_REALTIME_JOINT_TEXTURE_NAME] = UNIFORM_REALTIME_JOINT_TEXTURE_LAYOUT;
            localDescriptorSetLayout.bindings[UNIFORM_REALTIME_JOINT_TEXTURE_BINDING] = UNIFORM_REALTIME_JOINT_TEXTURE_DESCRIPTOR;
            var UNIFORM_POSITION_MORPH_TEXTURE_NAME = 'cc_PositionDisplacements';
            var UNIFORM_POSITION_MORPH_TEXTURE_BINDING = exports("j", ModelLocalBindings.SAMPLER_MORPH_POSITION);
            var UNIFORM_POSITION_MORPH_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_POSITION_MORPH_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.VERTEX, MemoryAccessBit.READ_ONLY, ViewDimension.TEX2D);
            var UNIFORM_POSITION_MORPH_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_POSITION_MORPH_TEXTURE_BINDING, UNIFORM_POSITION_MORPH_TEXTURE_NAME, Type.SAMPLER2D, 1);
            localDescriptorSetLayout.layouts[UNIFORM_POSITION_MORPH_TEXTURE_NAME] = UNIFORM_POSITION_MORPH_TEXTURE_LAYOUT;
            localDescriptorSetLayout.bindings[UNIFORM_POSITION_MORPH_TEXTURE_BINDING] = UNIFORM_POSITION_MORPH_TEXTURE_DESCRIPTOR;
            var UNIFORM_NORMAL_MORPH_TEXTURE_NAME = 'cc_NormalDisplacements';
            var UNIFORM_NORMAL_MORPH_TEXTURE_BINDING = exports("h", ModelLocalBindings.SAMPLER_MORPH_NORMAL);
            var UNIFORM_NORMAL_MORPH_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_NORMAL_MORPH_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.VERTEX, MemoryAccessBit.READ_ONLY, ViewDimension.TEX2D);
            var UNIFORM_NORMAL_MORPH_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_NORMAL_MORPH_TEXTURE_BINDING, UNIFORM_NORMAL_MORPH_TEXTURE_NAME, Type.SAMPLER2D, 1);
            localDescriptorSetLayout.layouts[UNIFORM_NORMAL_MORPH_TEXTURE_NAME] = UNIFORM_NORMAL_MORPH_TEXTURE_LAYOUT;
            localDescriptorSetLayout.bindings[UNIFORM_NORMAL_MORPH_TEXTURE_BINDING] = UNIFORM_NORMAL_MORPH_TEXTURE_DESCRIPTOR;
            var UNIFORM_TANGENT_MORPH_TEXTURE_NAME = 'cc_TangentDisplacements';
            var UNIFORM_TANGENT_MORPH_TEXTURE_BINDING = exports("g", ModelLocalBindings.SAMPLER_MORPH_TANGENT);
            var UNIFORM_TANGENT_MORPH_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_TANGENT_MORPH_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.VERTEX, MemoryAccessBit.READ_ONLY, ViewDimension.TEX2D);
            var UNIFORM_TANGENT_MORPH_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_TANGENT_MORPH_TEXTURE_BINDING, UNIFORM_TANGENT_MORPH_TEXTURE_NAME, Type.SAMPLER2D, 1);
            localDescriptorSetLayout.layouts[UNIFORM_TANGENT_MORPH_TEXTURE_NAME] = UNIFORM_TANGENT_MORPH_TEXTURE_LAYOUT;
            localDescriptorSetLayout.bindings[UNIFORM_TANGENT_MORPH_TEXTURE_BINDING] = UNIFORM_TANGENT_MORPH_TEXTURE_DESCRIPTOR;
            var UNIFORM_LIGHTMAP_TEXTURE_NAME = 'cc_lightingMap';
            var UNIFORM_LIGHTMAP_TEXTURE_BINDING = exports("v", ModelLocalBindings.SAMPLER_LIGHTMAP);
            var UNIFORM_LIGHTMAP_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_LIGHTMAP_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT, MemoryAccessBit.READ_ONLY, ViewDimension.TEX2D);
            var UNIFORM_LIGHTMAP_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_LIGHTMAP_TEXTURE_BINDING, UNIFORM_LIGHTMAP_TEXTURE_NAME, Type.SAMPLER2D, 1);
            localDescriptorSetLayout.layouts[UNIFORM_LIGHTMAP_TEXTURE_NAME] = UNIFORM_LIGHTMAP_TEXTURE_LAYOUT;
            localDescriptorSetLayout.bindings[UNIFORM_LIGHTMAP_TEXTURE_BINDING] = UNIFORM_LIGHTMAP_TEXTURE_DESCRIPTOR;
            var UNIFORM_SPRITE_TEXTURE_NAME = 'cc_spriteTexture';
            var UNIFORM_SPRITE_TEXTURE_BINDING = ModelLocalBindings.SAMPLER_SPRITE;
            var UNIFORM_SPRITE_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_SPRITE_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT, MemoryAccessBit.READ_ONLY, ViewDimension.TEX2D);
            var UNIFORM_SPRITE_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_SPRITE_TEXTURE_BINDING, UNIFORM_SPRITE_TEXTURE_NAME, Type.SAMPLER2D, 1);
            localDescriptorSetLayout.layouts[UNIFORM_SPRITE_TEXTURE_NAME] = UNIFORM_SPRITE_TEXTURE_LAYOUT;
            localDescriptorSetLayout.bindings[UNIFORM_SPRITE_TEXTURE_BINDING] = UNIFORM_SPRITE_TEXTURE_DESCRIPTOR;
            var UNIFORM_REFLECTION_PROBE_CUBEMAP_NAME = 'cc_reflectionProbeCubemap';
            var UNIFORM_REFLECTION_PROBE_CUBEMAP_BINDING = exports("w", ModelLocalBindings.SAMPLER_REFLECTION_PROBE_CUBE);
            var UNIFORM_REFLECTION_PROBE_CUBEMAP_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_REFLECTION_PROBE_CUBEMAP_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT, MemoryAccessBit.READ_ONLY, ViewDimension.TEXCUBE);
            var UNIFORM_REFLECTION_PROBE_CUBEMAP_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_REFLECTION_PROBE_CUBEMAP_BINDING, UNIFORM_REFLECTION_PROBE_CUBEMAP_NAME, Type.SAMPLER_CUBE, 1);
            localDescriptorSetLayout.layouts[UNIFORM_REFLECTION_PROBE_CUBEMAP_NAME] = UNIFORM_REFLECTION_PROBE_CUBEMAP_LAYOUT;
            localDescriptorSetLayout.bindings[UNIFORM_REFLECTION_PROBE_CUBEMAP_BINDING] = UNIFORM_REFLECTION_PROBE_CUBEMAP_DESCRIPTOR;
            var UNIFORM_REFLECTION_PROBE_TEXTURE_NAME = 'cc_reflectionProbePlanarMap';
            var UNIFORM_REFLECTION_PROBE_TEXTURE_BINDING = exports("x", ModelLocalBindings.SAMPLER_REFLECTION_PROBE_PLANAR);
            var UNIFORM_REFLECTION_PROBE_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_REFLECTION_PROBE_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT, MemoryAccessBit.READ_ONLY, ViewDimension.TEX2D);
            var UNIFORM_REFLECTION_PROBE_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_REFLECTION_PROBE_TEXTURE_BINDING, UNIFORM_REFLECTION_PROBE_TEXTURE_NAME, Type.SAMPLER2D, 1);
            localDescriptorSetLayout.layouts[UNIFORM_REFLECTION_PROBE_TEXTURE_NAME] = UNIFORM_REFLECTION_PROBE_TEXTURE_LAYOUT;
            localDescriptorSetLayout.bindings[UNIFORM_REFLECTION_PROBE_TEXTURE_BINDING] = UNIFORM_REFLECTION_PROBE_TEXTURE_DESCRIPTOR;
            var UNIFORM_REFLECTION_PROBE_DATA_MAP_NAME = 'cc_reflectionProbeDataMap';
            var UNIFORM_REFLECTION_PROBE_DATA_MAP_BINDING = exports("y", ModelLocalBindings.SAMPLER_REFLECTION_PROBE_DATA_MAP);
            var UNIFORM_REFLECTION_PROBE_DATA_MAP_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_REFLECTION_PROBE_DATA_MAP_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT, MemoryAccessBit.READ_ONLY, ViewDimension.TEX2D);
            var UNIFORM_REFLECTION_PROBE_DATA_MAP_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_REFLECTION_PROBE_DATA_MAP_BINDING, UNIFORM_REFLECTION_PROBE_DATA_MAP_NAME, Type.SAMPLER2D, 1);
            localDescriptorSetLayout.layouts[UNIFORM_REFLECTION_PROBE_DATA_MAP_NAME] = UNIFORM_REFLECTION_PROBE_DATA_MAP_LAYOUT;
            localDescriptorSetLayout.bindings[UNIFORM_REFLECTION_PROBE_DATA_MAP_BINDING] = UNIFORM_REFLECTION_PROBE_DATA_MAP_DESCRIPTOR;
            var UNIFORM_REFLECTION_PROBE_BLEND_CUBEMAP_NAME = 'cc_reflectionProbeBlendCubemap';
            var UNIFORM_REFLECTION_PROBE_BLEND_CUBEMAP_BINDING = ModelLocalBindings.SAMPLER_REFLECTION_PROBE_DATA_MAP + 1;
            new DescriptorSetLayoutBinding(UNIFORM_REFLECTION_PROBE_BLEND_CUBEMAP_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT, MemoryAccessBit.READ_ONLY, ViewDimension.TEXCUBE);
            new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_REFLECTION_PROBE_BLEND_CUBEMAP_BINDING, UNIFORM_REFLECTION_PROBE_BLEND_CUBEMAP_NAME, Type.SAMPLER_CUBE, 1);
            var ENABLE_PROBE_BLEND = false;
            var CAMERA_DEFAULT_MASK = exports("C", Layers.makeMaskExclude([Layers.BitMask.UI_2D, Layers.BitMask.GIZMOS, Layers.BitMask.EDITOR, Layers.BitMask.SCENE_GIZMO, Layers.BitMask.PROFILER]));
            var CAMERA_EDITOR_MASK = Layers.makeMaskExclude([Layers.BitMask.UI_2D, Layers.BitMask.PROFILER]);
            var MODEL_ALWAYS_MASK = Layers.Enum.ALL;
            function supportsR16HalfFloatTexture(device) {
              return (device.getFormatFeatures(Format.R16F) & (FormatFeatureBit.RENDER_TARGET | FormatFeatureBit.SAMPLED_TEXTURE)) === (FormatFeatureBit.RENDER_TARGET | FormatFeatureBit.SAMPLED_TEXTURE);
            }
            var dftShadowTexture;
            function getDefaultShadowTexture(device) {
              if (dftShadowTexture) return dftShadowTexture;
              var texInfo = new TextureInfo(TextureType.TEX2D, TextureUsageBit.NONE, supportsR32FloatTexture(device) ? Format.R32F : Format.RGBA8, 16, 16, TextureFlagBit.NONE, 1, 1, SampleCount.X1, 1);
              dftShadowTexture = device.createTexture(texInfo);
              return dftShadowTexture;
            }
            function supportsR32FloatTexture(device) {
              return (device.getFormatFeatures(Format.R32F) & (FormatFeatureBit.RENDER_TARGET | FormatFeatureBit.SAMPLED_TEXTURE)) === (FormatFeatureBit.RENDER_TARGET | FormatFeatureBit.SAMPLED_TEXTURE) && !(device.gfxAPI === API.WEBGL);
            }
            function supportsRGBA16HalfFloatTexture(device) {
              return (device.getFormatFeatures(Format.RGBA16F) & (FormatFeatureBit.RENDER_TARGET | FormatFeatureBit.SAMPLED_TEXTURE)) === (FormatFeatureBit.RENDER_TARGET | FormatFeatureBit.SAMPLED_TEXTURE);
            }
            function supportsRGBA32FloatTexture(device) {
              return (device.getFormatFeatures(Format.RGBA32F) & (FormatFeatureBit.RENDER_TARGET | FormatFeatureBit.SAMPLED_TEXTURE)) === (FormatFeatureBit.RENDER_TARGET | FormatFeatureBit.SAMPLED_TEXTURE);
            }
            function isEnableEffect() {
              return !!(cclegacy.rendering && cclegacy.rendering.enableEffectImport);
            }
            function getPassPool() {
              return new RecyclePool(function () {
                return {
                  priority: 0,
                  hash: 0,
                  depth: 0,
                  shaderId: 0,
                  subModel: null,
                  passIdx: 0
                };
              }, 64);
            }

            var define = /*#__PURE__*/Object.freeze({
                __proto__: null,
                CAMERA_DEFAULT_MASK: CAMERA_DEFAULT_MASK,
                CAMERA_EDITOR_MASK: CAMERA_EDITOR_MASK,
                ENABLE_PROBE_BLEND: ENABLE_PROBE_BLEND,
                INST_JOINT_ANIM_INFO: INST_JOINT_ANIM_INFO,
                INST_MAT_WORLD: INST_MAT_WORLD,
                INST_SH: INST_SH,
                JOINT_UNIFORM_CAPACITY: JOINT_UNIFORM_CAPACITY,
                MODEL_ALWAYS_MASK: MODEL_ALWAYS_MASK,
                get ModelLocalBindings () { return ModelLocalBindings; },
                PIPELINE_FLOW_FORWARD: PIPELINE_FLOW_FORWARD,
                PIPELINE_FLOW_MAIN: PIPELINE_FLOW_MAIN,
                PIPELINE_FLOW_SHADOW: PIPELINE_FLOW_SHADOW,
                PIPELINE_FLOW_SMAA: PIPELINE_FLOW_SMAA,
                PIPELINE_FLOW_TONEMAP: PIPELINE_FLOW_TONEMAP,
                get PipelineGlobalBindings () { return PipelineGlobalBindings; },
                get RenderPassStage () { return RenderPassStage; },
                get RenderPriority () { return RenderPriority; },
                get SetIndex () { return SetIndex; },
                UBOCSM: UBOCSM,
                get UBOCSMEnum () { return UBOCSMEnum; },
                UBOCamera: UBOCamera,
                get UBOCameraEnum () { return UBOCameraEnum; },
                UBODeferredLight: UBODeferredLight,
                UBOForwardLight: UBOForwardLight,
                get UBOForwardLightEnum () { return UBOForwardLightEnum; },
                UBOGlobal: UBOGlobal,
                get UBOGlobalEnum () { return UBOGlobalEnum; },
                UBOLocal: UBOLocal,
                UBOLocalBatched: UBOLocalBatched,
                get UBOLocalEnum () { return UBOLocalEnum; },
                UBOMorph: UBOMorph,
                get UBOMorphEnum () { return UBOMorphEnum; },
                UBOSH: UBOSH,
                get UBOSHEnum () { return UBOSHEnum; },
                UBOShadow: UBOShadow,
                get UBOShadowEnum () { return UBOShadowEnum; },
                UBOSkinning: UBOSkinning,
                UBOSkinningAnimation: UBOSkinningAnimation,
                UBOSkinningTexture: UBOSkinningTexture,
                UBOUILocal: UBOUILocal,
                UBOWorldBound: UBOWorldBound,
                UNIFORM_DIFFUSEMAP_BINDING: UNIFORM_DIFFUSEMAP_BINDING,
                UNIFORM_ENVIRONMENT_BINDING: UNIFORM_ENVIRONMENT_BINDING,
                UNIFORM_JOINT_TEXTURE_BINDING: UNIFORM_JOINT_TEXTURE_BINDING,
                UNIFORM_LIGHTMAP_TEXTURE_BINDING: UNIFORM_LIGHTMAP_TEXTURE_BINDING,
                UNIFORM_NORMAL_MORPH_TEXTURE_BINDING: UNIFORM_NORMAL_MORPH_TEXTURE_BINDING,
                UNIFORM_POSITION_MORPH_TEXTURE_BINDING: UNIFORM_POSITION_MORPH_TEXTURE_BINDING,
                UNIFORM_REALTIME_JOINT_TEXTURE_BINDING: UNIFORM_REALTIME_JOINT_TEXTURE_BINDING,
                UNIFORM_REFLECTION_PROBE_BLEND_CUBEMAP_BINDING: UNIFORM_REFLECTION_PROBE_BLEND_CUBEMAP_BINDING,
                UNIFORM_REFLECTION_PROBE_CUBEMAP_BINDING: UNIFORM_REFLECTION_PROBE_CUBEMAP_BINDING,
                UNIFORM_REFLECTION_PROBE_DATA_MAP_BINDING: UNIFORM_REFLECTION_PROBE_DATA_MAP_BINDING,
                UNIFORM_REFLECTION_PROBE_TEXTURE_BINDING: UNIFORM_REFLECTION_PROBE_TEXTURE_BINDING,
                UNIFORM_SHADOWMAP_BINDING: UNIFORM_SHADOWMAP_BINDING,
                UNIFORM_SPOT_SHADOW_MAP_TEXTURE_BINDING: UNIFORM_SPOT_SHADOW_MAP_TEXTURE_BINDING,
                UNIFORM_SPRITE_TEXTURE_BINDING: UNIFORM_SPRITE_TEXTURE_BINDING,
                UNIFORM_TANGENT_MORPH_TEXTURE_BINDING: UNIFORM_TANGENT_MORPH_TEXTURE_BINDING,
                bindingMappingInfo: bindingMappingInfo,
                getDefaultShadowTexture: getDefaultShadowTexture,
                getPassPool: getPassPool,
                globalDescriptorSetLayout: globalDescriptorSetLayout,
                isEnableEffect: isEnableEffect,
                localDescriptorSetLayout: localDescriptorSetLayout,
                localDescriptorSetLayout_ResizeMaxJoints: localDescriptorSetLayout_ResizeMaxJoints,
                supportsR16HalfFloatTexture: supportsR16HalfFloatTexture,
                supportsR32FloatTexture: supportsR32FloatTexture,
                supportsRGBA16HalfFloatTexture: supportsRGBA16HalfFloatTexture,
                supportsRGBA32FloatTexture: supportsRGBA32FloatTexture
            });
            exports("m", define);

            var PipelineStateManager = exports("P", function () {
              function PipelineStateManager() {}
              PipelineStateManager.getOrCreatePipelineState =
              function getOrCreatePipelineState(device, pass, shader, renderPass, ia) {
                var hash1 = pass.hash;
                var hash2 = renderPass.hash;
                var hash3 = ia.attributesHash;
                var hash4 = shader.typedID;
                var newHash = hash1 ^ hash2 ^ hash3 ^ hash4;
                var pso = this._PSOHashMap.get(newHash);
                if (!pso) {
                  var pipelineLayout = pass.pipelineLayout;
                  var inputState = new InputState(ia.attributes);
                  var psoInfo = new PipelineStateInfo(shader, pipelineLayout, renderPass, inputState, pass.rasterizerState, pass.depthStencilState, pass.blendState, pass.primitive, pass.dynamicStates);
                  pso = device.createPipelineState(psoInfo);
                  this._PSOHashMap.set(newHash, pso);
                }
                return pso;
              };
              return PipelineStateManager;
            }());
            PipelineStateManager._PSOHashMap = new Map();

        })
    };
}));
