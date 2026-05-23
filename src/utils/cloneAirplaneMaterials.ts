import * as THREE from "three";

export function cloneAirplaneMaterials(scene: THREE.Object3D): THREE.Object3D {
  const clone = scene.clone(true);
  clone.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const materials: THREE.Material[] = Array.isArray(child.material)
      ? child.material.map((m: THREE.Material) => m.clone())
      : [child.material.clone()];

    materials.forEach((mat) => {
      const m = mat as THREE.MeshStandardMaterial;
      m.transparent = false;
      m.opacity = 1;
      m.alphaTest = 0;
      m.alphaMap = null;
      m.depthWrite = true;
      m.side = THREE.FrontSide;
      m.needsUpdate = true;
    });

    child.material = materials.length === 1 ? materials[0] : materials;
  });
  return clone;
}
