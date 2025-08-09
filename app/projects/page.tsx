"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
export default function ProjectPage() {
  const totalSlides = 5;
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollAllowed, setScrollAllowed] = useState(true);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  const slideTitle = [
    "Field Unit",
    "Astral Convergence",
    "Eclipse Core",
    "The Journey",
    "Serenity",
    "Nebula Point",
    "Horizon",
  ];
  const slideDescription = [
    "Concept Art",
    "Soundscape",
    "Experimental Film",
    "Personal Project",
    "Music Video",
    "VFX",
    "Set Design",
  ];
  function createSlide(slideNumber: number, direction: "down" | "up") {
    const slide = document.createElement("div");
    slide.className = "slide";
    const slideBgImg = document.createElement("div");
    slideBgImg.className = "slide-bg-img";
    const img = document.createElement("img");
    img.src = `/testimg-${slideNumber}.webp`;
    img.alt = `Slide ${slideNumber}`;
    img.className = "imga";
    slideBgImg.appendChild(img);
    slide.appendChild(slideBgImg);
    if (direction === "down") {
      slideBgImg.style.clipPath =
        "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
    } else {
      slideBgImg.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
    }
    return slide;
  }

  function createMainImageWrapper(
    slideNumber: number,
    direction: "down" | "up"
  ) {
    const wrapper = document.createElement("div");
    wrapper.className = "slide-main-img-wrapper";
    const img = document.createElement("img");
    img.src = `/testimg-${slideNumber}.webp`;
    img.alt = `Slide ${slideNumber}`;
    img.className = "imga rounded-md";
    wrapper.appendChild(img);
    if (direction === "down") {
      wrapper.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
    } else {
      wrapper.style.clipPath =
        "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
    }
    return wrapper;
  }
  function createTextElements(slideNumber: number, direction: "down" | "up") {
    const newTitle = document.createElement("h1");
    newTitle.textContent = slideTitle[slideNumber - 1];
    gsap.set(newTitle, {
      y: direction === "down" ? 50 : -50,
    });
    const newDescription = document.createElement("p");
    newDescription.textContent = slideDescription[slideNumber - 1];
    gsap.set(newDescription, {
      y: direction === "down" ? 20 : -20,
    });
    const newCounter = document.createElement("p");
    newCounter.textContent = slideNumber.toString();
    gsap.set(newCounter, {
      y: direction === "down" ? 18 : -18,
    });
    return { newTitle, newDescription, newCounter };
  }
  function animateSlide(direction: "down" | "up") {
    if (isAnimating || !scrollAllowed) return;
    setIsAnimating(true);
    setScrollAllowed(false);

    const slider = document.querySelector(".slider");
    const currentSlideElement = document.querySelector(".slide");
    const mainImageContainer = document.querySelector(".slide-main-img");
    const currentMainWrapper = document.querySelector(
      ".slide-main-img-wrapper"
    );

    const titlecontainer = document.querySelector(".slide-title");
    const descriptioncontainer = document.querySelector(".slide-description");
    const countercontainer = document.querySelector(".count");

    const currentTitle = document.querySelector(".slide-title h1");
    const currentDescription = document.querySelector(".slide-description p");
    const currentCounter = document.querySelector(".count p");

    // if (direction === "down") {
    //   setCurrentSlide((prevSlide) =>
    //     prevSlide === totalSlides ? 1 : prevSlide + 1
    //   );
    // } else {
    //   setCurrentSlide((prevSlide) =>
    //     prevSlide === 1 ? totalSlides : prevSlide - 1
    //   );
    // }
    let nextSlideNumber;
    if (direction === "down") {
      nextSlideNumber = currentSlide === totalSlides ? 1 : currentSlide + 1;
    } else {
      nextSlideNumber = currentSlide === 1 ? totalSlides : currentSlide - 1;
    }

    // const newSlide = createSlide(currentSlide, direction);
    // const newMainWrapper = createMainImageWrapper(currentSlide, direction);
    // const { newTitle, newDescription, newCounter } = createTextElements(
    //   currentSlide,
    //   direction
    // );
    const newSlide = createSlide(nextSlideNumber, direction);
    const newMainWrapper = createMainImageWrapper(nextSlideNumber, direction);
    const { newTitle, newDescription, newCounter } = createTextElements(
      nextSlideNumber,
      direction
    );
    slider?.appendChild(newSlide);
    mainImageContainer?.appendChild(newMainWrapper);
    titlecontainer?.appendChild(newTitle);
    descriptioncontainer?.appendChild(newDescription);
    countercontainer?.appendChild(newCounter);

    gsap.set(newMainWrapper.querySelector("img"), {
      y: direction === "down" ? "-50%" : "50%",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        [
          currentSlideElement,
          currentMainWrapper,
          currentTitle,
          currentDescription,
          currentCounter,
        ].forEach((el) => el?.remove());
        setCurrentSlide(nextSlideNumber);
        setIsAnimating(false);
        setTimeout(() => {
          setScrollAllowed(true);
          setLastScrollTime(Date.now());
        }, 100);
      },
    });
    tl.to(
      newSlide.querySelector(".slide-bg-img"),
      {
        clipPath:
          direction === "down"
            ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
            : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: CustomEase.create("", ".87,0,.13,1"),
      },
      0
    )
      .to(
        currentSlideElement!.querySelector("img"),
        {
          scale: 1.5,
          duration: 1,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        newMainWrapper,
        {
          clipPath:
            direction === "down"
              ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
              : "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        currentMainWrapper!.querySelector("img"),
        {
          y: direction === "down" ? "-50%" : "50%",
          duration: 1,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        newMainWrapper.querySelector("img"),
        {
          y: "0%",
          duration: 1,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        currentTitle,
        {
          y: direction === "down" ? -50 : 50,
          duration: 1,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        newTitle,
        {
          y: 0,
          duration: 1,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        currentDescription,
        {
          y: direction === "down" ? -20 : 20,
          duration: 1,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        newDescription,
        {
          y: 0,
          duration: 1,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        currentCounter,
        {
          y: direction === "down" ? -18 : 18,
          duration: 1,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        newCounter,
        {
          y: 0,
          duration: 1,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      );
  }

  function handleScroll(direction: "down" | "up") {
    const now = Date.now();
    if (isAnimating || !scrollAllowed) return;
    if (now - lastScrollTime < 1000) return;
    setLastScrollTime(now);
    animateSlide(direction);
  }

  //handle scroll event
  // window.addEventListener(
  //   "wheel",
  //   (e) => {
  //     e.preventDefault();
  //     const direction = e.deltaY > 0 ? "down" : "up";
  //     handleScroll(direction);
  //   },
  //   {
  //     passive: false,
  //   }
  // );
  useEffect(() => {
    let touchStartY = 0;
    let isTouchActive = false;
    const handleScrollEvent = (e: WheelEvent) => {
      // e.preventDefault();
      const direction = e.deltaY > 0 ? "down" : "up";
      handleScroll(direction);
    };
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      isTouchActive = true;
    };
    const handleTouchMove = (e: TouchEvent) => {
      // e.preventDefault();
      if (!isTouchActive || isAnimating || !scrollAllowed) return;
      const touchEndY = e.touches[0].clientY;
      const difference = touchStartY - touchEndY;
      if (Math.abs(difference) > 10) {
        isTouchActive = false; // Reset touch state after handling scroll
        const direction = difference > 0 ? "down" : "up";
        handleScroll(direction);
      }
    };
    const handleTouchEnd = () => {
      isTouchActive = false; // Reset touch state on touch end
    };
    if (typeof window !== "undefined") {
      // Only add event listener on the client side
      window.addEventListener("wheel", handleScrollEvent, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("wheel", handleScrollEvent);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      }
    };
  });
  return (
    <main className=" ">
      <footer>
        <p>All Project</p>
        <div className="slider-counter">
          <div className="count">
            <p>{currentSlide}</p>
          </div>
          <p>/</p>
          <p>{totalSlides}</p>
        </div>
      </footer>
      <div className="slider">
        <div className="slide">
          <div className="slide-bg-img">
            <img src="/testimg-1.webp" alt="Slide 1" className="imga" />
          </div>
        </div>
        <div className="slide-main-img shadow-2xs">
          <div className="slide-main-img-wrapper">
            <img
              src="/testimg-1.webp"
              alt="Slide 1"
              className="imga rounded-md "
            />
          </div>
        </div>
        <div className="slide-copy">
          <div className="slide-title">
            <h1>Field Unit</h1>
          </div>
          <div className="slide-description">
            <p>Concept Art</p>
          </div>
        </div>
      </div>
    </main>
  );
}
