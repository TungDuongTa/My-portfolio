import React from "react";
import TextReveal1 from "../components/TextReveal1";
export default function page() {
  return (
    <div>
      {" "}
      <section className="mb-32">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Scroll-Triggered Text Reveal
        </h2>
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <TextReveal1>
            <h3 className="text-3xl font-bold text-indigo-600">
              This heading will reveal as you scroll
            </h3>
          </TextReveal1>
          <div className="h-4"></div>
          <TextReveal1 delay={0.2}>
            <p className="text-lg text-gray-700">
              This paragraph will animate in as you scroll down the page. The
              animation is triggered when the text enters the viewport.
            </p>
            <p className="text-lg text-gray-700">
              This paragraph will animate in as you scroll down the page. The
              animation is triggered when the text enters the viewport.
            </p>
            <p className="text-lg text-gray-700">
              This paragraph will animate in as you scroll down the page. The
              animation is triggered when the text enters the viewport.
            </p>
            <p className="text-lg text-gray-700">
              This paragraph will animate in as you scroll down the page. The
              animation is triggered when the text enters the viewport.
            </p>
          </TextReveal1>
        </div>
      </section>
    </div>
  );
}
