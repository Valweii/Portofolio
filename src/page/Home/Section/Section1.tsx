import ParticleCanvas from '../../../components/ParticleCanvas';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import cvFile from '../../../assets/CV - Valdrich Eagan.pdf';

export default function Section1() {
    const containerRef = useRef<HTMLElement>(null);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useGSAP(() => {
        gsap.from(".hero-text", {
            y: 60,
            opacity: 0,
            duration: 1.2,
            stagger: 0.3,
            ease: "power4.out",
            delay: 0.2
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-screen h-screen overflow-hidden flex flex-col justify-center items-center">
            {/* Element 1: Particle Flow Background */}
            <ParticleCanvas />
            
            {/* Elements 2 & 3: Typography and CTA */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 w-full">
                
                <div className="flex flex-col items-center gap-3">
                    {/* Main Title */}
                    <h1 
                        className="hero-text text-[#F8F9FA] text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tight text-center leading-none"
                        style={{ fontFamily: '\"Inter\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif' }}
                    >
                        Valdrich Eagan
                    </h1>
                    
                    {/* Subtitle */}
                    <p 
                        className="hero-text text-[#94A3B8] text-lg md:text-xl lg:text-2xl font-normal tracking-wide text-center max-w-2xl mt-2"
                        style={{ fontFamily: '\"Inter\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif' }}
                    >
                        Crafting purposeful digital experiences
                    </p>
                </div>
                
                {/* Call to Action Button */}
                <div className='flex flex-col md:flex-row gap-2'>
                    <button 
                        className="
                            mt-6 px-8 py-3.5 rounded-full 
                            text-[#F8F9FA] text-sm md:text-base font-medium tracking-wide
                            bg-white/5 border border-white/10 backdrop-blur-md
                            transition-all duration-300 ease-out
                            hover:bg-white/10 hover:border-white/25 hover:scale-105 
                            hover:shadow-[0_0_24px_rgba(255,255,255,0.08)]
                            active:scale-95 cursor-pointer
                        "
                        style={{ fontFamily: '\"Inter\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif' }}
                        onClick={() => scrollToSection('projects')}
                    >
                        Explore Work
                    </button>
                    <button 
                        className="
                            mt-6 px-8 py-3.5 rounded-full 
                            text-[#F8F9FA] text-sm md:text-base font-medium tracking-wide
                            bg-white/5 border border-white/10 backdrop-blur-md
                            transition-all duration-300 ease-out
                            hover:bg-white/10 hover:border-white/25 hover:scale-105 
                            hover:shadow-[0_0_24px_rgba(255,255,255,0.08)]
                            active:scale-95 cursor-pointer
                        "
                        style={{ fontFamily: '\"Inter\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif' }}
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = cvFile;
                            link.download = 'CV - Valdrich Eagan.pdf';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}
                    >
                        Download CV
                    </button>
                </div>
                
            </div>
        </section>
    );
}