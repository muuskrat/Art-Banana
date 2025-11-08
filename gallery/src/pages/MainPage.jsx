import React, { useState } from "react"
import { FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
// Import useScroll and useTransform for parallax effect
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"

import DetailModal from "../components/DetailModal"
import CustomCursor from "../components/CustomCursor" 
import ParticleBackground from "../components/ParticleBackground";

import "../styles/MainPage.css"


// Add title/description for the info panel
const images = [
    { src: "pictures/img1.png", span: 1, title: "Abstract Wave", description: "A study of motion and color gradients.", scaleX: .32, scaleY: 2.4 }, 
    { src: "pictures/img2.png", span: 2, title: "City Sunset", description: "Taken from the 42nd floor looking west.", scaleX: .85, scaleY: 2.4 }, 
    { src: "pictures/img3.png", span: 1, title: "Neon Alley", description: "Night photography with focus on electric light.", scaleX: .43, scaleY: 2.4 }, 
    { src: "pictures/img4.png", span: 3, title: "Mountain Range", description: "High-resolution shot of the Canadian Rockies.", scaleX: .9, scaleY: 2.4 }, 
    { src: "pictures/img5.jpg", span: 1, title: "Still Life", description: "Classic composition using fruit and pottery.", scaleX: .5, scaleY: 2.4 }, 
    { src: "pictures/img6.png", span: 2, title: "Digital Portrait", description: "Vector illustration created with clean lines.", scaleX: .6, scaleY: 2.4 },
    { src: "pictures/img7.jpg", span: 2, title: "Forest Floor", description: "Macro shot capturing intricate detail.", scaleX: .73, scaleY: 2.4 },
    { src: "pictures/img3.png", span: 4, title: "The Quadruple", description: "A wide, panoramic experiment in texture.", scaleX: 1.4, scaleY: 2.4 },
     { src: "pictures/img1.png", span: 1, title: "Abstract Wave", description: "A study of motion and color gradients.", scaleX: .32, scaleY: 2.4 }, 
    { src: "pictures/img2.png", span: 2, title: "City Sunset", description: "Taken from the 42nd floor looking west.", scaleX: .85, scaleY: 2.4 }, 
    { src: "pictures/img3.png", span: 1, title: "Neon Alley", description: "Night photography with focus on electric light.", scaleX: .43, scaleY: 2.4 }, 
    { src: "pictures/img4.png", span: 3, title: "Mountain Range", description: "High-resolution shot of the Canadian Rockies.", scaleX: .9, scaleY: 2.4 }, 
    { src: "pictures/img5.jpg", span: 1, title: "Still Life", description: "Classic composition using fruit and pottery.", scaleX: .5, scaleY: 2.4 }, 
    { src: "pictures/img6.png", span: 2, title: "Digital Portrait", description: "Vector illustration created with clean lines.", scaleX: .6, scaleY: 2.4 },
    { src: "pictures/img7.jpg", span: 2, title: "Forest Floor", description: "Macro shot capturing intricate detail.", scaleX: .73, scaleY: 2.4 },
    { src: "pictures/img3.png", span: 4, title: "The Quadruple", description: "A wide, panoramic experiment in texture.", scaleX: 1.4, scaleY: 2.4 },
];

const socialLinks = [
  { 
    name: 'Instagram', 
    url: 'https://www.instagram.com/dannbo_/', 
    Icon: FaInstagram 
  },
  /*
  { 
    name: 'X/Twitter', 
    url: 'https://www.x.com/',
    Icon: FaTwitter 
  },
  { 
    name: 'Contact', 
    url: '',
    Icon: FaEnvelope 
  },
  */
];



export default function MainPage() {

  // Prevent automatic scroll restoration on page reload. Why does this happen ;_;
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    
    const [selectedImage, setSelectedImage] = useState(null)
    
    const isModalOpen = selectedImage !== null;
    // 1. Get scroll Y position
    const { scrollY } = useScroll();

    // 2. Define the transformation for the parallax text. 
    // It will move up less than the actual scroll (e.g., 50% of the scroll distance).
    const yText = useTransform(scrollY, [0, 500], [0, 250]); 
    // It will also fade out as we scroll down.
    const opacityText = useTransform(scrollY, [0, 1500], [1, 0]); 

    // 3. Define the transformation for the gallery/navbar section 
    // to bring it up a little bit faster, creating a small "pull-up" effect.
    const yGallery = useTransform(scrollY, [0, 500], [0, 0]); // Move up slightly faster
    
    const handleImageClick = (image) => {
        setSelectedImage(image)
    }

    // Map scrollY to a blur radius (e.g., 0px up to 5px)
    const blurText = useTransform(scrollY, [0, 400], [0, 5]); 

    // Map the blur radius to a CSS filter string
    const filterText = useTransform(blurText, (blur) => `blur(${blur}px)`);

    return (
        <>
            <CustomCursor isModalOpen={isModalOpen} />
            {/* Parallax Artist Name Header */}
            <motion.header 
                className="parallax-header"
                style={{ y: yText, opacity: opacityText, filter: filterText }}
            >
                <ParticleBackground />
                <h1>Dame Coonboy</h1>
                <p>Curated Portfolio</p>
                <div className="nav-socials">
                  {socialLinks.map((link) => (
                    <motion.a // Use motion.a for Framer Motion animations
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-social-item"
                      whileHover={{
                        scale: 1.1, // Slight scale up
                        // Bounce up and down
                        y: [0, -5, 0], // Move up 5px and back to 0
                        transition: {
                          y: { 
                            repeat: Infinity, 
                            duration: 1.5, // Slow bounce
                            ease: "easeInOut" 
                          },
                          default: { 
                            duration: 0.3 
                          } // Apply to scale
                        }
                      }}
                    >
                      {link.Icon ? <link.Icon size={50} /> : link.name}
                    </motion.a>
                  ))}
                </div>
            </motion.header>
            
            {/* Gallery */}
            <motion.div 
                className="content-wrap"
                // This makes the whole section move up slightly faster than normal scroll
                // This is optional but enhances the effect.
                style={{ y: yGallery }} 
            >
                <div className="gallery-container">
                  
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            className="gallery-item"
                            style={{ gridColumn: `span ${img.span}` }}
                            onClick={() => handleImageClick(img)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <img src={img.src} alt={`img-${i}`} />
                            <div className="gallery-item-title">
                                <div 
                                    className="gallery-item-text-scale"
                                    // 💡 NEW: Apply dynamic transform based on image data
                                    style={{
                                        transform: `scale(${img.scaleX}, ${img.scaleY})`
                                    }}
                                >
                                    {img.title}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>         
            <DetailModal 
                selectedImage={selectedImage} 
                setSelectedImage={setSelectedImage} 
            />
        </>
    )
}