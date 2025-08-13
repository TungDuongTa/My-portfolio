"use client";

import Hero from "./components/Hero";
import LenisWrapper from "./components/LenisWrapper";

export default function HomePage() {
  return (
    <LenisWrapper>
      <div>
        <div id="main-content">
          <Hero />
          <section className="outro relative w-screen h-[100svh] p-6 flex items-center justify-center bg-[#141414] text-[#e3e3db] overflow-hidden">
            <h1>Link in description</h1>
          </section>
          <section className="outro relative w-screen h-[100svh] p-6 flex items-center justify-center bg-[#141414] text-[#e3e3db] overflow-hidden">
            <h1>Link in description</h1>
          </section>
          <section className="outro relative w-screen h-[100svh] p-6 flex items-center justify-center bg-[#141414] text-[#e3e3db] overflow-hidden">
            <h1>Link in description</h1>
          </section>
        </div>
      </div>
    </LenisWrapper>
  );
}
