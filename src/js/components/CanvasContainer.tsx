import React, {useState} from "react";
import {Canvas} from "@react-three/fiber";
import {PerformanceMonitor} from "@react-three/drei";
import {useControls} from "leva";
import {Perf} from "r3f-perf";
import {SceneContainer} from "./SceneContainer";
import {useRenderOnDemand} from "../helper/hooks/useRenderOnDemand";

// ------------------------------------------------------------------
// Initial dpr values for performance monitoring
const START_DPR = 1;
const MAX_DPR = 2;
const MIN_DPR = 0.5;
const updateDpr = (factor: number) => {
  return Math.round((MIN_DPR + factor * (MAX_DPR - MIN_DPR)) * 100) / 100;
}
// ------------------------------------------------------------------


export function CanvasContainer() {
  const renderOnDemand = useRenderOnDemand(true);
  // ------------------------------------------------------------------
  // dpr and app controls
  const [dpr, setDpr] = useState(START_DPR);
  const {enableDynamicDpr, showPerf} = useControls({
    showPerf: false,
    enableDynamicDpr: false,
  });
  // -------------------------------------------------------------------


  return (
    <Canvas dpr={dpr}
            frameloop={(renderOnDemand) ? "demand" : "always"}
            shadows={true}
            gl={{
              powerPreference: "high-performance",
              stencil: false, // stencil can be disabled unless you have need for it
              // if you intend on using postprocessing in your app,
              // set depth to false and antialias to false, otherwise these expensive
              // operations will be done twice (here and in EffectComposer)
              depth: true,
              antialias: true,
            }}>

      <PerformanceMonitor onChange={({factor}) => enableDynamicDpr && setDpr(updateDpr(factor))}>
        <SceneContainer/>
      </PerformanceMonitor>

      {showPerf && <Perf position="bottom-left"/>}
    </Canvas>
  )
}