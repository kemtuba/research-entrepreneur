'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Archipelago from '@/components/canvas/Archipelago'

// This is the main 3D scene setup for your page
function Scene() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        {/* Camera and Controls */}
        <PerspectiveCamera makeDefault position={[-25, 15, 25]} fov={75} />
        <OrbitControls />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Custom components */}
        <Archipelago />

        {/* Environment */}
        <fog attach="fog" args={['#1d2228', 30, 120]} />
      </Suspense>
    </Canvas>
  )
}

// The default export for the page, which renders the scene
export default function Page() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scene />
    </div>
  )
}
