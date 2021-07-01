import styles from "../styles/Layout.module.css";
import Nav from "./Nav";
import Head from "next/head";
// import { Canvas, useLoader } from "@react-three/fiber";
// import sampleImage from "../assets/sample.png";
// import { PointsMaterial } from "three";
// import * as THREE from "three";
// import { useMemo } from "react";

// function Points() {
//   const imaTexture = useLoader(THREE.TextureLoader, sampleImage);

//   const count = 100;
//   const sep = 3;

//   let positions = useMemo(() => {
//     let positions = [];

//     for (let xi = 0; xi < count; xi++) {
//       for (let zi = 0; zi < count; zi++) {
//         let x = sep * (xi - count / 2);
//         let z = sep * (zi - count / 2);
//         let y = 0;
//         positions.push(x, y, z);
//       }
//     }

//     return new Float32Array(positions);
//   }, [count, sep]);

//   return (
//     <points>
//       <bufferGeometry attach="geomatry">
//         <bufferAttribute
//           attachObject={["attributes", "position"]}
//           array={positions}
//           count={positions.length / 3}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <PointsMaterial
//         attach="meterial"
//         map={sampleImage}
//         color={0x000aaff}
//         size={0.5}
//         sizeAttenuation
//         transparent={false}
//         alphaTest={0.5}
//         opacity={1.0}
//       />
//     </points>
//   );
// }

// function AnimationCanvas() {
//   return (
//     <Canvas
//       colorManagement={false}
//       camera={{ position: [100, 10, 0], fov: 75 }}
//     >
//       <Points />
//     </Canvas>
//   );
// }

const Layout = ({ children }) => {
  return (
    <>
      <Nav></Nav>
      <Head>
        <title>wonmo cyber shcool</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
