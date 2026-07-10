import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import FrostedGlass from "../../../components/FrostedGlass"
 import lumosImg from "../../../assets/lumos.png"
 import hgImg from "../../../assets/hg.png"
 import startImg from "../../../assets/startwu.png"
 import valcordImg from "../../../assets/valcord.png"
 import aiImg from "../../../assets/ai.png"

 const projects = [
    {
        title: "Lumos Production Company Profile",
        description: `A decoupled web platform and custom content management system built for a production company.

        Modern Frontend: Developed a fast, responsive user interface using React and Tailwind CSS.
        Custom Laravel CMS: Engineered a tailored admin dashboard, empowering the client to independently manage and update website content.
        Decoupled Architecture: Separated backend data logic from the frontend presentation to optimize scalability and page load performance.`,
        image: lumosImg,
        link: "https://lumosprod.vercel.app/",
        github: "https://github.com/Valweii/LumosProduction"
    },
    {
        title: "Healthy Go Company Profile",
        description: `Enterprise web applications and robust internal administration systems engineered during my IT Developer Internship
        
        - Decoupled Architecture: Migrated and managed frontends using React and Vite, optimizing asset delivery and overall UI/UX performance.
        - Backend - & APIs: Implemented real-time API integrations and secure, scalable data management using Laravel and MySQL.
        - Internal Systems: Built highly secure administrative tools and executed rigorous quality assurance to support core business operations.`,
        image: hgImg,
        link: "https://healthygo.id/",
        github: "https://github.com/itdevhg/hglandingnew"
    },
    {
        title: "Church Event Registration Web App",
        description: `A highly polished event registration and ticketing web application designed to streamline onboarding and check-ins for church attendees.

        - Registration System: Engineered a multi-step onboarding flow utilizing GSAP for fluid layout transitions and Supabase for secure data management and automated ticket generation.
        - Admin QR Scanner: Developed a real-time QR code scanning interface with integrated PIN authentication that updates backend records instantly to accelerate event check-ins and prevent duplicate entries.
        - Immersive UI/UX: Architected a responsive, minimalist frontend utilizing Tailwind CSS and custom glassmorphism components to deliver a highly engaging, premium user experience across all devices.`,
        image: startImg,
        link: "https://start-with-you.vercel.app/",
        github: "https://github.com/Valweii/StartWithYou"
    },
    {
        title: "Discord clone",
        description: `A full-stack, real-time communication platform inspired by Discord, designed to enable seamless text-based interactions and scalable community management.

        - Real-Time Messaging Architecture: Architected a low-latency, bidirectional messaging system leveraging Laravel Reverb and WebSockets to deliver instant, seamless data synchronization across active clients.
        - Role-Based Access Control (RBAC): Engineered robust server and channel management APIs with granular permission structures, ensuring secure data handling and flexible community administration.
        - Dynamic Frontend Architecture: Developed a highly responsive, interactive user interface utilizing React and Tailwind CSS, integrating GSAP for fluid micro-animations to provide a premium, native-app experience.`,
        image: valcordImg,
        link: "",
        github: ["https://github.com/Valweii/valcord-api", "https://github.com/Valweii/valcord-client"]
    },
    {
        title: "Human Pose Manipulation using LoRA",
        description: `A generative AI pipeline engineered to perform complex, text-driven human pose manipulation within the strict compute constraints of standard consumer hardware.

        - Optimized Architecture: Architected a memory-efficient InstructPix2Pix pipeline leveraging LoRA (Low-Rank Adaptation) and mixed-precision training to enable advanced model fine-tuning on limited GPU resources.
        - Structural Preservation: Integrated ControlNet preprocessors to strictly maintain background consistency and subject identity during dramatic pose transformations.
        - Quantitative Benchmarking: Engineered an automated dataset generation workflow and implemented rigorous computer vision evaluation metrics, including Directional CLIP and LPIPS, to benchmark model accuracy.`,
        image: aiImg,
        link: "https://colab.research.google.com/drive/1b1nXrFfXnuIDzx3F7nxrcH4CUK7ycDGC?usp=sharing",
        github: "https://github.com/NathanaelWilson/human-pose-manipulation"
    }
 ]

 export default function Section3(){
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".project-card", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    useGSAP(() => {
        if (selectedProject && overlayRef.current && modalRef.current) {
            gsap.fromTo(modalRef.current, 
                { opacity: 0, scale: 0.8, y: 30 }, 
                { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "back.out(1.5)" }
            );
        }
    }, [selectedProject]);

    return (
        <section id="projects" ref={containerRef} className="w-full h-fit bg-transparent flex flex-col justify-center items-center px-6 md:px-16 pt-24 md:pt-16 relative">
            <p className="text-4xl font-afacad font-bold text-white mb-8">Projects</p>
            <div className="w-full h-full flex flex-wrap justify-center gap-4">
                {projects.map((project, index) => (
                    <FrostedGlass 
                        key={index} 
                        className="project-card w-full md:w-[calc(50%-1rem)] h-fit p-4 rounded-2xl flex flex-col gap-2 cursor-pointer group"
                        onClick={() => setSelectedProject(project)}
                    >
                        <p className="text-2xl font-afacad font-bold text-white">{project.title}</p>
                        <div className="relative w-full rounded-2xl overflow-hidden">
                            <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={project.image} alt={project.title} />
                            <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white text-xl font-afacad font-bold flex items-center gap-2">
                                    View Project
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </span>
                            </div>
                        </div>
                    </FrostedGlass>
                ))}
            </div>

            {selectedProject && (
                <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setSelectedProject(null)}>
                    <div 
                        ref={modalRef}
                        className="custom-scrollbar bg-zinc-900/90 border border-white/10 rounded-3xl p-6 md:p-8 max-w-3xl w-full flex flex-col gap-6 backdrop-blur-md shadow-2xl max-h-[90vh] overflow-y-auto" 
                        onClick={(e) => e.stopPropagation()}
                        data-lenis-prevent="true"
                    >
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-afacad font-bold text-white">{selectedProject.title}</h2>
                            <button 
                                className="text-white/50 hover:text-white transition-colors cursor-pointer"
                                onClick={() => setSelectedProject(null)}
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        
                        <img className="w-full md:w-3/5 mx-auto rounded-2xl max-h-96 object-cover" src={selectedProject.image} alt={selectedProject.title} />
                        
                        <div className="flex flex-col gap-4">
                            <p className="custom-scrollbar text-lg md:text-xl text-white/80 font-afacad h-48 md:h-40 overflow-y-auto pr-2 md:pr-4 whitespace-pre-line" data-lenis-prevent="true">{selectedProject.description}</p>
                            
                            <div className="flex flex-wrap gap-4 mt-4 shrink-0 pb-4">
                                {selectedProject.link && (
                                    <a href={selectedProject.link} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white text-black rounded-full font-bold font-afacad hover:bg-white/90 transition-colors">
                                        Visit Website
                                    </a>
                                )}
                                {Array.isArray(selectedProject.github) ? (
                                    selectedProject.github.map((repo, i) => (
                                        <a key={i} href={repo} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white/10 text-white rounded-full font-bold font-afacad hover:bg-white/20 transition-colors">
                                            GitHub Repo {i + 1}
                                        </a>
                                    ))
                                ) : (
                                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white/10 text-white rounded-full font-bold font-afacad hover:bg-white/20 transition-colors">
                                        GitHub Repo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}