import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Tablet(props) {
  const { nodes, materials } = useGLTF('/model/tablet.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-0.465, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.489}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial002.geometry} material={materials['MAT_Monitors01.001']} position={[0, -0.736, 0]} />
          <mesh geometry={nodes.defaultMaterial003.geometry} material={materials['MAT_Monitors02.001']} position={[0, -0.736, 0]} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model/tablet.glb')
