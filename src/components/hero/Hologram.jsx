
import React, { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Hologram(props) {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/model/Hologram.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    console.log('Available animations:', Object.keys(actions))
    
    Object.values(actions).forEach((action) => {
      action.reset().play()
      action.setLoop(true, Infinity) 
    })
    return () => {
      Object.values(actions).forEach((action) => action.stop())
    }
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" position={[0, -72.819, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <group name="78f13276f30b469bb7ca99787706d846fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="cheruba_Icosphere010" position={[0, 0.402, 0]} rotation={[0, -0.018, 0]} scale={100}>
                  <mesh name="cheruba_Icosphere010_body2_0" geometry={nodes.cheruba_Icosphere010_body2_0.geometry} material={materials.body2} />
                  <mesh name="cheruba_Icosphere010_body2_0001" geometry={nodes.cheruba_Icosphere010_body2_0001.geometry} material={materials.body2} />
                </group>
                <group name="Ring1" position={[0, -5.527, 0]} rotation={[-Math.PI / 2, 0, 0.018]} scale={92.459}>
                  <mesh name="Ring1_Material002_0" geometry={nodes.Ring1_Material002_0.geometry} material={materials['Material.002']} />
                </group>
                <group name="Ring2" position={[0, -163.885, 0]} rotation={[-Math.PI / 2, 0, 0.018]} scale={92.459}>
                  <mesh name="Ring2_Material002_0" geometry={nodes.Ring2_Material002_0.geometry} material={materials['Material.002']} />
                </group>
                <group name="Ring3" position={[0, 287.357, 0]} rotation={[-Math.PI / 2, 0, 0.018]} scale={110.489}>
                  <mesh name="Ring3_Material002_0" geometry={nodes.Ring3_Material002_0.geometry} material={materials['Material.002']} />
                </group>
                <group name="Ring4" position={[0, 496.115, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={93.605}>
                  <mesh name="Ring4_Material002_0" geometry={nodes.Ring4_Material002_0.geometry} material={materials['Material.002']} />
                </group>
                <group name="Ring5" position={[0, -3.885, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={107.488}>
                  <mesh name="Ring5_Material002_0" geometry={nodes.Ring5_Material002_0.geometry} material={materials['Material.002']} />
                </group>
                <group name="Ring6" position={[0, 497.074, 0]} rotation={[-Math.PI / 2, 0, 0.018]} scale={71.472}>
                  <mesh name="Ring6_Material002_0" geometry={nodes.Ring6_Material002_0.geometry} material={materials['Material.002']} />
                </group>
                <group name="area" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                <group name="core" position={[0, -428.347, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                <group name="Spot" position={[0, -215.357, 0]} rotation={[0, 0, -Math.PI]} scale={100}>
                  <group name="Object_12" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_13" />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model/Hologram.glb')
