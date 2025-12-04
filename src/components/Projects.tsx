import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  longDescription?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Financify",
    category: "Web Development",
    year: "2024",
    image: "./src/assets/financify.png",
    description: "Personal Finance Tracker with PDF Mutation Input - A fully functional finance tracking web application with features like expense categorization, split bill, and transaction summaries.",
    longDescription: "Financify is a comprehensive personal finance management application that helps users track their expenses, categorize transactions, and manage their financial data. The application features PDF mutation input for easy transaction import, split bill functionality for shared expenses, and detailed transaction summaries. Built with security in mind, it uses AES-256-GCM encryption to protect sensitive financial data.",
    technologies: ["React", "Tailwind CSS", "Supabase", "AES-256-GCM Encryption", "Vite"],
    liveUrl: "https://financify-app.vercel.app/",
    githubUrl: "https://github.com/Valweii/Financify-app",
  },
  {
    id: "02",
    title: "Created To Connect",
    category: "Web Development",
    year: "2024",
    image: "./src/assets/c2c.png",
    description: "Event Registration & Ticketing Platform - A full event registration website supporting ticketing, registration forms, and automated QR code generation.",
    longDescription: "Created To Connect is a complete event management platform that streamlines the event registration and ticketing process. The platform allows event organizers to create registration forms, manage ticket sales, and automatically generate QR codes for attendees. It provides a seamless experience for both organizers and participants, with real-time updates and automated confirmation emails.",
    technologies: ["React", "Tailwind CSS", "Supabase", "Next.js"],
    liveUrl: "https://created-to-connect.vercel.app/",
    githubUrl: "https://github.com/Valweii/Created-To-Connect",
  },
  {
    id: "03",
    title: "KKR QR Scanner",
    category: "Web Development",
    year: "2024",
    image: "./src/assets/qr-scanner.png",
    description: "Ticket Scanning & Attendance Verification - A dedicated web app for scanning event tickets generated from the Created To Connect website.",
    longDescription: "KKR QR Scanner is a specialized web application designed to work seamlessly with the Created To Connect platform. It enables event staff to quickly scan QR codes on tickets, verify attendee information, and track attendance in real-time. The application provides instant feedback on ticket validity and helps maintain accurate attendance records for events.",
    technologies: ["React", "Tailwind CSS", "Supabase"],
    liveUrl: "https://kkr-qr-scanner.vercel.app/",
    githubUrl: "https://github.com/Valweii/KKR-QR-Scanner",
  },
  {
    id: "04",
    title: "CareerScope",
    category: "Machine Learning",
    year: "2024",
    image: "./src/assets/career-scope.png",
    description: "Computer Science Student Career Prediction Web Application - A web platform to showcase a machine learning model that predicts computer science career paths based on interest, technical skills, and user-provided attributes.",
    longDescription: "CareerScope is an intelligent career prediction platform that helps computer science students discover potential career paths. The application uses machine learning algorithms to analyze user interests, technical skills, and personal attributes to recommend suitable career options. It provides detailed insights into each recommended career path, including required skills, typical responsibilities, and growth opportunities in the field.",
    technologies: ["React.js", "Vite", "Tailwind CSS", "Machine Learning"],
    githubUrl: "https://github.com/Valweii/Career-Scope",
  },
  {
    id: "05",
    title: "Autocare",
    category: "Web Development",
    year: "2023",
    image: "/src/assets/autocare.png",
    description: "Car Service Tracking Web Application - A web app that enables users to track car service history and receive automated service reminders.",
    longDescription: "Autocare is a comprehensive vehicle maintenance tracking application that helps car owners stay on top of their vehicle's service schedule. Users can log service history, track maintenance costs, and receive automated reminders for upcoming services. The application helps maintain vehicle health by ensuring timely maintenance and providing a complete service history record.",
    technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
    githubUrl: "https://github.com/Valweii/AutoCare",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 md:px-12 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span
            className={`number-badge transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            03
          </span>
          <h2
            className={`text-large font-bold mt-4 transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Selected Works
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className="relative overflow-hidden bg-muted aspect-[4/3] cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-110" : "scale-100"
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-accent/80 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredId === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-center text-accent-foreground">
                    <span className="text-sm font-medium">View Project</span>
                    <ArrowUpRight className="w-6 h-6 mx-auto mt-2" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="number-badge">{project.id}</span>
                  <span className="text-sm text-muted-foreground">
                    {project.year}
                  </span>
                </div>

                <h3
                  className={`text-2xl font-bold mt-3 transition-colors ${
                    hoveredId === project.id ? "text-accent" : ""
                  }`}
                >
                  {project.title}
                </h3>

                <p className="text-muted-foreground mt-2">
                  {project.description}
                </p>

                <div className="mt-4">
                  <span className="px-3 py-1 border border-border text-xs font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog
        open={selectedProject !== null}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        {selectedProject && (
          <DialogContent className="max-w-4xl max-h-[95vh] rounded-2xl [&>button]:hidden flex flex-col">
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <DialogHeader className="flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="number-badge">{selectedProject.id}</span>
                  <div className="flex items-center gap-2">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all"
                        aria-label="Visit live site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-bold mt-2">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-muted-foreground">
                    {selectedProject.category}
                  </span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    {selectedProject.year}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <div className="flex-1 flex flex-col gap-4 mt-4 min-h-0 overflow-hidden">
                {/* Project Image - Responsive */}
                <div className="relative overflow-hidden bg-muted rounded-lg flex-shrink-0" style={{ maxHeight: '40vh' }}>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    style={{ maxHeight: '40vh', objectFit: 'cover' }}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-y-auto">
                  {/* Long Description */}
                  {selectedProject.longDescription && (
                    <div className="flex-shrink-0">
                      <h3 className="text-lg font-bold mb-2">About the Project</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedProject.longDescription}
                      </p>
                    </div>
                  )}

                  {/* Technologies */}
                  {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                    <div className="flex-shrink-0">
                      <h3 className="text-lg font-bold mb-2">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 border border-border text-xs font-medium rounded"
                          >
                            {tech}
                          </span>
                        ))}
                  </div>
                    </div>
                  )}

                  {/* Links */}
                  {(selectedProject.liveUrl || selectedProject.githubUrl) && (
                    <div className="flex gap-3 pt-3 border-t border-border flex-shrink-0">
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Visit Live Site</span>
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all text-sm"
                        >
                          <Github className="w-4 h-4" />
                          <span>View Code</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default Projects;
