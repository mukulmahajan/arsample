import { useGLTF } from '@react-three/drei';
import drawerunit from './drawerunit.glb';
import _ from 'lodash';

const DrawerUnit =()=>{
    const { nodes } = useGLTF(drawerunit);
    console.log(nodes,"nodes")

   
      return (
        <mesh
        geometry={nodes.Drawer_Small_Back.geometry}
        position={nodes.Drawer_Small_Back.position}
        rotation={nodes.Drawer_Small_Back.rotation}
      >
        {/* <ElfaMetal metalColor={'platinum'} /> */}
      </mesh>
    );
}

export default DrawerUnit;