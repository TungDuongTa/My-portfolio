"use client";
import { useEffect, useState } from "react";
import Experiences from "./components/Experiences";
import Projects from "./components/Projects";
import Spotlight from "./components/Spotlight";
import { experienceData, projectData } from "./data";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("about");
  useEffect(() => {
    const handleScroll = (): void => {
      const sections = ["about", "experience", "projects"];
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 200; // Adjust as needed
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      "#page-wrapper",
      { clipPath: "circle(0% at 0% 0%)" },
      {
        clipPath: "circle(35% at 10% 10%)",
        duration: 0.75, // half of the total duration before the pause
        ease: "power2.inOut",
      }
    )
      .to("#page-wrapper", {
        clipPath: "circle(75% at 50% 50%)",
        duration: 0.75, // second half of the animation
        ease: "power2.inOut",
      })
      .addPause("+=0.3"); // adds a 0.3s pause in between the animations
  }, []);

  return (
    <div id="page-wrapper" className="relative ">
      <div
        className="bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-sky-300 selection:text-sky-900 relative "
        id="main-content"
      >
        <section>
          <div className="flex items-center justify-center "></div>
        </section>
        <Spotlight />
        <div className="mx-auto min-h-screen max-w-(--breakpoint-xl) px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0 ">
          <a
            href="#content"
            className="absolute left-0 top-0 block -translate-x-full rounded bg-linear-to-br from-teal-400 via-blue-500 to-purple-600 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white focus-visible:translate-x-0"
          >
            Skip to Content
          </a>
          <div className="lg:flex lg:justify-between lg:gap-4">
            <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 ">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                  <Link href="/">Tung Duong Ta</Link>
                </h1>
                <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                  Junior Software Engineer(Frontend focus)
                </h2>
                <p className="mt-4 max-w-xs leading-normal">
                  I build pixel-perfect, engaging, and accessible digital
                  experiences.
                </p>
                <div
                  className=" hidden lg:block"
                  aria-label="In-page jump links"
                >
                  <ul className="mt-16 w-max">
                    <li>
                      <a
                        className={`group flex items-center py-3 ${
                          activeSection === "about" ? "active " : ""
                        }`}
                        href="#about"
                      >
                        <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                        <span
                          className={`nav-text text-xs font-bold uppercase tracking-widest ${
                            activeSection === "about"
                              ? "text-slate-200"
                              : "text-slate-500"
                          } group-hover:text-slate-200 group-focus-visible:text-slate-200`}
                        >
                          About
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        className={`group flex items-center py-3 ${
                          activeSection === "experience" ? "active " : ""
                        }`}
                        href="#experience"
                      >
                        <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                        <span
                          className={`nav-text text-xs font-bold uppercase tracking-widest ${
                            activeSection === "experience"
                              ? "text-slate-200"
                              : "text-slate-500"
                          } group-hover:text-slate-200 group-focus-visible:text-slate-200`}
                        >
                          Experience
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        className={`group flex items-center py-3 ${
                          activeSection === "projects" ? "active " : ""
                        }`}
                        href="#projects"
                      >
                        <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                        <span
                          className={`nav-text text-xs font-bold uppercase tracking-widest ${
                            activeSection === "projects"
                              ? "text-slate-200"
                              : "text-slate-500"
                          } group-hover:text-slate-200 group-focus-visible:text-slate-200`}
                        >
                          Projects
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <ul
                className="ml-1 mt-8 flex items-center"
                aria-label="Social media"
              >
                <li className="mr-5 text-xs shrink-0">
                  <a
                    className="block hover:text-slate-200"
                    href="https://github.com/TungDuongTa"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="GitHub (opens in a new tab)"
                    title="Github"
                  >
                    <span className="sr-only">Github</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                  </a>
                </li>
                <li className="mr-5 text-xs shrink-0">
                  <a
                    className="block hover:text-slate-200"
                    href="https://www.linkedin.com/in/tung-duong-ta-52b9b3287/"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Linkedin (opens in a new tab)"
                    title="Linkedin"
                  >
                    <span className="sr-only">Linkedin</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                    </svg>
                  </a>
                </li>
                <li className="mr-5 text-xs shrink-0">
                  <a
                    className="block hover:text-slate-200"
                    href="https://www.facebook.com/profile.php?id=100013868294498"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Facebook (opens in a new tab)"
                    title="Facebook"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.658-4.788 1.325 0 2.462.099 2.793.143v3.24l-1.916.001c-1.504 0-1.796.715-1.796 1.762v2.309h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </header>
            <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
              <section
                className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
                id="about"
                aria-label="About me"
              >
                <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                    About
                  </h2>
                </div>
                <div>
                  <p className="mt-4">
                    I’m a web dev with a real passion for crafting engaging,
                    user-friendly experiences. My focus is on frontend
                    development, where I get to bring ideas to life with
                    responsive designs and interactive elements. I am expanding
                    my knowledge to full-stack development. <br />
                    Originally, i was a game developer but fail to make
                    beautiful pieces, so now I am focusing on web development
                    where i found myselft enjoying it.
                  </p>
                </div>
              </section>
              <section
                className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
                id="experience"
              >
                <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                    Experience
                  </h2>
                </div>
                <Experiences experiences={experienceData} />
              </section>
              <section
                className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
                id="projects"
              >
                <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                    Projects
                  </h2>
                </div>
                <Projects projects={projectData} />
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
