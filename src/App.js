import React, { useState } from 'react';
import {
 ZapparCamera, InstantTracker, ZapparCanvas, BrowserCompatibility,
} from '@zappar/zappar-react-three-fiber';
import { useGLTF } from '@react-three/drei';
import gltf from './threeRunner18.glb';
import Standards from './Standards';

function App() {
  const [placementMode, setPlacementMode] = useState(true);
  const { nodes } = useGLTF(gltf) ;
  console.log(nodes,"nodes");
  return (
    <>
      <BrowserCompatibility />
      <div
        id="zappar-button"
        role="button"
        onKeyPress={() => { setPlacementMode(((currentPlacementMode) => !currentPlacementMode)); }}
        tabIndex={0}
        onClick={() => { setPlacementMode(((currentPlacementMode) => !currentPlacementMode)); }}
      >
        Tap here to
        {placementMode ? ' place ' : ' pick up '}
        the object
      </div>
      <ZapparCanvas>
        <ZapparCamera />
        <InstantTracker placementMode={placementMode} placementCameraOffset={[0, 0, -5]}>
          <Standards height="2140" />
          <Standards height="2140" xDiff="490" />
      <group position={[0.012, -0.08525, 0.022]} rotation={[0, 0, 0]}>
      <mesh
        geometry={nodes.threeRunner18_1.geometry}
        position={nodes.threeRunner18_1.position}
        rotation={nodes.threeRunner18_1.rotation}
      >
        {/* {returnMaterial(showError, <ElfaMesh metalColor={metalColor} />)} */}
      </mesh>
      <mesh
        geometry={nodes.threeRunner18_2.geometry}
        position={nodes.threeRunner18_2.position}
        rotation={nodes.threeRunner18_2.rotation}
      >
        {/* {returnMaterial(showError, <ElfaMetal metalColor={metalColor} />)} */}
      </mesh>
    </group>
        </InstantTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />

      </ZapparCanvas>
      
    </>
  );
}

export default App;
