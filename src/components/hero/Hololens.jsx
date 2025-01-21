import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Hololens(props) {
  const { nodes, materials } = useGLTF('/model/hololens.glb')
  return (
    <group {...props} dispose={null}  scale={1}>
      <mesh geometry={nodes.Object_4.geometry} material={materials['vidrio.001']} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh geometry={nodes.Object_6.geometry} material={materials.plastico3} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh geometry={nodes.Object_8.geometry} material={materials.plastico2} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh geometry={nodes.Object_10.geometry} material={materials.SM_Prop_SurfacesHard} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh geometry={nodes.Object_12.geometry} material={materials.SM_Prop_SurfacesHard} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh geometry={nodes.Object_14.geometry} material={materials.Materiplastico1} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh geometry={nodes.Object_16.geometry} material={materials.SM_Prop_SurfacesHard} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh geometry={nodes.Object_18.geometry} material={materials.SM_Prop_SurfacesHard} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
    </group>
  )
}

useGLTF.preload('/model/hololens.glb')
