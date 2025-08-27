System.register(['./index-CjNBLuX-.js', './base.js', './index-oHSn7cpO.js', './global-exports-C7R_I6Kn.js', './gc-object-CbS29vYa.js', './collision-matrix-ZbGqiKNy.js', './_virtual_internal_constants-Cb-eEldT.js', './deprecated-B0llPila.js', './director-CFEaPqP_.js', './debug-view-CfU41ypM.js', './device-manager-gD_whA7Q.js', './buffer-barrier-BmKiPanc.js', './pipeline-state-manager-C5ShdTPh.js', './scene-B79xt5WD.js', './node-event-BDQEXkZZ.js', './touch-iR3Bpatu.js', './prefab-CvAWu2P7.js', './deprecated-DMYVurVK.js', './util-Br_fQTr5.js', './mesh-KkRb0lsQ.js', './wasm-web-Dlyu7UW0.js', './zlib.min-CSSqgreA.js', './capsule-BfNU2Izo.js', './skeleton-YQW3avZy.js', './terrain-asset-BFP_6GVw.js', './deprecated-CIxijlmD.js', './render-types-CckVe7el.js', './deprecated-DbHjng6y.js', './camera-component-2LVRWB7s.js', './model-renderer-CC8iC6el.js', './renderer-2n4MtCXy.js', './instantiate-CDXpXX6j.js', './move-DVEb9A_n.js'], (function (exports) {
    'use strict';
    var PhysicsSystem, Collider, Constraint, BoxCollider, SphereCollider, CapsuleCollider, RigidBody, PhysicsMaterial, MeshCollider, CylinderCollider, physics, replaceProperty, removeProperty, cclegacy, setClassAlias;
    return {
        setters: [function (module) {
            PhysicsSystem = module.P;
            Collider = module.C;
            Constraint = module.a;
            BoxCollider = module.B;
            SphereCollider = module.S;
            CapsuleCollider = module.b;
            RigidBody = module.R;
            PhysicsMaterial = module.c;
            MeshCollider = module.M;
            CylinderCollider = module.d;
            physics = module.p;
            exports({ BoxCharacterController: module.o, BoxCollider: module.B, BoxColliderComponent: module.B, CapsuleCharacterController: module.n, CapsuleCollider: module.b, CapsuleColliderComponent: module.b, CharacterController: module.e, Collider: module.C, ColliderComponent: module.C, ConeCollider: module.i, ConfigurableConstraint: module.l, ConstantForce: module.f, Constraint: module.a, CylinderCollider: module.d, CylinderColliderComponent: module.d, FixedConstraint: module.F, HingeConstraint: module.H, MeshCollider: module.M, MeshColliderComponent: module.M, PhysicMaterial: module.c, PhysicsLineStripCastResult: module.h, PhysicsMaterial: module.c, PhysicsRayResult: module.g, PhysicsSystem: module.P, PlaneCollider: module.k, PointToPointConstraint: module.m, RigidBody: module.R, RigidBodyComponent: module.R, SimplexCollider: module.j, SphereCollider: module.S, SphereColliderComponent: module.S, TerrainCollider: module.T, physics: module.p });
        }, null, function (module) {
            replaceProperty = module.r;
            removeProperty = module.i;
        }, function (module) {
            cclegacy = module.c;
        }, function (module) {
            setClassAlias = module.k;
        }, function (module) {
            exports({ EAxisDirection: module.E, EColliderType: module.b, EPhysicsDrawFlags: module.c, ERigidBodyType: module.a });
        }, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        execute: (function () {

            replaceProperty(PhysicsSystem, 'PhysicsSystem', [{
              name: 'ins',
              newName: 'instance'
            }, {
              name: 'PHYSICS_AMMO',
              newName: 'PHYSICS_BULLET'
            }]);
            replaceProperty(PhysicsSystem.prototype, 'PhysicsSystem.prototype', [{
              name: 'deltaTime',
              newName: 'fixedTimeStep'
            }, {
              name: 'maxSubStep',
              newName: 'maxSubSteps'
            }]);
            removeProperty(PhysicsSystem.prototype, 'PhysicsSystem.prototype', [{
              name: 'useFixedTime'
            }, {
              name: 'useCollisionMatrix'
            }, {
              name: 'updateCollisionMatrix'
            }, {
              name: 'resetCollisionMatrix'
            }, {
              name: 'isCollisionGroup'
            }, {
              name: 'setCollisionGroup'
            }]);
            replaceProperty(Collider.prototype, 'Collider.prototype', [{
              name: 'attachedRigidbody',
              newName: 'attachedRigidBody'
            }, {
              name: 'TYPE',
              newName: 'type'
            }]);
            replaceProperty(Collider, 'Collider', [{
              name: 'EColliderType',
              newName: 'Type'
            }, {
              name: 'EAxisDirection',
              newName: 'Axis'
            }]);
            replaceProperty(Constraint, 'Constraint', [{
              name: 'EConstraintType',
              newName: 'Type'
            }]);
            replaceProperty(BoxCollider.prototype, 'BoxCollider.prototype', [{
              name: 'boxShape',
              newName: 'shape'
            }]);
            replaceProperty(SphereCollider.prototype, 'SphereCollider.prototype', [{
              name: 'sphereShape',
              newName: 'shape'
            }]);
            replaceProperty(CapsuleCollider.prototype, 'CapsuleCollider.prototype', [{
              name: 'capsuleShape',
              newName: 'shape'
            }]);
            replaceProperty(RigidBody.prototype, 'RigidBody.prototype', [{
              name: 'rigidBody',
              newName: 'body'
            }]);
            replaceProperty(RigidBody, 'RigidBody', [{
              name: 'ERigidBodyType',
              newName: 'Type'
            }]);
            removeProperty(RigidBody.prototype, 'RigidBody.prototype', [{
              name: 'fixedRotation'
            }]);
            cclegacy.RigidBodyComponent = RigidBody;
            setClassAlias(RigidBody, 'cc.RigidBodyComponent');
            cclegacy.ColliderComponent = Collider;
            setClassAlias(Collider, 'cc.ColliderComponent');
            cclegacy.BoxColliderComponent = BoxCollider;
            setClassAlias(BoxCollider, 'cc.BoxColliderComponent');
            cclegacy.SphereColliderComponent = SphereCollider;
            setClassAlias(SphereCollider, 'cc.SphereColliderComponent');
            setClassAlias(CapsuleCollider, 'cc.CapsuleColliderComponent');
            setClassAlias(MeshCollider, 'cc.MeshColliderComponent');
            setClassAlias(CylinderCollider, 'cc.CylinderColliderComponent');
            cclegacy.PhysicMaterial = PhysicsMaterial;
            setClassAlias(PhysicsMaterial, 'cc.PhysicMaterial');

            cclegacy.physics = physics;

        })
    };
}));
