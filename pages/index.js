import Head from "next/head";
import Header from "../components/Header";
import CategoryList from "../components/CategoryList";
import { useCookies } from "react-cookie";
import { endpointMania } from "../util/enpointMania";
import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
import sampleImage from "../assets/sample.png";

const Box = (props) => {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const imaTexture = useLoader(THREE.TextureLoader, sampleImage);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [6, 6, 6] : [5, 5, 5]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[3, 3, 3]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "#2b6c76" : "#720b23"}
        map={imaTexture}
        color={0x000aaff}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </mesh>
  );
};

export default function Home({ categories }) {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;

  return (
    <>
      <Header props={"main page"}></Header>
      <Canvas camera={{ position: [0, 0, 35] }}>
        <ambientLight intensity={2} />
        <pointLight position={[40, 40, 40]} />
        <Suspense fallback={null}>
          <Box position={[10, 0, 0]} />
          <Box position={[-10, 0, 0]} />
          <Box position={[0, 10, 0]} />
          <Box position={[0, -10, 0]} />
        </Suspense>
      </Canvas>
      <div>
        <ul>
          {categories.success ? (
            categories.data.map((category) => {
              return (
                <CategoryList
                  category={category}
                  key={category.id}
                ></CategoryList>
              );
            })
          ) : (
            <li>no categories</li>
          )}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(endpointMania("/admin/public/category/list"), {
      method: "GET",
    });
    const categories = await res.json();
    return {
      props: {
        categories,
      },
    };
  } catch (e) {
    console.log(e);
    const categories = { success: false };
    return { props: { categories } };
  }
}
