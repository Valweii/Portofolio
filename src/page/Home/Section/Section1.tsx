import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef, useMemo, useEffect, useCallback } from "react"
import HoveredText from "../../../components/HoveredText";
// import Starburst from "../../../components/Starburst"

// Grid config for '+' pattern
const CELL_SIZE = 100; // px per cell
const COLS = 20;
const ROWS = 15;

// Paint-away reveal config
const config = {
    smoothing: 0.1,
    movementThreshold: 0.5,
    sizeFromSpeed: 0.2,
    expandMultiplier: 2,
    expandTime: 2,
    expandEase: "power1.inOut",
    dissolveStart: 2,
    dissolveTime: 3,
    dissolveEase: "power3.in",
    blurAmount: 8,
};

export default function Section1() {
    const timeline = useRef<gsap.core.Timeline>(null)
    const contactRef = useRef<HTMLDivElement>(null)
    const patternRef = useRef<HTMLDivElement>(null)

    // Paint-away refs
    const sectionRef = useRef<HTMLElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const gRef = useRef<SVGGElement>(null)
    const rawPos = useRef({ x: 0, y: 0 })
    const smoothPos = useRef({ x: 0, y: 0 })
    const isFirstMove = useRef(true)
    const animFrameId = useRef<number>(0)

    // Memoize the grid so it doesn't re-render
    const plusGrid = useMemo(() => {
        const items = [];
        for (let i = 0; i < ROWS * COLS; i++) {
            items.push(
                <span
                    key={i}
                    className="plus-sym"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        color: "rgba(255,255,255,0.1)",
                        fontSize: 18,
                        fontWeight: 300,
                        fontFamily: "sans-serif",
                        willChange: "transform",
                    }}
                >
                    +
                </span>
            );
        }
        return items;
    }, []);

    const renderChars = (text: string, boldItalic?: boolean, mxValue?: number) => {
        if (boldItalic === true) {
            return text.split("").map((char, index) => (
                <span key={index} className="inline-block overflow-visible ">
                    <span className="inline-block hero-char font-bold italic">{char === " " ? "\u00A0" : char}</span>
                </span>
            ));
        }
        return text.split("").map((char, index) => (
            <span key={index} className="inline-block overflow-visible " style={{marginLeft: mxValue, marginRight: mxValue}}>
                <span className="inline-block hero-char">{char === " " ? "\u00A0" : char}</span>
            </span>
        ));
    };

    // Match SVG to viewport dimensions
    const matchSVGToViewport = useCallback(() => {
        if (!svgRef.current) return;
        svgRef.current.style.width = window.innerWidth + "px";
        svgRef.current.style.height = window.innerHeight + "px";
    }, []);

    // Stamp smudge circle and animate with GSAP
    const stampSmudgeAt = useCallback((x: number, y: number, radius: number) => {
        if (!gRef.current) return;

        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle",
        );
        circle.setAttribute("cx", String(x));
        circle.setAttribute("cy", String(y));
        circle.setAttribute("r", String(radius));
        circle.setAttribute("fill", "#fff");
        gRef.current.prepend(circle);

        const animatedRadius = { current: radius };

        const tl = gsap.timeline({
            onUpdate() {
                circle.setAttribute("r", String(Math.max(0, animatedRadius.current)));
            },
            onComplete() {
                tl.kill();
                circle.remove();
            },
        });

        tl.to(animatedRadius, {
            current: radius * config.expandMultiplier,
            duration: config.expandTime,
            ease: config.expandEase,
        });

        tl.to(
            animatedRadius,
            {
                current: 0,
                duration: config.dissolveTime,
                ease: config.dissolveEase,
            },
            config.dissolveStart,
        );
    }, []);

    // Pointer tracking and animation loop
    useEffect(() => {
        const heroSection = sectionRef.current;
        if (!heroSection) return;

        const onPointerMove = (x: number, y: number) => {
            if (!isFirstMove.current) {
                rawPos.current = { x, y };
                return;
            }
            // First move — sync both positions
            rawPos.current = { x, y };
            smoothPos.current = { x, y };
            isFirstMove.current = false;
        };

        // Mouse events
        const handleMouseMove = (e: MouseEvent) => {
            onPointerMove(e.pageX, e.pageY);
        };

        // Touch events (with preventDefault + passive: false)
        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            onPointerMove(e.touches[0].pageX, e.touches[0].pageY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            onPointerMove(e.touches[0].pageX, e.touches[0].pageY);
        };

        const update = () => {
            const { x: rawX, y: rawY } = rawPos.current;
            const { x: smoothX, y: smoothY } = smoothPos.current;

            // Smooth chasing
            const newX = smoothX + (rawX - smoothX) * config.smoothing;
            const newY = smoothY + (rawY - smoothY) * config.smoothing;

            // Calculate speed
            const dx = newX - smoothX;
            const dy = newY - smoothY;
            const speed = Math.sqrt(dx * dx + dy * dy);

            // Stamp smudge if speed exceeds threshold
            if (speed > config.movementThreshold) {
                const size = Math.max(20, Math.min(speed * config.sizeFromSpeed * 100, 80));
                stampSmudgeAt(newX, newY, size);
            }

            smoothPos.current = { x: newX, y: newY };
            animFrameId.current = requestAnimationFrame(update);
        };

        // Start loop
        animFrameId.current = requestAnimationFrame(update);

        // Match SVG on load and window resize
        matchSVGToViewport();
        window.addEventListener("resize", matchSVGToViewport);

        // Attach input listeners to the hero section
        heroSection.addEventListener("mousemove", handleMouseMove);
        heroSection.addEventListener("touchstart", handleTouchStart, { passive: false });
        heroSection.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            cancelAnimationFrame(animFrameId.current);
            window.removeEventListener("resize", matchSVGToViewport);
            heroSection.removeEventListener("mousemove", handleMouseMove);
            heroSection.removeEventListener("touchstart", handleTouchStart);
            heroSection.removeEventListener("touchmove", handleTouchMove);
        };
    }, [matchSVGToViewport, stampSmudgeAt]);

    useGSAP(() => {
        // Hero text animation
        gsap.set(".hero-char", { yPercent: 50, opacity: 0, rotate:-40 });
        gsap.set(contactRef.current, { opacity: 0, yPercent: 100 });

        timeline.current = gsap.timeline();
        timeline.current.to(".hero-char", {
            yPercent: 0,
            opacity: 1,
            rotate:0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.05
        });

        timeline.current.to(contactRef.current,{
            opacity: 1,
            yPercent: 0,
            duration: 1,
            ease: "power3.out",
            delay: -1
        });

        if (patternRef.current) {
            // Timeline 1: Continuous top-left drift (loops seamlessly)
            const driftTl = gsap.timeline({ repeat: -1 });
            driftTl.to(patternRef.current, {
                x: -CELL_SIZE,
                y: -CELL_SIZE,
                duration: 8,
                ease: "none",
            });

            // Timeline 2: Occasionally rotate individual '+' symbols 45°
            const rotateTl = gsap.timeline({ repeat: -1 });
            // Wait 6s, then rotate, then wait again — runs independently
            rotateTl
                .to(".plus-sym", {
                    rotation: "+=90",
                    duration: 1.5,
                    ease: "power2.inOut",
                })
                .to(".plus-sym", {
                    rotation: "+=90",
                    duration: 1.5,
                    ease: "power2.inOut",
                });
        }
    });

    return (
        <>
            <section
                ref={sectionRef}
                className="section-1 relative w-full h-full min-h-screen overflow-hidden"
            >
                {/* ── SVG Mask Definition ── */}
                <svg
                    ref={svgRef}
                    className="paint-svg"
                    style={{ position: "absolute", pointerEvents: "none", width: 0, height: 0 }}
                >
                    <defs>
                        <filter id="paint-blur">
                            <feGaussianBlur stdDeviation={config.blurAmount} />
                        </filter>
                        <mask id="paint-mask">
                            {/* Black = hidden, White circles = revealed */}
                            <rect width="100%" height="100%" fill="black" />
                            <g ref={gRef} filter="url(#paint-blur)"></g>
                        </mask>
                    </defs>
                </svg>

                {/* ── Background Layer (hidden content, revealed by paint) ── */}
                <div
                    className="paint-background"
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#252525",
                        mask: "url(#paint-mask)",
                        WebkitMask: "url(#paint-mask)",
                        zIndex: 2,
                    }}
                >
                    <div className="w-full max-w-4xl px-8 md:px-16 flex flex-col gap-8">
                        <h1
                            className="text-4xl md:text-6xl lg:text-[12rem] font-afacad text-sage leading-tight text-center tracking-widest"
                        >
                            VIZEN
                        </h1>
                    </div>
                </div>

                {/* ── Foreground Layer (current hero content) ── */}
                <div
                    className="paint-foreground bg-sage"
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1,
                    }}
                >
                    {/* Repeating '+' pattern background */}
                    <div
                        ref={patternRef}
                        className="absolute pointer-events-none"
                        style={{
                            top: -CELL_SIZE,
                            left: -CELL_SIZE,
                            width: COLS * CELL_SIZE,
                            height: ROWS * CELL_SIZE,
                            display: "grid",
                            gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
                        }}
                    >
                        {plusGrid}
                    </div>
                    {/* <Starburst size={800} color={'#373B30'} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit z-0" /> */}

                    <div className="w-full h-full flex flex-col justify-center items-center relative tracking-tighter font-orpheus">
                        <p className="text-5xl md:text-8xl lg:text-9xl text-[#DDE0D7] text-justify flex flex-row items-center">
                            {renderChars("Breathing ", false, -2)}
                            <span className="text-[#DDF5C1]  text-6xl md:text-9xl lg:text-[140px] font-afacad">{renderChars("LIFE", true)}</span>
                        </p>
                        
                        <p className="text-5xl md:text-8xl lg:text-9xl text-justify text-[#DDE0D7]">{renderChars("into Web Design")}</p>
                    </div>
                    <div ref={contactRef} className="w-full h-fit flex justify-center items-center z-1 -translate-y-48">
                        <HoveredText text="Contact" underline={false} icon="right" className="text-fwhite text-xl tracking-wide bg-white/5 px-8 py-2 backdrop-blur-[6px] rounded-full border-gray-300/20 border-2" tranlateY={false} />
                    </div>
                </div>
            </section>
        </>
    )
}