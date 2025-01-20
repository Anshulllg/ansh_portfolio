import React, { useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Name(props) {
  const { nodes, materials } = useGLTF('/model/Name.glb')

  const customMaterial = new THREE.MeshStandardMaterial({
    color: '#DE313F',
    metalness: 0.9,
    roughness: 0.2
  })

  const largeScale = 10 

  return (
    <group {...props} dispose={null} scale={largeScale} >
      <group rotation-x={Math.PI/2} >
        <mesh geometry={nodes.Curve.geometry} material={customMaterial} position={[-0.221, 0, 0]} />
        <mesh geometry={nodes.Curve001.geometry} material={customMaterial} position={[-0.221, 0, 0]} />
        <mesh geometry={nodes.Curve002.geometry} material={customMaterial} position={[-0.221, 0, 0]} />
        <mesh geometry={nodes.Curve003.geometry} material={customMaterial} position={[-0.221, 0, 0]} />
        <mesh geometry={nodes.Curve004.geometry} material={customMaterial} position={[-0.221, 0, 0]} />
        <mesh geometry={nodes.Curve005.geometry} material={customMaterial} position={[-0.221, 0, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/model/Name.glb')
