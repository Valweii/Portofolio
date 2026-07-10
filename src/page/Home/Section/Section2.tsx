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
        <section id="about" ref={containerRef} className="w-full h-fit min-h-screen bg-transparent flex justify-between items-center px-16">
            <div className="w-1/2 h-full flex flex-col justify-center font-afacad text-white">
                <p className="text-4xl font-bold text-reveal">About Me</p>
                <p className="text-reveal">I am a Computer Science major at Bina Nusantara University (Class of 2027) and a current IT Developer Intern at Healthy Go, focusing on engineering web and mobile applications.</p>
                <p className="text-4xl font-bold mt-8 text-reveal">What do I bring to the table?</p>
                <ul className="flex flex-col gap-2 mt-2">
                    <li className="text-reveal"><span className="font-bold text-lg">Technical Execution</span>: Specialized in translating complex problems into seamless UI/UX using frameworks like React Native, TypeScript, and Laravel</li>
                    <li className="text-reveal"><span className="font-bold text-lg">Collaborative Leadership</span>: A strong, transparent communicator who thrives in team environments and steps up to align technical execution with broader project goals</li>
                    <li className="text-reveal"><span className="font-bold text-lg">Continuous Growth</span>: Fueled by a deep curiosity and a constant hunger to master new frameworks, refine my architecture, and push the boundaries of my digital craftsmanship</li>
                </ul>
            </div>
            <div className="w-1/2 h-full flex flex-col justify-center items-center px-12 tech-container">
                <p className="text-4xl font-bold text-white font-afacad text-reveal mb-4">Tech Stack</p>
                <FrostedGlass className="text-reveal w-full h-fit p-4 rounded-2xl flex gap-4 flex-wrap" hover={false}>
                    {techStack.map((tech, index) => (
                        <p key={index} className="tech-item px-4 py-2 font-afacad text-white border-white/40 border">{tech}</p>
                    ))}
                </FrostedGlass>
            </div>
        </section>
    )
}