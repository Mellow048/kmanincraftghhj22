import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {stopColor} from './stop-color';
/** Explicit owner-requested 2D camera treatment, isolated to this film. Audio and clocks remain unchanged. */
export function withStopColor(Component:React.FC):React.FC{
 return function StopCamera(){
  const amount=stopColor(useCurrentFrame());
  return <AbsoluteFill style={{filter:`grayscale(${amount})`}}><Component/></AbsoluteFill>;
 };
}
