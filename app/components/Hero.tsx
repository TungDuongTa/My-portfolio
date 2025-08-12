"use client";
import { useRef } from "react";
import { gsap } from "gsap";
// import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LenisWrapper from "./LenisWrapper";
declare global {
  interface Window {
    duplicateIcons?: HTMLElement[] | null;
  }
}
gsap.registerPlugin(ScrollTrigger);
export default function Hero() {
  // useEffect(() => {
  //   const lenis = new Lenis();

  //   lenis.on("scroll", () => {
  //     ScrollTrigger.update();
  //   });

  //   gsap.ticker.add((time) => {
  //     lenis.raf(time * 1000);
  //   });

  //   gsap.ticker.lagSmoothing(0);

  //   return () => {
  //     // Cleanup on unmount
  //     gsap.ticker.remove((time) => {
  //       lenis.raf(time * 1000);
  //     });
  //     lenis.destroy();
  //   };
  // }, []);
  // Array of icon image paths
  const icons = [
    "/icon_1.png",
    "/icon_2.png",
    "/icon_3.png",
    "/icon_4.png",
    "/icon_5.png",
  ];
  // Refs for the elements you mentioned
  const animatedIconsRef = useRef<HTMLDivElement | null>(null);
  const iconElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textSegmentsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const placeholdersRef = useRef<(HTMLDivElement | null)[]>([]);
  const heroHeaderRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLDivElement | null>(null);

  // Clear the arrays on every render to avoid accumulating stale refs
  textSegmentsRef.current = [];
  placeholdersRef.current = [];
  iconElementsRef.current = [];

  // Stable ref setters that assign element at specific index. VERY IMPORTANT
  const setTextSegmentRef = (index: number) => (el: HTMLSpanElement | null) => {
    textSegmentsRef.current[index] = el;
  };

  const setPlaceholderRef = (index: number) => (el: HTMLDivElement | null) => {
    placeholdersRef.current[index] = el;
  };

  const setIconElementRef = (index: number) => (el: HTMLDivElement | null) => {
    iconElementsRef.current[index] = el;
  };

  //Randomize text segments appearance order
  useGSAP(() => {
    console.log("animatedIconsRef:", animatedIconsRef.current);
    console.log("iconElementsRef:", iconElementsRef.current);
    console.log("textSegmentsRef:", textSegmentsRef.current);
    console.log("placeholdersRef:", placeholdersRef.current);
    console.log("heroHeaderRef:", heroHeaderRef.current);
    console.log("heroSectionRef:", heroSectionRef.current);
    let textAnimationOrder: {
      segment: HTMLSpanElement | null;
      originalIndex: number;
    }[] = [];
    if (textSegmentsRef.current.length > 0) {
      // Build animation order array
      textAnimationOrder = textSegmentsRef.current.map((segment, index) => ({
        segment,
        originalIndex: index,
      }));

      // Shuffle array in-place
      for (let i = textAnimationOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [textAnimationOrder[i], textAnimationOrder[j]] = [
          textAnimationOrder[j],
          textAnimationOrder[i],
        ];
      }
    }

    //Calculate icon scale based on window width
    const isMobile = window.innerWidth <= 1000;
    const headerIconSize = isMobile ? 30 : 60;

    const firstIcon = iconElementsRef.current[0];
    if (!firstIcon) return; // safety check

    const currentIconSize = firstIcon.getBoundingClientRect().width;
    const exactScale = headerIconSize / currentIconSize;

    // Create the ScrollTrigger
    const animatedIcons = animatedIconsRef.current!;
    const iconElements = iconElementsRef.current;
    const heroHeader = heroHeaderRef.current!;
    const heroSection = heroSectionRef.current!;
    const placeholders = placeholdersRef.current;
    ScrollTrigger.create({
      scroller: "#page-wrapper",
      trigger: ".hero",
      start: "top top",
      end: `+=${window.innerHeight * 8}px`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      //run in realtime every time the user scrolls
      onUpdate: (self) => {
        //give value from 0 to 1 (top ->end of the page)
        const progress = self.progress;
        //hide all textSegments
        textSegmentsRef.current.forEach((segment) => {
          gsap.set(segment, { opacity: 0 });
        });
        //Start the animation when the progress is smaller than 0.3(icon rising up, hero header fade out)
        if (progress <= 0.3) {
          const moveProgress = progress / 0.3; // Normalize progress to 0-1 range
          const containerMoveY = -window.innerHeight * 0.3 * moveProgress;

          if (progress <= 0.15) {
            const headerProgress = progress / 0.15;
            const headerMoveY = -50 * headerProgress;
            const headerOpacity = 1 - headerProgress;
            // Move the hero header up and fade it out
            gsap.set(heroHeader, {
              transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
              opacity: headerOpacity,
            });
          } else {
            // when pass 15%, lock the header in place
            gsap.set(heroHeader, {
              transform: `translate(-50%, calc(-50% + -50px))`,
              opacity: 0,
            });
          }
          //clean up the icon elements
          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate) => {
              if (duplicate.parentNode) {
                duplicate.parentNode.removeChild(duplicate);
              }
            });
            window.duplicateIcons = null;
          }
          //moving icon container upwards
          gsap.set(animatedIcons, {
            x: 0,
            y: containerMoveY,
            scale: 1,
            opacity: 1,
          });
          //give each icon a staggered movement
          iconElements.forEach((icon, index) => {
            const staggerDelay = index * 0.1;
            const iconStart = staggerDelay;
            const iconEnd = staggerDelay + 0.5;

            const iconProgress = gsap.utils.mapRange(
              iconStart,
              iconEnd,
              0,
              1,
              moveProgress
            );
            const clampedProgress = Math.max(0, Math.min(1, iconProgress));

            const startOffset = -containerMoveY;
            const individualY = startOffset * (1 - clampedProgress);

            gsap.set(icon, {
              x: 0,
              y: individualY,
            });
          });
        } else if (progress <= 0.6) {
          //animate icon as it scale up and move toward the center of the screen
          const scaleProgress = (progress - 0.3) / 0.3;
          //keep header hidden
          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -50px))`,
            opacity: 0,
          });
          //changing background color
          if (scaleProgress >= 0.5) {
            heroSection.style.backgroundColor = "#e3e3db";
          } else {
            heroSection.style.backgroundColor = "#141414";
          }
          //clean up the duplicate icons
          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate) => {
              if (duplicate.parentNode) {
                duplicate.parentNode.removeChild(duplicate);
              }
            });
            window.duplicateIcons = null;
          }
          //need icon container to move from it current position to the center of the screen
          const targetCenterY = window.innerHeight / 2;
          const targetCenterX = window.innerWidth / 2;
          const containerRect = animatedIcons.getBoundingClientRect();
          const currentCenterX = containerRect.left + containerRect.width / 2;
          const currentCenterY = containerRect.top + containerRect.height / 2;
          const deltaX = (targetCenterX - currentCenterX) * scaleProgress;
          const deltaY = (targetCenterY - currentCenterY) * scaleProgress;
          const baseY = -window.innerHeight * 0.3;
          const currentScale = 1 + (exactScale - 1) * scaleProgress;
          //icon start at original size, by the time it hit 60% scroll, it scale down to match the size of the placeholder inside the headline
          gsap.set(animatedIcons, {
            x: deltaX,
            y: baseY + deltaY,
            scale: currentScale,
            opacity: 1,
          });

          iconElements.forEach((icon) => {
            gsap.set(icon, { x: 0, y: 0 });
          });
        } else if (progress <= 0.75) {
          const moveProgress = (progress - 0.6) / 0.15;

          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -50px))`,
            opacity: 0,
          });
          //icon container fade out and each icon is animated individually to fly into it placeholder in the headline
          heroSection.style.backgroundColor = "#e3e3db";

          const targetCenterY = window.innerHeight / 2;
          const targetCenterX = window.innerWidth / 2;
          const containerRect = animatedIcons.getBoundingClientRect();
          const currentCenterX = containerRect.left + containerRect.width / 2;
          const currentCenterY = containerRect.top + containerRect.height / 2;
          const deltaX = targetCenterX - currentCenterX;
          const deltaY = targetCenterY - currentCenterY;
          const baseY = -window.innerHeight * 0.3;
          //set icon container to the center of the screen, apply scale value and drop opacity to 0
          gsap.set(animatedIcons, {
            x: deltaX,
            y: baseY + deltaY,
            scale: exactScale,
            opacity: 0,
          });

          iconElements.forEach((icon) => {
            gsap.set(icon, { x: 0, y: 0 });
          });
          //clone each icon manually and position it at the original icon position, but with absolute position
          if (!window.duplicateIcons) {
            window.duplicateIcons = [];

            iconElements.forEach((icon) => {
              const duplicate = icon!.cloneNode(true) as HTMLElement;
              duplicate.className = "duplicate-icon";
              duplicate.style.position = "absolute";
              duplicate.style.width = headerIconSize + "px";
              duplicate.style.height = headerIconSize + "px";
              //store each icon clone in the body and and store them in an arrat
              // document.body.appendChild(duplicate);
              heroSectionRef.current?.appendChild(duplicate);
              window.duplicateIcons!.push(duplicate);
            });
          }

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate, index) => {
              if (index < placeholders.length) {
                const iconRect = iconElements[index]!.getBoundingClientRect();

                const startCenterX = iconRect.left + iconRect.width / 2;
                const startCenterY = iconRect.top + iconRect.height / 2;
                const startPageX = startCenterX + window.pageXOffset;
                const startPageY = startCenterY + window.pageYOffset;

                const targetRect = placeholders[index]!.getBoundingClientRect();
                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;
                const targetPageX = targetCenterX + window.pageXOffset;
                const targetPageY = targetCenterY + window.pageYOffset;

                const moveX = targetPageX - startPageX;
                const moveY = targetPageY - startPageY;

                let currentX = 0;
                let currentY = 0;
                //move clone icon vertically first, then horizontally
                if (moveProgress <= 0.5) {
                  const verticalProgress = moveProgress / 0.5;
                  currentY = moveY * verticalProgress;
                } else {
                  const horizontalProgress = (moveProgress - 0.5) / 0.5;
                  currentY = moveY;
                  currentX = moveX * horizontalProgress;
                }

                const finalPageX = startPageX + currentX;
                const finalPageY = startPageY + currentY;

                duplicate.style.left = finalPageX - headerIconSize / 2 + "px";
                duplicate.style.top = finalPageY - headerIconSize / 2 + "px";
                duplicate.style.opacity = "1";
                duplicate.style.display = "flex";
              }
            });
          }
        } else {
          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -100px))`,
            opacity: 0,
          });
          //
          heroSection.style.backgroundColor = "#e3e3db";

          gsap.set(animatedIcons, { opacity: 0 });
          //
          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate, index) => {
              if (index < placeholders.length) {
                const targetRect = placeholders[index]!.getBoundingClientRect();
                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;
                const targetPageX = targetCenterX + window.pageXOffset;
                const targetPageY = targetCenterY + window.pageYOffset;

                duplicate.style.left = targetPageX - headerIconSize / 2 + "px";
                duplicate.style.top = targetPageY - headerIconSize / 2 + "px";
                duplicate.style.opacity = "1";
                duplicate.style.display = "flex";
              }
            });
          }
          //

          textAnimationOrder.forEach((item, randomIndex) => {
            const segmentStart = 0.75 + randomIndex * 0.03;
            const segmentEnd = segmentStart + 0.015;

            const segmentProgress = gsap.utils.mapRange(
              segmentStart,
              segmentEnd,
              0,
              1,
              progress
            );
            const clampedProgress = Math.max(0, Math.min(1, segmentProgress));

            gsap.set(item.segment, {
              opacity: clampedProgress,
            });
          });
        }
      },
    });
  }, []);

  return (
    <LenisWrapper>
      <main
        className="h-screen overflow-y-scroll scroll-container overflow-x-hidden"
        id="page-wrapper"
      >
        <section
          id="main-content"
          ref={heroSectionRef}
          className="hero flex-col transition-colors duration-300 ease-in-out relative w-screen h-[100svh] p-6 flex items-center justify-center bg-[#141414] text-[#e3e3db] overflow-hidden"
        >
          <div
            ref={heroHeaderRef}
            className="hero-header absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] text-center flex flex-col gap-8 will-change-[transform,opacity]"
          >
            <h1 className="font-extrabold text-[7vw] leading-none">
              Tung Duong Ta
            </h1>
            <p className="text-2xl font-normal">Front-end software Engineer</p>
          </div>

          <div
            ref={animatedIconsRef}
            className="animated-icons fixed bottom-[1rem] left-[1rem] right-[1rem] flex items-center gap-4 will-change-transform z-2"
          >
            {icons.map((src, index) => (
              <div
                key={index}
                ref={setIconElementRef(index)}
                className={`animated-icon icon-${
                  index + 1
                } flex-1 aspect-[1] will-change-transform`}
              >
                <img src={src} alt={`Icon ${index + 1}`} className="imga" />
              </div>
            ))}
          </div>

          <h1 className="animated-text relative max-w-[1000px] text-center text-[#141414] text-[clamp(2rem,5vw,4rem)] font-extrabold leading-none">
            <div ref={setPlaceholderRef(0)} className="placeholder-icon"></div>
            <span ref={setTextSegmentRef(0)} className="text-segment">
              Delve into coding
            </span>
            <div ref={setPlaceholderRef(1)} className="placeholder-icon"></div>
            <span ref={setTextSegmentRef(1)} className="text-segment">
              without clutter.
            </span>
            <span ref={setTextSegmentRef(2)} className="text-segment">
              Unlock source code{" "}
            </span>
            <div ref={setPlaceholderRef(2)} className="placeholder-icon"></div>
            <span ref={setTextSegmentRef(3)} className="text-segment">
              for every tutorial
            </span>
            <div ref={setPlaceholderRef(3)} className="placeholder-icon"></div>
            <span ref={setTextSegmentRef(4)} className="text-segment">
              published on the Codegrid
            </span>
            <div ref={setPlaceholderRef(4)} className="placeholder-icon"></div>
            <span ref={setTextSegmentRef(5)} className="text-segment">
              YouTube channel.
            </span>
          </h1>
        </section>

        <section className="outro relative w-screen h-[100svh] p-6 flex items-center justify-center bg-[#141414] text-[#e3e3db] overflow-hidden">
          <h1>Link in description</h1>
        </section>
      </main>
    </LenisWrapper>
  );
}
