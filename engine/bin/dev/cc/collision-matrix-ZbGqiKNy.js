System.register(['./index-oHSn7cpO.js', './gc-object-CbS29vYa.js'], (function (exports) {
    'use strict';
    var Enum;
    return {
        setters: [null, function (module) {
            Enum = module.E;
        }],
        execute: (function () {

            var ERigidBodyType; exports("a", ERigidBodyType);
            (function (ERigidBodyType) {
              ERigidBodyType[ERigidBodyType["DYNAMIC"] = 1] = "DYNAMIC";
              ERigidBodyType[ERigidBodyType["STATIC"] = 2] = "STATIC";
              ERigidBodyType[ERigidBodyType["KINEMATIC"] = 4] = "KINEMATIC";
            })(ERigidBodyType || (exports("a", ERigidBodyType = {})));
            Enum(ERigidBodyType);
            var EAxisDirection; exports("E", EAxisDirection);
            (function (EAxisDirection) {
              EAxisDirection[EAxisDirection["X_AXIS"] = 0] = "X_AXIS";
              EAxisDirection[EAxisDirection["Y_AXIS"] = 1] = "Y_AXIS";
              EAxisDirection[EAxisDirection["Z_AXIS"] = 2] = "Z_AXIS";
            })(EAxisDirection || (exports("E", EAxisDirection = {})));
            Enum(EAxisDirection);
            var ED6Axis; exports("i", ED6Axis);
            (function (ED6Axis) {
              ED6Axis[ED6Axis["X"] = 0] = "X";
              ED6Axis[ED6Axis["Y"] = 1] = "Y";
              ED6Axis[ED6Axis["Z"] = 2] = "Z";
              ED6Axis[ED6Axis["SWING1"] = 3] = "SWING1";
              ED6Axis[ED6Axis["SWING2"] = 4] = "SWING2";
              ED6Axis[ED6Axis["TWIST"] = 5] = "TWIST";
            })(ED6Axis || (exports("i", ED6Axis = {})));
            Enum(ED6Axis);
            var ESimplexType; exports("h", ESimplexType);
            (function (ESimplexType) {
              ESimplexType[ESimplexType["VERTEX"] = 1] = "VERTEX";
              ESimplexType[ESimplexType["LINE"] = 2] = "LINE";
              ESimplexType[ESimplexType["TRIANGLE"] = 3] = "TRIANGLE";
              ESimplexType[ESimplexType["TETRAHEDRON"] = 4] = "TETRAHEDRON";
            })(ESimplexType || (exports("h", ESimplexType = {})));
            Enum(ESimplexType);
            var EColliderType; exports("b", EColliderType);
            (function (EColliderType) {
              EColliderType[EColliderType["BOX"] = 0] = "BOX";
              EColliderType[EColliderType["SPHERE"] = 1] = "SPHERE";
              EColliderType[EColliderType["CAPSULE"] = 2] = "CAPSULE";
              EColliderType[EColliderType["CYLINDER"] = 3] = "CYLINDER";
              EColliderType[EColliderType["CONE"] = 4] = "CONE";
              EColliderType[EColliderType["MESH"] = 5] = "MESH";
              EColliderType[EColliderType["PLANE"] = 6] = "PLANE";
              EColliderType[EColliderType["SIMPLEX"] = 7] = "SIMPLEX";
              EColliderType[EColliderType["TERRAIN"] = 8] = "TERRAIN";
            })(EColliderType || (exports("b", EColliderType = {})));
            Enum(EColliderType);
            var EConstraintType; exports("f", EConstraintType);
            (function (EConstraintType) {
              EConstraintType[EConstraintType["POINT_TO_POINT"] = 0] = "POINT_TO_POINT";
              EConstraintType[EConstraintType["HINGE"] = 1] = "HINGE";
              EConstraintType[EConstraintType["FIXED"] = 2] = "FIXED";
              EConstraintType[EConstraintType["CONFIGURABLE"] = 3] = "CONFIGURABLE";
            })(EConstraintType || (exports("f", EConstraintType = {})));
            Enum(EConstraintType);
            var EConstraintMode; exports("d", EConstraintMode);
            (function (EConstraintMode) {
              EConstraintMode[EConstraintMode["FREE"] = 0] = "FREE";
              EConstraintMode[EConstraintMode["LIMITED"] = 1] = "LIMITED";
              EConstraintMode[EConstraintMode["LOCKED"] = 2] = "LOCKED";
            })(EConstraintMode || (exports("d", EConstraintMode = {})));
            Enum(EConstraintMode);
            var EDriverMode; exports("e", EDriverMode);
            (function (EDriverMode) {
              EDriverMode[EDriverMode["DISABLED"] = 0] = "DISABLED";
              EDriverMode[EDriverMode["SERVO"] = 1] = "SERVO";
              EDriverMode[EDriverMode["INDUCTION"] = 2] = "INDUCTION";
            })(EDriverMode || (exports("e", EDriverMode = {})));
            Enum(EDriverMode);
            var ECharacterControllerType; exports("g", ECharacterControllerType);
            (function (ECharacterControllerType) {
              ECharacterControllerType[ECharacterControllerType["BOX"] = 0] = "BOX";
              ECharacterControllerType[ECharacterControllerType["CAPSULE"] = 1] = "CAPSULE";
            })(ECharacterControllerType || (exports("g", ECharacterControllerType = {})));
            Enum(ECharacterControllerType);
            var PhysicsGroup; exports("P", PhysicsGroup);
            (function (PhysicsGroup) {
              PhysicsGroup[PhysicsGroup["DEFAULT"] = 1] = "DEFAULT";
            })(PhysicsGroup || (exports("P", PhysicsGroup = {})));
            Enum(PhysicsGroup);
            var EPhysicsDrawFlags; exports("c", EPhysicsDrawFlags);
            (function (EPhysicsDrawFlags) {
              EPhysicsDrawFlags[EPhysicsDrawFlags["NONE"] = 0] = "NONE";
              EPhysicsDrawFlags[EPhysicsDrawFlags["WIRE_FRAME"] = 1] = "WIRE_FRAME";
              EPhysicsDrawFlags[EPhysicsDrawFlags["CONSTRAINT"] = 2] = "CONSTRAINT";
              EPhysicsDrawFlags[EPhysicsDrawFlags["AABB"] = 4] = "AABB";
            })(EPhysicsDrawFlags || (exports("c", EPhysicsDrawFlags = {})));
            Enum(EPhysicsDrawFlags);

            var CollisionMatrix = exports("C", function CollisionMatrix(strategy) {
              if (strategy === 1) {
                var self = this;
                var _loop = function _loop(i) {
                  var key = "_" + (1 << i);
                  self[key] = 0;
                  self.updateArray = [];
                  Object.defineProperty(self, 1 << i, {
                    get: function get() {
                      return this[key];
                    },
                    set: function set(v) {
                      if (this[key] !== v) {
                        this[key] = v;
                        if (this.updateArray.indexOf(i) < 0) {
                          this.updateArray.push(i);
                        }
                      }
                    }
                  });
                };
                for (var i = 0; i < 32; i++) {
                  _loop(i);
                }
                this['_1'] = PhysicsGroup.DEFAULT;
              } else {
                for (var _i2 = 0; _i2 < 32; _i2++) {
                  var key = 1 << _i2;
                  this["" + key] = 0;
                }
                this['1'] = PhysicsGroup.DEFAULT;
              }
            });

        })
    };
}));
