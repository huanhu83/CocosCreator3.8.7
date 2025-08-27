System.register(['./gc-object-CbS29vYa.js'], (function (exports) {
    'use strict';
    var assertsArrayIndex;
    return {
        setters: [function (module) {
            assertsArrayIndex = module.c;
        }],
        execute: (function () {

            exports("s", shift);

            function shift(array, first, last) {
              assertsArrayIndex(array, first);
              assertsArrayIndex(array, last);
              if (first === last) {
                return array;
              }
              var element = array[first];
              if (first < last) {
                for (var iElement = first + 1; iElement <= last; ++iElement) {
                  array[iElement - 1] = array[iElement];
                }
              } else {
                for (var _iElement2 = first; _iElement2 !== last; --_iElement2) {
                  array[_iElement2] = array[_iElement2 - 1];
                }
              }
              array[last] = element;
              return array;
            }

        })
    };
}));
