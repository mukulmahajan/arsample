import { useGLTF } from '@react-three/drei';
import wallMountedGltf from './wmStandard.glb';
import _ from 'lodash';

const Standards =({height,xDiff=0})=>{
    const M = 1000;
    const { nodes } = useGLTF(wallMountedGltf);
    const uncutWallMountedHeights = [
        {
          fullLength: 1980,
          middleSlotCounts: [18, 18, 18],
        },
        {
          fullLength: 2413,
          middleSlotCounts: [12, 13, 13, 13, 12],
        },
      ];
    const wallMountedStandardToCut = height =>
  uncutWallMountedHeights.find(h => height <= h.fullLength);

    const getWallMountedStandardPieces = fullHeight => {
        const topPiece = { node: 'wmStandardTop', height: 60, y: 0 };
        const slotPiece = { node: 'wmStandardSlot', height: 32 };
        const holePiece = { node: 'wmStandardHole', height: 64 };
        const fillerPiece = { node: 'wmStandardFiller', height: 1 };
        const bottomPiece = { node: 'wmStandardBottom', height: 1, y: -fullHeight };
      
        const standard = wallMountedStandardToCut(fullHeight);
        const slotCounts = standard.middleSlotCounts;
      
        const segments = [];
        slotCounts.reduce((accY, currY) => {
          _.times(currY, i => {
            const pieceFits = piece => accY + piece.height <= fullHeight;
      
            if (pieceFits(slotPiece)) {
              segments.push({ ...slotPiece, x: 0, y: -accY });
              accY = accY + slotPiece.height;
            }
      
            if (i === currY - 1) {
              if (!pieceFits(slotPiece) && !pieceFits(holePiece)) {
                segments.push({
                  ...fillerPiece,
                  x: 0,
                  y: -fullHeight,
                  scale: [1, accY - fullHeight, 1],
                });
              } else {
                const piece = pieceFits(holePiece) ? holePiece : slotPiece;
                segments.push({ ...piece, x: 0, y: -accY });
                accY = accY + piece.height;
              }
            }
          });
          return accY;
        }, topPiece.height);
        return [ ...segments, { ...bottomPiece, x: 0, y: -fullHeight }];
      };
      return  getWallMountedStandardPieces(height).map(piece => {
        const { node, x, y, height: standardHeight, scale } = piece;
        return (
          <mesh
            key={`wallmounted-${node}-${standardHeight}-${y}`}
            geometry={nodes[node].geometry}
            position={[
                (x+xDiff)/ M || 0
                , 
                (y+300) / M ||0
                , 0]}
            rotation={nodes[node].rotation}
            scale={scale || [1, 1, 1]}
          >
          </mesh>
        );
      })
}

export default Standards;