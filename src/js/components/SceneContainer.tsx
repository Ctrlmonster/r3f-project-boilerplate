import {Environment, GizmoHelper, GizmoViewport, Grid, OrbitControls} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import PostProcessing from "./PostProcessing";
import {SceneLights} from "./SceneLights";
import {ViewportHelper} from "../helper/ViewportHelper";
import {useEffect} from "react";
import {Camera, Clock, Scene, WebGLRenderer} from "three";


/**
 * Lots of people aren't sure how to use imperative code with r3f.
 * The solution is quite simple, write your imperative as you always would,
 * group all your init, update and destroy calls in a single class (or several functions)
 * and connect it to your top-level component via useEffect and useFrame.
 * This could be your Game Class, Simulation Class or whatever you want.
 */
class Simulation {
  init(gl: WebGLRenderer, scene: Scene, camera: Camera, clock: Clock) {
    // init your imperative code here
  }

  destroy() {
    // destroy your imperative code here
  }

  update(delta: number) {
    // Put all of your imperative .update() calls here
  }
}

const simulation = new Simulation();


// ================================================================================================================
// ================================================================================================================
// ================================================================================================================


export function SceneContainer() {
  const state = useThree(({gl, scene, camera, clock}) => ({gl, scene, camera, clock}));

  useEffect(() => {
    // init the simulation - this is how you get access 
    // to scene, camera, renderer etc. from your imperative code.
    simulation.init(state.gl, state.scene, state.camera, state.clock);
    return () => simulation.destroy();
  }, []);

  useFrame((state, delta) => {
    // connecting the simulation to r3f's render loop, 
    // it will now get updated every frame
    simulation.update(delta);
  })


  return (
    <>
      {/* YOUR SCENE HERE  -------------------------------------------------*/
        <>
          <mesh position={[0, 0, -1]} scale={[0.5, 0.5, 0.5]} castShadow={true} receiveShadow={true}>
            <sphereGeometry/>
            <meshStandardMaterial color="orange"/>
          </mesh>

          <mesh position={[0.5, 1, 1]} castShadow={true} receiveShadow={true}>
            <boxGeometry/>
            <meshStandardMaterial color="hotpink"/>
          </mesh>
        </>
        /* YOUR SCENE HERE  -------------------------------------------------*/
      }


      <ViewportHelper showGizmo={true} showGrid={true}/>
      <OrbitControls/>
      <SceneLights/>
      <PostProcessing/>
    </>
  )
}
