"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useContainerRef } from "../context/ContainerRefContext";
import { useLenisContext } from "./LenisProvider";

gsap.registerPlugin(CustomEase, SplitText);
CustomEase.create("hop", ".87,0,.13,1");

export default function Navbar() {
  const { lenis } = useLenisContext();
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
      const textElements = container.querySelectorAll("a, p");
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
      lenis.current?.lenis?.stop();

      const tl = gsap.timeline();

      tl.to(
        menuToggleLabelRef.current,
        {
          y: "-110%",
          duration: 0.75,
          ease: "hop",
        },
        "<"
      )
        .to(
          containerRef.current,
          {
            y: "100svh",
            duration: 0.75,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuOverlayRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.75,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuOverlayContainerRef.current,
          {
            yPercent: 0,
            duration: 0.75,
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
      hamburgerIconRef.current.classList.remove("active");

      const tl = gsap.timeline();

      tl.to(containerRef.current, {
        y: "0svh",
        duration: 0.75,
        ease: "hop",
      })
        .to(
          menuOverlayRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.75,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuOverlayContainerRef.current,
          {
            yPercent: -50,
            duration: 0.75,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuToggleLabelRef.current,
          {
            y: "0%",
            duration: 0.75,
            ease: "hop",
          },
          "<"
        )
        .to(
          copyContainersRef.current,
          {
            opacity: 0.25,
            duration: 0.75,
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

        lenis.current?.lenis?.start();
      });
    }
  }

  return (
    <main>
      <nav className=" fixed top-0 left-0 w-[100vw] h-[100svh] z-50 pointer-events-none overflow-hidden">
        <div className="menu-bar ">
          <div className="menu-logo">
            <a href="#">
              <img src="/logo.png" alt="" className="imga" />
            </a>
          </div>
          <div
            className="menu-toggle-btn"
            ref={menuToggleBtnRef}
            onClick={toggleMenu}
          >
            <div className="menu-toggle-label">
              <p ref={menuToggleLabelRef}>Menu</p>
            </div>
            <div className="menu-hamburger-icon" ref={hamburgerIconRef}>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className="menu-overlay" ref={menuOverlayRef}>
          <div className="menu-overlay-content" ref={menuOverlayContainerRef}>
            <div className="menu-media-wrapper" ref={menuMediaWrapperRef}>
              <img src="/menu-media.jpg" alt="" className="imga" />
            </div>
            <div className="menu-content-wrapper">
              <div className="menu-content-main">
                <div
                  className="menu-col"
                  ref={(el) => {
                    if (el && !copyContainersRef.current.includes(el)) {
                      copyContainersRef.current.push(el);
                    }
                  }}
                >
                  <div className="menu-link">
                    <a href="#" onClick={toggleMenu}>
                      Index
                    </a>
                  </div>
                  <div className="menu-link">
                    <a href="/projects" onClick={toggleMenu}>
                      Portfolio
                    </a>
                  </div>
                  <div className="menu-link">
                    <a href="#" onClick={toggleMenu}>
                      Studio
                    </a>
                  </div>
                  <div className="menu-link">
                    <a href="#" onClick={toggleMenu}>
                      Journal
                    </a>
                  </div>
                  <div className="menu-link">
                    <a href="#" onClick={toggleMenu}>
                      Connect
                    </a>
                  </div>
                </div>

                <div
                  className="menu-col"
                  ref={(el) => {
                    if (el && !copyContainersRef.current.includes(el)) {
                      copyContainersRef.current.push(el);
                    }
                  }}
                >
                  <div className="menu-tag">
                    <a href="#">Web Animations</a>
                  </div>
                  <div className="menu-tag">
                    <a href="#">Interactive Media</a>
                  </div>
                  <div className="menu-tag">
                    <a href="#">Motion Craft</a>
                  </div>
                </div>
              </div>
              <div className="menu-footer">
                <div
                  className="menu-col"
                  ref={(el) => {
                    if (el && !copyContainersRef.current.includes(el)) {
                      copyContainersRef.current.push(el);
                    }
                  }}
                >
                  <p>Toronto, Canada</p>
                </div>
                <div
                  className="menu-col"
                  ref={(el) => {
                    if (el && !copyContainersRef.current.includes(el)) {
                      copyContainersRef.current.push(el);
                    }
                  }}
                >
                  <p>+1 437 555 0199</p>
                  <p>hello@nullspace.studio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
}
