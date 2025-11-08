import React, { useCallback } from "react";
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
    
    // Function to initialize the particle engine
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        // You can add logic here if needed when particles are loaded
    }, []);

    const particlesOptions = {
        background: {
            color: {
                value: "transparent", 
            },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse", // The key for the push-away effect
                },
                resize: true,
            },
            modes: {
                repulse: {
                    distance: 100, 
                    duration: .4,
                },
            },
        },
        // --- Fairy Dust Configuration ---
        particles: {
            color: {
                value: "#be8b32ff", // Pale gold/white for a magical look
            },
            links: {
                enable: false, // Crucial: Remove the connecting lines
            },
            move: {
                direction: "top", // Move gently upwards
                enable: true,
                outModes: {
                    default: "out",
                },
                random: true, // Random movement for a shimmering feel
                speed: 0.3, // Very slow speed
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 1000,
                },
                value: 120, // Higher count for a denser "dust" effect
            },
            opacity: {
                value: { min: 0.3, max: 0.9 }, // Varying opacity for shimmer
                animation: {
                    enable: true,
                    speed: 1, 
                    sync: false,
                    startValue: "random",
                }
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 0.5, max: 2 }, // Very small particles
                random: true, 
                animation: {
                    enable: true,
                    speed: 4,
                    minimumValue: 0.5,
                    sync: false,
                }
            },
        },
        detectRetina: true,
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesOptions}
        />
    );
};

export default ParticleBackground;