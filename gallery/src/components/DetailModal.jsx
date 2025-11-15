import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// You might need to import the CSS here if you use CSS Modules, 
// but since you're using global CSS, it's already in MainPage.css 
// and will be applied globally.

// Destructure the props that were passed from MainPage
export default function DetailModal({ selectedImage, setSelectedImage }) {
  if (!selectedImage) return null;

  const handleClose = () => setSelectedImage(null);

  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          className="modal-backdrop"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Left side: Enlarged Image */}
            <div className="modal-image-panel">
              <img src={selectedImage.src} alt={selectedImage.title} />
            </div>

            {/* Right side: Info Panel */}
            <div className="modal-info-panel">
              <button className="modal-close-button" onClick={handleClose}>&times;</button>
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.description}</p>
              <hr />
              <p className="details">Source: {selectedImage.src}</p>
              {/*<p className="details">Span Size: {selectedImage.span}</p>*/}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}