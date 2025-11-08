// src/components/IntroOverlay.js

import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import "../styles/IntroOverlay.css" // Import the dedicated CSS

// Define the name you want to display
const ARTIST_NAME = "The Art Studio" 

// Framer Motion variant for the circle's "evaporating" effect
// It scales down to 0 and fades out quickly.
const circleExitVariants = {
  initial: { opacity: 1, scale: 1 },
  exit: { 
    opacity: 0, 
    scale: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.76, 0, 0.24, 1] 
    } 
  }
}

// Framer Motion variant for the text's fade-out effect
const textExitVariants = {
    exit: { 
        opacity: 0, 
        transition: { 
            duration: 0.3, 
            delay: 0.1 
        } 
    }
}

// Framer Motion variant for the main overlay's fade-out
const overlayExitVariants = {
    exit: {
        opacity: 0,
        transition: {
            duration: 0.6,
            delay: 0.1 // Wait for the circle/text animation to start
        }
    }
}


export default function IntroOverlay({ isOverlayVisible, closeOverlay }) {
  return (
    <AnimatePresence>
      {isOverlayVisible && (
        // The main overlay container
        <motion.div
            className="intro-overlay"
            variants={overlayExitVariants}
            exit="exit" // Use the 'exit' state on unmount
        >
          {/* The centered content (Artist Name and clickable circle) */}
          <div className="intro-content">

            {/* Artist Name */}
            <motion.h1 
                className="artist-name-title"
                variants={textExitVariants}
                exit="exit"
            >
                {ARTIST_NAME}
            </motion.h1>

            {/* Clickable Circle */}
            <motion.div
              className="intro-circle"
              onClick={closeOverlay} // Calls the function to hide the overlay
              variants={circleExitVariants}
              exit="exit" // Use the 'exit' state on unmount
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Optional: Add a subtle icon or text inside the circle */}
              <motion.span
                className="enter-text"
                variants={textExitVariants}
                exit="exit"
              >
                ENTER
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}