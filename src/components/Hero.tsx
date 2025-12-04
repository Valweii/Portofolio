import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="overflow-hidden">
          <h1 className="text-huge font-bold clip-reveal">
            Computer Science student,
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="text-huge font-bold clip-reveal-delayed">
            building intelligent
          </h1>
        </div>
        <div className="overflow-hidden relative">
          <h1 className="text-huge font-bold clip-reveal-delayed">
            solutions<span className="text-accent">.</span>
          </h1>
        </div>

        <div className="mt-12 md:mt-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <p className="text-medium text-muted-foreground max-w-md fade-up-delayed">
            Passionate about developing web applications and intelligent systems,
            combining technical skills with creative problem-solving.
          </p>

          <button
            onClick={scrollToAbout}
            className="group flex items-center gap-3 text-sm font-medium fade-up-delayed"
          >
            <span className="hover-underline">Scroll to explore</span>
            <span className="w-10 h-10 rounded-full border border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </span>
          </button>
        </div>
      </div>

      {/* Decorative accent block */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-accent overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap items-center h-full">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-huge font-bold text-accent-foreground/10 mx-8"
            >
              PORTFOLIO
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
