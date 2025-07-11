// src/components/canvas/Archipelago.jsx

import React, { useState, useMemo, useRef } from 'react';
import { Text, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { frameworkData, stageData } from './frameworkData';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';

function Wedge({ data, stage, radius, index, isActive }) {
    const meshRef = useRef();

    useFrame(() => {
        if (!meshRef.current) return;
        meshRef.current.scale.z = THREE.MathUtils.lerp(
            meshRef.current.scale.z,
            isActive ? 0.1 : 1,
            0.1
        );
    });

    const sliceCount = 8;
    const sliceAngle = (Math.PI * 2) / sliceCount;
    const gapRatio = 0.05;
    const RING_THICKNESS = 15;
    const WEDGE_DEPTH = 3;

    const shape = useMemo(() => {
        const innerRadius = radius;
        const outerRadius = radius + RING_THICKNESS;
        const angle = sliceAngle * (1 - gapRatio);
        const startAngle = index * sliceAngle + (sliceAngle * gapRatio) / 2;

        const shape = new THREE.Shape();
        shape.moveTo(innerRadius * Math.cos(startAngle), innerRadius * Math.sin(startAngle));
        shape.lineTo(outerRadius * Math.cos(startAngle), outerRadius * Math.sin(startAngle));
        shape.lineTo(outerRadius * Math.cos(startAngle + angle), outerRadius * Math.sin(startAngle + angle));
        shape.lineTo(innerRadius * Math.cos(startAngle + angle), innerRadius * Math.sin(startAngle + angle));
        shape.closePath();
        return shape;
    }, [radius, index]);

    const extrudeSettings = { steps: 1, depth: WEDGE_DEPTH, bevelEnabled: false };

    const labelRadius = radius + RING_THICKNESS / 2;
    const labelAngle = index * sliceAngle + sliceAngle / 2;
    const labelPosition = [labelRadius * Math.cos(labelAngle), labelRadius * Math.sin(labelAngle), WEDGE_DEPTH + 0.5];

    return (
        <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshStandardMaterial color={data.color} side={THREE.DoubleSide} emissive={isActive ? data.color : 'black'} emissiveIntensity={isActive ? 0.7 : 0} />
            <Text position={labelPosition} fontSize={2.5} color="white" anchorX="center" anchorY="middle">
                {`${data.id}${stage}`}
            </Text>
        </mesh>
    );
}

function Player() {
    return (
        <group>
            {/* Player Body */}
            <mesh position={[0, 0, 2]} rotation={[Math.PI / 2, 0, 0]}>
                <capsuleGeometry args={[1, 2, 4, 12]} />
                <meshStandardMaterial color="tomato" />
            </mesh>
            {/* Player Light Source */}
            <pointLight position={[0, 0, 2]} intensity={100} distance={30} color="white" />
            {/* Blob Shadow */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.01]}>
                <circleGeometry args={[1.5, 32]} />
                <meshBasicMaterial color="black" transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

export default function Archipelago({ activeWedge, setActiveWedge }) {
    const keys = useKeyboardControls();
    const playerPosition = useRef(new THREE.Vector3(0, 0, 0));
    const playerVelocity = useRef(new THREE.Vector3(0, 0, 0));
    const playerModelRef = useRef();

    const MOVEMENT_SPEED = 0.2;

    const wedgePositions = useMemo(() => {
        const positions = {};
        frameworkData.forEach((data, index) => {
            Object.entries(stageData).forEach(([stage, { radius }]) => {
                const sliceCount = 8;
                const sliceAngle = (Math.PI * 2) / sliceCount;
                const RING_THICKNESS = 15;
                const centerRadius = radius + RING_THICKNESS / 2;
                const centerAngle = index * sliceAngle + sliceAngle / 2;
                positions[`${data.id}${stage}`] = new THREE.Vector3(
                    centerRadius * Math.cos(centerAngle),
                    centerRadius * Math.sin(centerAngle),
                    0 // Check against the ground plane
                );
            });
        });
        return positions;
    }, []);

    useFrame(() => {
        const moveDirection = new THREE.Vector3(
            (keys.ArrowLeft ? -1 : 0) + (keys.ArrowRight ? 1 : 0),
            (keys.ArrowDown ? -1 : 0) + (keys.ArrowUp ? 1 : 0),
            0
        ).normalize();

        playerVelocity.current.lerp(moveDirection.multiplyScalar(MOVEMENT_SPEED), 0.1);
        playerPosition.current.add(playerVelocity.current);

        if (playerModelRef.current) {
            playerModelRef.current.position.copy(playerPosition.current);
        }

        let closestWedge = null;
        let minDistance = 5;

        for (const [key, pos] of Object.entries(wedgePositions)) {
            const distance = playerPosition.current.distanceTo(pos);
            if (distance < minDistance) {
                minDistance = distance;
                closestWedge = key;
            }
        }
        setActiveWedge(closestWedge);
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, -25, 30]} />
            <OrbitControls minDistance={10} maxDistance={90} maxPolarAngle={Math.PI / 2.2} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[100, 50, 50]} intensity={1.5} />
            <fog attach="fog" args={['#FFFDD0', 80, 180]} />

            <group ref={playerModelRef}>
                <Player />
            </group>

            {Object.entries(stageData).map(([stage, { radius }]) => (
                <group key={stage}>
                    {frameworkData.map((data, index) => (
                        <Wedge
                            key={`${data.id}-${stage}`}
                            data={data}
                            stage={stage}
                            radius={radius}
                            index={index}
                            isActive={`${data.id}${stage}` === activeWedge}
                        />
                    ))}
                </group>
            ))}
        </>
    );
}