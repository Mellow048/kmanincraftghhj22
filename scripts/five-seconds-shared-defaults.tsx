/** Regression fixture only: the pre-existing Skeleton bow, with NO V2 opt-in controls. */
import React from 'react';
import {Composition,registerRoot,useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {Skeleton} from '../Topics/InThisTown/monsters';
const Defaults:React.FC=()=>{
 const t=useCurrentFrame()/30;
 return <ThreeCanvas width={270} height={480} camera={{position:[0,1,4],fov:42}}>
  <color attach="background" args={['#273a49']}/>
  <ambientLight intensity={.8}/><directionalLight position={[3,5,4]} intensity={2.5}/><pointLight position={[-2,2,-2]} intensity={8} color="#91b7e0"/>
  <Skeleton bow rotationY={-.24} walk={t*.4} phase={.6} rattle={.05}/>
 </ThreeCanvas>;
};
registerRoot(()=> <Composition id="shared-default-skeleton" component={Defaults} durationInFrames={60} fps={30} width={270} height={480}/>);
