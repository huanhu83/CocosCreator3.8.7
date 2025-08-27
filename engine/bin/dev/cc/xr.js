System.register(['./gc-object-CbS29vYa.js', './index-oHSn7cpO.js', './touch-iR3Bpatu.js', './_virtual_internal_constants-Cb-eEldT.js', './global-exports-C7R_I6Kn.js'], (function (exports) {
    'use strict';
    var _inheritsLoose, Vec3, Event;
    return {
        setters: [function (module) {
            _inheritsLoose = module._;
        }, function (module) {
            Vec3 = module.f;
        }, function (module) {
            Event = module.E;
        }, null, null],
        execute: (function () {

            var DeviceType; exports("DeviceType", DeviceType);
            (function (DeviceType) {
              DeviceType[DeviceType["Other"] = 0] = "Other";
              DeviceType[DeviceType["Left"] = 1] = "Left";
              DeviceType[DeviceType["Right"] = 2] = "Right";
            })(DeviceType || (exports("DeviceType", DeviceType = {})));
            var XrUIPressEventType; exports("XrUIPressEventType", XrUIPressEventType);
            (function (XrUIPressEventType) {
              XrUIPressEventType["XRUI_HOVER_ENTERED"] = "xrui-hover-entered";
              XrUIPressEventType["XRUI_HOVER_EXITED"] = "xrui-hover-exited";
              XrUIPressEventType["XRUI_HOVER_STAY"] = "xrui-hover-stay";
              XrUIPressEventType["XRUI_CLICK"] = "xrui-click";
              XrUIPressEventType["XRUI_UNCLICK"] = "xrui-unclick";
            })(XrUIPressEventType || (exports("XrUIPressEventType", XrUIPressEventType = {})));
            var XrKeyboardEventType; exports("XrKeyboardEventType", XrKeyboardEventType);
            (function (XrKeyboardEventType) {
              XrKeyboardEventType["XR_CAPS_LOCK"] = "xr-caps-lock";
              XrKeyboardEventType["XR_KEYBOARD_INIT"] = "xr-keyboard-init";
              XrKeyboardEventType["XR_KEYBOARD_INPUT"] = "xr-keyboard-input";
              XrKeyboardEventType["TO_LATIN"] = "to-latin";
              XrKeyboardEventType["TO_SYMBOL"] = "to-symbol";
              XrKeyboardEventType["TO_MATH_SYMBOL"] = "to-math-symbol";
            })(XrKeyboardEventType || (exports("XrKeyboardEventType", XrKeyboardEventType = {})));
            var XrUIPressEvent = exports("XrUIPressEvent", function (_Event) {
              _inheritsLoose(XrUIPressEvent, _Event);
              function XrUIPressEvent() {
                var _this;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }
                _this = _Event.call.apply(_Event, [this].concat(args)) || this;
                _this.deviceType = DeviceType.Other;
                _this.hitPoint = new Vec3();
                return _this;
              }
              return XrUIPressEvent;
            }(Event));

        })
    };
}));
