import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AvatarProps {
  expression: string; // From tRPC: "happy", "sad", "engaged"
  influence: number;  // Intensity of the expression 0 to 1
}

export function DigitalHuman({ expression, influence }: AvatarProps) {
  // Use a .glb model (e.g., from ReadyPlayerMe or custom)
  const { nodes, materials, scene } = useGLTF('/models/avatar.glb') as any
  const headRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (nodes.Wolf3D_Head) {
      const mesh = nodes.Wolf3D_Head as THREE.Mesh
      
      // Dynamic Synthesis: Mapping AI tags to Three.js Morph Targets
      // Usually index 0-50+ in ARKit compatible models
      if (expression === 'happy') {
        mesh.morphTargetInfluences![10] = THREE.MathUtils.lerp(
          mesh.morphTargetInfluences![10], influence, 0.1
        ) // MouthSmile
      }
    }
  })

  return <primitive object={scene} ref={headRef} scale={2} position={[0, -3, 0]} />
}