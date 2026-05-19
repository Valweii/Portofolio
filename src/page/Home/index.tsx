import { useEffect } from 'react';
import Lenis from 'lenis';
import Header from "../../layout/Header";
import Section1 from "./Section/Section1";
import Section2 from "./Section/Section2";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// It's best practice to register plugins outside the component
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    
    useEffect(() => {
        // 1. Initialize Lenis
        const lenis = new Lenis({
            autoRaf: true,
        });

        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's raf method to GSAP's ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); 
        });
        gsap.ticker.lagSmoothing(0);

        // 2. Setup the GSAP Animation
        const tl = gsap.to('.section-1', {
            yPercent: 10, // Pushes Section 1 down as you scroll up
            ease: 'none',
            scrollTrigger: {
                trigger: '.section-1',
                start: 'top top',       
                end: 'bottom top',      
                scrub: true,            
            },
        });

        // 3. CLEANUP FUNCTION (Crucial in React!)
        // This prevents duplicate animations and memory leaks if the component re-renders
        return () => {
            tl.kill(); // Kill the specific animation
            ScrollTrigger.getAll().forEach(t => t.kill()); // Kill all ScrollTriggers
            gsap.ticker.remove(lenis.raf); // Remove Lenis from the ticker
            lenis.destroy(); // Destroy Lenis instance
        };
    }, []); // Empty dependency array means this runs exactly once when the page loads

    return (
        <main className="wrapper relative">
            <Header />
            <Section1 />
            <Section2 />
        </main>
    )
}