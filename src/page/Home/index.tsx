import { useEffect } from 'react';
import Lenis from 'lenis';
import Header from "../../layout/Header";
import Section1 from "./Section/Section1";
import Section2 from "./Section/Section2";
import Section3 from "./Section/Section3";
import Section4 from "./Section/Section4";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// It's best practice to register plugins outside the component
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    
    useEffect(() => {
        console.log("[DEBUG] Home component mounted. Initializing Lenis & GSAP.");

        // 1. Initialize Lenis
        const lenis = new Lenis({
            autoRaf: false, // Disable internal autoRaf since we manually tick with GSAP
            syncTouch: false, // Turn off if experiencing jitter
        });

        lenis.on('scroll', ScrollTrigger.update);

        let tickCount = 0;
        // Named ticker function to avoid memory leak upon removing
        const updateLenis = (time: number) => {
            tickCount++;
            lenis.raf(time * 1000); 
        };

        // Add Lenis's raf method to GSAP's ticker
        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        // Refresh ScrollTrigger after Lenis is set up so it recalculates positions
        ScrollTrigger.refresh();

        // 2. Setup the GSAP Animation (Parallax Effect)
        const tl = gsap.to('#sect1 .hero-img', {
            yPercent: 30, // Animates the image, not the trigger container
            ease: 'none',
            scrollTrigger: {
                trigger: '#sect1', // Trigger remains stationary
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });

        // 3. Setup GSAP Timeline for ambient pulsing glow
        const glowTl = gsap.timeline({
            repeat: -1,
            yoyo: true,
            defaults: { ease: 'power1.inOut', duration: 4 }
        });

        glowTl.fromTo('.ambient-glow', 
            {
                boxShadow: 'inset 0 0 40px rgba(148, 155, 255, 0.3), inset 0 0 80px rgba(148, 155, 255, 0.2), inset 0 0 150px rgba(148, 155, 255, 0.15)',
                opacity: 0.6
            },
            {
                boxShadow: 'inset 0 0 80px rgba(148, 155, 255, 0.65), inset 0 0 140px rgba(148, 155, 255, 0.45), inset 0 0 220px rgba(148, 155, 255, 0.35)',
                opacity: 1,
            }
        );

        // Debugging interval to monitor memory/render metrics every 3 seconds
        const debugInterval = setInterval(() => {
            const activeTweens = gsap.globalTimeline.getChildren(true).length;
            const activeTriggers = ScrollTrigger.getAll().length;
            const avgTicksPerSecond = (tickCount / 3).toFixed(1);
            console.log(`[DEBUG] Active GSAP Tweens: ${activeTweens} | Active ScrollTriggers: ${activeTriggers} | Ticks/sec: ${avgTicksPerSecond}`);
            tickCount = 0;
        }, 3000);

        // 4. CLEANUP FUNCTION (Crucial in React!)
        // This prevents duplicate animations and memory leaks if the component re-renders
        return () => {
            console.log("[DEBUG] Home component unmounting. Cleaning up resources...");
            clearInterval(debugInterval);
            tl.kill(); // Kill the specific animation
            glowTl.kill(); // Kill the ambient light timeline
            ScrollTrigger.getAll().forEach(t => t.kill()); // Kill all ScrollTriggers
            gsap.ticker.remove(updateLenis); // Remove the named updateLenis function from the ticker
            lenis.destroy(); // Destroy Lenis instance
        };
    }, []); // Empty dependency array means this runs exactly once when the page loads

    return (
        <main className="wrapper relative">
            <Header />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
        </main>
    )
}