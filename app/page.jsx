// app/page.jsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import Archipelago from '@/components/canvas/Archipelago';
import InfoPanel from '@/components/dom/InfoPanel';
import { frameworkData, stageData } from '@/components/canvas/frameworkData';

export default function Page() {
  const [activeWedge, setActiveWedge] = useState(null);

  // Helper to get all data for the active wedge
  let activeWedgeData = null;
  if (activeWedge) {
    const letter = activeWedge.charAt(0);
    const stage = activeWedge.charAt(1);
    const behaviorData = frameworkData.find((b) => b.id === letter);
    if (behaviorData) {
      activeWedgeData = {
        ...behaviorData,
        coordinate: activeWedge,
        stage: stage,
        stageName: stageData[stage].name,
      };
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#FFFDD0' }}>
      <InfoPanel activeWedgeData={activeWedgeData} />

      <Canvas>
        <Suspense fallback={null}>
          <Archipelago
            activeWedge={activeWedge}
            setActiveWedge={setActiveWedge}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}