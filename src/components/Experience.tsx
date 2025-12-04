import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const experiences = [
  {
    id: "01",
    role: "Information and Technology Intern",
    company: "Pancaran Agro - Kelapa Gading",
    period: "December 2024",
    description:
      "Prepared employee master data and optimized workflows for SAP integration. Validated SAP UDFs and supported troubleshooting to maintain accurate, reliable system operations.",
  },
  {
    id: "02",
    role: "Connect Group Co-Leader",
    company: "GMS Church - Alam Sutera",
    period: "February 2025 — Present",
    description:
      "Facilitated weekly Connect Group sessions through prepared activities and guided discussions to foster community engagement and spiritual growth.",
  },
  {
    id: "03",
    role: "Data Ministry Team Member",
    company: "GMS Church - Alam Sutera",
    period: "April 2025 — Present",
    description:
      "Assisted the Data Ministry by managing participation records, and onboarding new visitors and baptism candidates to maintain accurate church records.",
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 md:px-12 bg-muted"
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
            02
          </span>
          <h2
            className={`text-large font-bold mt-4 transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Experience
          </h2>
        </div>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`group border-t border-border py-8 md:py-12 cursor-pointer transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-start">
                <div className="md:col-span-1">
                  <span className="number-badge">{exp.id}</span>
                </div>

                <div className="md:col-span-4">
                  <h3
                    className={`text-xl md:text-2xl font-bold transition-colors ${
                      hoveredId === exp.id ? "text-accent" : ""
                    }`}
                  >
                    {exp.role}
                  </h3>
                  <p className="text-muted-foreground mt-1">{exp.company}</p>
                </div>

                <div className="md:col-span-2">
                  <span className="text-sm text-muted-foreground">
                    {exp.period}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>

                <div className="md:col-span-1 flex justify-end">
                  <div
                    className={`w-10 h-10 rounded-full border border-foreground flex items-center justify-center transition-all ${
                      hoveredId === exp.id
                        ? "bg-accent border-accent"
                        : "bg-transparent"
                    }`}
                  >
                    <ArrowUpRight
                      className={`w-4 h-4 transition-colors ${
                        hoveredId === exp.id ? "text-accent-foreground" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
