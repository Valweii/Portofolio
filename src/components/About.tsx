import { useEffect, useRef, useState } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    "Python",
    "JavaScript",
    "React",
    "C/C++",
    "SQL",
    "Java",
    "TensorFlow",
    "PyTorch",
    "Supabase",
    "Firebase",
    "Tailwind CSS",
    "PostgreSQL",
    "MySQL",
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 md:px-12 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <span
              className={`number-badge transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              01
            </span>
            <h2
              className={`text-large font-bold mt-4 transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Building intelligent systems and web solutions.
            </h2>
          </div>

          <div className="space-y-8">
            <p
              className={`text-small text-muted-foreground transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              I'm Valdrich Eagan, a Computer Science student at Bina Nusantara
              University specializing in Intelligent Systems. With a GPA of 3.57
              and expected graduation in 2027, I'm passionate about developing
              web applications and machine learning solutions.
            </p>

            <p
              className={`text-small text-muted-foreground transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              My experience includes working with modern web technologies like
              React, Supabase, and Firebase, as well as machine learning
              frameworks such as TensorFlow and PyTorch. I enjoy building
              full-stack applications that solve real-world problems.
            </p>

            <div
              className={`pt-8 transition-all duration-700 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-sm font-semibold mb-4 text-muted-foreground">
                TECHNOLOGIES
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="px-4 py-2 border border-border text-sm font-medium hover:bg-foreground hover:text-background transition-colors cursor-default"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-24 border-t border-border transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { number: "3.57", label: "GPA" },
            { number: "5+", label: "Years Experience" },
            { number: "8+", label: "Projects" },
            { number: "2", label: "Languages" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
              <div className="text-sm text-muted-foreground mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
