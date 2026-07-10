import FrostedGlass from "../../../components/FrostedGlass"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

 const techStack = [
    "TypeScript",
    "React",
    "React Native",
    "Java",
    "Laravel",
    "PHP",
    "C",
    "Tailwind CSS",
    "NativeWind",
    "GSAP",
    "MySQL",
    "PostgreSQL",
    "Supabase",
    "Vite",
    "React Router",
    "Deployment & Infrastructure",
    "Tensorflow",
    "PyTorch",
    "Pandas"
 ]

 export default function Section2(){
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".text-reveal", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });

        gsap.from(".tech-item", {
            scrollTrigger: {
                trigger: ".tech-container",
                start: "top 80%",
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.7)"
        });
    }, { scope: containerRef });

    return (
        <section id="about" ref={containerRef} className="w-full h-fit min-h-screen bg-transparent flex flex-col justify-center items-center px-6 md:px-16 py-24 md:py-32 gap-12">
            <div className="w-full max-w-5xl flex flex-col justify-center font-afacad text-white">
                <p className="text-4xl md:text-5xl font-bold text-reveal mb-4">About Me</p>
                <p className="text-reveal text-lg md:text-xl leading-relaxed text-white/80">I am a Computer Science major at Bina Nusantara University (Class of 2027) and a current IT Developer Intern at Healthy Go, focusing on engineering web and mobile applications.</p>
                
                <p className="text-4xl md:text-5xl font-bold mt-16 text-reveal mb-6">What do I bring to the table?</p>
                <ul className="flex flex-col gap-6">
                    <li className="text-reveal text-lg md:text-xl leading-relaxed text-white/80"><span className="font-bold text-white">Technical Execution</span>: Specialized in translating complex problems into seamless UI/UX using frameworks like React Native, TypeScript, and Laravel</li>
                    <li className="text-reveal text-lg md:text-xl leading-relaxed text-white/80"><span className="font-bold text-white">Collaborative Leadership</span>: A strong, transparent communicator who thrives in team environments and steps up to align technical execution with broader project goals</li>
                    <li className="text-reveal text-lg md:text-xl leading-relaxed text-white/80"><span className="font-bold text-white">Continuous Growth</span>: Fueled by a deep curiosity and a constant hunger to master new frameworks, refine my architecture, and push the boundaries of my digital craftsmanship</li>
                </ul>
            </div>
            
            <div className="w-full max-w-5xl flex flex-col justify-center tech-container mt-8">
                <p className="text-4xl md:text-5xl font-bold text-white font-afacad text-reveal mb-8">Tech Stack</p>
                <FrostedGlass className="text-reveal w-full h-fit p-6 md:p-8 rounded-3xl flex gap-4 flex-wrap" hover={false}>
                    {techStack.map((tech, index) => (
                        <p key={index} className="tech-item px-5 py-2.5 font-afacad text-white/90 border border-white/20 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-default text-lg">{tech}</p>
                    ))}
                </FrostedGlass>
            </div>
        </section>
    )
}