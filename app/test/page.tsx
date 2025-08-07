"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(CustomEase, SplitText);
CustomEase.create("hop", ".87,0,.13,1");

export default function Page() {
  return (
    <main>
      <div className="containers relative transform translate-y-[0svh] bg-[var(--bg)] text-[var(--fg)]">
        <section className="hero">
          <h1>Modern design system made that looks timeless</h1>
        </section>
        <section className="banner">
          <img src="hero.jpg" alt="" />
        </section>
        <section className="outro">
          <h1>Let’s build something quietly iconic</h1>
        </section>
      </div>
    </main>
  );
}
