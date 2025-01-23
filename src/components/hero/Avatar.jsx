import React, { useEffect } from 'react'
import { useFrame, useGraph } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useFBX } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useAnimations } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three';

export function Avatar(props) {
  const {animation} = props;
  const group = useRef();
  const { scene } = useGLTF('/model/rpm.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const {animations: landingAnimation} = useFBX("/model/Land.fbx");
  const {animations: typingAnimation} = useFBX("/model/Typing.fbx");
  const {animations: SittingAnimation} = useFBX("/model/Sitting.fbx");
  const {animations: TouchAnimation} = useFBX("/model/Touchscreen.fbx");
  const {animations: StandingAnimation} = useFBX("/model/Male Standing Pose.fbx");
  const {animations: SittingIdleAnimation} = useFBX("/model/SittingIdle.fbx");
  const {animations: SittingDownAnimation} = useFBX("/model/SittingDown.fbx");

  landingAnimation[0].name ="Land";
  typingAnimation[0].name ="Typing";
  SittingAnimation[0].name ="Sitting";
  SittingIdleAnimation[0].name ="SittingI";
  SittingDownAnimation[0].name ="SittingD";
  TouchAnimation[0].name ="Touch";
  StandingAnimation[0].name ="Standing";

  const {actions} = useAnimations([ SittingIdleAnimation[0], SittingDownAnimation[0], typingAnimation[0],landingAnimation[0], SittingAnimation[0], TouchAnimation[0], StandingAnimation[0]], group);

  useEffect(()=>{

    if (actions && actions[animation]) {
      if (animation === "Land") {
        actions[animation].reset().fadeIn(0.5).setLoop(THREE.LoopOnce, 1).play();
        actions[animation].clampWhenFinished = true;
      } else {
        actions[animation].reset().fadeIn(0.5).play();
      }

      return () => {
        if (actions[animation]) {
          actions[animation].reset().fadeOut(0.5);
        }
      }
    }
  }, [animation, actions]); 

  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation-x={-Math.PI/2}>
        <primitive object={nodes.Hips} />
        <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
        <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
        <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
        <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
        <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
        <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
        <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
        <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
        <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
      </group>
    </group>
  )
}

useGLTF.preload('/model/rpm.glb')