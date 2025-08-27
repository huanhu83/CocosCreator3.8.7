System.register(['./_virtual_internal_constants-Cb-eEldT.js'], (function (exports) {
    'use strict';
    return {
        setters: [null],
        execute: (function () {

            var _global = typeof window === 'undefined' ? global : window;
            var cclegacy = exports("c", {
              _global: _global
            });
            var legacyCC = exports("l", cclegacy);
            cclegacy.internal = {};
            var engineVersion = exports("e", '3.8.7');
            _global.CocosEngine = legacyCC.ENGINE_VERSION = engineVersion;
            _global.cc = legacyCC;
            var ccwindow = exports("a", typeof globalThis.jsb !== 'undefined' ? typeof jsb.window !== 'undefined' ? jsb.window : globalThis : globalThis);
            _global.ccwindow = ccwindow;

        })
    };
}));
