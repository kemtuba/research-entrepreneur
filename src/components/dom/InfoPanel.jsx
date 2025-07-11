// src/components/dom/InfoPanel.jsx
'use client';

export default function InfoPanel({ activeWedgeData }) {
    const isVisible = !!activeWedgeData;

    const panelStyle = {
        position: 'fixed',
        top: '50%',
        left: isVisible ? '30px' : '-400px', // Slide in from the left
        transform: 'translateY(-50%)',
        width: '320px',
        padding: '25px',
        color: '#333',
        fontFamily: 'sans-serif',
        // 👇 NEW: Frosted glass effect
        background: 'rgba(255, 255, 255, 0.6)', // More transparent white
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '15px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
        transition: 'left 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)', // Smoother transition
    };

    // ... other styles remain the same ...

    return (
        <div style={panelStyle}>
            {isVisible && (
                <>
                    {/* Content remains the same */}
                </>
            )}
        </div>
    );
}