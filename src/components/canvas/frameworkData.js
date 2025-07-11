// src/components/canvas/frameworkData.js

// --- Color Palette ---
// We define the colors for each behavior type here.
const colors = {
    RELATIONAL: '#2f4b7c',  // Blue
    DIRECTIONAL: '#a05195', // Purple
    DELIVERY: '#f95d6a',    // Red
    SYSTEMIC: '#ffa600',    // Orange
};

// --- Framework Definition ---
// This is the core data structure for the entire world.
// Each object represents one of the 8 "spokes" of the framework.
export const frameworkData = [
    // --- A ---
    {
        id: 'A',
        behaviorName: 'Leverage Outside Perspective',
        type: 'RELATIONAL',
        color: colors.RELATIONAL,
        stages: {
            1: { influence: 'Measurement' },
            2: { influence: 'Stage 2 Influence' },
            3: { influence: 'Stage 3 Influence' },
            4: { influence: 'Stage 4 Influence' },
        },
    },
    // --- B & C ---
    {
        id: 'B',
        behaviorName: 'Behavior B',
        type: 'DIRECTIONAL',
        color: colors.DIRECTIONAL,
        stages: { 1: {}, 2: {}, 3: {}, 4: {} },
    },
    {
        id: 'C',
        behaviorName: 'Behavior C',
        type: 'DIRECTIONAL',
        color: colors.DIRECTIONAL,
        stages: { 1: {}, 2: {}, 3: {}, 4: {} },
    },
    // --- D, E, F ---
    {
        id: 'D',
        behaviorName: 'Behavior D',
        type: 'DELIVERY',
        color: colors.DELIVERY,
        stages: { 1: {}, 2: {}, 3: {}, 4: {} },
    },
    {
        id: 'E',
        behaviorName: 'Behavior E',
        type: 'DELIVERY',
        color: colors.DELIVERY,
        stages: { 1: {}, 2: {}, 3: {}, 4: {} },
    },
    {
        id: 'F',
        behaviorName: 'Behavior F',
        type: 'DELIVERY',
        color: colors.DELIVERY,
        stages: { 1: {}, 2: {}, 3: {}, 4: {} },
    },
    // --- G & H ---
    {
        id: 'G',
        behaviorName: 'Behavior G',
        type: 'SYSTEMIC',
        color: colors.SYSTEMIC,
        stages: { 1: {}, 2: {}, 3: {}, 4: {} },
    },
    {
        id: 'H',
        behaviorName: 'Behavior H',
        type: 'SYSTEMIC',
        color: colors.SYSTEMIC,
        stages: { 1: {}, 2: {}, 3: {}, 4: {} },
    },
];

// --- Stage Definitions ---
export const stageData = {
    1: { name: 'Awareness', radius: 20 },
    2: { name: 'Partnership', radius: 45 },
    3: { name: 'Strategic Alignment', radius: 70 },
    4: { name: 'Impact', radius: 95 },
  };
  