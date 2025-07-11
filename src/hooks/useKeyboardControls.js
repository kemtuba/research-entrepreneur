// src/hooks/useKeyboardControls.js
import { useEffect, useState } from 'react';

export const useKeyboardControls = () => {
    const [keys, setKeys] = useState({});

    useEffect(() => {
        const handleKeyDown = (event) => {
            setKeys((prevKeys) => ({ ...prevKeys, [event.code]: true }));
        };

        const handleKeyUp = (event) => {
            setKeys((prevKeys) => ({ ...prevKeys, [event.code]: false }));
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return keys;
};