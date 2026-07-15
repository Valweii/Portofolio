import HoveredText from "../components/HoveredText";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FrostedGlass from "../components/FrostedGlass";
import { whatsapp as WhatsappIcon, instagram as InstagramIcon, github as GithubIcon } from "../helpers/svg";

const navLinks = [
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" }
]

export default function Header (){
    const [mobileOpen, setMobileOpen] = useState(false);
    const overlayRef = useRef(null)
    const headerRef = useRef(null)

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const tl = useRef<gsap.core.Timeline | null>(null);
    
    useGSAP(() => {
        gsap.set('.navGrid', {
            x: 30,
            opacity: 0
        })

        gsap.set(overlayRef.current, { 
            xPercent: 100 
        })

        tl.current = gsap.timeline({ paused: true })
        
        tl.current.to(overlayRef.current, {
            xPercent: 0,
            ease: "power3.inOut",
            duration: 0.5
        })
        tl.current.to('.navGrid', {
            x: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 0.4,
            stagger: 0.1
        }, "-=0.2")
        
    }, { scope: overlayRef }) // No dependencies, runs once

    // Playback hook for mobile menu
    useGSAP(() => {
        if (!tl.current) return;
        if (mobileOpen) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [mobileOpen]);

    useGSAP(() => {
        gsap.to('.header-reveal-box', {
            scaleX: 0,
            transformOrigin: "right",
            ease: "power4.inOut",
            duration: 1.2,
            stagger: 0.1,
        })
    }, { scope: headerRef });

    return (
        <>
            <header ref={headerRef} className="w-full h-fit px-18 py-4 bg-transparent flex justify-between items-center fixed top-0 z-50 text-white">
                <FrostedGlass className="hidden md:flex gap-8 py-2 w-1/3 justify-center" hover={false}>
                    <div className="relative overflow-hidden cursor-pointer" onClick={() => scrollToSection('about')}>
                        <HoveredText text="About" icon="topRight" className="text-fwhite tracking-wider text-lg py-2" underline={true}/>
                        <div className="header-reveal-box absolute inset-0 bg-fwhite z-10 pointer-events-none" />
                    </div>
                    <div className="relative overflow-hidden cursor-pointer" onClick={() => scrollToSection('projects')}>
                        <HoveredText text="Projects" icon="topRight" className="text-fwhite tracking-wider text-lg py-2" underline={true}/>
                        <div className="header-reveal-box absolute inset-0 bg-fwhite z-10 pointer-events-none" />
                    </div>
                    <div className="relative overflow-hidden cursor-pointer" onClick={() => scrollToSection('experience')}>
                        <HoveredText text="Experience" icon="topRight" className="text-fwhite tracking-wider text-lg py-2" underline={true}/>
                        <div className="header-reveal-box absolute inset-0 bg-fwhite z-10 pointer-events-none" />
                    </div>
                </FrostedGlass>

                <div className="hidden md:flex items-center w-1/3 justify-end">
                    <FrostedGlass className="p-4 rounded-2xl">
                        <a href="https://www.instagram.com/valdricheag/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200" aria-label="Instagram">
                            <InstagramIcon className="w-5 h-5 fill-fwhite hover:fill-[#C13584] transition-colors duration-200" />
                        </a>
                    </FrostedGlass>
                    <FrostedGlass className="p-4 rounded-2xl">
                        <a href="https://api.whatsapp.com/send?phone=6287819970882" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200" aria-label="WhatsApp">
                            <WhatsappIcon className="w-5 h-5 fill-fwhite hover:fill-[#128C7E] transition-all duration-200" />
                        </a>
                    </FrostedGlass>
                    <FrostedGlass className="p-4 rounded-2xl" hover={false}>
                        <a href="https://github.com/Valweii/" target="_blank" className="hover:scale-110 transition-transform duration-200" aria-label="Gmail">
                            <GithubIcon className="w-5 h-5 fill-fwhite hover:fill-[#0969DA] transition-all duration-200" />
                        </a>
                    </FrostedGlass>
                </div>

                {/* Mobile Hamburger */}
                <button 
                    onClick={() => setMobileOpen(!mobileOpen)} 
                    className="absolute top-10 right-10 z-100 flex md:hidden flex-col justify-center items-center w-8 h-8 space-y-2 focus:outline-none ml-auto"
                >
                    <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                    <span className={`block w-8 h-0.5 bg-white transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            <div ref={overlayRef} className="h-screen w-full md:hidden fixed top-0 right-0 bg-zinc-900/98 backdrop-blur-xl z-[90] flex flex-col justify-center items-center px-12">
                <button 
                    onClick={() => setMobileOpen(false)}
                    className="absolute top-10 right-10 text-white hover:text-white/70 transition-colors"
                >
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="w-full flex flex-col gap-10 items-center">
                    {navLinks.map((item, index) => (
                        <div key={index} className="overflow-hidden">
                            <span 
                                className="navGrid block text-5xl text-white font-afacad font-bold cursor-pointer hover:text-white/60 transition-colors"
                                onClick={() => {
                                    scrollToSection(item.id);
                                    setMobileOpen(false);
                                }}
                            >
                                {item.name}
                            </span>
                        </div>
                    ))}

                    <div className="flex gap-6 mt-12 overflow-hidden">
                        <div className="navGrid">
                            <FrostedGlass className="p-4 rounded-2xl">
                                <a href="https://www.instagram.com/valdricheag/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <InstagramIcon className="w-7 h-7 fill-fwhite hover:fill-[#C13584] transition-colors duration-200" />
                                </a>
                            </FrostedGlass>
                        </div>
                        <div className="navGrid">
                            <FrostedGlass className="p-4 rounded-2xl">
                                <a href="https://api.whatsapp.com/send?phone=6287819970882" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                    <WhatsappIcon className="w-7 h-7 fill-fwhite hover:fill-[#128C7E] transition-colors duration-200" />
                                </a>
                            </FrostedGlass>
                        </div>
                        <div className="navGrid">
                            <FrostedGlass className="p-4 rounded-2xl">
                                <a href="https://github.com/Valweii/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                    <GithubIcon className="w-7 h-7 fill-fwhite hover:fill-[#0969DA] transition-colors duration-200" />
                                </a>
                            </FrostedGlass>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}