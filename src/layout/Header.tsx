import HoveredText from "../components/HoveredText";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FrostedGlass from "../components/FrostedGlass";
import { whatsapp as WhatsappIcon, instagram as InstagramIcon, github as GithubIcon } from "../helpers/svg";

const dummy = [
    "Home",
    "About",
    "Contact",
    "Projects"
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
            xPercent: -100,
            opacity: 0
        })

        gsap.set(overlayRef.current, { 
            scaleY: 0, 
            borderRadius: "0 0 100% 100%", 
            transformOrigin: "top" 
        })

        tl.current = gsap.timeline({ paused: true })
        
        tl.current.to(overlayRef.current, {
            scaleY: 1,
            ease: "sine.in",
            duration: 0.9,
            borderRadius: "0 0 0 0"
        })
        tl.current.to('.navGrid', {
            xPercent: 0,
            opacity: 1,
            ease: "power4.out",
            duration: 0.9,
            stagger: {
                amount: 0.1,
                from: "random"
            }
        })
        
    }, { scope: overlayRef }) // No dependencies, runs once

    //  Playback hook: Runs whenever mobileOpen changes
    useGSAP(() => {
        if (!tl.current) return;

        if (mobileOpen) {
            tl.current.play()
        } else {
            tl.current.reverse()
        }
    }, [mobileOpen]) // Dependency array controls playback

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

                <button onClick={() => setMobileOpen((v) => !v)} className="relative flex md:hidden border-2 border-fwhite rounded-md translate-y-[10%] justify-center items-center overflow-hidden">
                    <svg className="w-10 m-auto" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 5H12V6H5V5ZM3 9H10V10H3V10Z" fill="#F8F5EE"/>
                    </svg>
                    <div className="header-reveal-box absolute inset-0 bg-fwhite z-10 pointer-events-none" />
                </button>
            </header>

            {/* Overlay */}
            <div ref={overlayRef} className="h-screen w-screen fixed top-0 left-0 bg-sage z-40 flex justify-center items-center flex-wrap">
                <div className="w-full h-fit flex flex-wrap justify-center gap-4 px-4">
                    {dummy.map((item, index) => (
                        <div key={index} className={`w-2/5 aspect-square overflow-hidden ${index%2 === 0 ? "translate-y-[25%]" : ""}`}>
                            <span className="navGrid w-full h-full bg-black flex justify-center items-center text-2xl text-fwhite font-bold">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}