System.register(['./_virtual_internal_constants-Cb-eEldT.js'], (function (exports, module) {
    'use strict';
    var EDITOR, PREVIEW;
    return {
        setters: [function (module) {
            EDITOR = module.E;
            PREVIEW = module.P;
        }],
        execute: (function () {

            exports({
                e: ensureWasmModuleReady,
                f: fetchBuffer,
                i: instantiateWasm
            });

            function instantiateWasm(wasmUrl, importObject) {
              return fetchBuffer(wasmUrl).then(function (arrayBuffer) {
                return WebAssembly.instantiate(arrayBuffer, importObject);
              });
            }
            function fetchBuffer(binaryUrl) {
              return new Promise(function (resolve, reject) {
                try {
                  if (EDITOR) ; else if (PREVIEW) ;
                  binaryUrl = new URL(binaryUrl, module.meta.url).href;
                  fetch(binaryUrl).then(function (response) {
                    return response.arrayBuffer().then(resolve);
                  })["catch"](function (e) {
                  });
                } catch (e) {
                  reject(e);
                }
              });
            }
            function ensureWasmModuleReady() {
              return Promise.resolve();
            }

        })
    };
}));
