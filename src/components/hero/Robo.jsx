import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Robo(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/model/robo.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
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
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.002}>
          <group name="e9ae5988a1c747d2ad522be4b836d2d8fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Body_Controller" position={[-8.722, -7.998, 0.297]} rotation={[-Math.PI / 2, 0, 0]} scale={1.591}>
                  <group name="Body_Bottom" position={[6.583, 0, 3.037]} scale={0.628}>
                    <group name="Mid_Controller" position={[-8.041, 0.236, 9.928]} scale={2.316}>
                      <group name="Body" position={[16.772, -0.102, 28.387]} scale={0.432}>
                        <group name="Eye" position={[-103.214, 0.241, 8.657]} rotation={[0, -0.087, 0]} scale={0.066}>
                          <group name="Object_22" position={[0, -18.2, -32.575]}>
                            <mesh name="Eye_Bulb_Glow_0" geometry={nodes.Eye_Bulb_Glow_0.geometry} material={materials.Bulb_Glow} />
                          </group>
                        </group>
                        <group name="Eye_Controller" position={[-195.357, 0.427, 7.67]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} scale={0.257} />
                        <group name="L_Hand_01_Controller" position={[-88.276, -8.259, -58.859]} rotation={[0, -0.611, 0.175]} scale={1.513}>
                          <group name="Hand_00" scale={0.661}>
                            <group name="Object_26" position={[57.477, 8.259, -17.462]}>
                              <mesh name="Hand_00_Bot_0" geometry={nodes.Hand_00_Bot_0.geometry} material={materials.material} />
                            </group>
                          </group>
                          <group name="L_Hand_02_Controller" position={[-14.233, 0.036, 0]} scale={1.371}>
                            <group name="L_Hand_03_Controller" position={[-6.88, -0.002, 0]} rotation={[0, Math.PI / 4, 0]} scale={1.103}>
                              <group name="Hand_03" scale={0.437}>
                                <group name="Object_34" position={[93.276, 8.209, -17.462]}>
                                  <mesh name="Hand_03_Bot_0" geometry={nodes.Hand_03_Bot_0.geometry} material={materials.material} />
                                </group>
                              </group>
                              <group name="L_Hand_04_Controller" position={[-4.854, 0, 0]} rotation={[0.262, 0, 0]} scale={1.144}>
                                <group name="Hand_04" scale={0.382}>
                                  <group name="Object_38" position={[104.376, 8.209, -17.462]}>
                                    <mesh name="Hand_04_Bot_0" geometry={nodes.Hand_04_Bot_0.geometry} material={materials.material} />
                                    <mesh name="Hand_04_Hands_Glow_0" geometry={nodes.Hand_04_Hands_Glow_0.geometry} material={materials.Hands_Glow} />
                                  </group>
                                </group>
                              </group>
                            </group>
                            <group name="Hand_01" position={[2.249, -0.018, 0]} scale={0.482}>
                              <group name="Object_30" position={[74.344, 8.242, -17.462]}>
                                <mesh name="Hand_01_Bot_0" geometry={nodes.Hand_01_Bot_0.geometry} material={materials.material} />
                              </group>
                            </group>
                          </group>
                        </group>
                        <group name="Laser_Lenght_Controller" position={[-105.072, 0.297, -35.73]} rotation={[Math.PI / 2, 0, -Math.PI / 9]} scale={[0.003, 1, 0.003]}>
                          <group name="Object_59" position={[0.001, 0, 0]}>
                            <group name="Object_63" position={[-226.552, 40.377, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                            <primitive object={nodes._rootJoint} />
                            <skinnedMesh name="Object_64" geometry={nodes.Object_64.geometry} material={materials.Laser_Outline} skeleton={nodes.Object_64.skeleton} />
                            <skinnedMesh name="Object_65" geometry={nodes.Object_65.geometry} material={materials.Laser} skeleton={nodes.Object_65.skeleton} />
                          </group>
                        </group>
                        <group name="R_Hand_01_Controller" position={[-88.276, 8.447, -58.859]} rotation={[-0.148, -0.504, -0.3]} scale={1.513}>
                          <group name="Hand_005" scale={0.661}>
                            <group name="Object_43" position={[57.477, 8.259, -17.462]}>
                              <mesh name="Hand_005_Bot_0" geometry={nodes.Hand_005_Bot_0.geometry} material={materials.material} />
                            </group>
                          </group>
                          <group name="R_Hand_02_Controller" position={[-14.233, 0.036, 0]} scale={1.371}>
                            <group name="R_Hand_03_Controller" position={[-6.88, -0.002, 0]} rotation={[0, Math.PI / 6, 0]} scale={1.103}>
                              <group name="R_Hand_04_Controller" position={[-4.854, 0, 0]} rotation={[-0.175, 0, 0]} scale={1.144}>
                                <group name="Hand_008" scale={0.382}>
                                  <group name="Object_55" position={[104.376, 8.209, -17.462]}>
                                    <mesh name="Hand_008_Bot_0" geometry={nodes.Hand_008_Bot_0.geometry} material={materials.material} />
                                    <mesh name="Hand_008_Hands_Glow_0" geometry={nodes.Hand_008_Hands_Glow_0.geometry} material={materials.Hands_Glow} />
                                  </group>
                                </group>
                              </group>
                              <group name="Hand_007" scale={0.437}>
                                <group name="Object_51" position={[93.276, 8.209, -17.462]}>
                                  <mesh name="Hand_007_Bot_0" geometry={nodes.Hand_007_Bot_0.geometry} material={materials.material} />
                                </group>
                              </group>
                            </group>
                            <group name="Hand_006" position={[2.249, -0.018, 0]} scale={0.482}>
                              <group name="Object_47" position={[74.344, 8.242, -17.462]}>
                                <mesh name="Hand_006_Bot_0" geometry={nodes.Hand_006_Bot_0.geometry} material={materials.material} />
                              </group>
                            </group>
                          </group>
                        </group>
                        <group name="Object_15" position={[-30.799, 0, -75.711]}>
                          <mesh name="Body_Black_0" geometry={nodes.Body_Black_0.geometry} material={materials.Black} />
                          <mesh name="Body_Bot_0" geometry={nodes.Body_Bot_0.geometry} material={materials.material} />
                          <mesh name="Body_Bulb_Glow_0" geometry={nodes.Body_Bulb_Glow_0.geometry} material={materials.Bulb_Glow} />
                          <mesh name="Body_Glass_0" geometry={nodes.Body_Glass_0.geometry} material={materials.Glass} />
                        </group>
                      </group>
                    </group>
                    <group name="L_Leg_B_Controller" position={[26.903, -39.07, -13.076]} rotation={[0, 0, 0.262]} scale={2.142}>
                      <group name="Engine_Leg" position={[0, 0, -5.869]} scale={0.467}>
                        <group name="L_Engine_B_Controller" position={[11.05, -15.508, -0.366]} rotation={[0.05, -0.072, 0.608]} scale={2.132}>
                          <group name="Engine" scale={0.469}>
                            <group name="Object_72" position={[0.174, 66.406, 26.011]} rotation={[0, 0, -0.611]}>
                              <mesh name="Engine_Bot_0" geometry={nodes.Engine_Bot_0.geometry} material={materials.material} />
                            </group>
                          </group>
                        </group>
                        <group name="Object_68" position={[-26.897, 38.989, 25.645]}>
                          <mesh name="Engine_Leg_Bot_0" geometry={nodes.Engine_Leg_Bot_0.geometry} material={materials.material} />
                        </group>
                      </group>
                    </group>
                    <group name="L_Leg_F_Controller" position={[-23.667, -44.163, -13.076]} rotation={[0, 0, -1.309]} scale={2.451}>
                      <group name="Engine_Leg001" position={[0, 0, -5.128]} scale={0.408}>
                        <group name="L_Engine_F_Controller" position={[11.05, -15.508, -0.366]} rotation={[-0.1, 0.143, 0.613]} scale={2.431}>
                          <group name="Engine001" scale={0.411}>
                            <group name="Object_80" position={[0.174, 66.406, 26.011]} rotation={[0, 0, -0.611]}>
                              <mesh name="Engine001_Bot_0" geometry={nodes.Engine001_Bot_0.geometry} material={materials.material} />
                            </group>
                          </group>
                        </group>
                        <group name="Object_76" position={[-26.897, 38.989, 25.645]}>
                          <mesh name="Engine_Leg001_Bot_0" geometry={nodes.Engine_Leg001_Bot_0.geometry} material={materials.material} />
                        </group>
                      </group>
                    </group>
                    <group name="R_Leg_B_Controller" position={[26.708, 38.803, -13.076]} rotation={[0, 0, 1.658]} scale={2.267}>
                      <group name="Engine_Leg002" position={[0, 0, -5.544]} scale={0.441}>
                        <group name="R_Engine_B_Controller" position={[11.05, -15.508, -0.366]} rotation={[-0.05, 0.072, 0.608]} scale={2.198}>
                          <group name="Engine002" scale={0.455}>
                            <group name="Object_96" position={[0.174, 66.406, 26.011]} rotation={[0, 0, -0.611]}>
                              <mesh name="Engine002_Bot_0" geometry={nodes.Engine002_Bot_0.geometry} material={materials.material} />
                            </group>
                          </group>
                        </group>
                        <group name="Object_92" position={[-26.897, 38.989, 25.645]}>
                          <mesh name="Engine_Leg002_Bot_0" geometry={nodes.Engine_Leg002_Bot_0.geometry} material={materials.material} />
                        </group>
                      </group>
                    </group>
                    <group name="R_Leg_F_Controller" position={[-23.341, 43.85, -13.076]} rotation={[0, 0, -3.054]} scale={2.147}>
                      <group name="Engine_Leg003" position={[0, 0, -5.853]} scale={0.466}>
                        <group name="R_Engine_F_Controller" position={[11.05, -15.508, -0.366]} rotation={[0.1, -0.143, 0.613]} scale={2.326}>
                          <group name="Engine003" scale={0.43}>
                            <group name="Object_88" position={[0.174, 66.406, 26.011]} rotation={[0, 0, -0.611]}>
                              <mesh name="Engine003_Bot_0" geometry={nodes.Engine003_Bot_0.geometry} material={materials.material} />
                            </group>
                          </group>
                        </group>
                        <group name="Object_84" position={[-26.897, 38.989, 25.645]}>
                          <mesh name="Engine_Leg003_Bot_0" geometry={nodes.Engine_Leg003_Bot_0.geometry} material={materials.material} />
                        </group>
                      </group>
                    </group>
                    <group name="Rubber" position={[-8.041, 0.236, 9.971]} scale={[0.945, 0.945, 1.126]}>
                      <mesh name="Rubber_Bot_0" geometry={nodes.Rubber_Bot_0.geometry} material={materials.material} />
                    </group>
                    <mesh name="Body_Bottom_Bot_0" geometry={nodes.Body_Bottom_Bot_0.geometry} material={materials.material} />
                  </group>
                </group>
                <group name="Box066" position={[-404.294, -5.192, 0]} rotation={[-2.186, -0.782, 0.003]} scale={0.697}>
                  <group name="Object_6" position={[0, 0, -75]} />
                </group>
                <group name="Box033" position={[-69.844, 20.164, -0.151]} rotation={[-Math.PI / 2, 0, 0]} />
                <group name="Laser" position={[-72.075, 37.999, 0]} rotation={[-Math.PI / 2, Math.PI / 6, 0]} />
                <group name="Sphere" position={[-404.294, -5.192, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.835}>
                  <group name="Object_99" position={[0, 0, -150]} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model/robo.glb')
