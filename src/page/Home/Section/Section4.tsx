import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        id: "01",
        title: "IT Developer Intern",
        company: "PT. Dapur Sehat Indonesia",
        date: "February 2026 - Present",
        description: "Engineered scalable web applications and robust internal administrative systems using React and Laravel. Implemented secure API integrations and optimized frontend performance to support core business operations."
    },
    {
        id: "02",
        title: "Information and Technology Intern",
        company: "Pancaran Agro - Kelapa Gading",
        date: "December 2024",
        description: "Prepared employee master data and optimized workflows for SAP integration. Validated SAP UDFs and supported troubleshooting to maintain accurate, reliable system operations."
    },
    {
        id: "03",
        title: "Connect Group Co-Leader",
        company: "GMS Church - Alam Sutera",
        date: "February 2025 — Present",
        description: "Facilitated weekly Connect Group sessions through prepared activities and guided discussions to foster community engagement and spiritual growth."
    },
    {
        id: "04",
        title: "Data Ministry Team Member",
        company: "GMS Church - Alam Sutera",
        date: "April 2025 — Present",
        description: "Assisted the Data Ministry by managing participation records, and onboarding new visitors and baptism candidates to maintain accurate church records."
    }
];

export default function Section4(){
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".exp-row", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <section id="experience" ref={containerRef} className="w-full h-fit min-h-screen bg-transparent flex flex-col justify-center items-center p-16 font-afacad relative z-10 pt-20">
            <p className="text-white font-afacad text-4xl">Experience</p>
            <div className="w-full flex flex-col mt-8">
                {experiences.map((exp, index) => (
                    <div key={index} className="exp-row flex flex-col lg:flex-row py-12 border-b border-white/10 items-start gap-6 lg:gap-0 hover:bg-white/5 transition-colors duration-300 px-4 -mx-4 rounded-xl">
                        {/* ID */}
                        <div className="lg:w-1/12 text-white/60 text-sm font-bold pt-2">{exp.id}</div>
                        
                        {/* Title & Company */}
                        <div className="lg:w-4/12 flex flex-col pr-8">
                            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">{exp.title}</h3>
                            <p className="text-white/60 text-lg md:text-xl mt-2">{exp.company}</p>
                        </div>

                        {/* Date */}
                        <div className="lg:w-3/12 text-white/60 text-sm md:text-base pt-2">{exp.date}</div>

                        {/* Description */}
                        <div className="lg:w-4/12 text-white/80 text-base md:text-lg leading-relaxed pt-2">
                            {exp.description}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}