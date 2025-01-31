import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Computer(props) {
  const { nodes, materials } = useGLTF('/model/Computer.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-0.163, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.489}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial004.geometry} material={materials.MAT_Monitors01} />
          <mesh geometry={nodes.defaultMaterial.geometry} material={materials.MAT_Monitors01} />
          <mesh geometry={nodes.defaultMaterial007.geometry} material={materials.MAT_Monitors02} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model/Computer.glb')
