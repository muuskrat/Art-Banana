// src/components/CustomCursor.jsx

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import "../styles/Cursor.css"
import "../styles/MainPage.css"

const springConfig = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    mass: 0.5
};

export default function CustomCursor({ isModalOpen }) {
    // 1. Motion Values for the cursor point (follows instantly)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. Spring values for the trailing ball
    const ballX = useSpring(mouseX, springConfig);
    const ballY = useSpring(mouseY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Mouse Move Event Listener
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Set the raw client position for both the point and the spring target
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);
    
    // Click/Mouse Down Event Listeners (omitted for brevity, assume they are correct)
    useEffect(() => {
        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Hover Detection Logic (omitted for brevity, assume it is correct)
    useEffect(() => {
        const clickableElements = 'button, a, .gallery-item, input[type="submit"], [onClick], .modal-close-button';
        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);
        
        const setupListeners = () => {
             document.querySelectorAll(clickableElements).forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        }
        
        const cleanupListeners = () => {
            document.querySelectorAll(clickableElements).forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        }

        setupListeners();
        return cleanupListeners;
    }, [isModalOpen, isHovering]);

    const ballVariants = {
        default: { 
            scale: 1, 
            opacity: 1,
            backgroundColor: "#333",
            borderWidth: "0px",
            transition: { type: 'tween', duration: 0.3 }
        },
        hover: { 
            scale: 1.2,
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: "2px",
            borderColor: "#333",
            transition: { type: 'tween', duration: 0.3 }
        },
        click: {
            scale: 0.6,
            transition: { type: "spring", stiffness: 800, damping: 20, mass: 0.3 }
        }
    };

    const currentVariant = isClicked ? 'click' : (isHovering ? 'hover' : 'default');

    return (
        <>
            {/* 1. THE POINT: Uses x/y for position, and translateX/Y to center itself. */}
            <motion.div
                className="cursor-point"
                style={{ 
                    x: mouseX, 
                    y: mouseY, 
                    translateX: '-50%', // Centering offset via Framer Motion
                    translateY: '-50%', // Centering offset via Framer Motion
                }} 
            />

            {/* 2. THE BALL: Uses spring values for position, and translateX/Y to center itself. */}
            <motion.div
                className="cursor-ball"
                style={{ 
                    x: ballX, 
                    y: ballY, 
                    translateX: '-50%', // Centering offset via Framer Motion
                    translateY: '-50%', // Centering offset via Framer Motion
                }}
                variants={ballVariants}
                animate={currentVariant}
            />
        </>
    );
}