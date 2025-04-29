import { useRef, useState } from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";

const Cube = ({ position, size, color }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * 2;
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 3;
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ position, size, color }) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 1 : 0.3;
    ref.current.rotation.y += delta * speed;
  });
  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(e) => (e.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={isHovered ? "brown" : "yellow"} wireframe />
    </mesh>
  );
};

const Torus = ({ position, size, color }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * -2;
  });
  return (
    <mesh position={position} ref={ref}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const TorusKnot = ({ position, size, color }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
  });

  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 2]} intensity={0.6} />
      <ambientLight intensity={0.4} />
      {/* <Cube position={[0, 0, 0]} size={[1, 1, 1]} color={"blue"} /> */}
      <Sphere position={[0, 2, 0]} size={[1, 30, 30]} color={"brown"} />
      {/* <Torus position={[0, -2, 0]} size={[0.8, 0.1, 30, 30]} color={"red"} />
      <TorusKnot position={[-2, 0, 0]} size={[0.5, 0.1, 1000, 50]} color={"pink"} /> */}

      {/* <group position={[1, 0, 0]}>
        <Cube position={[1, 0, 0]} color={"orange"} size={[1, 1, 1]} />
        <Cube position={[-1, 0, 0]} color={"pink"} size={[1, 1, 1]} />
        <Cube position={[-1, 2, 0]} color={"yellow"} size={[1, 1, 1]} />
        <Cube position={[1, 2, 0]} color={"red"} size={[1, 1, 1]} />
      </group> */}
    </Canvas>
  );
};

export default App;
