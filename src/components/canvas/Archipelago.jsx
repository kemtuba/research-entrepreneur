// A simple component for the ocean
function Ocean() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#006994" />
        </mesh>
    )
}

// A simple component for the main island
function Island() {
    return (
        <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[10, 10, 1, 32]} />
            <meshStandardMaterial color="#c2b280" />
        </mesh>
    )
}

// A very basic prototype for the user's boat
function Boat() {
    return (
        <mesh position={[-15, 0.5, 0]}>
            <boxGeometry args={[3, 1, 1.5]} />
            <meshStandardMaterial color="#A52A2A" />
        </mesh>
    )
}

// We group our components and export them for use in the main scene
export default function Archipelago() {
    return (
        <>
            <Ocean />
            <Island />
            <Boat />
        </>
    )
  }
  