// components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { motion, useScroll, useTransform, animate } from "framer-motion"; 
import "../styles/Navbar.css"; 

const SOCIAL_LINKS = [
    { 
        name: 'Instagram', 
        url: 'https://www.instagram.com/dannbo_/', 
        Icon: FaInstagram 
    },
    // Removed Twitter and Email to reflect original component
];

export default function Navbar() {
    const { scrollY } = useScroll();
    
const [vhInPixels, setVhInPixels] = useState(100); 
    
    useEffect(() => {
        const height = window.innerHeight; 
        setVhInPixels(height);

        const handleResize = () => setVhInPixels(window.innerHeight);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate the start and end scroll positions based on the current viewport height.
    const START_SCROLL = vhInPixels * 0.1; // Starts fading at 50% of viewport height
    const END_SCROLL = vhInPixels * 0.4;  // Fully visible at 100% of viewport height

    // Apply the new percentage-based range to the opacity and background.
    // Input Range: [50% of viewport, 100% of viewport]
    // Output Range: [0 (invisible), 1 (fully visible)]
    const navOpacity = useTransform(scrollY, [START_SCROLL, END_SCROLL], [0, 1]); 
    const navBgOpacity = useTransform(scrollY, [START_SCROLL, END_SCROLL], [0, 1])

    // --- 1. Native Smooth Scroll to Top (NO JITTER) ---
    const handleScrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };
    
    // --- 2. UPDATED: Fast Framer Motion Scroll (NO BOUNCE) ---
    const handleScrollToGallery = (e) => {
        e.preventDefault();

        const galleryElement = document.getElementById('gallery');
        if (!galleryElement) return;

        const targetTop = galleryElement.offsetTop;
        
        // Use a much stiffer, more damped spring for a quick, firm stop
        animate(scrollY, targetTop, {
            type: "spring",
            stiffness: 120, // Increased stiffness for speed
            damping: 15,    // Increased damping for a quick stop (less overshoot)
            onUpdate: (latest) => window.scrollTo(0, latest)
            // Removed ALL bounce and user-cancellation logic
        });
    };
    // ---------------------------------------------

    return (
        <motion.nav 
            className="navbar" 
            style={{ 
                // 🔑 Apply the scroll-dependent opacity(126, 127, 131)
                opacity: navOpacity,
                // The background color opacity already works fine with the existing transform
                backgroundColor: useTransform(navBgOpacity, (o) => `rgba(126, 127, 131, ${o})`) 
            }}
        >
            {/* 1. Name/Logo (LEFT) */}
            <div className="nav-logo">
                <a 
                    href="#top"
                    onClick={handleScrollToTop} 
                >
                   / Dame Conboy /
                </a>
            </div>

            {/* 2. Home/Gallery Links (CENTER) */}
            <div className="nav-center">
                {/* HOME LINK (Uses Native Scroll to Top) */}
                <a 
                    href="#top" 
                    onClick={handleScrollToTop} 
                >
                    Home 
                </a>
                
                {/* GALLERY LINK (Uses Fast Framer Motion Scroll) 
                <a 
                    href="#gallery" 
                    onClick={handleScrollToGallery} 
                >
                    Gallery
                </a>*/}
            </div>

            {/* 3. Social Media Links (RIGHT) */}
            <div className="nav-socials">
                {SOCIAL_LINKS.map(link => (
                    <a 
                        key={link.name} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="nav-social-item"
                        aria-label={`Visit ${link.name}`}
                    >
                        <link.Icon />
                    </a>
                ))}
            </div>
        </motion.nav>
    );
}
