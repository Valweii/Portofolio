import { useMemo, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface HoveredTextProps {
    text: string;
    icon?: "right" | "topRight";
    underline: boolean;
    className?: string;
    tranlateY?: boolean;
}

export default function HoveredText({ text, icon="topRight", underline, className, tranlateY = true }: HoveredTextProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const timeline = useRef<gsap.core.Timeline>(null)

    const characters = useMemo(() => {
        return text.split("")
    }, [text])

    useGSAP(() => {
        gsap.set(".char2", { yPercent: 150 })
        
        if (underline) {
            gsap.set(".underline-progress", { scaleX: 0, transformOrigin: "left" })
        }
        
        if (icon === "topRight") {
            gsap.set(".arrow2", { yPercent: 110, xPercent: -150 })
            gsap.set([".arrow", ".arrow2"], { rotation: 0 })
        } else {
            gsap.set(".arrow2", { xPercent: -150 })
            gsap.set([".arrow", ".arrow2"], { rotation: 45 })
        }
        
        const tl = gsap.timeline({ paused: true })
        timeline.current = tl

        tl.to(".char1", {
            yPercent: -150,
            ease: "power4.inOut",
            duration: 0.9,
            stagger: {
                amount: 0.9 / text.length,
                from: "random"
            }
        }, 0)
        .to(".char2", {
            yPercent: 0,
            ease: "power4.inOut",
            duration: 0.9,
            stagger: {
                amount: 0.9 / text.length,
                from: "random"
            }
        }, 0)
        
        if (underline) {
            tl.to(".underline-progress", {
                scaleX: 1,
                ease: "power4.inOut",
                duration: (0.9) + 0.9 / text.length
            }, 0)
        }

        if (icon === "topRight") {
            tl.to(".arrow", {
                yPercent: -150,
                xPercent: 150,
                ease: "power3.inOut",
                duration: (0.9) + 0.9 / text.length
            }, 0)
            .to(".arrow2", {
                yPercent: 0,
                xPercent: 0,
                ease: "power3.inOut",
                duration: (0.9) + 0.9 / text.length
            }, 0)
        } else {
            tl.to(".arrow", {
                xPercent: 150,
                ease: "power3.inOut",
                duration: (0.9) + 0.9 / text.length
            }, 0)
            .to(".arrow2", {
                xPercent: 0,
                ease: "power3.inOut",
                duration: (0.9) + 0.9 / text.length
            }, 0)
        }
    }, { scope: containerRef, dependencies: [text, icon] })

    return (
        <div className="flex flex-col gap-0"
            ref={containerRef}
            onMouseEnter={() => timeline.current?.play()}
            onMouseLeave={() => timeline.current?.reverse()}
        >
            <div 
                className={`${className} relative overflow-hidden cursor-pointer inline-flex items-center`}
            >
                <div className="relative flex items-center">
                    <div className="flex">
                        {characters.map((char, index) => (
                            <span key={`char1-${index}`} className="char1 inline-block whitespace-pre">
                                {char}
                            </span>
                        ))}
                    </div>
                    <div className="flex absolute top-0 left-0 w-full h-full">
                        {characters.map((char, index) => (
                            <span key={`char2-${index}`} className="char2 inline-block whitespace-pre">
                                {char}
                            </span>
                        ))}
                    </div>
                </div>
                
                <div className="relative flex items-center ml-2 overflow-hidden">
                    <svg width="1em" height="1em" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={`arrow ${tranlateY ? "translate-y-[10%]" : ""}`}>
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                            fill="#F8F5EE"
                        />
                    </svg>
                    <svg width="1em" height="1em" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={`arrow2 absolute top-0 left-0 ${tranlateY ? "translate-y-[10%]" : ""}`}>
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                            fill="#F8F5EE"
                        />
                    </svg>
                </div>
            </div>
            
            {underline && 
                <div className="relative w-full h-px bg-white/30">
                    <div className="underline-progress absolute top-0 left-0 w-full h-px bg-fwhite" />
                </div>
            }
        </div>
    )
}
