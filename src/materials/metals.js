import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import perlinNoiseNRM from '../textures/perlinNoiseNRM.jpg';
import metalGraphiteDIFF from '../textures/metalGraphiteDIFF.png';
import metalMeshOP from '../textures/metalMeshOP.png';
import metalMeshNRM from '../textures/metalMeshNRM.png';
import { DefaultMaterial } from './defaults';

const repeatMesh = 50;
const repeatNoise = 100;

const ElfaMetalWhite = () => {
  const normalMap = useTexture(perlinNoiseNRM);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(repeatNoise, repeatNoise);

  return (
    <meshStandardMaterial
      color={0xffffff}
      metalness={0}
      side={THREE.DoubleSide}
      roughness={0.25}
      reflectivity={0}
      normalScale={(0, 0.01)}
    />
  );
};

const ElfaMetalPlatinum = () => {
  const normalMap = useTexture(perlinNoiseNRM);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(repeatNoise, repeatNoise);

  return (
    <meshPhysicalMaterial
      color={0x898989}
      normalMap={normalMap}
      side={THREE.DoubleSide}
      metalness={0.5}
      roughness={0.15}
      reflectivity={0.25}
      normalScale={(0, 0.01)}
      sheen={1}
      sheenColor={0x000011}
    />
  );
};

const ElfaMetalGraphite = () => {
  const diffuseMap = useTexture(metalGraphiteDIFF);
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.RepeatWrapping;
  diffuseMap.repeat.set(repeatNoise, repeatNoise);

  const normalMap = useTexture(perlinNoiseNRM);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(repeatNoise, repeatNoise);

  return (
    <meshPhysicalMaterial
      map={diffuseMap}
      normalMap={normalMap}
      side={THREE.DoubleSide}
      metalness={0}
      color={0xefefef}
      roughness={0.15}
      reflectivity={0.25}
      normalScale={(0, 0.01)}
      sheen={0.25}
      sheenColor={0x9e841c}
    />
  );
};

const ElfaMeshWhite = () => {
  const opacityMap = useTexture(metalMeshOP);
  opacityMap.wrapS = THREE.RepeatWrapping;
  opacityMap.wrapT = THREE.RepeatWrapping;
  opacityMap.repeat.set(repeatMesh, repeatMesh);
  opacityMap.flipY = false;

  const normalMap = useTexture(metalMeshNRM);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(repeatMesh, repeatMesh);
  normalMap.flipY = false;

  return (
    <meshStandardMaterial
      alphaMap={opacityMap}
      normalMap={normalMap}
      transparent={true}
      side={THREE.DoubleSide}
      metalness={0}
      color={0xffffff}
      roughness={0.3}
      reflectivity={1}
      normalScale={(0, 0.35)}
      clearcoat={1}
      clearcoatRoughness={0.15}
    />
  );
};

const ElfaMeshPlatinum = () => {
  const opacityMap = useTexture(metalMeshOP);
  opacityMap.wrapS = THREE.RepeatWrapping;
  opacityMap.wrapT = THREE.RepeatWrapping;
  opacityMap.repeat.set(repeatMesh, repeatMesh);
  opacityMap.flipY = false;

  const normalMap = useTexture(metalMeshNRM);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(repeatMesh, repeatMesh);
  normalMap.flipY = false;

  return (
    <meshPhysicalMaterial
      alphaMap={opacityMap}
      normalMap={normalMap}
      transparent={true}
      side={THREE.DoubleSide}
      metalness={0.5}
      color={0x898989}
      roughness={0.3}
      reflectivity={0.5}
      clearcoat={1}
      normalScale={(0, 0.35)}
      clearcoatRoughness={0.1}
      sheen={1}
      sheenColor={0x000011}
    />
  );
};

const ElfaMeshGraphite = () => {
  const opacityMap = useTexture(metalMeshOP);
  opacityMap.wrapS = THREE.RepeatWrapping;
  opacityMap.wrapT = THREE.RepeatWrapping;
  opacityMap.repeat.set(repeatMesh, repeatMesh);
  opacityMap.flipY = false;

  const normalMap = useTexture(metalMeshNRM);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(repeatMesh, repeatMesh);
  normalMap.flipY = false;

  return (
    <meshStandardMaterial
      alphaMap={opacityMap}
      normalMap={normalMap}
      transparent={true}
      side={THREE.DoubleSide}
      metalness={0}
      color={0x555555}
      roughness={0.3}
      reflectivity={0.25}
      normalScale={(0, 0.35)}
      clearcoat={1}
      clearcoatRoughness={0.0}
      sheen={0.25}
      sheenColor={0x9e814c}
    />
  );
};


const elfaMetalColors = {
  white: <ElfaMetalWhite />,
  platinum: <ElfaMetalPlatinum />,
  graphite: <ElfaMetalGraphite />,
};

const ElfaMetal = props => {
  const { metalColor } = props;

  return (
    <React.Suspense
      fallback={<DefaultMaterial type={'loading'} defaultColor={metalColor} />}
    >
      {elfaMetalColors[metalColor] || <DefaultMaterial type={'missing'} />}
    </React.Suspense>
  );
};

const elfaMeshColors = {
  white: <ElfaMeshWhite />,
  platinum: <ElfaMeshPlatinum />,
  graphite: <ElfaMeshGraphite />,
};

const ElfaMesh = props => {
  const { metalColor } = props;

  return (
    <React.Suspense
      fallback={<DefaultMaterial type={'loading'} defaultColor={metalColor} />}
    >
      {elfaMeshColors[metalColor] || <DefaultMaterial type={'missing'} />}
    </React.Suspense>
  );
};
export {
  ElfaMetal,
  ElfaMesh,
};
