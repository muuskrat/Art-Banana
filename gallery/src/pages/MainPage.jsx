import React, { useState } from "react"
import { FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { motion, useScroll, useTransform } from "framer-motion"

// Component Imports
import DetailModal from "../components/DetailModal"
import CustomCursor from "../components/CustomCursor" 
import ParticleBackground from "../components/ParticleBackground";

import "../styles/MainPage.css"

//
// DATA DEFINITIONS
//
// Define portfolio images with their metadata and scale properties.
const IMAGES = [
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

// Define social media links. Removed commented-out links for X/Twitter and Contact.
const SOCIAL_LINKS = [
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

//
// MAIN COMPONENT
//

export default function MainPage() {

    // Prevent automatic scroll restoration on page reload
    if (window.history.scrollRestoration) {
        window.history.scrollRestoration = 'manual';
    }
    
    const [selectedImage, setSelectedImage] = useState(null)
    const isModalOpen = selectedImage !== null;
    
    // --- Framer Motion Scroll Hooks ---
    const { scrollY } = useScroll();

    // Text Parallax: moves up slower than scroll, fades out, and blurs
    const yText = useTransform(scrollY, [0, 500], [0, 250]); 
    const opacityText = useTransform(scrollY, [0, 1500], [1, 0]); 
    const blurText = useTransform(scrollY, [0, 400], [0, 5]); 
    const filterText = useTransform(blurText, (blur) => `blur(${blur}px)`);

    // Gallery Parallax: Optional minor pull-up effect (currently set to 0 to mimic normal scroll)
    const yGallery = useTransform(scrollY, [0, 500], [0, 0]); 
    
    // --- Handlers ---
    const handleImageClick = (image) => {
        setSelectedImage(image)
    }

    // --- Render ---
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
                    {SOCIAL_LINKS.map((link) => (
                        <motion.a 
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-social-item"
                            whileHover={{
                                scale: 1.1,
                                y: [0, -5, 0],
                                transition: {
                                    y: { 
                                        repeat: Infinity, 
                                        duration: 1.5,
                                        ease: "easeInOut" 
                                    },
                                    default: { 
                                        duration: 0.3 
                                    }
                                }
                            }}
                        >
                            {link.Icon ? <link.Icon size={50} /> : link.name}
                        </motion.a>
                    ))}
                </div>
            </motion.header>
            
            {/* Gallery Content Wrap */}
            <motion.div 
                className="content-wrap"
                style={{ y: yGallery }} 
            >
                <div className="gallery-container">
                    {IMAGES.map((img, i) => (
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