System.register([], (function (exports) {
    'use strict';
    return {
        execute: (function () {

            function tryDefineGlobal (name, value) {
                const _global = typeof window === 'undefined' ? global : window;
                if (typeof _global[name] === 'undefined') {
                    return (_global[name] = value);
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return _global[name];
                }
            }
            tryDefineGlobal('CC_WECHAT', false);

            const WECHAT_MINI_PROGRAM = exports("W", false);

            const XIAOMI = exports("X", false);
            tryDefineGlobal('CC_XIAOMI', false);
            tryDefineGlobal('CC_ALIPAY', false);

            const BYTEDANCE = exports("B", false);
            tryDefineGlobal('CC_BYTEDANCE', false);
            tryDefineGlobal('CC_OPPO', false);
            tryDefineGlobal('CC_VIVO', false);
            tryDefineGlobal('CC_HUAWEI', false);
            tryDefineGlobal('CC_MIGU', false);
            tryDefineGlobal('CC_HONOR', false);
            tryDefineGlobal('CC_COCOS_RUNTIME', false);

            const EDITOR = exports("E", false);
            tryDefineGlobal('CC_EDITOR', false);

            const EDITOR_NOT_IN_PREVIEW = exports("a", false);

            const PREVIEW = exports("P", false);
            tryDefineGlobal('CC_PREVIEW', false);
            tryDefineGlobal('CC_BUILD', true);

            const TEST = exports("T", false);
            tryDefineGlobal('CC_TEST', false);

            const DEBUG = exports("D", true);
            tryDefineGlobal('CC_DEBUG', true);
            tryDefineGlobal('CC_DEV', false);

            const MINIGAME = exports("M", false);
            tryDefineGlobal('CC_MINIGAME', false);

            const RUNTIME_BASED = exports("R", false);
            tryDefineGlobal('CC_RUNTIME_BASED', false);
            tryDefineGlobal('CC_SUPPORT_JIT', true);

            const JSB = exports("J", false);
            tryDefineGlobal('CC_JSB', false);

            const USE_XR = exports("U", true);

        })
    };
}));
