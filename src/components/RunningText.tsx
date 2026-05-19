import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function RunningText(){
    const vizenRef = useRef<HTMLDivElement>(null)
    const { contextSafe } = useGSAP({ scope: vizenRef });

    const handleMouseMove = contextSafe((e: React.MouseEvent) => {
        if (!vizenRef.current) return;
        const rect = vizenRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        gsap.utils.toArray('.vizen-char').forEach((char: any) => {
            const charRect = char.getBoundingClientRect();
            const charX = charRect.left - rect.left + charRect.width / 2;
            const charY = charRect.top - rect.top + charRect.height / 2;

            const dx = charX - mouseX;
            const dy = charY - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const maxDist = 40;
            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                const angle = Math.atan2(dy, dx);
                
                const moveX = Math.cos(angle) * force * 30;
                const moveY = Math.sin(angle) * force * 30;
                const rotate = (Math.random() - 0.5) * force * 60;

                gsap.to(char, {
                    x: moveX,
                    y: moveY,
                    rotation: rotate,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            } else {
                gsap.to(char, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)",
                    overwrite: "auto"
                });
            }
        });
    });

    const handleMouseLeave = contextSafe(() => {
        gsap.to('.vizen-char', {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
            overwrite: "auto"
        });
    });

    return (
        <div 
            ref={vizenRef} 
            className="text-4xl font-thin tracking-widest cursor-default"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {"VIZEN".split("").map((c, i) => (
                <span key={i} className="inline-block vizen-char origin-center">{c}</span>
            ))}
        </div>
    )
}