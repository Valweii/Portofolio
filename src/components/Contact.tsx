import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
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

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/Valweii" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/valdrich-eagan-3b127a243/" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 md:px-12 bg-background text-foreground"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <span
              className={`number-badge text-foreground/60 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              04
            </span>
            <h2
              className={`text-large font-bold mt-4 transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Let's create something amazing together.
            </h2>
          </div>

          <div className="space-y-12">
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-medium text-foreground/70">
                I'm always interested in hearing about new projects and
                opportunities. Whether you have a question or just want to say
                hi, feel free to reach out.
              </p>
            </div>

            <a
              href="mailto:valdricheagan@gmail.com"
              className={`group inline-flex items-center gap-4 transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="w-14 h-14 rounded-full border border-foreground/30 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                <Mail className="w-5 h-5" />
              </span>
              <div>
                <span className="block text-sm text-foreground/60">
                  Email me at
                </span>
                <span className="text-xl font-medium group-hover:text-accent transition-colors">
                  valdricheagan@gmail.com
                </span>
              </div>
            </a>

            <div
              className={`pt-8 border-t border-foreground/20 transition-all duration-700 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="block text-sm text-foreground/60 mb-4">
                Follow me
              </span>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="group w-12 h-12 rounded-full border border-foreground/30 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`mt-32 pt-8 border-t border-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm text-foreground/60">
            © {new Date().getFullYear()} Valdrich Eagan. All rights reserved.
          </span>
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="group flex items-center gap-2 text-sm hover:text-accent-foreground transition-colors"
          >
            <span>Back to top</span>
            <span className="w-8 h-8 rounded-full border border-foreground/30 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all rotate-[-90deg]">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
