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
    const [mobileOpen, setMobileOpen] = useState(false)
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
            <header ref={headerRef} className="w-full h-fit px-18 py-12 bg-transparent flex justify-between items-center fixed top-0 z-50 text-white">
                <div className="hidden md:flex gap-8 py-2 w-1/3 justify-center">
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
                </div>

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
                    <FrostedGlass className="p-4 rounded-2xl">
                        <a href="https://github.com/Valweii/" target="_blank" className="hover:scale-110 transition-transform duration-200" aria-label="Gmail">
                            <GithubIcon className="w-5 h-5 fill-fwhite hover:fill-[#0969DA] transition-all duration-200" />
                        </a>
                    </FrostedGlass>
                </div>
            </header>
        </>
    )
}