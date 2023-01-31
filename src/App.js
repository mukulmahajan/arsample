import React, { useState } from 'react';
import {
 ZapparCamera, InstantTracker, ZapparCanvas, BrowserCompatibility,
} from '@zappar/zappar-react-three-fiber';
import { useGLTF } from '@react-three/drei';
import gltf from './accessoryShelf.glb';

function App() {
  const [placementMode, setPlacementMode] = useState(true);
  const { nodes } = useGLTF(gltf) ;
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
        <mesh
        geometry={nodes.accessoryShelf_2.geometry}
        position={nodes.accessoryShelf_2.position}
        rotation={nodes.accessoryShelf_2.rotation}
      >
      </mesh>
        </InstantTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />

      </ZapparCanvas>
      
    </>
  );
}

export default App;
