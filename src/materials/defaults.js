import React from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import melamineBeechDIFF from '../textures/melamineBeechDIFF.jpg';

const repeatTexture = 1;

const defaultColors = {
  white: 0xc0bebd,
  grey: 0x575554,
  birch: 0xb5a08e,
  walnut: 0x2a2221,
  platinum: 0xa2a1a4,
  graphite: 0x706c6a,
};

const MaterialMissing = () => (
  <meshStandardMaterial
    metalness={0}
    color={0xff00ff}
    roughness={0.5}
    reflectivity={1}
    side={THREE.DoubleSide}
  />
);

const MaterialFallback = () => (
  <meshStandardMaterial
    metalness={0}
    color={0x00ff00}
    roughness={0.05}
    reflectivity={1}
    side={THREE.DoubleSide}
  />
);

const MaterialAlert = () => (
  <meshStandardMaterial
    metalness={0}
    color={0xff0000}
    roughness={0.5}
    reflectivity={1}
    side={THREE.DoubleSide}
  />
);

const MaterialLoading = props => {
  const { defaultColor } = props;
  const color = defaultColor || 0x00ffff;
  return (
    <meshStandardMaterial
      metalness={0}
      color={color}
      roughness={0.5}
      reflectivity={1}
      side={THREE.DoubleSide}
    />
  );
};

const MaterialGeneric = props => {
  const { color, defaultColor } = props;
  const materialColor = color || defaultColors[defaultColor] || 0xff9900;
  const diffuseMap = useTexture(melamineBeechDIFF);
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.RepeatWrapping;
  diffuseMap.repeat.set(repeatTexture, repeatTexture);

  return (
    <meshStandardMaterial
      metalness={0}
      color={materialColor}
      roughness={0.5}
      reflectivity={1}
      side={THREE.DoubleSide}
    />
  );
};

const types = {
  loading: MaterialLoading,
  missing: MaterialMissing,
  alert: MaterialAlert,
  generic: MaterialGeneric,
  fallback: MaterialFallback,
};
const DefaultMaterial = props => {
  const { type, defaultColor } = props;
  const defColor = defaultColors[defaultColor] || 0x00ffff;
  const Material = types[type] || types['missing'];

  return <Material {...props} defaultColor={defColor} />;
};

export { DefaultMaterial };
