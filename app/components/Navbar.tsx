"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useContainerRef } from "../context/ContainerRefContext";
import { ScrollTrigger } from "gsap/all";
// import { useLenisContext } from "./LenisProvider";
import Link from "next/link";

gsap.registerPlugin(CustomEase, SplitText, ScrollTrigger);
CustomEase.create("hop", ".87,0,.13,1");

export default function Navbar() {
  // const { lenis } = useLenisContext();
  // Refs to DOM elements
  const { containerRef } = useContainerRef();
  // const containerRef = useRef<HTMLDivElement | null>(null);
  const menuToggleBtnRef = useRef<HTMLDivElement | null>(null);
  const menuOverlayRef = useRef<HTMLDivElement | null>(null);
  const menuOverlayContainerRef = useRef<HTMLDivElement | null>(null);
  const menuMediaWrapperRef = useRef<HTMLDivElement | null>(null);
  const hamburgerIconRef = useRef<HTMLDivElement | null>(null);
  const menuToggleLabelRef = useRef<HTMLParagraphElement | null>(null);

  // For multiple menu-col elements
  const copyContainersRef = useRef<HTMLDivElement[]>([]);
  copyContainersRef.current = [];

  // State to track menu open and animation status
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAnimatingRef = useRef(false);

  // Store split text instances per container
  const splitTextByContainer = useRef<SplitText[][]>([]);

  // GSAP initialization for splitting text
  useGSAP(() => {
    const containers = copyContainersRef.current;

    splitTextByContainer.current = [];

    containers.forEach((container) => {
      const textElements = container.querySelectorAll("p,.menu-link-text");
      const containerSplits: SplitText[] = [];

      textElements.forEach((element) => {
        const split = new SplitText(element as HTMLElement, {
          type: "lines",
          linesClass: "line",
          mask: "lines",
        });

        containerSplits.push(split);
        gsap.set(split.lines, { y: "-110%" });
      });

      splitTextByContainer.current.push(containerSplits);
    });
  }, []);

  // Menu toggle handler
  function toggleMenu() {
    if (isAnimatingRef.current) return;
    if (
      /* !containerRef.current || */
      !menuOverlayRef.current ||
      !menuOverlayContainerRef.current ||
      !menuMediaWrapperRef.current ||
      !hamburgerIconRef.current ||
      !menuToggleLabelRef.current
    ) {
      return;
    }

    isAnimatingRef.current = true;

    if (!isMenuOpen) {
      // Opening menu
      // Replace 'lenis' with your Lenis instance, or comment out if unused
      // lenis.current?.lenis?.stop();

      const tl = gsap.timeline();

      tl.to(
        menuToggleLabelRef.current,
        {
          y: "-110%",
          duration: 1,
          ease: "hop",
        },
        "<"
      )
        .to(
          containerRef.current,
          {
            y: "100svh",
            duration: 1,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuOverlayRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuOverlayContainerRef.current,
          {
            yPercent: 0,
            duration: 1,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuMediaWrapperRef.current,
          {
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            delay: 0.5,
          },
          "<"
        );

      splitTextByContainer.current.forEach((containerSplits) => {
        const copyLines = containerSplits.flatMap((split) => split.lines);
        tl.to(
          copyLines,
          {
            y: "0%",
            duration: 2,
            ease: "hop",
            stagger: -0.075,
          },
          -0.15
        );
      });

      hamburgerIconRef.current.classList.add("active");

      tl.call(() => {
        isAnimatingRef.current = false;
        setIsMenuOpen(true);
      });
    } else {
      // Closing menu
      // lenis.current?.lenis?.start();
      hamburgerIconRef.current.classList.remove("active");

      const tl = gsap.timeline();

      tl.to(containerRef.current, {
        y: "0svh",
        duration: 1,
        ease: "hop",
      })
        .to(
          menuOverlayRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuOverlayContainerRef.current,
          {
            yPercent: -50,
            duration: 1,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuToggleLabelRef.current,
          {
            y: "0%",
            duration: 1,
            ease: "hop",
          },
          "<"
        )
        .to(
          copyContainersRef.current,
          {
            opacity: 0.25,
            duration: 1,
            ease: "hop",
          },
          "<"
        );

      tl.call(() => {
        splitTextByContainer.current.forEach((containerSplits) => {
          const copyLines = containerSplits.flatMap((split) => split.lines);
          gsap.set(copyLines, { y: "-110%" });
        });

        gsap.set(copyContainersRef.current, { opacity: 1 });
        gsap.set(menuMediaWrapperRef.current, { opacity: 0 });

        isAnimatingRef.current = false;
        setIsMenuOpen(false);

        // lenis.current?.lenis?.start();
      });
    }
  }
  //
  //
  // Menu link groups
  const menuLinkGroups = [
    [
      { label: "Index", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Resume", href: "/resume" },
      { label: "Journal", href: "/" },
      { label: "Connect", href: "/" },
    ],
    [
      { label: "LinkedIn", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "Github", href: "#" },
    ],
    [{ label: "Wollongong, Australia", href: null }],
    [
      { label: "+61 406 400 348", href: null },
      { label: "duongtatung@gmail.com", href: null },
    ],
  ];

  return (
    <main>
      <nav className=" fixed top-0 left-0 w-[100vw] h-[100svh] z-50 pointer-events-none overflow-hidden">
        <div className="menu-bar fixed top-0 left-0 w-screen p-8 flex justify-between items-center pointer-events-auto text-[var(--menu-fg-secondary)] z-20  ">
          <div className="menu-logo w-8 h-8">
            <Link href="/">
              <img src="/logo.png" alt="" className="imga" />
            </Link>
          </div>
          <div
            className="menu-toggle-btn flex items-center gap-4 cursor-pointer"
            ref={menuToggleBtnRef}
            onClick={toggleMenu}
          >
            <div className="menu-toggle-label overflow-hidden">
              <p
                ref={menuToggleLabelRef}
                className="relative text-white translate-y-[0%] will-change-transform ]"
              >
                Menu
              </p>
            </div>
            <div
              className="menu-hamburger-icon relative w-12 h-12 flex flex-col justify-center items-center gap-[0.3rem] border border-[var(--hamburger-icon-border)] rounded-full"
              ref={hamburgerIconRef}
            >
              <span className="absolute w-[15px] h-[1.25px] bg-[var(--fg)] transition-all duration-[750ms] ease-[cubic-bezier(0.87,0,0.13,1)] origin-center will-change-transform"></span>
              <span className="absolute w-[15px] h-[1.25px] bg-[var(--fg)] transition-all duration-[750ms] ease-[cubic-bezier(0.87,0,0.13,1)] origin-center will-change-transform"></span>
            </div>
          </div>
        </div>

        <div
          className="menu-overlay fixed top-0 left-0 w-screen h-[100svh] text-[var(--fg)] overflow-hidden z-[1] bg-[var(--menu-bg)] [clip-path:polygon(0%_0%,100%_0%,100%_0%,0%_0%)] will-change-[clip-path]"
          ref={menuOverlayRef}
        >
          <div
            className="menu-overlay-content fixed top-0 left-0 w-screen h-[100svh] text-[var(--fg)] overflow-hidden z-[1] flex -translate-y-1/2 will-change-transform pointer-events-auto"
            ref={menuOverlayContainerRef}
          >
            <div
              className="menu-media-wrapper flex-[2] opacity-0 will-change-opacity"
              ref={menuMediaWrapperRef}
            >
              <img src="/menu-media.jpg" alt="" className="imga opacity-25" />
            </div>
            <div className="menu-content-wrapper flex-[3] relative flex">
              <div className="menu-content-main absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 p-8 flex items-end gap-8">
                {/* Map the first two groups as menu columns with links */}
                {menuLinkGroups.slice(0, 2).map((group, i) => (
                  <div
                    key={i}
                    className="menu-col flex flex-col gap-2"
                    ref={(el) => {
                      if (el && !copyContainersRef.current.includes(el)) {
                        copyContainersRef.current.push(el);
                      }
                    }}
                  >
                    {group.map(({ label, href }, index) =>
                      href ? (
                        <div
                          className={i === 0 ? "menu-link" : "menu-tag"}
                          key={index}
                        >
                          <Link
                            href={href}
                            onClick={toggleMenu}
                            style={{
                              pointerEvents: isMenuOpen ? "auto" : "none",
                            }}
                          >
                            <span className="menu-link-text">{label}</span>
                          </Link>
                        </div>
                      ) : (
                        <p key={index}>{label}</p>
                      )
                    )}
                  </div>
                ))}
              </div>
              <div className="menu-footer mx-auto w-3/4 p-8 flex items-end gap-8">
                {/* Map the last two groups as footer menu columns */}
                {menuLinkGroups.slice(2).map((group, i) => (
                  <div
                    key={i}
                    className="menu-col flex flex-col gap-2"
                    ref={(el) => {
                      if (el && !copyContainersRef.current.includes(el)) {
                        copyContainersRef.current.push(el);
                      }
                    }}
                  >
                    {group.map(({ label, href }, index) =>
                      href ? (
                        <Link
                          href={href}
                          key={index}
                          onClick={toggleMenu}
                          style={{
                            pointerEvents: isMenuOpen ? "auto" : "none",
                          }}
                        >
                          <span className="menu-link-text">{label}</span>
                        </Link>
                      ) : (
                        <p key={index}>{label}</p>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
}
