import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Projector(props) {
  const { nodes, materials } = useGLTF('/model/Projector.glb')
  return (
    <group {...props} dispose={null} scale={0.06}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.Brass} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.Dark_Brass} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.Teal_Glow} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.White_Glow} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.silver} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.Brass} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.Brass} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.silver} />
      </group>
    </group>
  )
}

useGLTF.preload('/model/Projector.glb')
